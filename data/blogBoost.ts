import type { Faq } from './faqs'

// Extra depth for guides that Google crawled but did not index (Oct 2026). Sections are APPENDED to the original post by data/blog.ts.
// General, practical explanations only: no prices, ratings, specs or certification claims.
export type Boost = { sections: { h: string; p: string[] }[]; faqs: Faq[]; links?: { name: string; href: string }[] }

export const blogBoost: Record<string, Boost> = {
  'monsoon-care-for-gates-doors-and-shutters': {
    sections: [
      { h: 'A simple pre-monsoon checklist', p: [
        'Do this in May or early June, before the first heavy rain. Open the control box and look for dust, insects, rust marks and loose terminals. Close it firmly and check that the rubber seal or gasket is still soft and sits flat.',
        'Run the gate or door through ten full open and close cycles. Listen for scraping, humming or a change in speed. A problem that is small and dry in May becomes a stuck gate in July.',
        'Test the manual release while the weather is still dry. Rust and swollen parts make a release lever stiff, and you do not want to learn that during a storm at night.',
      ] },
      { h: 'Why Hyderabad monsoons are hard on gates', p: [
        'Hyderabad gets short, heavy bursts of rain rather than slow drizzle. Water arrives fast, runs across driveways and collects at gate tracks, shutter guides and basement ramps. Low-lying colonies and ground-floor garages see this most.',
        'Humidity stays high for weeks. Unpainted mild steel, bare screws, rack teeth and hinge pins rust quickly in these conditions, and rust raises the load on the motor.',
        'Storms also bring voltage dips and power cuts. A gate that was working at 6 pm may lose power at 7 pm with the leaf half open, so the manual release and a backup plan matter more in the rainy months.',
      ] },
      { h: 'Sliding and swing gates', p: [
        'For sliding gates, sweep the track every week and remove stones, leaves and silt. Check that the wheels turn freely and the guide rollers sit snugly. If the gate runs on a floor track, make sure water can leave it. A track that holds water rusts the wheels and clogs with mud.',
        'For swing gates, look at the hinges and arm joints. A drop of suitable grease keeps them moving. Check that the pillar and the base plate of the operator are dry and free of cracks, because water inside a cracked pillar rusts the fixings from within.',
        'Rack and pinion, chain drives and arm pivots need a light protective coat. Do not spray oil on the motor, the limit switches or the electronics.',
      ] },
      { h: 'Automatic glass doors', p: [
        'Wet shoes and umbrellas bring water, grit and leaves into the track. Clean the floor track and the bottom guide often, and make sure the drain holes in the track are not blocked.',
        'Wipe the sensor lenses with a soft dry cloth. Fogged or dirty sensors may fail to detect people, or they may keep the door open.',
        'Keep mats at the entrance so that wet floors do not become a slip risk, and check that the door does not drag on the mat as it opens.',
      ] },
      { h: 'Rolling shutters and sectional doors', p: [
        'Check the guide channels at the sides of a rolling shutter. Mud, rust flakes and leaves cause the curtain to jam or tilt. Lubricate the guides and the shaft ends with the grease your installer recommends.',
        'Look at the bottom bar and the lock. Rust here is easy to spot and easy to treat early. For motorised shutters, test the manual chain or crank before you need it.',
        'On sectional doors, check the rubber seal at the bottom and the side seals. A worn seal lets rain into the garage and sends water toward the motor and the opener.',
      ] },
      { h: 'Electrical safety in wet weather', p: [
        'Never touch a wet control box, a wet cable joint or a wet remote receiver with the supply on. Switch off at the main switch first.',
        'Make sure the gate has proper earthing. A good earth protects people from shock if water reaches a cable and also protects the controller from surges during lightning.',
        'If a gate or door stays on a damp wall or an open pillar, ask your technician about a drip loop in the cables, sealed cable glands and a surge protector. These are small additions that protect the controller.',
      ] },
      { h: 'After heavy rain: what to do', p: [
        'If water has entered the control box, switch off the power, do not try the gate and call a technician. A controller that has dried out can look fine and fail days later.',
        'If an underground swing operator pit has filled with water, it needs pumping out and a check of the drain. Do not run the operator until it has been checked.',
        'Send a short video on WhatsApp to +91 85006 32002 showing what the gate or door is doing. It lets us tell you quickly whether it is safe to use and what the next step is.',
      ] },
    ],
    faqs: [
      { q: 'Can I keep using my automatic gate during heavy rain?', a: 'Yes, if the control box is sealed, the track is clear and the earthing is sound. If you see water in the control box, hear grinding or notice the gate hesitating, stop using it in automatic mode and use the manual release until it has been checked.' },
      { q: 'Is it safe to lubricate the gate motor myself?', a: 'Lubricate only the mechanical parts such as hinges, wheels, rack teeth and chain, with a grease that suits outdoor use. Keep oil and spray away from the motor windings, limit switches and electronics.' },
      { q: 'How often should gates be serviced in Hyderabad?', a: 'A check before the monsoon and another after it is a sensible minimum for most homes. Busy community and industrial entries are better served by an AMC with scheduled visits.' },
    ],
    links: [{ name: 'Gate repair and servicing', href: '/services/automatic-gate-repair/' }, { name: 'Power backup options', href: '/blog/power-backup-options-for-automatic-gates/' }],
  },

  'power-backup-options-for-automatic-gates': {
    sections: [
      { h: 'Why power backup matters for a gate', p: [
        'A gate that will not open is more than an inconvenience. At a home it can trap a car inside or outside. At a gated community it can block ambulances and delivery vehicles. At a factory it can stop trucks and shifts.',
        'In Hyderabad, short power cuts during storms and planned maintenance are common, so most properties should have some answer to the question: what happens to the gate when the supply goes?',
      ] },
      { h: 'Option 1: manual release', p: [
        'This is the minimum for every gate. A key or lever disconnects the motor so that the leaf can be pushed by hand. It costs nothing in power and works in any cut.',
        'Its limits are also clear. Heavy sliding leaves are hard to push by hand, and someone has to walk to the gate in the dark or in the rain. A manual release is a fallback and not a daily solution.',
      ] },
      { h: 'Option 2: battery backup inside the controller', p: [
        'Many controllers accept a sealed battery pack that keeps the controller and operator running for a limited number of cycles. When mains power returns, the controller recharges the battery.',
        'The number of cycles depends on gate weight, operator type, battery size and age. Ask your installer for the expected number of openings for your own gate, not a general figure. Batteries wear out and need replacement, so include them in your service plan.',
      ] },
      { h: 'Option 3: UPS or inverter', p: [
        'A UPS or inverter powers the controller and operator from a larger battery. It is useful when the gate shares a supply with other equipment such as boom barriers, RFID readers, intercoms and cameras.',
        'Check that the UPS is sized for the starting load of the motor, which is higher than its running load. A small UPS may run the controller but trip when the motor starts.',
      ] },
      { h: 'Option 4: solar charging', p: [
        'A solar panel can charge the battery for a low-duty operator, which helps at farmhouses, plots and remote compounds where mains supply is weak. It needs a panel that gets direct sun, a charge controller and a battery matched to your daily cycles.',
        'It suits light use. For a busy community gate with hundreds of cycles a day, a solar-only setup is rarely enough and is better as a top-up to mains and battery.',
      ] },
      { h: 'Option 5: generator or society backup', p: [
        'Gated communities and campuses with a generator can connect the gate and barrier circuit to the backed-up supply. The controller should see a stable supply when the generator takes over, so ask for a changeover that does not cause a surge.',
        'Do not forget the access system. If the gate has power but the RFID reader or intercom does not, vehicles still cannot enter smoothly.',
      ] },
      { h: 'How to choose', p: [
        'Start with how many openings you need during a typical cut and how long cuts usually last in your area. A villa with one car and short cuts needs less than a community with a hundred flats.',
        'Next, think about who uses the gate. If children, elderly people or staff need to get through, plan a reliable backup and make sure they know the release.',
        'Finally, decide who will look after the batteries. A backup that nobody tests is not a backup. An AMC visit that checks battery health twice a year is often the simplest way to keep it reliable.',
      ] },
      { h: 'Test it before you need it', p: [
        'Once a quarter, switch off the supply to the gate for a minute and open and close it. Count the cycles it manages. If the number has fallen, the battery is ageing.',
        'Keep a note of the release key location and make sure at least two people know how to use it.',
      ] },
    ],
    faqs: [
      { q: 'Will my automatic gate open during a power cut?', a: 'Only if it has backup or you use the manual release. Every gate should have a manual release. Battery backup, a UPS or a generator connection keep it working automatically for a limited time.' },
      { q: 'How many times can a gate open on battery?', a: 'It depends on the gate weight, the operator and the battery. Ask your installer for the figure for your own gate and test it yourself after installation.' },
      { q: 'Can I add battery backup to a gate I already have?', a: 'Often yes, if the controller accepts a battery or an external UPS. Share the make and model of your operator on WhatsApp so we can check.' },
    ],
    links: [{ name: 'Gate repair and servicing', href: '/services/automatic-gate-repair/' }, { name: 'Monsoon care for gates', href: '/blog/monsoon-care-for-gates-doors-and-shutters/' }],
  },

  'sliding-vs-swing-door-operators-explained': {
    sections: [
      { h: 'The short answer', p: [
        'Choose a sliding operator when you want a wide, quick, unobstructed opening for many people, such as a shop, hotel lobby or hospital. Choose a swing operator when the door is already hinged, the opening is narrow, or there is no room for a track and side leaf.',
        'The rest of this guide explains the trade-offs so you can decide with a clear picture.',
      ] },
      { h: 'Space: what each type needs', p: [
        'A sliding door needs a clear run beside the opening for the leaf to slide into, plus headroom for the operator housing. Nothing needs to be free in front of the door.',
        'A swing door needs a free arc in front of or behind the opening. In a narrow corridor or a busy lobby, that arc is often the deciding problem, because people stand in it.',
      ] },
      { h: 'Traffic and speed', p: [
        'Sliding doors move people both ways at once with little conflict, which is why they dominate shops, clinics, airports and malls.',
        'Swing doors work well for lower, one-way flows, accessible entries and doors that must keep a heavier or fire-rated leaf. They are slower to clear a crowd because the leaf blocks part of the opening while it moves.',
      ] },
      { h: 'Safety and sensors', p: [
        'Sliding doors close against a jamb or another leaf, and sensors watch the opening. Safety beams or presence sensors stop and reverse the door if someone is in the way.',
        'Swing doors add a swing-side hazard: a person standing in the arc can be struck. Good swing installations use sensors on both sides, controlled speed and a limited opening force.',
      ] },
      { h: 'Heating, cooling and air flow', p: [
        'Both types can help keep conditioned air inside because they close automatically. Sliding doors open a larger area quickly, while a swing door can be set to open only as far as needed.',
        'Double sliding doors with an airlock or vestibule suit places that need strong control of dust and air, such as clean areas and pharmacies.',
      ] },
      { h: 'Fire exits and emergencies', p: [
        'A door on an escape route must be able to open by hand, or to break out, if the power fails. Many sliding doors offer break-out panels. Swing doors usually open by hand naturally.',
        'Always check the rules that apply to your building with the fire consultant or the building owner before choosing.',
      ] },
      { h: 'Maintenance', p: [
        'Sliding doors need clean tracks, healthy rollers and sensors that stay aligned. Swing operators need checks on the arm, the hinges and the closing speed.',
        'In both cases a yearly service keeps the door reliable and is better than waiting for a failure at a busy hour.',
      ] },
      { h: 'A quick decision guide', p: [
        'Wide opening, high footfall, glass front: sliding. Existing hinged door, narrow opening, heavy or fire-rated leaf: swing. Clean room, pharmacy, hospital: sliding with airlock or special seals. Doubtful: send us a photo of the entrance on WhatsApp and we will suggest the better fit.',
      ] },
    ],
    faqs: [
      { q: 'Can I automate an existing hinged door?', a: 'Often yes. A swing operator can be fitted to many hinged doors if the frame is strong and the door swings freely. We check the door and frame on a site visit.' },
      { q: 'Which is better for a shop front?', a: 'Sliding doors are the usual choice for shopfronts because they handle two-way traffic and do not swing into the pavement or the shop floor.' },
      { q: 'Do automatic doors still work in a power cut?', a: 'Doors can be set to open, stay as they are, or lock on power failure, and a battery backup can be added. Escape-route doors must be able to open by hand or break out.' },
    ],
    links: [{ name: 'Automatic doors', href: '/products/automatic-doors/' }, { name: 'How glass door sensors work', href: '/blog/how-automatic-glass-door-sensors-work/' }],
  },

  'access-control-options-for-gates': {
    sections: [
      { h: 'Start with who and how many', p: [
        'The right access control depends on who needs to enter and how often. A family villa has a handful of users. A gated community has hundreds of residents, visitors, delivery riders and staff. A factory has shifts, trucks and contractors.',
        'Write down the user groups first. The choice of technology then becomes easier.',
      ] },
      { h: 'Remote controls', p: [
        'A remote is the simplest option. Each press opens or closes the gate. Remotes are cheap to replace and need no software.',
        'Their weakness is control. A lost remote works until the receiver is reprogrammed, and it is hard to know who used the gate and when. Rolling-code remotes reduce copying risk, so ask for them.',
      ] },
      { h: 'Keypads and intercoms', p: [
        'A keypad gives each user or group a code. It suits staff and regular visitors, and it needs no card. Change shared codes from time to time, and do not share a master code widely.',
        'A video intercom lets a resident see a visitor and open the gate from inside or by phone. It is the natural choice for villas and small apartment blocks.',
      ] },
      { h: 'Cards and key fobs', p: [
        'Proximity cards and fobs are easy for people to use and easy to cancel. They work well at pedestrian gates and office doors, where the person stops and presents the card.',
        'For vehicles, a card reader at car-window height is slow and awkward, which is why long-range readers are used for vehicle lanes.',
      ] },
      { h: 'UHF RFID for vehicles', p: [
        'A long-range UHF reader reads a tag on the windscreen or number plate from a few metres, so the barrier opens as the car approaches without stopping. Each tag can be added, blocked or timed from a central screen.',
        'It suits gated communities, campuses and parking, where many vehicles pass every hour. Reader placement and tag position decide read quality, so a site visit is important.',
      ] },
      { h: 'Number-plate recognition (ANPR)', p: [
        'Cameras read the number plate and match it with an approved list. No tag is needed, which helps with visitors and hired vehicles.',
        'It needs careful camera placement, light at night and clean plates. Many sites combine ANPR for visitors with RFID tags for residents and staff.',
      ] },
      { h: 'Phone apps and cloud control', p: [
        'App-based control lets users open a gate from their phone and lets managers share temporary access with visitors. It depends on the controller and a stable network connection, so keep a local fallback such as a remote or a keypad.',
      ] },
      { h: 'Mixing methods', p: [
        'Most good systems use more than one method. A community might give residents RFID tags, visitors a code or a guard-approved entry, and keep a manual override for emergencies.',
        'Whatever you choose, plan for what happens when the network, power or reader fails. The gate should always have a safe way to open and a clear log of what happened.',
      ] },
      { h: 'Privacy and records', p: [
        'Access logs and camera images are personal data. Decide who can see them, how long they are stored and how residents are told. A clear, fair policy avoids disputes later.',
      ] },
    ],
    faqs: [
      { q: 'Which access control is best for a gated community?', a: 'Most communities use UHF RFID tags for residents, a guard-approved or app-based entry for visitors, and a keypad or intercom at pedestrian gates. The mix depends on traffic and budget.' },
      { q: 'Can I add RFID to an existing boom barrier or gate?', a: 'Often yes, if the controller has an input for an external access device. Share the make and model so we can check compatibility.' },
      { q: 'What happens if the RFID reader or network fails?', a: 'A well-designed system has a fallback such as a remote, a keypad or a guard push button, and a manual release for the gate itself.' },
    ],
    links: [{ name: 'RFID access control', href: '/products/rfid-access-control/' }, { name: 'Boom barriers', href: '/products/boom-barriers/' }],
  },
}
