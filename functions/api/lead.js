// Cloudflare Pages Function: POST /api/lead  (replaces the old Next.js app/api/lead/route.ts, which cannot run in a static export).
// Set secrets in Cloudflare: Workers & Pages > your project > Settings > Variables and Secrets (Production):
//   RESEND_API_KEY, LEAD_TO_EMAIL, LEAD_FROM_EMAIL, LEAD_WEBHOOK_URL, LEAD_CONFIRM_CUSTOMER, TURNSTILE_SECRET_KEY
// If nothing is configured, it returns delivered:false and the form falls back to WhatsApp.

const MAX_BODY = 2_000_000 // 1 MB site photo as base64 plus form fields
const SITE_URL = 'https://zenitrixautomations.com'
const hits = new Map() // best-effort per-isolate rate limit; add a Cloudflare WAF rate-limit rule for real protection

const clean = (v, n = 200) => String(v ?? '').replace(/[\u0000-\u001f\u007f]+/g, ' ').trim().slice(0, n)
const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } })
const withTimeout = (ms = 8000) => AbortSignal.timeout(ms)

function sameOrigin(req, env) {
  const origin = req.headers.get('origin')
  if (!origin) return false // browsers always send Origin on fetch POST
  try {
    const o = new URL(origin).host.replace(/^www\./, '')
    const mine = [req.headers.get('host'), new URL(env.NEXT_PUBLIC_SITE_URL || SITE_URL).host]
    return mine.some(h => h && h.split(',')[0].trim().replace(/^www\./, '') === o)
  } catch { return false }
}

export async function onRequestPost({ request: req, env }) {
  if (!sameOrigin(req, env)) return json({ ok: false, error: 'origin' }, 403)
  if (!(req.headers.get('content-type') || '').includes('application/json')) return json({ ok: false, error: 'type' }, 415)
  if (Number(req.headers.get('content-length') || 0) > MAX_BODY) return json({ ok: false, error: 'too_large' }, 413)

  const ip = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter(t => now - t < 60_000)
  if (recent.length >= 5) return json({ ok: false, error: 'rate' }, 429)
  hits.set(ip, [...recent, now])
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some(t => now - t < 60_000)) hits.delete(k)

  let b
  try {
    const raw = await req.text()
    if (raw.length > MAX_BODY) return json({ ok: false, error: 'too_large' }, 413)
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('shape')
    b = parsed
  } catch { return json({ ok: false, error: 'bad_json' }, 400) }
  if (b.website) return json({ ok: true, delivered: true }) // honeypot: pretend success

  const lead = {
    name: clean(b.name, 80), phone: clean(b.phone, 20), email: clean(b.email, 120), area: clean(b.area, 80), product: clean(b.product, 120),
    site: clean(b.site, 60), width: clean(b.width, 40), height: clean(b.height, 40), weight: clean(b.weight, 40), time: clean(b.time, 40),
    note: clean(b.note, 300), page: clean(b.page, 200).replace(/^(?!\/)/, '/'), at: new Date().toISOString(),
  }
  const photoRaw = typeof b.photo === 'string' ? b.photo : ''
  const photo = /^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(photoRaw) && photoRaw.length <= 1_500_000 ? photoRaw : ''
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) lead.email = ''
  if (!lead.name || !/^[+\d][\d\s-]{7,17}$/.test(lead.phone) || !lead.area || !lead.product || !lead.width || !lead.height)
    return json({ ok: false, error: 'invalid' }, 422)

  const secret = env.TURNSTILE_SECRET_KEY
  if (secret) {
    const token = clean(b.token, 2048)
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST', body: new URLSearchParams({ secret, response: token, remoteip: ip }), signal: withTimeout(),
    }).catch(() => null)
    if (!r) return json({ ok: false, error: 'captcha' }, 403)
    const j = await r.json().catch(() => ({ success: false }))
    if (!j.success) return json({ ok: false, error: 'captcha' }, 403)
  }

  let delivered = false
  const tasks = []
  const hook = env.LEAD_WEBHOOK_URL
  if (hook) tasks.push(fetch(hook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...lead, hasPhoto: Boolean(photo), photoDataUrl: photo }), signal: withTimeout() }).then(r => { if (r.ok) delivered = true }))

  const key = env.RESEND_API_KEY, to = env.LEAD_TO_EMAIL
  if (key && to) {
    const text = Object.entries(lead).map(([k, v]) => `${k}: ${v}`).join('\n')
    const from = env.LEAD_FROM_EMAIL || 'Zenitrix Website <onboarding@resend.dev>'
    const send = payload => fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from, ...payload }), signal: withTimeout() })
    tasks.push(send({ to: [to], subject: `New lead: ${lead.product} (${lead.area})`, text, ...(photo ? { attachments: [{ filename: 'site-photo.jpg', content: photo.split(',')[1] }] } : {}) }).then(r => { if (r.ok) delivered = true }))
    if (lead.email && env.LEAD_CONFIRM_CUSTOMER === '1')
      tasks.push(send({ to: [lead.email], subject: 'We received your request | Zenitrix Technologies', text: `Hi ${lead.name},\n\nThank you for contacting Zenitrix Technologies about ${lead.product}. Our team will contact you on ${lead.phone} to arrange a free site visit.\n\nYou can also WhatsApp us on +91 85006 32002.\n\nZenitrix Technologies, Banjara Hills, Hyderabad` }).catch(() => undefined))
  }
  await Promise.allSettled(tasks)
  return json({ ok: true, delivered })
}

// Anything other than POST: 405
export const onRequest = () => json({ ok: false, error: 'method' }, 405)
