import { MEDIA } from '@/constants/media'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { STATES, districtHref, type StateKey } from '@/data/districts'
import { getTopService } from '@/data/serviceAreaPages'
import { regionSalts } from '@/data/localSalts'
import { Page, H2, P, UL, LinkList, FaqBlock, QuoteCta } from '@/components/layout/Page'
import { meta } from '@/lib/seo'
import { lc } from '@/lib/text'
import { serviceSchema } from '@/lib/schema'
import { districtServiceCopy } from '@/lib/localCopy'

const find = (state: StateKey, district: string, service: string) => {
  const d = STATES[state].list.find(x => x.slug === district); const s = getTopService(service)
  return d && s && !(state === 'telangana' && d.slug === 'hyderabad') ? { d, s } : null
}

export async function regionServiceMetadata(state: StateKey, district: string, service: string) {
  const f = find(state, district, service); if (!f) return {}
  const st = STATES[state]
  return meta({
    title: `${f.s.name} in ${f.d.name}, ${st.name} | Zenitrix`,
    description: `Need ${lc(f.s.name)} in ${f.d.name}, ${st.name}? Zenitrix supplies, installs, repairs and services from Hyderabad. WhatsApp for a quick quote.`.slice(0, 158),
    path: `${st.path}${district}/${service}/`,
    keywords: [`${lc(f.s.name)} ${f.d.name}`, `${lc(f.s.name)} in ${f.d.name}`, `${lc(f.s.name)} ${st.name}`, ...f.d.towns.slice(0, 3).map(t => `${lc(f.s.name)} ${t}`)],
  })
}

export function RegionServiceView({ state, district, service }: { state: StateKey; district: string; service: string }) {
  const f = find(state, district, service); if (!f) notFound()
  const { d, s } = f; const st = STATES[state]; const path = `${st.path}${district}/${service}/`
  const idx = st.list.findIndex(x => x.slug === d.slug)
  const others = [1, 2, 3, 4, 5].map(k => st.list[(idx + k) % st.list.length]).filter(x => x.slug !== d.slug && !(state === 'telangana' && x.slug === 'hyderabad')).map(x => x.name)
  const c = districtServiceCopy({ district: d.name, state: st.name, slug: d.slug, towns: d.towns, pins: d.pins, svc: s, others, salt: regionSalts[`${state}|${service}|${district}`] ?? 0 })
  return (
    <Page crumbs={[{ name: st.name, path: st.path }, { name: d.name, path: `${st.path}${d.slug}/` }, { name: s.name, path }]} schema={serviceSchema(`${s.name} in ${d.name}`, path, `${d.name}, ${st.name}`)}
      hero={{ eyebrow: st.name, title: `${s.name} in ${d.name}, ${st.name}`, intro: `Supply, installation, repair and AMC from Zenitrix, Hyderabad.`, image: MEDIA.hero }}>
      <P>{c.intro}</P>
      <P><Link className="underline" href={s.href}>Learn more about {lc(s.name)}</Link></P>
      <H2>{c.whyH}</H2>
      {c.why.map(t => <P key={t}>{t}</P>)}
      <H2>{c.whereH}</H2>
      <P>{c.where}</P>
      {d.towns.length > 0 && <UL items={d.towns} />}
      <H2>{c.checksH}</H2>
      <UL items={c.checks} />
      <H2>{c.procH}</H2>
      {c.proc.map(([h, t]) => (<div key={h}><h3 className="font-semibold text-lg mt-4">{h}</h3><P>{t}</P></div>))}
      <FaqBlock faqs={c.faqs} />
      <H2>More in {d.name}</H2>
      <LinkList items={[{ name: `All services in ${d.name}`, href: districtHref(state, d) }, { name: 'Repair and AMC', href: '/services/amc/' }, { name: 'Hyderabad localities', href: '/hyderabad/' }]} />
      <QuoteCta product={s.name} />
    </Page>
  )
}
