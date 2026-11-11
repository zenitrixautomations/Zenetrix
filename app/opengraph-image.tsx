// import { MEDIA } from '@/constants/media'
// import { ImageResponse } from 'next/og'
// export const alt = 'Zenitrix Technologies: Automatic Gates, Doors and Barriers in Hyderabad'
// export const size = { width: 1200, height: 630 }
// export const contentType = 'image/png'
// export default async function Og() {
//   // Logo is fetched from Cloudinary; if that fails, fall back to a text wordmark instead of failing the whole build.
//   const src = await fetch(MEDIA.logoWhiteOg).then(async r => (r.ok ? `data:image/png;base64,${Buffer.from(await r.arrayBuffer()).toString('base64')}` : '')).catch(() => '')
//   return new ImageResponse(
//     (<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 80, background: 'linear-gradient(135deg,#0B1220 0%,#0047AB 100%)', color: '#fff' }}>
//       {/* eslint-disable-next-line @next/next/no-img-element */}
//       {src ? <img src={src} alt="Zenitrix" width={400} height={101} style={{ width: 400, height: 101 }} /> : <div style={{ fontSize: 56, fontWeight: 700, display: 'flex' }}>Zenitrix Technologies</div>}
//       <div style={{ fontSize: 72, fontWeight: 700, marginTop: 48, lineHeight: 1.1, display: 'flex' }}>Automatic Gates, Doors and Barriers in Hyderabad</div>
//       <div style={{ fontSize: 32, marginTop: 32, color: '#cbd5e1', display: 'flex' }}>Supply · Installation · Repair · AMC</div>
//     </div>), size)
// }

import { MEDIA } from '@/constants/media'
import { ImageResponse } from 'next/og'

export const dynamic = 'force-static' // <-- ఈ లైన్ యాడ్ చేయండి
export const alt = 'Zenitrix Technologies: Automatic Gates, Doors and Barriers in Hyderabad'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Og() {
  const src = await fetch(MEDIA.logoWhiteOg)
    .then(async r => (r.ok ? `data:image/png;base64,${Buffer.from(await r.arrayBuffer()).toString('base64')}` : ''))
    .catch(() => '')

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 80, background: 'linear-gradient(135deg,#0B1220 0%,#0047AB 100%)', color: '#fff' }}>
        {src ? <img src={src} alt="Zenitrix" width={400} height={101} style={{ width: 400, height: 101 }} /> : <div style={{ fontSize: 56, fontWeight: 700, display: 'flex' }}>Zenitrix Technologies</div>}
        <div style={{ fontSize: 72, fontWeight: 700, marginTop: 48, lineHeight: 1.1, display: 'flex' }}>Automatic Gates, Doors and Barriers in Hyderabad</div>
        <div style={{ fontSize: 32, marginTop: 32, color: '#cbd5e1', display: 'flex' }}>Supply · Installation · Repair · AMC</div>
      </div>
    ),
    size
  )
}