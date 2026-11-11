import { areas } from './areas'
import type { Faq } from './faqs'

// 10 top services (Section 11.1). `href` = the main page this local page links back to; `why` is general explanatory copy.
export const topServices = [
  { slug: 'sliding-gate-automation', name: 'Sliding Gate Automation', href: '/products/gate-automation/sliding-gate-automation/', for: ['residential','it'], why: 'Sliding gates suit wide entries and compounds where there is clear space beside the opening. They keep the driveway clear while moving and handle heavy leaves well.' },
  { slug: 'swing-gate-automation', name: 'Swing Gate Automation', href: '/products/gate-automation/swing-gate-automation/', for: ['residential'], why: 'Swing gates keep a traditional look and suit entries with room for the leaves to open. They are common on villa compounds.' },
  { slug: 'automatic-sliding-doors', name: 'Automatic Sliding Doors', href: '/products/automatic-doors/sliding-glass-doors/', for: ['it','residential'], why: 'Automatic sliding doors give touch-free, accessible entry for offices, clinics, showrooms and shopfronts.' },
  { slug: 'boom-barriers', name: 'Boom Barriers', href: '/products/boom-barriers/', for: ['it','industrial','residential'], why: 'Boom barriers manage vehicle flow at community gates, campuses and parking lanes, and work with RFID, ANPR or manual control.' },
  { slug: 'rolling-shutters', name: 'Rolling Shutters', href: '/products/rolling-shutters/', for: ['industrial'], why: 'Rolling shutters protect shopfronts, stores and industrial openings in a compact and economical form.' },
  { slug: 'sectional-doors', name: 'Sectional Doors', href: '/products/sectional-doors/', for: ['residential'], why: 'Sectional doors suit garages and larger openings that need quiet operation, insulation and a refined look.' },
  { slug: 'high-speed-doors', name: 'High-Speed Doors', href: '/products/high-speed-doors-dock/', for: ['industrial'], why: 'High-speed doors cut air and dust movement and speed up traffic between busy spaces.' },
  { slug: 'dock-levellers-shelters', name: 'Dock Levellers and Shelters', href: '/products/high-speed-doors-dock/dock-leveller/', for: ['industrial'], why: 'Dock levellers and shelters make loading safer and faster by bridging the truck bed to the floor and closing the gap around the truck.' },
  { slug: 'gate-door-repair', name: 'Gate and Door Repair', href: '/services/automatic-gate-repair/', for: ['residential','it','industrial'], why: 'Repairs cover motors, controllers, remotes, tracks, hinges and safety devices on systems from any brand.' },
  { slug: 'amc', name: 'AMC for Gates and Doors', href: '/services/amc/', for: ['residential','it','industrial'], why: 'An annual maintenance contract schedules regular checks so breakdowns stay rare and safety devices stay tested.' },
]

// Optional locality facts. When the client supplies a real project, landmark or road list for an area, add it here and it appears on
// that area's pages automatically. Nothing is invented. Example:
//   localFacts['banjara-hills'] = { project: 'Sliding gate for a villa on Road No. 12', projectSlug: 'villa-road-12', landmarks: ['...'], roads: ['...'],
//     travelTime: 'about 10 minutes from our office', buildingTypes: ['independent villas', 'gated apartments'], notes: '450+ words of local copy', faqs: [{ q: '...', a: '...' }] }
export type LocalFacts = {
  project?: string; projectSlug?: string; landmarks?: string[]; roads?: string[]; travelTime?: string
  buildingTypes?: string[]; notes?: string; faqs?: Faq[]
}
export const localFacts: Record<string, LocalFacts> = {
  saroornagar: {
    notes: 'Plots in Saroornagar are often narrow, so before suggesting a product we measure the opening, the side space and the road width in front of the gate. A narrow frontage may suit a folding, telescopic or compact sliding gate, while a plot with side space suits a standard sliding gate. Because lanes are tight, we also check that a swinging leaf or a delivery vehicle will not block the road.',
    faqs: [
      { q: 'My house in Saroornagar has a narrow gate. Can it still be automated?', a: 'Usually yes. Folding, telescopic and compact sliding gates are made for narrow frontages. We measure the opening and side space and then recommend the type that fits.' },
      { q: 'Do you service older gates in the Saroornagar and Dilsukhnagar belt?', a: 'Yes. We repair and retrofit gates from any brand, including older manual gates that need new wheels, tracks or hinges before an operator is fitted.' },
    ],
  },
  tarnaka: {
    notes: 'Tarnaka has many older houses and institutional buildings, so a large share of our work here is retrofit: adding an operator to an existing gate, motorising a rolling shutter on a shopfront, or fitting an automatic glass door to a clinic entrance. We inspect the existing structure first and tell you plainly if a repair is needed before automation.',
    faqs: [
      { q: 'Can a rolling shutter on a shop in Tarnaka be motorised?', a: 'Often yes. If the shutter is balanced and the guides are straight, a motor can be added. We check the springs, shaft and guides first.' },
      { q: 'Do you handle hostels and institutions near Osmania University?', a: 'We take projects for hostels, institutions and offices, including boom barriers, access control and automatic doors, after a free site visit.' },
    ],
  },
  malakpet: {
    notes: 'Malakpet has many trading shops, godowns and older buildings along busy, narrow roads. Heavy-duty rolling shutters, shutter motors, repair work and compact gates are the most common jobs. Because deliveries and market traffic are constant, we plan work around opening hours so your shop or godown is not closed longer than needed.',
    faqs: [
      { q: 'Can you repair a heavy rolling shutter in a Malakpet godown?', a: 'Yes. We repair springs, shafts, guides, locks and motors on shutters from any brand, and we can convert a manual shutter to motor operation if it is in good condition.' },
      { q: 'Do you install automatic glass doors for clinics and hospitals in Malakpet?', a: 'Yes. We supply and install automatic sliding glass doors with sensors and safety devices, and set up AMC so busy entrances stay reliable.' },
    ],
  },
  sainikpuri: {
    notes: 'Many plots in Sainikpuri have wide frontages and setbacks, which gives room for sliding and swing gates and for sectional garage doors. For apartment communities near ECIL and AS Rao Nagar, we plan boom barriers, RFID and visitor entry so that residents are not stuck in a queue at peak hours. We confirm any society approval requirements with your committee before the work starts.',
    faqs: [
      { q: 'Which gate type suits a wide plot in Sainikpuri?', a: 'Sliding gates suit plots with clear side space and keep the driveway free. Swing gates suit plots with room for the leaves to open and a more traditional look.' },
      { q: 'Do you work with apartment committees in Sainikpuri and AS Rao Nagar?', a: 'Yes. We can supply a written scope, product details and an AMC proposal in the format your committee needs.' },
    ],
  },
  bolarum: {
    notes: 'Many properties in Bolarum are older, so we begin with the existing gate, shutter or door: wheels, track, hinges, posts and wiring are checked before any operator is fitted, and we tell you plainly if a repair comes first. Streets near the bazaar and the cantonment side can be narrow, so we also check the road in front of the gate so that a swinging leaf or a delivery vehicle does not block it.',
    faqs: [
      { q: 'Can an old manual gate in Bolarum be automated?', a: 'Often yes. We check the gate weight, balance, hinges or track and the posts. A worn gate may need repair first, and then a sliding or swing operator can be fitted.' },
      { q: 'Do you repair gates and shutters near Bolarum Bazaar and Alwal?', a: 'Yes. We repair motors, controllers, remotes, springs, shafts and guides on systems from any brand, and can set up AMC afterwards.' },
    ],
  },
  neopolis: {
    notes: 'Neopolis towers usually need more than one lane: a resident entry, a visitor entry, a service or delivery entry and a basement exit. We design these as one system, with boom barriers, UHF RFID tags for residents, a visitor flow with guard approval or ANPR, and automatic doors for lobbies. Ask your association or builder for the access plan before choosing equipment, so the barriers fit the lane widths and the security cabin.',
    faqs: [
      { q: 'What access control suits a high-rise tower in Neopolis?', a: 'Most towers use UHF RFID tags for residents, guard-approved or app-based entry for visitors, and boom barriers or speed gates at basement and gate lanes. We match the mix to your traffic and layout.' },
      { q: 'Can you add AMC to a barrier system installed by the builder?', a: 'Yes. We service systems from any vendor and set up an AMC with scheduled visits, battery and sensor checks.' },
    ],
  },
}

// Oct 2026 (client decision): every Hyderabad locality gets a page for each of the 10 services (all indexable, all in the sitemap).
// Priority localities come first, then the rest in list order. RELEASE_BATCH is kept only so old env files do not break; it no longer hides pages.
export const RELEASE_BATCH = Number(process.env.NEXT_PUBLIC_RELEASE_BATCH || 99)
const ordered = [...areas.filter(a => a.priority), ...areas.filter(a => !a.priority)]
export const serviceAreaPages = ordered.flatMap(a => topServices.map(s => ({ area: a.slug, service: s.slug })))
  .map((x, i) => ({ ...x, batch: Math.floor(i / 100) + 1, indexable: true }))
export const getTopService = (slug: string) => topServices.find(s => s.slug === slug)
