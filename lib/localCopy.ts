// Copy generator for service-by-area pages (/hyderabad/<area>/<service>/) and district service pages.
// Pure functions: no imports from React or Next, so it can be unit-tested with plain node.
// Every sentence is general, factual copy. No prices, ratings, response-time promises or invented projects.
import { lc } from './text'

export type AreaKind = 'residential' | 'it' | 'industrial'
export type LocalSvc = { slug: string; name: string; why: string }
export type Ctx = {
  place: string                     // locality or district name
  slug: string                      // locality or district slug (seeds the variants)
  kind: AreaKind
  svc: LocalSvc
  dir?: string | null               // compass direction from the Banjara Hills office
  officeKm?: number | null          // straight-line km from the office
  closest?: { name: string; km: number }[]
  landmarks?: string[]
  roads?: string[]
  salt?: number                     // variant salt (data/localSalts.ts), bumped when two sibling pages came out too similar
  intro?: string                    // verified local intro, when available
  sites?: string[]
}

const hash = (s: string) => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) } return h >>> 0 }
export const pick = <T,>(arr: readonly T[], seed: string): T => arr[hash(seed) % arr.length]
export const typeCopy = { residential: 'villas and gated communities', it: 'IT campuses and offices', industrial: 'factories and warehouses' } as const
export const typeShort = { residential: 'homes and communities', it: 'campuses and offices', industrial: 'factories and warehouses' } as const
const typeWhy = {
  residential: ['Residential entries need a gate that is quiet, safe around children and pets, and easy for family and visitors to use. A community committee may need to approve the work.', 'At home the priorities are safety around children and pets, quiet running, and a gate that still opens by hand when the power is off. Societies often need committee approval first.', 'Families want a gate that opens from the car, closes behind them and stays safe for children and pets. If the plot is inside a society, committee approval is usually the first step.'],
  it: ['Campus and office entries need reliable throughput at peak hours, access control for staff and visitors, and maintenance that does not interrupt work.', 'Offices and campuses see a rush at shift change, so the equipment has to keep lanes moving, record who enters and be serviced without stopping work.', 'For business sites, uptime at peak hours matters most, followed by access control for staff and visitors and a service plan that avoids breakdowns in working hours.'],
  industrial: ['Industrial entries need heavy-duty equipment that handles truck traffic, dust and long working hours, with safety devices suited to forklifts and loading bays.', 'Factory and warehouse openings are used all day by trucks and forklifts, so duty cycle, dust protection and safety devices matter more than looks.', 'Industrial sites need equipment rated for constant use, with sensors and edges that protect people on foot and forklift traffic around the opening.'],
} as const

// Service-specific facts: what suits each type of site, what to check, and two questions people ask.
export const svcCopy: Record<string, { use: Record<AreaKind, string>; checks: string[]; faqs: { q: string; a: string }[] }> = {
  'sliding-gate-automation': {
    use: { residential: 'Villa and compound gates with side space suit a sliding operator, which keeps the driveway clear and works for heavy leaves.', it: 'Campus and office compounds with wide entries use sliding gates where a long, clear run beside the opening is available.', industrial: 'Factory and warehouse yards use heavy-duty sliding gates because the leaf never swings into truck or forklift paths.' },
    checks: ['Clear run beside the opening, at least the width of the gate leaf plus the operator', 'Ground level, track or cantilever option, and condition of the existing gate', 'Power point near the gate and a plan for power cuts', 'Safety sensors and an emergency manual release'],
    faqs: [{ q: 'Can an existing sliding gate in {place} be automated?', a: 'Usually yes. We check the leaf weight, wheels and track first. A worn gate may need repair before the operator is fitted.' }, { q: 'Will the sliding gate work during a power cut?', a: 'Operators have a manual release. A battery or UPS backup can be added so the gate keeps working for a while.' }],
  },
  'swing-gate-automation': {
    use: { residential: 'Swing gates keep a traditional look on villa compounds where there is room for the leaves to open inward or outward.', it: 'Swing gates suit smaller office and campus entries that have clearance for the leaves and a lower vehicle count.', industrial: 'Swing gates are used at smaller industrial entries where the leaves can open clear of the truck path.' },
    checks: ['Direction the leaves open and the clearance they need', 'Pillar strength and hinge condition', 'Choice of arm, underground or articulated operators', 'Safety sensors, limit settings and manual release'],
    faqs: [{ q: 'Which swing gate operator suits a home in {place}?', a: 'It depends on pillar space and gate weight. Articulated arms suit most pillars, and underground operators suit sites where nothing should show.' }, { q: 'Can both leaves of the gate be automated?', a: 'Yes. Double-leaf gates use two operators with one controller so both leaves move together.' }],
  },
  'automatic-sliding-doors': {
    use: { residential: 'Clinics, shops and apartment lobbies near homes use automatic sliding doors for touch-free, step-free entry.', it: 'Office lobbies, showrooms and hotels use automatic sliding glass doors for a clean, touch-free entrance.', industrial: 'Factory offices, reception areas and canteens use automatic sliding doors for easy, accessible entry.' },
    checks: ['Opening width and height, and the type of glass or frame', 'Sensor type: motion, presence or push-button', 'Fire-exit and break-out requirements', 'Power supply and a plan for power cuts'],
    faqs: [{ q: 'What kind of sensors do automatic sliding doors in {place} use?', a: 'Most use motion and presence sensors. Push-button or touch-free exit switches can be added where needed.' }, { q: 'Can the door stay open during a power cut?', a: 'Doors can be set to open or lock on power failure, and a battery backup can be added for lobbies that must stay usable.' }],
  },
  'boom-barriers': {
    use: { residential: 'Gated communities use boom barriers at entry and exit lanes to control vehicles without a long manual queue.', it: 'Campuses and business parks use boom barriers with UHF RFID or ANPR to keep lanes moving and record entries.', industrial: 'Factory and warehouse gates use boom barriers to control trucks and staff vehicles at weighbridge and gate lanes.' },
    checks: ['Lane width, which sets the boom length', 'Traffic volume at peak hours and the barrier speed needed', 'Access method: remote, RFID, ANPR or manual', 'Loops, sensors and safety devices for vehicles in the lane'],
    faqs: [{ q: 'Which boom barrier is right for a community in {place}?', a: 'Lane width and vehicle count decide it. Wide lanes need a longer boom, and busy gates need a faster operator.' }, { q: 'Can a boom barrier work with RFID tags?', a: 'Yes. Barriers connect to UHF RFID readers, ANPR cameras or a push-button so entries are controlled and recorded.' }],
  },
  'rolling-shutters': {
    use: { residential: 'Shops, garages and storerooms near homes use rolling shutters as a compact and economical way to secure an opening.', it: 'Showrooms, food courts and service areas use rolling shutters, often motorised so they open at one touch.', industrial: 'Factories, stores and loading openings use rolling shutters in GI or heavy-duty forms with motor operation.' },
    checks: ['Opening width and height, and headroom for the roller box', 'Material and thickness: GI, MS or aluminium', 'Manual, chain or motorised operation', 'Wind load, locking and fire-rating needs'],
    faqs: [{ q: 'Can a manual rolling shutter in {place} be converted to a motor?', a: 'Often yes, if the shutter is in good condition and balanced. We check the springs, guides and shaft first.' }, { q: 'How do I choose between GI and heavy-duty shutters?', a: 'GI suits shopfronts and light use. Heavy-duty and motorised shutters suit large openings and daily industrial use.' }],
  },
  'sectional-doors': {
    use: { residential: 'Villa garages use insulated sectional doors for quiet operation, a clean look and good weather sealing.', it: 'Offices, showrooms and service bays use sectional doors where appearance and insulation both matter.', industrial: 'Workshops and service bays use sectional doors that lift overhead and leave floor space free.' },
    checks: ['Opening size, headroom and side room for the tracks', 'Panel finish and insulation level', 'Spring and track type for the door weight', 'Opener choice, remotes and safety edges'],
    faqs: [{ q: 'How much headroom does a sectional door in {place} need?', a: 'It depends on the track type. We measure the garage during the site visit and choose the track that fits the space.' }, { q: 'Are sectional doors insulated?', a: 'Insulated panels are available. They reduce heat and noise, which helps in garages that are attached to the house.' }],
  },
  'high-speed-doors': {
    use: { residential: 'Residential complexes with service areas, basements or cold rooms sometimes use compact high-speed doors for busy openings.', it: 'Data halls, clean areas and busy service corridors use high-speed doors to cut air and dust movement.', industrial: 'Warehouses, cold stores and production lines use high-speed doors to cut air loss and speed up forklift traffic.' },
    checks: ['Opening size and traffic: forklifts, trucks or people', 'Door type: standard, freezer, clean room, spiral and others', 'Wind, temperature and hygiene conditions at the opening', 'Activation: radar, loop, pull-cord or remote'],
    faqs: [{ q: 'Which high-speed door suits a cold store in {place}?', a: 'Freezer and insulated high-speed doors suit cold rooms. We match the door type to the temperature and the traffic.' }, { q: 'How fast do high-speed doors open?', a: 'Speeds depend on the model and size. We confirm the speed of the model that suits your opening during the quote.' }],
  },
  'dock-levellers-shelters': {
    use: { residential: 'Large residential and retail complexes with loading bays use dock equipment so deliveries are safe and quick.', it: 'Business parks and data-centre loading bays use levellers and shelters to move goods safely from truck to floor.', industrial: 'Warehouses and factories use dock levellers and shelters to bridge the truck bed and seal the gap around the truck.' },
    checks: ['Dock height and the range of truck bed heights that visit', 'Leveller type and rated load for forklifts', 'Shelter or seal type for the truck sizes served', 'Pit or surface-mounted design and drainage'],
    faqs: [{ q: 'What load rating should a dock leveller in {place} have?', a: 'It depends on forklift weight plus the load. We size the rating with a margin during the site visit.' }, { q: 'Do dock shelters keep dust and rain out?', a: 'Yes. Shelters seal around the truck so dust, rain and cold air stay outside while the truck is being loaded.' }],
  },
  'gate-door-repair': {
    use: { residential: 'Home gates and garage doors need repair when motors hum without moving, remotes fail or tracks and hinges wear.', it: 'Office and campus gates, barriers and automatic doors need quick repair because a stuck entry affects the whole site.', industrial: 'Industrial gates, shutters and dock doors need repair when motors overheat, springs break or safety devices fail.' },
    checks: ['What the system does when it fails: sounds, lights, error codes', 'Age and make of the operator and controller', 'Whether remotes, sensors or limit switches are the cause', 'Photos or a short video of the fault, sent on WhatsApp'],
    faqs: [{ q: 'Do you repair gates in {place} that another company installed?', a: 'Yes. We repair motors, controllers, remotes, tracks, hinges and safety devices on systems from any brand.' }, { q: 'How should I describe the fault?', a: 'Send a short video on WhatsApp showing what the gate or door does, along with the brand if you know it.' }],
  },
  amc: {
    use: { residential: 'Gated communities and villas use an annual maintenance contract so gates and barriers are checked before they fail.', it: 'Campuses and offices use AMC so busy entries, barriers and automatic doors are serviced on a fixed schedule.', industrial: 'Factories and warehouses use AMC to keep shutters, dock equipment and gates safe and available through the year.' },
    checks: ['List of equipment to cover: gates, barriers, doors, shutters', 'Visit frequency and what each visit includes', 'Whether spares and labour for repairs are included', 'Safety device tests and a written service record'],
    faqs: [{ q: 'What does an AMC for gates in {place} include?', a: 'Scheduled visits to inspect, lubricate and test the system and its safety devices. The scope and exclusions are written in the contract.' }, { q: 'Can I add AMC to a gate someone else installed?', a: 'Yes. We inspect the system first and then propose a plan that covers it.' }],
  },
}

const nm = (c?: { name: string; km: number }[]) => (c ?? []).map(x => `${x.name} (about ${x.km} km)`).join(', ')

export function serviceCopy(c: Ctx) {
  const { place: P, kind, svc: S, slug } = c
  const sn = lc(S.name); const tc = typeCopy[kind]; const ts = typeShort[kind]
  const sc = svcCopy[S.slug]; const seed = `${slug}|${S.slug}|${c.salt ?? 0}`
  const where = c.dir && c.officeKm != null
    ? (c.dir === 'almost next to' ? `${P} is almost next to our Banjara Hills office` : `${P} lies about ${c.officeKm} km to the ${c.dir} of our Banjara Hills office in a straight line`)
    : `${P} is within the area we serve from our Banjara Hills office`
  const [n1, n2, n3] = (c.closest ?? []).map(x => x.name)
  const around = n1 && n2 ? pick([` Customers around ${n1} and ${n2} often ask about the same thing.`, ` Many of our enquiries come from ${n1}, ${n2} and nearby streets.`, ` Visits here are often combined with trips to ${n1} and ${n2}.`], seed + 'ar') : ''
  const near = c.closest && c.closest.length ? nm(c.closest.slice(0, 4)) : ''
  const far = c.closest && c.closest.length > 4 ? nm(c.closest.slice(4, 10)) : ''
  const intro = [
    `Looking for ${sn} in ${P}? Zenitrix serves ${tc} in ${P} with supply, installation, repair and AMC. ${where}.${n3 ? ` The neighbouring localities of ${n1} and ${n3} are on the same route.` : ''}`,
    `Zenitrix installs and services ${sn} for ${tc} in ${P}, Hyderabad. ${where}, so site visits there are easy for our team to plan.${n2 ? ` ${n1} and ${n2} are close by.` : ''}`,
    `${S.name} for ${ts} in ${P} is a regular part of our work. ${where}, and the team visits the site before any quote is sent.`,
    `If you own or manage ${tc} in ${P}, Zenitrix can supply and fit ${sn}. ${where}.`,
    `Need ${sn} in ${P}? We handle the survey, the equipment, the fitting and the after-sales care ourselves. ${where}.`,
    `${P} is one of the Hyderabad localities where Zenitrix fits and services ${sn}. ${where}.`,
  ]
  const typeLead = [`What suits ${ts} in ${P}`, `${P} ${ts}: what to expect`, `Fitting ${sn} for ${ts} in ${P}`]
  const ask = `Send your exact location on WhatsApp and we will confirm a visit slot.`
  const locIntro = c.intro ? `${c.intro} ` : ''
  const lm = c.landmarks?.length ? ` We plan visits around ${c.landmarks.join(', ')}${c.roads?.length ? ` and along ${c.roads.join(', ')}` : ''}.` : ''
  const nearP = near ? pick([
    `Localities close to ${P} that we also serve include ${near}.`,
    `If you are near ${P}, the closest places on our coverage list are ${near}.`,
    `Our visits in this part of Hyderabad also cover ${near}.`,
  ], seed + 'n') : ''
  const farP = far ? pick([
    `Further out, within a short drive, are ${far}.`,
    `Other localities around ${P} where our team also works: ${far}.`,
    `A little farther from ${P} we also cover ${far}.`,
  ], seed + 'fr') : ''
  const skip = hash(seed + 'ck') % 4
  const checks = sc.checks.filter((_, i) => i !== skip)
  const svcFaqs = [sc.faqs[hash(seed + 'sf') % sc.faqs.length]]
  const proc = [
    ['Site visit and survey', [`We visit the ${P} site, measure the opening, and check power, ground level, access and safety risks before recommending ${sn}.`, `A technician comes to ${P}, measures the entry, checks the power supply and the surroundings, and notes what ${sn} will need.`, `The survey in ${P}${n1 ? `, close to ${n1},` : ''} covers the opening size, the structure around it, the power point and how vehicles or people use the entry.`]],
    ['Selection and quote', [`We match the operator, controller and safety devices to your use and send a written quote for ${sn}.`, `You get a written quote that lists the equipment chosen for your ${kind === 'industrial' ? 'duty cycle' : kind === 'it' ? 'traffic and access needs' : 'gate and family needs'}.`, `We recommend the equipment that fits the survey, explain the options in plain words and put the quote in writing.`]],
    ['Installation and testing', [`Trained technicians fit the equipment, set limits and safety devices, and test every control before leaving.`, `The team installs, aligns and tests the system, including sensors, limits and the manual release.`, `Fitting is followed by a full test of remotes, sensors, limits and emergency release.`]],
    ['Handover and support', [`We show you how to use remotes, the manual release and basic care, and explain how AMC support works.`, `At handover we explain daily use, what to check monthly and how to reach us for repair or AMC.`, `You receive a short walkthrough of the controls and simple care steps, with repair and AMC support available afterwards.`]],
  ].map(([h, v], i) => [h as string, pick(v as string[], seed + 'p' + i)] as const)
  const faqs = [
    { q: `Do you provide ${sn} in ${P}?`, a: pick([`Yes. Zenitrix serves ${P}${n1 ? ` and nearby ${n1}` : ''} from its Banjara Hills office and handles supply, installation, repair and AMC.`, `Yes, we take ${sn} projects in ${P}. Call or WhatsApp ${'+91 85006 32002'} with your location and requirement.`, `Yes. ${P} is part of our Hyderabad coverage, and a technician visits the site before the quote.`], seed + 'f0') },
    { q: pick([`What do ${tc} in ${P} need to check before installation?`, `What should I confirm before fitting ${sn} in ${P}?`, `Is any approval needed for ${sn} in ${P}?`], seed + 'f1'), a: pick([kind === 'residential' ? 'Check whether your society or committee needs to approve the work, and confirm power-backup arrangements. We can supply the technical details they ask for.' : 'Confirm who approves the work at the site, the power supply and any safety rules for the entry. We can supply technical details on request.', kind === 'residential' ? 'Gated communities often need committee approval. Confirm that first, along with the power supply and a backup plan.' : 'Check site rules for the entry, the power supply and who signs off. We can share specifications for approvals.'], seed + 'f1a') },
    ...svcFaqs.map(f => ({ q: f.q.replace(/\{place\}/g, P), a: f.a })),
    { q: `How do I book a site visit in ${P}?`, a: pick(['Call or WhatsApp +91 85006 32002, or use the form on this page.', 'Send your location and a photo of the opening on WhatsApp at +91 85006 32002 and we will confirm a slot.', 'Call +91 85006 32002 or fill in the form below and we will arrange the visit.'], seed + 'f4') },
  ]
  return {
    intro: pick(intro, seed + 'i'),
    whyH: `Why ${P} ${ts} choose ${sn}`,
    why: [sc.use[kind], pick(typeWhy[kind], seed + 'w')],
    whereH: pick(typeLead, seed + 'h'),
    whereP: `${locIntro}${where}. ${nearP} ${farP}${around}${lm} ${ask}`,
    checksH: pick([`Checks before installing ${sn} in ${P}`, `What we check for ${sn} in ${P}`, `Before you order ${sn} in ${P}`], seed + 'c'),
    checks,
    procH: pick([`Our process for ${P} ${ts}`, `How a ${sn} project in ${P} runs`, `From survey to handover in ${P}`], seed + 'ph'),
    proc,
    faqs,
  }
}

// Copy for district pages (/telangana/<district>/<service>/ and /andhra-pradesh/<district>/<service>/).
export function districtServiceCopy(o: { district: string; state: string; slug: string; towns: string[]; pins: number; svc: LocalSvc; others: string[]; salt?: number }) {
  const { district: D, state: ST, svc: S, towns } = o
  const sn = lc(S.name); const seed = `${o.slug}|${S.slug}|${o.salt ?? 0}`; const sc = svcCopy[S.slug]
  const t = towns.length ? towns.join(', ') : D
  const t1 = towns[0] ?? D
  const oth = o.others.join(', ')
  const skip = hash(seed + 'ck') % 4
  return {
    intro: pick([
      `Zenitrix supplies and installs ${sn} in ${D}, ${ST}, working from its Hyderabad office. Towns covered include ${t}.`,
      `${S.name} in ${D}: our team travels from Hyderabad to survey, supply, fit and service. We cover ${t} and nearby towns in ${ST}.`,
      `Need ${sn} in ${D}? Zenitrix takes projects across ${D} district in ${ST}, including ${t}.`,
      `Customers in ${t1} and the rest of ${D} district can order ${sn} from Zenitrix, with survey, supply, fitting and AMC handled by one team.`,
      `From Hyderabad, Zenitrix reaches ${D} in ${ST} for ${sn} projects. The towns we plan visits around include ${t}.`,
    ], seed + 'i'),
    whyH: pick([`Where ${sn} is used in ${D}`, `${S.name} for homes, offices and industry in ${D}`, `What ${D} customers use ${sn} for`], seed + 'wh'),
    why: [sc.use.residential, sc.use.it, sc.use.industrial],
    whereH: pick([`How we work across ${D}`, `Visits and coverage in ${D}`, `Coverage in ${D} district`], seed + 'wc'),
    where: pick([
      `${D} district has about ${o.pins} postal PIN codes, and we take projects in all of them. Send the town or village name and a pin on WhatsApp so we can plan the visit.`,
      `We cover ${D} district, which has ${o.pins} postal PIN codes. Share your location on WhatsApp and we will fit the survey into our travel plan for ${ST}.`,
      `Our team plans trips to ${D} around bookings, so projects in ${t1} and nearby towns are grouped where possible. The district has ${o.pins} PIN codes and we serve all of them.`,
    ], seed + 'w') + (oth ? pick([` We also serve ${oth}.`, ` Nearby districts we cover in ${ST} include ${oth}.`, ` Other ${ST} districts on our list: ${oth}.`], seed + 'o') : ''),
    procH: pick([`How a ${sn} project in ${D} runs`, `From enquiry to handover in ${D}`, `Our steps for ${D} projects`], seed + 'ph'),
    proc: [
      ['Share the details', [`Send the location in ${D}, the opening size and a photo on WhatsApp. We reply with the questions we need answered for the survey.`, `Message us the town, a photo of the entrance and the width of the opening. We confirm what else is needed before travelling to ${D}.`, `Start with a call or WhatsApp message from ${t1} or anywhere in ${D}. We note the site, the use and the opening size.`]],
      ['Survey and written quote', [`A technician visits, measures the site, checks power and access, and we send a written quote for ${sn}.`, `We survey the site on a planned trip to ${D}, then put the equipment and the scope in a written quote.`, `After the visit you receive a written quote that names the equipment, the safety devices and what is included.`]],
      ['Installation and support', [`Our team fits and tests the equipment, shows you how to use it, and stays available for repair and AMC.`, `Installation is followed by a full test and a short walkthrough. Repair calls and AMC visits are arranged from Hyderabad.`, `We install, test and hand over, then support the system with repair visits and an AMC plan if you want one.`]],
    ].map(([h, v], i) => [h as string, pick(v as string[], seed + 'p' + i)] as const),
    checksH: pick([`What to check before ordering ${sn} in ${D}`, `Checks for ${sn} in ${D}`, `Before you order ${sn} in ${D}`], seed + 'ch'),
    checks: sc.checks.filter((_, i) => i !== skip),
    faqs: [
      { q: `Do you install ${sn} in ${D}?`, a: pick([`Yes. Zenitrix works from Hyderabad and takes ${sn} projects in ${D}, ${ST}. Call or WhatsApp +91 85006 32002 with your location and requirement.`, `Yes, we take ${sn} projects in ${D}${t1 !== D ? `, including ${t1}` : ''}. Message us on WhatsApp at +91 85006 32002 with the location and a photo of the site.`], seed + 'q0') },
      { ...(sc.faqs[hash(seed + 'sf') % sc.faqs.length]), q: sc.faqs[hash(seed + 'sf') % sc.faqs.length].q.replace(/\{place\}/g, D) },
      { q: `What should I send for a quote in ${D}?`, a: pick(['The opening width, a photo of the gate, door or entrance, and your location. That is usually enough for a first estimate before a site visit.', 'A photo of the entrance, the width and height of the opening, and the town name. We use these for a first estimate and confirm everything at the survey.'], seed + 'q2') },
    ],
  }
}
