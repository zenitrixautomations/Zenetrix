import { MEDIA } from '@/constants/media'
import { ImageResponse } from 'next/og'

export const OG_SIZE = { width: 1200, height: 630 }

// One branded 1200x630 template used by every route-level opengraph-image (Blueprint 6.3): unique title per product, area, guide and so on.
export async function ogImage(title: string, kicker: string) {
  // Logo is fetched from Cloudinary; if that fails, fall back to a text wordmark instead of failing the whole build.
  const src = await fetch(MEDIA.logoWhiteOg).then(async r => (r.ok ? `data:image/png;base64,${Buffer.from(await r.arrayBuffer()).toString('base64')}` : '')).catch(() => '')
  const size = title.length > 60 ? 54 : title.length > 40 ? 64 : 76
  return new ImageResponse(
    (<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 80, background: 'linear-gradient(135deg,#0B1220 0%,#0047AB 100%)', color: '#fff' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {src ? <img src={src} alt="Zenitrix" width={340} height={86} style={{ width: 340, height: 86 }} /> : <div style={{ fontSize: 56, fontWeight: 700, display: 'flex' }}>Zenitrix Technologies</div>}
      <div style={{ fontSize: 30, marginTop: 44, color: '#00B2FF', display: 'flex', textTransform: 'uppercase', letterSpacing: 2 }}>{kicker}</div>
      <div style={{ fontSize: size, fontWeight: 700, marginTop: 16, lineHeight: 1.12, display: 'flex' }}>{title}</div>
      <div style={{ fontSize: 30, marginTop: 36, color: '#cbd5e1', display: 'flex' }}>Zenitrix Technologies · Banjara Hills, Hyderabad</div>
    </div>), OG_SIZE)
}
