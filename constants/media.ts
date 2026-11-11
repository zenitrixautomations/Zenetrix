// Single source of truth for every image / video URL.
// All media lives on Cloudinary (cloud "nngw4oql"), NOT in /public, so Vercel bandwidth is not used for it.
// Files are stored flat in Cloudinary: "/images/hero.webp" -> ".../image/upload/f_auto,q_auto/hero.webp".
// Never hardcode a Cloudinary URL or a "/images/..." / "/videos/..." path in a component: import from here.

export const CLOUDINARY_CLOUD = 'nngw4oql'
export const CLOUDINARY_HOST = 'https://res.cloudinary.com'
export const CLOUDINARY_IMAGE_BASE = `${CLOUDINARY_HOST}/${CLOUDINARY_CLOUD}/image/upload/f_auto,q_auto/`
export const CLOUDINARY_VIDEO_BASE = `${CLOUDINARY_HOST}/${CLOUDINARY_CLOUD}/video/upload/f_auto,q_auto/`

const isAbsolute = (s: string) => /^(https?:)?\/\//.test(s) || s.startsWith('data:')
// Accepts 'hero.webp', '/hero.webp' or a legacy '/images/hero.webp' and always returns the flat Cloudinary file name.
const clean = (file: string, folder: 'images' | 'videos') => file.replace(new RegExp(`^/?(${folder}/)?`), '')

/** Full Cloudinary image URL for a file name (e.g. 'hero.webp'). Absolute URLs are returned unchanged. */
export const cdnImage = (file: string): string => (isAbsolute(file) ? file : CLOUDINARY_IMAGE_BASE + clean(file, 'images'))

/** Full Cloudinary video URL for a file name (e.g. 'rolling-shutter.mp4'). Absolute URLs are returned unchanged. */
export const cdnVideo = (file: string): string => (isAbsolute(file) ? file : CLOUDINARY_VIDEO_BASE + clean(file, 'videos'))

export const isCdnUrl = (src?: string): boolean => !!src && src.startsWith(`${CLOUDINARY_HOST}/${CLOUDINARY_CLOUD}/`)

/** Video helpers. Posters are IMAGES on Cloudinary, the clips are VIDEOS. */
export const videoUrls = (name: string) => ({
  mp4: cdnVideo(`${name}.mp4`),
  webm: cdnVideo(`${name}.webm`),
  poster: cdnImage(`${name}-poster.webp`),
  poster640: cdnImage(`${name}-poster-640.webp`),
  poster800: cdnImage(`${name}-poster-800.webp`),
})

/** Frequently used singletons. */
export const MEDIA = {
  hero: cdnImage('hero.webp'),
  heroPoster: cdnImage('hero-poster.webp'),
  service: cdnImage('service.webp'),
  tagline: cdnImage('tagline-banner.webp'),
  logo: cdnImage('zenitrix-logo.png'),
  logoWhite: cdnImage('zenitrix-logo-white.png'),
  logoSm: cdnImage('zenitrix-logo-sm.webp'),
  logoWhiteSm: cdnImage('zenitrix-logo-white-sm.webp'),
  // Server-side OG image renderer (satori) only decodes PNG/JPEG, so force PNG here instead of f_auto (which may return webp/avif).
  logoWhiteOg: `${CLOUDINARY_HOST}/${CLOUDINARY_CLOUD}/image/upload/f_png/zenitrix-logo-white.png`,
} as const

/** Phone-size twin: 'x.webp' -> 'x-640.webp'. */
export const twin640 = (src: string): string => src.replace(/\.webp$/, '-640.webp')
