import { cdnImage } from '@/constants/media'
import Link from 'next/link'
import { Page, H2, P, UL, Steps, FaqBlock, CardGrid, QuoteCta, DataTable } from '@/components/layout/Page'
import { meta } from '@/lib/seo'
import { serviceSchema } from '@/lib/schema'
import { categoryImage } from '@/lib/images'
import { featuredAreas } from '@/data/areas'
import { SITE } from '@/lib/site'
import type { Faq } from '@/data/faqs'

const PATH = '/automation-gates-hyderabad/'
const KEYWORDS = ['automation gates Hyderabad', 'automation gates in Hyderabad', 'automation gates', 'automation gates near me', 'automatic gates Hyderabad', 'gate automation Hyderabad', 'sliding gate automation Hyderabad', 'swing gate automation Hyderabad', 'gate automation company Hyderabad', 'Zenitrix automation gates', 'Zentrix automation Hyderabad']

export const metadata = meta({
  title: 'Automation Gates Hyderabad | Sliding, Swing Gates',
  description: 'Automation gates in Hyderabad: sliding, swing, folding and telescopic gate automation with installation, repair and AMC. Free site visit. +91 85006 32002',
  path: PATH,
  keywords: KEYWORDS,
})

const faqs: Faq[] = [
  { q: 'What are automation gates?', a: 'Automation gates are ordinary gates fitted with a motor, a controller and safety devices so they open and close without anyone pushing them. They are operated by remote, push button, keypad, RFID tag, mobile app or intercom, and they stop or reverse if a person or vehicle is in the way.' },
  { q: 'Which automation gate is best for my property in Hyderabad?', a: 'Sliding gate automation suits compounds with free wall space beside the opening. Swing gate automation suits narrower openings where the leaves can open inwards or outwards. Folding, telescopic and cantilever gates suit tight spaces. A site visit lets us measure and recommend one honestly.' },
  { q: 'Can my existing manual gate be automated?', a: 'In most cases yes. If the gate is straight, sound and moves freely, we fit an operator, controller and safety sensors to it. If it is badly bent, too heavy for the frame or poorly hung, we will tell you before any work starts.' },
  { q: 'Do automation gates work during a power cut?', a: 'They can. Battery backup, manual release keys and solar options let the gate keep working or be opened by hand during an outage. Tell us how long a cut usually lasts at your site so we can size the backup.' },
  { q: 'Do you repair automation gates installed by other companies?', a: 'Yes. We inspect the motor, controller, sensors and remotes of any brand and give a clear quote before we repair anything. We also offer AMC for gates we did not install.' },
  { q: 'Do I pay for the site visit?', a: 'No. The site visit and written quote are free. We measure the opening, check power and safety needs, and recommend the right gate automation for you.' },
  { q: 'Is Zenitrix the same as Zentrix Automation?', a: 'Yes. Zenitrix Technologies, also called Zenitrix Automations, is the company some customers search for as Zentrix Automation. Our office is in Banjara Hills, Hyderabad.' },
]

export default function Pg() {
  const areas = featuredAreas(false, 12)
  return (
    <Page
      crumbs={[{ name: 'Automation Gates in Hyderabad', path: PATH }]}
      hero={{ eyebrow: 'Automation gates', title: 'Automation Gates in Hyderabad', intro: 'Sliding, swing, folding and telescopic gate automation for villas, apartments, offices and factories. Supply, installation, repair and AMC from our Banjara Hills base.', image: cdnImage('g-gate-automation.webp') }}
      schema={serviceSchema('Automation gates in Hyderabad', PATH, undefined, { description: 'Supply, installation, repair and AMC of automation gates in Hyderabad.', keywords: KEYWORDS })}>
      <P>Automation gates turn an ordinary gate into one that opens from your car, your phone or a card, and closes safely behind you. Zenitrix Technologies supplies, installs, repairs and services automation gates across Hyderabad, Secunderabad, Telangana and Andhra Pradesh. We have 10+ years of experience, and we look after the whole job: site visit, product choice, installation, testing, handover and yearly maintenance.</P>
      <P>If you are looking for entrance automation that also covers boom barriers, doors, RFID access and safety devices at one entry point, see our page on <Link className="text-blue-600 underline" href="/entrance-automation-gates-hyderabad/">entrance automation gates in Hyderabad</Link>.</P>

      <H2>Types of automation gates we install</H2>
      <CardGrid cols={3} items={[
        { name: 'Sliding gate automation', href: '/products/gate-automation/sliding-gate-automation/', image: categoryImage('gate-automation'), note: 'For compounds with space beside the opening.' },
        { name: 'Swing gate automation', href: '/products/gate-automation/swing-gate-automation/', image: categoryImage('gate-automation'), note: 'For hinged gates that open in or out.' },
        { name: 'Boom barriers', href: '/products/boom-barriers/', image: categoryImage('boom-barriers'), note: 'For vehicle lanes at apartments, offices and campuses.' },
      ]} />
      <P>We also automate telescopic, bi-folding, trackless bi-folding and cantilever gates. See all of them under <Link className="text-blue-600 underline" href="/products/gate-automation/">gate automation</Link>.</P>

      <H2>Sliding gate or swing gate: which one?</H2>
      <DataTable caption="Sliding gate and swing gate automation compared" head={['Point', 'Sliding gate', 'Swing gate']} rows={[
        ['Space needed', 'Free wall or fence length beside the opening', 'Clear arc in front of or behind the gate'],
        ['Best for', 'Wide vehicle entries, factories, villas with long compounds', 'Narrower openings, existing hinged gates'],
        ['Slopes', 'Needs a level track or a trackless design', 'Handles a gentle slope if the leaf clears the ground'],
        ['Wind', 'Less affected by wind', 'Large solid leaves need a stronger operator'],
        ['Our advice', 'Choose when you have the length', 'Choose when the gate already swings well'],
      ]} />

      <H2>What comes with every automation gate</H2>
      <UL items={[
        'Operator or motor matched to the gate weight and how often it is used.',
        'Controller with remote, push button, keypad, RFID, mobile app or intercom options.',
        'Safety: photocells, safety edges, warning lamp and limit control, so the gate reverses if something is in the way.',
        'Manual release, so the gate can be opened by hand if power or the motor fails.',
        'Testing, handover training and a written explanation of every control.',
        'Optional battery backup, solar power, access control and remote control from a smartphone or smartwatch.',
      ]} />

      <H2>How we work</H2>
      <Steps items={['Free site visit and measurement', 'Product choice and written quote', 'Neat, safe installation', 'Testing and handover training', 'AMC and breakdown support']} />

      <H2>Repair, retrofit and AMC for automation gates</H2>
      <P>Gate not opening, remote not working, motor humming, or the gate stopping halfway? We repair <Link className="text-blue-600 underline" href="/services/automatic-gate-repair/">automation gates of any brand</Link>. If your gate is manual today, we can <Link className="text-blue-600 underline" href="/services/convert-manual-gate-to-automatic/">convert it to automatic</Link> without replacing it where the gate allows. To avoid breakdowns, ask about an <Link className="text-blue-600 underline" href="/services/amc/">annual maintenance contract</Link>, and see how <Link className="text-blue-600 underline" href="/services/smart-control/">smart control</Link> and <Link className="text-blue-600 underline" href="/services/access-control/">access control</Link> can be added.</P>

      <H2>Where we install automation gates in Hyderabad</H2>
      <P>We serve all of Hyderabad and Secunderabad, including Banjara Hills, Jubilee Hills, Gachibowli, Kondapur, Kukatpally, Kompally and the Financial District, and we travel across Telangana and Andhra Pradesh. A few localities:</P>
      <ul className="flex flex-wrap gap-2 mb-3">{areas.map(a => <li key={a.slug}><Link href={`/hyderabad/${a.slug}/`} className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm hover:text-blue-600">{a.name}</Link></li>)}</ul>
      <P>See the full list on our <Link className="text-blue-600 underline" href="/hyderabad/">Hyderabad areas page</Link>.</P>

      <H2>Why choose Zenitrix for automation gates</H2>
      <UL items={[
        '10+ years of hands-on experience in gate, door, barrier and shutter automation.',
        'GeM registered, CE certified and TUV certified products.',
        'Free site visit and a written quote after measurement, with no guesswork.',
        'Any-brand repair, so you are never stuck with an abandoned gate.',
        `Local team at ${SITE.address.street.split(',').slice(-1)[0].trim()}, ${SITE.address.city}, reachable on ${SITE.phone}.`,
      ]} />
      <P>Zenitrix Technologies is also known as Zenitrix Automations and is often searched for as Zentrix Automation. Whichever name you know us by, it is the same Hyderabad team.</P>

      <FaqBlock faqs={faqs} />
      <QuoteCta product="Automation gates" />
    </Page>
  )
}
