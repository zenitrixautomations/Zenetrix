/** @type {import('next').NextConfig} */
// Static export for Cloudflare Pages (build output: out/).
// Security headers + legacy redirects are NOT set here (not supported with output: 'export').
// They are generated into public/_headers and public/_redirects by scripts/gen-cf-files.mjs.
// The lead form endpoint lives in functions/api/lead.js (Cloudflare Pages Function).
export default {
  output: 'export',
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/nngw4oql/**' },
    ],
  },
  compress: true,
  experimental: { inlineCss: true },
}
