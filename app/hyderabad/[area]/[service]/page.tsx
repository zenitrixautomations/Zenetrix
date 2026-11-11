import { lc } from '@/lib/text'
import { areaImage } from '@/lib/images'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getArea, nearby } from '@/data/areas'
import { areaSeo } from '@/data/areaSeo'
import { serviceAreaPages, getTopService, localFacts } from '@/data/serviceAreaPages'
import { localSalts } from '@/data/localSalts'
import { Page, H2, P, UL, LinkList, FaqBlock, QuoteCta } from '@/components/layout/Page'
import { meta } from '@/lib/seo'
import { serviceSchema } from '@/lib/schema'
import { areaDistance, areaDirection } from '@/lib/geo'
import { serviceCopy } from '@/lib/localCopy'

export const dynamicParams = false
export const generateStaticParams = () => serviceAreaPages.map(x => ({ area: x.area, service: x.service }))
type Props = { params: Promise<{ area: string; service: string }> }

export async function generateMetadata({ params }: Props) {
  const { area, service } = await params; const a = getArea(area); const s = getTopService(service); if (!a || !s) return {}
  return meta({
    title: `${s.name} in ${a.name}, Hyderabad | Zenitrix`,
    description: `Need ${lc(s.name)} in ${a.name}? Zenitrix serves ${a.name} and nearby localities with installation, repair and AMC. WhatsApp for a quick quote.`,
    path: `/hyderabad/${area}/${service}/`,
    keywords: [`${lc(s.name)} ${a.name}`, `${lc(s.name)} in ${a.name} Hyderabad`, `${lc(s.name)} near ${a.name}`, `${a.name} ${lc(s.name)} installation`, `${lc(s.name)} Hyderabad`],
  })
}

export default async function ServiceArea({ params }: Props) {
  const { area, service } = await params
  const a = getArea(area); const s = getTopService(service)
  if (!a || !s || !serviceAreaPages.some(x => x.area === area && x.service === service)) notFound()
  const path = `/hyderabad/${area}/${service}/`
  const facts = localFacts[area]; const l = areaSeo[area]; const geo = areaDistance(a.name)
  const c = serviceCopy({
    place: a.name, slug: a.slug, kind: a.type, svc: s, salt: localSalts[`${service}|${area}`] ?? 0,
    dir: areaDirection(a.name), officeKm: geo?.office, closest: geo?.closest,
    landmarks: facts?.landmarks ?? l?.landmarks.slice(0, 4), roads: facts?.roads ?? l?.roads, intro: l?.intro, sites: facts?.buildingTypes ?? l?.sites,
  })
  const faqs = [...c.faqs, ...(facts?.faqs ?? [])]
  const sites = facts?.buildingTypes ?? l?.sites
  return (
    <Page crumbs={[{ name: 'Hyderabad', path: '/hyderabad/' }, { name: a.name, path: `/hyderabad/${area}/` }, { name: s.name, path }]} schema={serviceSchema(`${s.name} in ${a.name}`, path, a.name)} hero={{ eyebrow: a.name, title: `${s.name} in ${a.name}, Hyderabad`, image: areaImage(a.type) }}>
      <P>{c.intro} {facts?.notes ?? ''}</P>
      <P><Link className="underline" href={s.href}>Learn more about {lc(s.name)}</Link></P>
      <H2>{c.whyH}</H2>
      {c.why.map(t => <P key={t}>{t}</P>)}
      <H2>{c.whereH}</H2>
      <P>{c.whereP}</P>
      {sites && sites.length > 0 && <UL items={sites} />}
      <H2>{c.checksH}</H2>
      <UL items={c.checks} />
      <H2>{c.procH}</H2>
      {c.proc.map(([h, t]) => (<div key={h}><h3 className="font-semibold text-lg mt-4">{h}</h3><P>{t}</P></div>))}
      {facts?.project && (<><H2>Recent installations near {a.name}</H2>
      <P>{facts.project}</P>
      {facts.projectSlug && <P><Link className="underline" href={`/projects/${facts.projectSlug}/`}>See the project</Link></P>}</>)}
      {facts?.travelTime && <P>Travel time from our Banjara Hills office: {facts.travelTime}.</P>}
      <H2>Control options: remote, mobile app, smartwatch</H2><P>Remote, mobile app and smartwatch control depend on the controller supplied. We confirm what fits your site at the visit.</P>
      <H2>Repair and AMC for {lc(s.name)} in {a.name}</H2>
      <LinkList items={[{ name: 'Gate and door repair', href: '/services/automatic-gate-repair/' }, { name: 'AMC plans', href: '/services/amc/' }]} />
      <FaqBlock faqs={faqs} />
      <H2>Nearby areas we serve</H2>
      <LinkList items={[{ name: `All services in ${a.name}`, href: `/hyderabad/${area}/` }, ...nearby(area, 3).map(n => ({ name: `${s.name} in ${n.name}`, href: `/hyderabad/${n.slug}/${service}/` }))]} />
      <QuoteCta product={s.name} />
    </Page>
  )
}
