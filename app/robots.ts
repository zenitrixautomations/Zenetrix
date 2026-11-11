import type { MetadataRoute } from 'next'
export const dynamic = 'force-static'
import { SITE } from '@/lib/site'
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/search?'] }],
    sitemap: [`${SITE.base}/sitemap.xml`, `${SITE.base}/video-sitemap.xml`, `${SITE.base}/image-sitemap.xml`],
    host: SITE.base,
  }
}
