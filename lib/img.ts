// Responsive helper: every image has a 640px twin (name-640.webp) for phones. Works on Cloudinary URLs (see constants/media.ts).
// (The old 400px candidate was dropped: nothing generates name-400.webp, so it would 404 on small screens.)
import { isCdnUrl, twin640 } from '@/constants/media'
export const srcSet = (src?: string) =>
  src && isCdnUrl(src) && src.endsWith('.webp') && !/-(640|400|800)\.webp$/.test(src)
    ? `${twin640(src)} 640w, ${src} 1280w`
    : undefined
