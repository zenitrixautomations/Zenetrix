import { lc } from '@/lib/text'
import { notFound } from 'next/navigation'
import { ShutterOptions } from '@/components/products/ShutterOptions'
import Link from 'next/link'
import { products, getProduct, getCategory, productsIn, industries, services } from '@/data/catalog'
import { categoryCopy, productCopy, industryCopy } from '@/data/content'
import { featuredAreas } from '@/data/areas'
import { faqs } from '@/data/faqs'
import { categoryFaqs } from '@/data/categoryFaqs'
import { specs, specFields } from '@/data/specs'
import { posts } from '@/data/blog'
import { projects } from '@/data/projects'
import { Page, H2, P, UL, LinkList, FaqBlock, QuoteCta, DataTable } from '@/components/layout/Page'
import { productImage, relatedImages } from '@/lib/images'
import { Gallery } from '@/components/media/Gallery'
import { VideoPlayer } from '@/components/media/VideoPlayer'
import { productVideo } from '@/data/media'
import { meta } from '@/lib/seo'
import { richProducts } from '@/data/richProducts'
import { productKeywords } from '@/lib/keywords'
import { productSchema, videoObject } from '@/lib/schema'

export const dynamicParams = false
export const generateStaticParams = () => products.map(p => ({ category: p.category, slug: p.slug }))
type Props = { params: Promise<{ category: string; slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { category, slug } = await params; const p = getProduct(category, slug); if (!p) return {}
  return meta({ title: `${p.name} in Hyderabad | Supply & Installation`, description: seoDesc(p.name, productCopy[p.name]?.what), path: `/products/${category}/${slug}/`, keywords: productKeywords(p.name, p.keyword, richProducts[`${category}/${slug}`]?.keywords) })
}

const seoDesc = (name: string, what?: string) => {
  const tail = ' Supply, installation, repair and AMC across Hyderabad by Zenitrix. Call +91 85006 32002.'
  const lead = `${name} in Hyderabad: ${(what ?? '').split(/(?<=[.!?])\s/)[0]}`
  const d = lead + tail
  return d.length <= 175 ? d : `${name} in Hyderabad: how it works, where to use it and what to check.${tail}`
}
const first = (s?: string) => (s ?? '').split(/(?<=[.!?])\s/)[0]
const INDUSTRIAL_FIRST = ['rolling-shutters', 'high-speed-doors-dock']

export default async function Product({ params }: Props) {
  const { category, slug } = await params
  const p = getProduct(category, slug); const c = getCategory(category); if (!p || !c) notFound()
  const cc = categoryCopy[category]; const pc = productCopy[p.name]
  const path = `/products/${category}/${slug}/`
  const done = projects.filter(x => x.product === p.name)
  const vid = productVideo(category, slug)
  const spec = specs[`${category}/${slug}`]
  const family = productsIn(category)
  const shots = Array.from(new Set([productImage(category, slug), ...relatedImages(category)])).map((src, i) => ({ src, alt: i === 0 ? `${p.name} at an entrance in Hyderabad (illustrative scene)` : `${c.name} example ${i} (illustrative scene)`, caption: i === 0 ? p.name : c.name }))
  // Industries that use this product family (from the industry copy), then guides that link to this family or product.
  const inds = industries.filter(i => industryCopy[i.slug]?.families.includes(category)).slice(0, 8)
  const guides = [...posts.filter(g => g.links.some(l => l.href === path)), ...posts.filter(g => !g.links.some(l => l.href === path) && g.links.some(l => l.href.startsWith(`/products/${category}/`)))].slice(0, 4)
  // 10 areas: industrial localities first for shutters, doors and dock equipment (Blueprint 11.2), else the top localities.
  const pool = featuredAreas(INDUSTRIAL_FIRST.includes(category), 24)
  const myIndex = Math.max(0, products.findIndex(x => x.category === category && x.slug === slug))
  const areaList = Array.from({ length: 12 }, (_, i) => pool[(myIndex * 5 + i) % pool.length]).filter((a, i, arr) => arr.indexOf(a) === i)
  const rich = richProducts[`${category}/${slug}`]
  const famFaqs = categoryFaqs[category] ?? []
  const famIdx = Math.max(0, family.findIndex(x => x.slug === slug))
  const famPick = famFaqs.length ? [famFaqs[famIdx % famFaqs.length], famFaqs[(famIdx + 1) % famFaqs.length]] : []
  const own = [
    pc?.what && { q: `What is ${lc(p.name)}?`, a: pc.what },
    pc?.bestFor && { q: `Where is ${lc(p.name)} used in Hyderabad?`, a: pc.bestFor },
    pc?.consider && { q: `What should I check before choosing ${lc(p.name)}?`, a: pc.consider },
  ].filter(Boolean) as { q: string; a: string }[]
  const qa = [...(rich?.faqs ?? []), ...own, ...famPick, faqs[4]].filter((f, i, a) => a.findIndex(x => x.q === f.q) === i)
  return (
    <Page crumbs={[{ name: 'Products', path: '/products/' }, { name: c.name, path: `/products/${category}/` }, { name: p.name, path }]}
      schema={[productSchema(p.name, pc?.what ?? `${p.name} supplied and installed by Zenitrix Technologies in Hyderabad.`, path, productImage(category, slug), spec?.rows, c.name), ...(vid ? [videoObject(vid)] : [])]}
      hero={{ eyebrow: c.name, title: `${p.name} in Hyderabad`, intro: `Supply, installation, repair and AMC of ${lc(p.name)} by Zenitrix.`, image: productImage(category, slug) }}>
      <P>Zenitrix supplies, installs, repairs and services {lc(p.name)} in Hyderabad. {pc?.what}</P>
      
      {vid && (<><H2>See it in action</H2>
      <VideoPlayer name={vid.slug} title={vid.title} caption={vid.description} /></>)}
      <H2>{p.name} gallery</H2>
      <Gallery items={shots} cols={3} />
      <H2>What is {lc(p.name)}?</H2><P>{pc?.what}</P>
      <P>How {lc(c.name)} work, what to check and how installation goes is explained on the <Link className="text-blue-600 underline" href={`/products/${category}/`}>{c.name} page</Link>.</P>
      {rich && (<>
        <H2>{rich.headline}</H2><P>{rich.intro}</P>
        <H2>Key features of {lc(p.name)}</H2><UL items={rich.features} />
        <H2>How {lc(p.name)} works, step by step</H2>
        <ol className="list-decimal pl-6 mb-3 space-y-2 text-slate-700 leading-7">{rich.steps.map(x => <li key={x.h}><strong>{x.h}.</strong> {x.p}</li>)}</ol>
        <H2>Where {lc(p.name)} is used</H2>
        <UL items={rich.uses.map(u => `${u.h}: ${u.p}`)} />
        <H2>Works with</H2><UL items={rich.works} />
        <H2>Installation and selection tips</H2><UL items={rich.tips} />
      </>)}
      <H2>Best uses in Hyderabad</H2><P>{pc?.bestFor}</P>
      <LinkList items={inds.map(i => ({ name: i.name, href: `/industries/${i.slug}/` }))} />
      {category === 'rolling-shutters' && <ShutterOptions aluminium={slug === 'aluminium-rolling-shutter'} />}
      <H2>What to check before you choose</H2><P>{pc?.consider}</P>
      {spec && (<>
        <H2>Technical specifications</H2>
        <DataTable caption={`${p.name} specifications`} head={['Specification', 'Value']} rows={spec.rows.map(([k, v]) => [k, v])} />
        {spec.warranty && <P>Warranty: {spec.warranty}</P>}
        {spec.datasheet && <P><a className="btn" href={spec.datasheet} download>Download the datasheet (PDF)</a></P>}
      </>)}
      <H2>Installation, safety and cost</H2>
      <P>Price depends on size, weight, brand, accessories and site conditions, so we give a written quote after a free site visit. Installation, safety devices and control options are covered on the <Link className="text-blue-600 underline" href={`/products/${category}/`}>{c.name} page</Link>.</P>
      <P><Link className="underline text-blue-600" href="/about/#certifications">Certifications</Link> · <Link className="underline text-blue-600" href="/services/safety-devices/">Safety devices</Link> · <Link className="underline text-blue-600" href="/cost-estimator/">What affects the cost</Link> · <Link className="underline text-blue-600" href="/which-automation/">Which automation do I need?</Link></P>
      <H2>Service and AMC</H2>
      <LinkList items={[...(category === 'gate-automation' ? services.filter(x => x.slug === 'convert-manual-gate-to-automatic') : []), services[0], services[1], services[2]].filter(Boolean).map(s => ({ name: s.name, href: `/services/${s.slug}/` }))} />
      {done.length > 0 && (<><H2>Recent installations</H2><LinkList items={done.map(d => ({ name: d.title, href: `/projects/${d.slug}/` }))} /></>)}
      <H2>Related products</H2>
      <LinkList items={family.filter(x => x.slug !== slug).slice(0, 8).map(x => ({ name: x.name, href: `/products/${category}/${x.slug}/` }))} />
      {guides.length > 0 && (<><H2>Guides about {lc(c.name)}</H2><LinkList items={guides.map(g => ({ name: g.title, href: `/blog/${g.slug}/` }))} /></>)}
      <H2>Available across Hyderabad</H2>
      <LinkList items={areaList.map(a => ({ name: a.name, href: `/hyderabad/${a.slug}/` }))} />
      <FaqBlock faqs={qa} />
      <QuoteCta product={p.name} />
    </Page>
  )
}
