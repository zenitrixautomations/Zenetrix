import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
export const alt = 'Zenitrix Technologies: Automatic Gates, Doors and Barriers in Hyderabad'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export default async function Og() {
  // If public/ is missing or the file name differs in case on a Linux host, fall back to a text wordmark instead of failing the whole build.
  const logo = await readFile(path.join(process.cwd(), 'public/images/zenitrix-logo-white.png')).catch(() => null)
  const src = logo ? `data:image/png;base64,${logo.toString('base64')}` : ''
  return new ImageResponse(
    (<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 80, background: 'linear-gradient(135deg,#0B1220 0%,#0047AB 100%)', color: '#fff' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {src ? <img src={src} alt="Zenitrix" width={400} height={101} style={{ width: 400, height: 101 }} /> : <div style={{ fontSize: 56, fontWeight: 700, display: 'flex' }}>Zenitrix Technologies</div>}
      <div style={{ fontSize: 72, fontWeight: 700, marginTop: 48, lineHeight: 1.1, display: 'flex' }}>Automatic Gates, Doors and Barriers in Hyderabad</div>
      <div style={{ fontSize: 32, marginTop: 32, color: '#cbd5e1', display: 'flex' }}>Supply · Installation · Repair · AMC</div>
    </div>), size)
}
