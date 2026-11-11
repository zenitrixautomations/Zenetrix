// Anti-doorway gate (Blueprint 11.2): indexable service-by-area pages must be <60% similar to a sibling of the same service.
// Covers /hyderabad/<area>/<service>/ and the district pages /telangana|andhra-pradesh/<district>/<service>/.
// If it fails, run:  node scripts/gen-salts.mjs  (re-mixes the phrasing) and rebuild. Run after build: npm run check:similarity
import { pages, text, isNoindex } from './_html.mjs'
const shingles = s => { const w = s.toLowerCase().split(/\W+/).filter(Boolean); const out = new Set(); for (let i = 0; i + 3 <= w.length; i++) out.add(w.slice(i, i + 3).join(' ')); return out }
const jac = (a, b) => { let n = 0; for (const x of a) if (b.has(x)) n++; return n / (a.size + b.size - n || 1) }
const re = /^\/(hyderabad|telangana|andhra-pradesh)\/[^/]+\/([^/]+)\/$/
const sa = pages().filter(p => re.test(p.route)).map(p => {
  const main = (p.html.match(/<main[\s\S]*<\/main>/) || [p.html])[0]; const m = p.route.match(re)
  return { route: p.route, group: `${m[1]}|${m[2]}`, hyd: m[1] === 'hyderabad', noindex: isNoindex(p.html), words: text(main).split(/\s+/).length, sh: shingles(text(main)) }
})
let fail = 0, warn = 0; const groups = {}
const MIN_HYD = 450, MIN_DIST = 350 // Hyderabad locality pages are fuller than district pages
for (const p of sa) { if (!p.noindex && p.words < (p.hyd ? MIN_HYD : MIN_DIST)) { fail++; console.log(`FAIL ${p.route}: only ${p.words} words (minimum ${p.hyd ? MIN_HYD : MIN_DIST})`) } (groups[p.group] ??= []).push(p) }
for (const list of Object.values(groups)) for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) {
  const s = jac(list[i].sh, list[j].sh)
  if (s > 0.6) { if (!list[i].noindex && !list[j].noindex) { fail++; console.log(`FAIL ${(s * 100) | 0}%  ${list[i].route}  <->  ${list[j].route}`) } else warn++ }
}
console.log(`Checked ${sa.length} service-by-area pages (${sa.filter(p => !p.noindex).length} indexable). Fail: ${fail}. Similar but noindex: ${warn} pairs.`)
process.exit(fail ? 1 : 0)
