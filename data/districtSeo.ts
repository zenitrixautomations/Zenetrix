import type { Faq } from './faqs'

// District-specific copy for district pages (/telangana/<district>/). Added Oct 2026 for pages Google crawled but did not index.
// General, factual orientation only: well-known places and roads, no prices, ratings, response-time promises or invented projects.
export type DistrictLocal = {
  intro: string
  corridor: string            // how the district connects to Hyderabad
  places: string[]            // well-known places and roads used to orient the reader
  segments: { h: string; p: string }[]
  logistics: string[]         // how a project is planned and delivered from Hyderabad
  faqs: Faq[]
}

export const districtSeo: Record<string, DistrictLocal> = {
  sangareddy: {
    intro: 'Sangareddy is the district immediately west of Hyderabad. It combines fast-growing residential belts such as Ameenpur, Tellapur-side layouts and Beeramguda with the large Patancheru, Bollaram and Pashamylaram industrial areas, so demand ranges from villa gates to heavy factory shutters.',
    corridor: 'The district lies along the Hyderabad to Mumbai highway (NH 65) and the Outer Ring Road, which makes it one of the easiest districts for us to reach from our Banjara Hills office for site visits, installation and repair.',
    places: ['Patancheru', 'Beeramguda', 'Ameenpur', 'Bollaram', 'Pashamylaram', 'Ramachandrapuram', 'Isnapur', 'Zaheerabad', 'Sadasivapet', 'Kandi'],
    segments: [
      { h: 'Gated communities and villas', p: 'The Ameenpur, Beeramguda and Tellapur-side belts have many gated villa and apartment communities. Typical jobs are sliding and swing gates for villas, boom barriers with UHF RFID for community entries, and sectional garage doors.' },
      { h: 'Factories and industrial areas', p: 'Patancheru, Bollaram and Pashamylaram have factories, warehouses and workshops with truck traffic. Rolling shutters, high-speed doors, dock levellers and shelters, and heavy-duty sliding gates are the main products.' },
      { h: 'Institutions, farms and highway sites', p: 'Schools, colleges, hospitals, farmhouses and highway-side businesses along NH 65 use boom barriers, automatic doors and motorised gates, often with solar or battery backup where power is less reliable.' },
    ],
    logistics: ['We visit, measure and photograph the opening, then send a written quote that names the product, controller and safety devices.', 'For industrial sites we confirm duty cycle, truck sizes and loading-bay heights before recommending equipment.', 'After installation we test every safety device, train your team and can set up AMC with scheduled visits.'],
    faqs: [
      { q: 'Do you cover Patancheru, Bollaram and Pashamylaram industrial areas?', a: 'Yes. We supply and service rolling shutters, high-speed doors, dock equipment and heavy-duty gates for factories and warehouses in these industrial areas.' },
      { q: 'Can you visit gated communities in Ameenpur and Beeramguda?', a: 'Yes. We plan community projects with boom barriers, RFID, visitor entry and AMC after a free site visit, and we can provide the details your committee asks for.' },
      { q: 'Is Zaheerabad or Sadasivapet too far for installation?', a: 'No. We take projects across Sangareddy district. Send your location and photos on WhatsApp and we will plan the visit.' },
    ],
  },
  hanumakonda: {
    intro: 'Hanumakonda, with Hanamkonda, Kazipet and the Warangal urban belt, is one of the largest urban centres in Telangana outside Hyderabad. Homes, schools, hospitals, shops and workshops here look for dependable gate, shutter and door automation with service support nearby.',
    corridor: 'Hanumakonda is about 150 km north-east of Hyderabad on the Hyderabad to Warangal highway (NH 163). We plan visits and deliveries in batches, so nearby projects can share one trip.',
    places: ['Hanamkonda Chowrasta', 'Subedari', 'Hunter Road', 'Nakkalagutta', 'Kakaji Colony', 'Kazipet Junction', 'Kakatiya University', 'NIT Warangal', 'Thousand Pillar Temple'],
    segments: [
      { h: 'Homes and apartments', p: 'Residential colonies around Subedari, Hunter Road, Nakkalagutta and Kazipet have independent houses and apartment blocks. Sliding and swing gate automation, sectional garage doors and boom barriers for apartment entries are the usual jobs.' },
      { h: 'Shops, hospitals and showrooms', p: 'Main roads in Hanamkonda have showrooms, clinics, hospitals and shopping streets. Automatic sliding glass doors and motorised rolling shutters are the common requests, along with repair and AMC for busy entries.' },
      { h: 'Education and institutions', p: 'Colleges, schools and institutions near Kakatiya University and Kazipet use boom barriers, access control and automatic doors to manage vehicles and visitors.' },
    ],
    logistics: ['Because the district is about 150 km from our Hyderabad office, we confirm the site details first from photos and a short video, then fix a visit date that suits you.', 'We bring the right product and accessories after measurement, so installation is completed with fewer return trips.', 'Repair and AMC visits are scheduled in batches for the Warangal belt. Send a video of the fault on WhatsApp for first advice.'],
    faqs: [
      { q: 'Do you install automatic gates in Hanamkonda and Kazipet?', a: 'Yes. We supply and install sliding and swing gates, boom barriers, automatic doors and shutters in Hanamkonda, Kazipet and the Warangal urban belt.' },
      { q: 'How do you handle service for a site this far from Hyderabad?', a: 'We start with photos and a video on WhatsApp, plan the visit with the right parts and offer AMC with scheduled visits so small faults are caught early.' },
      { q: 'Can you repair gates installed by another vendor in Hanumakonda?', a: 'Yes. We repair motors, controllers, remotes, tracks and safety devices from any brand.' },
    ],
  },
}
