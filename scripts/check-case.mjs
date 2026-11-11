// Case-sensitive public/ file check (Linux hosts such as Vercel are case-sensitive; Windows/macOS are not).
// Compares every /images, /videos, /fonts path written in the code with MEDIA-MANIFEST.txt and, when public/ exists, with the real files.
// Run: npm run check:case
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join } from 'node:path'
const walk = d => readdirSync(d).flatMap(f => { const p = join(d, f); if (/node_modules|\.next|\.git/.test(p)) return []; return statSync(p).isDirectory() ? walk(p) : [p] })
const refs = new Set()
for (const f of ['app', 'components', 'lib', 'data'].filter(existsSync).flatMap(walk).filter(f => /\.(tsx?|json|css)$/.test(f)))
  for (const m of readFileSync(f, 'utf8').matchAll(/\/(?:images|videos|fonts)\/[A-Za-z0-9_\-./]+\.(?:webp|png|jpe?g|svg|mp4|webm|woff2|avif|gif)/g)) refs.add(m[0])
// After a build, also read the generated HTML so names assembled in code (p-<slug>.webp, svc-<slug>.webp, video posters, srcset) are checked too.
const built = existsSync('.next/server/app') ? walk('.next/server/app').filter(p => p.endsWith('.html')) : []
for (const f of built) for (const m of readFileSync(f, 'utf8').matchAll(/\/(?:images|videos|fonts)\/[A-Za-z0-9_\-./]+\.(?:webp|png|jpe?g|svg|mp4|webm|woff2|avif|gif)/g)) refs.add(m[0])
const manifest = readFileSync('MEDIA-MANIFEST.txt', 'utf8').split(/\r?\n/).map(s => s.trim().replace(/^public/, '')).filter(Boolean)
const disk = existsSync('public') ? walk('public').map(p => p.replace(/\\/g, '/').replace(/^public/, '')) : []
const pool = disk.length ? disk : manifest
const set = new Set(pool); const lower = new Map(pool.map(p => [p.toLowerCase(), p]))
let bad = 0
for (const r of [...refs].sort()) if (!set.has(r) && lower.has(r.toLowerCase())) { bad++; console.log(`CASE MISMATCH: code asks for ${r} but the file is ${lower.get(r.toLowerCase())}`) }
const upper = pool.filter(p => p !== p.toLowerCase()); if (upper.length) console.log(`Note: ${upper.length} file names contain capitals (allowed, but code must match exactly): ${upper.slice(0, 5).join(', ')}`)
const notIn = [...refs].filter(r => !set.has(r) && !lower.has(r.toLowerCase()))
if (notIn.length) console.log(`Referenced in code but not found in ${disk.length ? 'public/' : 'MEDIA-MANIFEST.txt'} (check the file exists with this exact name):\n  ${notIn.sort().join('\n  ')}`)
console.log(built.length ? `(also scanned ${built.length} built pages)` : '(run after \`next build\` to also scan built pages)')
console.log(bad ? `${bad} case mismatch(es)` : `Case check OK (${refs.size} static references checked against ${disk.length ? 'public/' : 'the manifest'})`)
process.exit(bad ? 1 : 0)
