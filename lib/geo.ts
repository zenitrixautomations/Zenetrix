import { areaGeo } from '@/data/areaGeo'
import { areas } from '@/data/areas'

// Straight-line distances from the approximate coordinates in data/areaGeo.ts (same data as the coverage map).
// Always shown as "about N km" and "straight-line": a factual, page-specific detail, never a promised travel time.
const OFFICE: [number, number] = areaGeo['Banjara Hills'] ?? [78.438, 17.412]
const km = (a: [number, number], b: [number, number]) => {
  const r = Math.PI / 180, dLat = (b[1] - a[1]) * r, dLng = (b[0] - a[0]) * r
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a[1] * r) * Math.cos(b[1] * r) * Math.sin(dLng / 2) ** 2
  return 6371 * 2 * Math.asin(Math.sqrt(h))
}
export function areaDistance(name: string): { office: number; closest: { name: string; slug: string; km: number }[] } | null {
  const g = areaGeo[name]; if (!g) return null
  const closest = areas.filter(x => x.name !== name && areaGeo[x.name]).map(x => ({ name: x.name, slug: x.slug, km: km(g, areaGeo[x.name]) }))
    .sort((x, y) => x.km - y.km).slice(0, 10).map(x => ({ ...x, km: Math.max(1, Math.round(x.km)) }))
  return { office: Math.max(1, Math.round(km(OFFICE, g))), closest }
}

// Compass direction of a locality from the Banjara Hills office (computed from the same approximate coordinates).
export function areaDirection(name: string): string | null {
  const g = areaGeo[name]; if (!g) return null
  const dx = (g[0] - OFFICE[0]) * Math.cos(OFFICE[1] * Math.PI / 180), dy = g[1] - OFFICE[1]
  if (Math.hypot(dx, dy) < 0.004) return 'almost next to'
  const deg = (Math.atan2(dx, dy) * 180 / Math.PI + 360) % 360
  return ['north', 'north-east', 'east', 'south-east', 'south', 'south-west', 'west', 'north-west'][Math.round(deg / 45) % 8]
}
