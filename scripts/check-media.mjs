// Checks that every product / category image and every video file + poster exists on Cloudinary (run: npm run check:media).
// Media no longer lives in /public, so this sends a HEAD request per file. Needs internet access.
import { readFileSync } from 'node:fs'
const CLOUD = 'nngw4oql'
const IMG = `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto/`
const VID = `https://res.cloudinary.com/${CLOUD}/video/upload/f_auto,q_auto/`
const must = []
const cat = readFileSync('data/catalog.ts', 'utf8')
const slugify = s => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
for (const m of cat.matchAll(/\['([^']+)', '[^']+'(?:, true)?\]/g)) must.push(IMG + `p-${slugify(m[1])}.webp`)
for (const m of cat.matchAll(/slug: '([a-z-]+)', name: '[^']+' \}/g)) if (!m[1].match(/^(automatic-gate|amc|convert|smart|access|safety|spare)/)) must.push(IMG + `${m[1]}.webp`)
for (const v of readFileSync('data/media.ts', 'utf8').matchAll(/slug: '([a-z-]+)', title/g)) {
  must.push(VID + `${v[1]}.mp4`, VID + `${v[1]}.webm`, IMG + `${v[1]}-poster.webp`)
}
for (const f of ['hero', 'hero-poster', 'service']) must.push(IMG + `${f}.webp`)
const missing = []
const queue = [...new Set(must)]
await Promise.all(Array.from({ length: 8 }, async () => {
  while (queue.length) {
    const u = queue.shift()
    try { const r = await fetch(u, { method: 'HEAD' }); if (!r.ok) missing.push(`${r.status} ${u}`) } catch (e) { missing.push(`ERR ${u}`) }
  }
}))
console.log(missing.length ? `Missing on Cloudinary:\n${missing.sort().join('\n')}` : `Media OK (${new Set(must).size} files checked on Cloudinary)`)
process.exit(missing.length ? 1 : 0)
