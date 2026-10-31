// import { MASTER_KEYWORDS } from '@/data/seoKeywords'

// // Meta keyword builder. Search engines mostly ignore the keywords tag, so these also feed
// // on-page headings and FAQ wording. Kept relevant and capped so they never look spammy.
// const PLACES = ['Hyderabad', 'Secunderabad', 'Banjara Hills', 'Jubilee Hills', 'Gachibowli', 'HITEC City', 'Kondapur', 'Madhapur', 'Kukatpally', 'Miyapur', 'Kompally', 'Uppal', 'Shamshabad', 'Telangana']
// const INTENT = ['supplier', 'dealers', 'manufacturers', 'installation', 'price', 'cost', 'repair', 'AMC', 'best company', 'near me', 'service', 'contractors', 'quotation', 'company']

// export function productKeywords(name: string, primary: string, extra: string[] = []): string[] {
//   const n = name.toLowerCase()
//   const list = [
//     primary, `${name} Hyderabad`, `best ${n} in Hyderabad`, `${n} Telangana`, `${n} Andhra Pradesh`, `${n} India`,
//     ...INTENT.map(i => `${n} ${i} Hyderabad`),
//     ...PLACES.slice(1, 13).map(pl => `${n} ${pl}`),
//     `${n} for apartments`, `${n} for factories`, `${n} for commercial buildings`,
//     'Zenitrix Technologies', 'Zenitrix automation Hyderabad',
//     ...extra,
//   ]
//   return Array.from(new Set(list.map(k => k.trim()).filter(Boolean))).slice(0, 55)
// }

// // ---- Site-wide keyword set (root layout) ----
// // Core offers x core places, plus long-tail buyer phrases and Telugu/Hindi search wording used in Hyderabad.
// const CORE = ['automatic gate', 'sliding gate automation', 'swing gate opener', 'boom barrier', 'automatic sliding door', 'automatic glass door', 'rolling shutter', 'sectional door', 'garage door', 'high speed door', 'dock leveller', 'RFID access control', 'UHF RFID parking system', 'flap barrier', 'speed gate', 'gate motor', 'gate repair', 'gate AMC', 'remote controlled gate', 'smart gate mobile app control']
// const CORE_PLACES = ['Hyderabad', 'Secunderabad', 'Telangana', 'Andhra Pradesh', 'Banjara Hills', 'Jubilee Hills', 'Gachibowli', 'HITEC City', 'Kondapur', 'Madhapur', 'Kukatpally', 'Kompally', 'Kokapet', 'Financial District', 'Tellapur', 'Narsingi', 'Shamshabad', 'Adibatla', 'Uppal', 'Miyapur']
// const LONG_TAIL = [
//   'automatic gate price in Hyderabad', 'sliding gate motor price Hyderabad', 'swing gate opener price Hyderabad', 'boom barrier price Hyderabad', 'automatic door price Hyderabad',
//   'how much does gate automation cost in Hyderabad', 'convert manual gate to automatic Hyderabad', 'automatic gate for villa Hyderabad', 'automatic gate for apartments Hyderabad',
//   'gate automation for gated community Hyderabad', 'factory gate automation Hyderabad', 'warehouse dock leveller Hyderabad', 'automatic gate repair near me', 'gate motor repair Hyderabad',
//   'gate automation companies in Hyderabad', 'best gate automation company Hyderabad', 'automatic gate dealers Hyderabad', 'automatic gate installation near me', 'gate operator spare parts Hyderabad',
//   'free site visit gate automation Hyderabad', 'any brand gate repair Hyderabad', 'annual maintenance contract gate Hyderabad', 'RFID vehicle sticker Hyderabad', 'apartment parking RFID Hyderabad',
//   'ఆటోమేటిక్ గేట్ హైదరాబాద్', 'గేట్ ఆటోమేషన్ హైదరాబాద్', 'ఆటోమేటిక్ డోర్ హైదరాబాద్', 'స్లైడింగ్ గేట్ హైదరాబాద్', 'ఆటోమేటిక్ గేట్ ధర', 'గేట్ రిపేర్ హైదరాబాద్',
//   'automatic gate Hyderabad Telugu', 'gate automation Telangana', 'Zenitrix Technologies', 'Zenitrix Automations', 'Zenitrix Automations Hyderabad', 'zenitrixautomations.com',
//   // Target phrases (with and without the city) and common brand spellings people type
//   'automation gates', 'automation gates Hyderabad', 'automation gates in Hyderabad', 'entrance automation gates', 'entrance automation gates Hyderabad', 'entrance automation gates in Hyderabad',
//   'entrance automation Hyderabad', 'entrance automation company Hyderabad', 'automation gates Telangana', 'automation gates near me', 'entrance automation gates near me',
//   'Zentrix automation', 'Zentrix automation Hyderabad', 'Zentrix automations', 'Zentrix Technologies', 'Zentrix gates Hyderabad', 'Zenitrix automation', 'Zenitrix automation gates', 'Zenitrix entrance automations',
// ]
// export function siteKeywords(): string[] {
//   const grid = CORE.flatMap(c => CORE_PLACES.map(p => `${c} ${p}`))
//   const all = [...MASTER_KEYWORDS, ...LONG_TAIL, ...grid]
//   const seen = new Set<string>()
//   return all.filter(k => { const l = k.toLowerCase(); if (seen.has(l)) return false; seen.add(l); return true })
// }

// // Page-level subset of the master list: keeps keywords containing ANY of the given terms (case-insensitive).
// // Next.js replaces (does not merge) the layout keywords when a page sets its own, so pages call this to keep the master terms.
// export function masterKeywordsFor(terms: string[], limit = 120): string[] {
//   const t = terms.map(x => x.toLowerCase())
//   return MASTER_KEYWORDS.filter(k => { const l = k.toLowerCase(); return t.some(x => l.includes(x)) }).slice(0, limit)
// }
import { MASTER_KEYWORDS } from '@/data/seoKeywords'

// Meta keyword builder. Search engines mostly ignore the keywords tag, so these also feed
// on-page headings and FAQ wording. Kept relevant and capped so they never look spammy.
const PLACES = ['Hyderabad', 'Secunderabad', 'Banjara Hills', 'Jubilee Hills', 'Gachibowli', 'HITEC City', 'Kondapur', 'Madhapur', 'Kukatpally', 'Miyapur', 'Kompally', 'Uppal', 'Shamshabad', 'Telangana']
const INTENT = ['supplier', 'dealers', 'manufacturers', 'installation', 'price', 'cost', 'repair', 'AMC', 'best company', 'near me', 'service', 'contractors', 'quotation', 'company']

export function productKeywords(name: string, primary: string, extra: string[] = []): string[] {
  const n = name.toLowerCase()
  const list = [
    primary, `${name} Hyderabad`, `best ${n} in Hyderabad`, `${n} Telangana`, `${n} Andhra Pradesh`, `${n} India`,
    ...INTENT.map(i => `${n} ${i} Hyderabad`),
    ...PLACES.slice(1, 13).map(pl => `${n} ${pl}`),
    `${n} for apartments`, `${n} for factories`, `${n} for commercial buildings`,
    'Zenitrix Technologies', 'Zenitrix automation Hyderabad',
    ...extra,
  ]
  return Array.from(new Set(list.map(k => k.trim()).filter(Boolean))).slice(0, 55)
}

// ---- Site-wide keyword set (root layout) ----
// Core offers x core places, plus long-tail buyer phrases and Telugu/Hindi search wording used in Hyderabad.
const CORE = ['automatic gate', 'sliding gate automation', 'swing gate opener', 'boom barrier', 'automatic sliding door', 'automatic glass door', 'rolling shutter', 'sectional door', 'garage door', 'high speed door', 'dock leveller', 'RFID access control', 'UHF RFID parking system', 'flap barrier', 'speed gate', 'gate motor', 'gate repair', 'gate AMC', 'remote controlled gate', 'smart gate mobile app control']
const CORE_PLACES = ['Hyderabad', 'Secunderabad', 'Telangana', 'Andhra Pradesh', 'Banjara Hills', 'Jubilee Hills', 'Gachibowli', 'HITEC City', 'Kondapur', 'Madhapur', 'Kukatpally', 'Kompally', 'Kokapet', 'Financial District', 'Tellapur', 'Narsingi', 'Shamshabad', 'Adibatla', 'Uppal', 'Miyapur']
const LONG_TAIL = [
  'automatic gate price in Hyderabad', 'sliding gate motor price Hyderabad', 'swing gate opener price Hyderabad', 'boom barrier price Hyderabad', 'automatic door price Hyderabad',
  'how much does gate automation cost in Hyderabad', 'convert manual gate to automatic Hyderabad', 'automatic gate for villa Hyderabad', 'automatic gate for apartments Hyderabad',
  'gate automation for gated community Hyderabad', 'factory gate automation Hyderabad', 'warehouse dock leveller Hyderabad', 'automatic gate repair near me', 'gate motor repair Hyderabad',
  'gate automation companies in Hyderabad', 'best gate automation company Hyderabad', 'automatic gate dealers Hyderabad', 'automatic gate installation near me', 'gate operator spare parts Hyderabad',
  'free site visit gate automation Hyderabad', 'any brand gate repair Hyderabad', 'annual maintenance contract gate Hyderabad', 'RFID vehicle sticker Hyderabad', 'apartment parking RFID Hyderabad',
  'ఆటోమేటిక్ గేట్ హైదరాబాద్', 'గేట్ ఆటోమేషన్ హైదరాబాద్', 'ఆటోమేటిక్ డోర్ హైదరాబాద్', 'స్లైడింగ్ గేట్ హైదరాబాద్', 'ఆటోమేటిక్ గేట్ ధర', 'గేట్ రిపేర్ హైదరాబాద్',
  'automatic gate Hyderabad Telugu', 'gate automation Telangana', 'Zenitrix Technologies', 'Zenitrix Automations', 'Zenitrix Automations Hyderabad', 'zenitrixautomations.com',
  // Target phrases (with and without the city) and common brand spellings people type
  'automation gates', 'automation gates Hyderabad', 'automation gates in Hyderabad', 'entrance automation gates', 'entrance automation gates Hyderabad', 'entrance automation gates in Hyderabad',
  'entrance automation Hyderabad', 'entrance automation company Hyderabad', 'automation gates Telangana', 'automation gates near me', 'entrance automation gates near me',
  'Zentrix automation', 'Zentrix automation Hyderabad', 'Zentrix automations', 'Zentrix Technologies', 'Zentrix gates Hyderabad', 'Zenitrix automation', 'Zenitrix automation gates', 'Zenitrix entrance automations',
]

// ---- Extra phrases, correct spelling. Each one is added WITHOUT and WITH "Hyderabad". ----
const EXTRA = [
  'automation gates', 'entrance automation', 'entrance automation gates', 'gate automation', 'automatic gates', 'automatic gate opener', 'automatic gate motor',
  'automatic gate installation', 'automatic gate repair', 'automatic gate company', 'automatic gate suppliers', 'automatic gate manufacturers',
  'sliding gate motor', 'sliding gate opener', 'sliding gate installation', 'swing gate motor', 'swing gate automation', 'telescopic gate automation', 'folding gate automation', 'cantilever gate automation',
  'remote control gate opener', 'wireless gate opener', 'smart gate opener', 'solar gate opener', 'gate safety sensors', 'gate intercom', 'gate access control',
  'automatic doors', 'automatic sliding doors', 'automatic glass doors', 'automatic door operator', 'automatic door repair', 'automatic door AMC', 'sensor doors',
  'boom barriers', 'automatic boom barrier', 'boom barrier installation', 'boom barrier AMC', 'parking barrier', 'parking management system', 'vehicle barrier',
  'rolling shutters', 'motorised rolling shutters', 'rolling shutter motor', 'rolling shutter repair', 'fire rated shutters', 'industrial rolling shutters',
  'sectional garage door', 'sectional overhead door', 'automatic garage door opener', 'high speed doors', 'dock leveller',
  'speed gates', 'flap barrier', 'tripod turnstile', 'full height turnstile', 'turnstile gates',
  'UHF RFID', 'UHF RFID reader', 'RFID vehicle access control', 'RFID boom barrier', 'ANPR camera', 'ANPR boom barrier', 'ANPR parking system',
  'villa gate automation', 'apartment gate automation', 'gated community entrance automation', 'factory entrance automation', 'warehouse entrance automation',
  'school entrance automation', 'hospital entrance automation', 'hotel entrance automation', 'office entrance automation', 'mall entrance automation',
  'gate repair', 'gate motor repair', 'gate remote programming', 'gate remote replacement', 'gate controller board repair', 'gate AMC', 'gate maintenance contract',
  'free site visit', 'free quotation automatic gate', 'smart gate mobile app', 'gate control by smartwatch', 'Alexa Google Assistant gate control',
]

// ---- Common misspellings people type. Also added WITHOUT and WITH "Hyderabad". ----
const TYPOS = [
  // automation gates / entrance automation
  'automaton gates', 'automation gate', 'automation gats', 'automasion gates', 'outomation gates', 'automtion gates', 'automation gaates', 'automation gatess',
  'enterance automation', 'entrence automation', 'entrance automaton', 'entrance automasion', 'entrance outomation', 'enterance automation gates', 'entrence automation gates', 'entrance automation gate', 'entrance automations',
  // automatic gate
  'automatic gat', 'automtic gate', 'outomatic gate', 'otomatic gate', 'automatik gate', 'auto gate', 'auto gates', 'autogate', 'automatic gate openar', 'gate opner', 'gate openar',
  'sliding gat', 'slideing gate', 'siliding gate', 'sliding gate moter', 'swing gat', 'swinging gate', 'swing gate moter',
  // barriers, shutters, doors
  'bom barrier', 'boombarrier', 'boom barier', 'boom bariar', 'boom berrier', 'boom barrior',
  'rolling shuter', 'rollingshutter', 'rolling shutar', 'shuter motor',
  'automatic dor', 'automatic doar', 'automatic glas door', 'sliding glass dor', 'autometic door', 'autometic gate',
  // repair, AMC
  'gate repar', 'gate reapir', 'gate maintanance', 'gate amc service', 'gate motor repar',
  // brand spellings
  'zenitrix', 'zenitrix automation', 'zenitrix automations', 'zenitrix technologies', 'zenitrix technology', 'zenitrixautomations',
  'zentrix', 'zentrix automation', 'zentrix automations', 'zentrix technologies',
  'zenetrix', 'zenithrix', 'zenitrics', 'zenitrex', 'zenithrex', 'zenitrik', 'zenitricks', 'zenytrix', 'zenitrix automatons', 'zenitrix automatic gates',
]

// ---- Common ways people misspell the city, combined with the main phrases ----
const CITY_TYPOS = ['Hyderbad', 'Hydrabad', 'Hydarabad', 'Hyderabaad', 'Haiderabad', 'Hyd']
const TYPO_CORE = ['automation gates', 'entrance automation', 'entrance automation gates', 'automatic gate', 'gate automation', 'boom barrier', 'automatic door', 'rolling shutter', 'gate repair', 'Zenitrix automations']

// ---- Telugu search wording ----
const TELUGU = [
  'ఆటోమేటిక్ గేట్', 'ఆటోమేషన్ గేట్స్', 'ఆటోమేషన్ గేట్స్ హైదరాబాద్', 'ఎంట్రన్స్ ఆటోమేషన్', 'ఎంట్రన్స్ ఆటోమేషన్ హైదరాబాద్',
  'ఎంట్రన్స్ ఆటోమేషన్ గేట్స్', 'ఎంట్రన్స్ ఆటోమేషన్ గేట్స్ హైదరాబాద్', 'ఆటోమేటిక్ డోర్', 'బూమ్ బారియర్ హైదరాబాద్', 'రోలింగ్ షట్టర్ హైదరాబాద్', 'గేట్ మోటార్ హైదరాబాద్',
]

// Case-insensitive de-duplication that keeps first spelling and order.
function dedupe(list: string[]): string[] {
  const seen = new Set<string>()
  return list.map(k => k.trim()).filter(k => { const l = k.toLowerCase(); if (!l || seen.has(l)) return false; seen.add(l); return true })
}

export function siteKeywords(): string[] {
  const grid = CORE.flatMap(c => CORE_PLACES.map(p => `${c} ${p}`))
  const withAndWithoutCity = (list: string[]) => list.flatMap(k => [k, `${k} Hyderabad`])
  const cityTypoGrid = TYPO_CORE.flatMap(c => CITY_TYPOS.map(t => `${c} ${t}`))
  return dedupe([...MASTER_KEYWORDS, ...LONG_TAIL, ...withAndWithoutCity(EXTRA), ...withAndWithoutCity(TYPOS), ...cityTypoGrid, ...TELUGU, ...grid])
}

// Home page set: the money phrases first (without and with the city), then everything in siteKeywords().
// Next.js replaces (does not merge) the layout keywords when a page sets its own, so the home page uses this.
export function homeKeywords(): string[] {
  const priority = [
    'automation gates', 'automation gates Hyderabad', 'entrance automation', 'entrance automation Hyderabad',
    'entrance automation gates', 'entrance automation gates Hyderabad', 'automatic gates', 'automatic gates Hyderabad',
    'gate automation', 'gate automation Hyderabad', 'Zenitrix Automations', 'Zenitrix Technologies', 'Zentrix automation',
  ]
  return dedupe([...priority, ...siteKeywords()])
}

// Page-level subset of the master list: keeps keywords containing ANY of the given terms (case-insensitive).
// Next.js replaces (does not merge) the layout keywords when a page sets its own, so pages call this to keep the master terms.
export function masterKeywordsFor(terms: string[], limit = 120): string[] {
  const t = terms.map(x => x.toLowerCase())
  return MASTER_KEYWORDS.filter(k => { const l = k.toLowerCase(); return t.some(x => l.includes(x)) }).slice(0, limit)
}