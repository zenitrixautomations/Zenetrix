import Link from 'next/link'
import { Page, H2, P, UL, Steps, FaqBlock, CardGrid, QuoteCta, DataTable } from '@/components/layout/Page'
import { meta } from '@/lib/seo'
import { serviceSchema } from '@/lib/schema'
import { categoryImage } from '@/lib/images'
import { industries } from '@/data/catalog'
import type { Faq } from '@/data/faqs'

const PATH = '/entrance-automation-gates-hyderabad/'
const KEYWORDS = ['entrance automation gates Hyderabad', 'entrance automation gates in Hyderabad', 'entrance automation gates', 'entrance automation Hyderabad', 'entrance automation company Hyderabad', 'entrance automation gates near me', 'automatic entrance systems Hyderabad', 'automation gates Hyderabad', 'Zenitrix entrance automations', 'Zentrix automation Hyderabad']

export const metadata = meta({
  title: 'Entrance Automation Gates Hyderabad',
  description: 'Entrance automation gates in Hyderabad: gates, boom barriers, doors, RFID access and safety planned as one system. Install, repair, AMC. Free site visit.',
  path: PATH,
  keywords: KEYWORDS,
})

const faqs: Faq[] = [
  { q: 'What is entrance automation?', a: 'Entrance automation means the gate, barrier, door, access control and safety devices at an entry point are planned to work together. A car or visitor arrives, the system checks who they are, the gate or door opens, and safety sensors keep people and vehicles protected.' },
  { q: 'How are entrance automation gates different from a normal gate opener?', a: 'A gate opener only moves one gate. Entrance automation gates are designed with the whole entrance in mind: vehicle lane, pedestrian door, RFID or keypad access, intercom, safety sensors and backup power, so every part works as one system.' },
  { q: 'Which sites in Hyderabad need entrance automation?', a: 'Gated communities and apartments, IT parks, hospitals, hotels, malls, schools, factories, warehouses, cold storage, parking areas, showrooms and villas all use it. The mix of products depends on traffic, security needs and space.' },
  { q: 'Can you add access control to an existing automatic gate?', a: 'Usually yes. We can connect RFID readers, keypads, intercom, ANPR or a mobile app to many existing controllers. We inspect the controller first and tell you what is possible.' },
  { q: 'Do you provide a single contract for gate, barrier, door and access control?', a: 'Yes. One team does the site visit, supply, installation, testing and AMC for the whole entrance, so there is a single point of contact if something needs attention.' },
  { q: 'Do you work outside Hyderabad?', a: 'Yes. We serve Hyderabad and Secunderabad, and take up projects across Telangana and Andhra Pradesh. Contact us with your location and we will arrange a site visit.' },
  { q: 'Is Zenitrix the same as Zentrix Automation?', a: 'Yes. Zenitrix Technologies, also called Zenitrix Automations or Zenitrix Entrance Automations, is the company some customers search for as Zentrix Automation.' },
]

const pick = ['apartments-and-gated-communities', 'villas', 'it-parks', 'factories', 'hospitals', 'warehouses']

export default function Pg() {
  const inds = pick.map(s => industries.find(i => i.slug === s)).filter((x): x is { name: string; slug: string } => Boolean(x))
  return (
    <Page
      crumbs={[{ name: 'Entrance Automation Gates in Hyderabad', path: PATH }]}
      hero={{ eyebrow: 'Entrance automation', title: 'Entrance Automation Gates in Hyderabad', intro: 'Gates, boom barriers, doors, RFID access and safety devices planned as one entrance system for homes, communities, offices and industry.', image: '/images/g-gate-day.webp' }}
      schema={serviceSchema('Entrance automation gates in Hyderabad', PATH, undefined, { description: 'Supply, installation, repair and AMC of entrance automation gates, barriers, doors and access control in Hyderabad.', keywords: KEYWORDS })}>
      <P>Entrance automation gates are more than a motor on a gate. A good entrance decides who may come in, opens for them smoothly, protects people and vehicles, and keeps working on a bad day. Zenitrix Technologies, a Banjara Hills company with 10+ years of experience, plans and installs entrance automation across Hyderabad, Telangana and Andhra Pradesh.</P>
      <P>If you only need the gate itself, start with our page on <Link className="text-blue-600 underline" href="/automation-gates-hyderabad/">automation gates in Hyderabad</Link>.</P>

      <H2>What an automated entrance can include</H2>
      <CardGrid cols={3} items={[
        { name: 'Gate automation', href: '/products/gate-automation/', image: categoryImage('gate-automation'), note: 'Sliding, swing, folding and telescopic gates.' },
        { name: 'Boom and flap barriers', href: '/products/boom-barriers/', image: categoryImage('boom-barriers'), note: 'Vehicle lanes, pedestrian flap barriers and speed gates.' },
        { name: 'Automatic doors', href: '/products/automatic-doors/', image: categoryImage('automatic-doors'), note: 'Sliding, swing and glass entrance doors.' },
        { name: 'UHF RFID access control', href: '/products/rfid-access-control/', image: categoryImage('rfid-access-control'), note: 'Long-range tags for resident and staff vehicles.' },
        { name: 'High-speed doors and docks', href: '/products/high-speed-doors-dock/', image: categoryImage('high-speed-doors-dock'), note: 'For factories, warehouses and cold storage.' },
        { name: 'Rolling shutters', href: '/products/rolling-shutters/', image: categoryImage('rolling-shutters'), note: 'Motorised shutters for shops and stores.' },
      ]} />

      <H2>How an entrance system works</H2>
      <Steps items={['Vehicle or visitor arrives', 'Reader, keypad, app or guard verifies', 'Gate, barrier or door opens', 'Sensors watch the opening', 'System closes and logs the entry']} />
      <P>Each step can be simple or advanced. A villa may use only a remote and a keypad. A gated community can add UHF RFID for residents, a guard console for visitors and a barrier lane for each direction. A factory can combine a sliding gate, a boom barrier and a high-speed door at the dock.</P>

      <H2>Choosing the right entrance setup</H2>
      <DataTable caption="Entrance automation by site type" head={['Site', 'Typical setup', 'Why']} rows={[
        ['Villa', 'Sliding or swing gate, remote, keypad or app, safety sensors', 'Simple, convenient and secure'],
        ['Apartments and gated communities', 'Boom barrier lanes, UHF RFID for residents, guard visitor control, pedestrian gate', 'Keeps traffic moving without stopping every resident'],
        ['Offices and IT parks', 'Boom barrier, flap barriers or speed gates, RFID cards, glass entrance doors', 'Controls access at both the vehicle and lobby entrances'],
        ['Hospitals and hotels', 'Automatic sliding or hermetic doors, barriers, access control', 'Hands-free entry for visitors and trolleys'],
        ['Factories and warehouses', 'Heavy sliding gate, boom barrier, high-speed or sectional doors, dock equipment', 'Handles heavy traffic and weather'],
      ]} />

      <H2>Entrance automation for your type of site</H2>
      <ul className="flex flex-wrap gap-2 mb-3">{inds.map(i => <li key={i.slug}><Link href={`/industries/${i.slug}/`} className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm hover:text-blue-600">{i.name}</Link></li>)}</ul>
      <P>See every site type we serve on our <Link className="text-blue-600 underline" href="/services/">services page</Link>, or use the <Link className="text-blue-600 underline" href="/which-automation/">Which automation do I need?</Link> guide for a quick starting point.</P>

      <H2>Safety, backup and support</H2>
      <UL items={[
        'Photocells, safety edges and loops so gates and barriers never close on a person or vehicle.',
        'Battery backup, manual release and optional solar power for outages.',
        'Mobile app, smartwatch and remote control options where the controller supports them.',
        'Repair of any brand, and yearly maintenance under an AMC plan.',
        'GeM registered, CE certified and TUV certified products. Ask us for certificate copies.',
      ]} />
      <P>Read about our <Link className="text-blue-600 underline" href="/services/safety-devices/">safety devices</Link>, <Link className="text-blue-600 underline" href="/services/access-control/">access control</Link> and <Link className="text-blue-600 underline" href="/services/amc/">AMC plans</Link>.</P>

      <H2>Serving Hyderabad, Telangana and Andhra Pradesh</H2>
      <P>Our office is in Banjara Hills, and we install across Hyderabad and Secunderabad, from Gachibowli, Kondapur and the Financial District to Kompally, Kukatpally and Shamshabad. Browse our <Link className="text-blue-600 underline" href="/hyderabad/">Hyderabad areas</Link>, <Link className="text-blue-600 underline" href="/telangana/">Telangana districts</Link> and <Link className="text-blue-600 underline" href="/andhra-pradesh/">Andhra Pradesh districts</Link>.</P>
      <P>Zenitrix Technologies is also known as Zenitrix Automations and is often searched for as Zentrix Automation. It is one and the same company.</P>

      <FaqBlock faqs={faqs} />
      <QuoteCta product="Entrance automation" />
    </Page>
  )
}
