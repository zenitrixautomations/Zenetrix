// GA4 event helpers. Three conversion events only: generate_lead, phone_click, whatsapp_click.
// Never send personal data (name, phone, email, message text, photo) as an event parameter.
type Gtag = (...args: unknown[]) => void
type Params = Record<string, string | number | boolean>

const send = (name: string, params: Params = {}) => {
  if (typeof window === 'undefined') return
  const g = (window as unknown as { gtag?: Gtag }).gtag
  // transport_type beacon keeps the hit alive when the page navigates straight away (tel: and wa.me links, form redirect).
  g?.('event', name, { page_path: location.pathname, transport_type: 'beacon', ...params })
}

const LEAD_FLAG = 'zx_lead_sent'
export const GA4 = {
  /** Valid enquiry submitted. method: 'form' (delivered by our API) or 'whatsapp_fallback'. */
  lead: (params: Params = {}) => { try { sessionStorage.setItem(LEAD_FLAG, String(Date.now())) } catch {} send('generate_lead', params) },
  phone: (params: Params = {}) => send('phone_click', params),
  whatsapp: (params: Params = {}) => send('whatsapp_click', params),
  /** Thank-you page safety net: fires generate_lead only if the form did not already fire it in this tab. */
  leadOnThankYou: () => { try { if (sessionStorage.getItem(LEAD_FLAG)) { sessionStorage.removeItem(LEAD_FLAG); return } } catch {} send('generate_lead', { method: 'thank_you_page' }) },
}
