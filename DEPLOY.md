# Zenitrix: Deploy and Google indexing checklist

## 0. Before anything: put your `public/` folder back
This zip was sent WITHOUT the `public/` folder (images, videos, fonts) because it was too large to upload.
Copy your existing `public/` folder into the project root (next to `app/` and `package.json`) before you build.
Run `npm run check:media` to confirm nothing is missing. The site domain is already set to **https://zenitrixautomations.com** (`.env.production`, `lib/site.ts`, `next.config.mjs`).

**If some images/videos show locally but not on Vercel:** Vercel is case-sensitive and Git on Windows is not. Run once in the project folder:
`git config core.ignorecase false && git rm -r -q --cached public && git add public && git commit -m "fix media file names" && git push`
Then redeploy with "Redeploy > clear build cache". All file names in `public/` must be lowercase with hyphens, exactly as the code uses them.

## 1. Deploy (Vercel is the easiest)
1. Push this folder to a GitHub repo, import it in vercel.com (framework: Next.js, nothing else to set).
2. Project Settings > Environment Variables (copy from `.env.example`):
   - `NEXT_PUBLIC_SITE_URL` = `https://zenitrixautomations.com` (already the default and in `.env.production`; set it on the host too)
   - `LEAD_TO_EMAIL` = zenitrixautomations@gmail.com and `RESEND_API_KEY` (lead form email). Without them the form falls back to WhatsApp.
   - `NEXT_PUBLIC_GA4_ID` (optional analytics)
   - Local SEO: `NEXT_PUBLIC_GEO_LAT`, `NEXT_PUBLIC_GEO_LNG`, `NEXT_PUBLIC_MAPS_URL`, `NEXT_PUBLIC_HOURS`
3. Add `zenitrixautomations.com` AND `www.zenitrixautomations.com` in Vercel > Domains. www redirects (301) to the non-www version automatically (see `next.config.mjs`). At your domain registrar set the A record to `76.76.21.21` and `www` CNAME to `cname.vercel-dns.com` (or use the values Vercel shows).
4. Redeploy after setting variables.

## 2. Google Search Console (do on day 1)
1. search.google.com/search-console > Add property > URL prefix (your https domain).
2. Choose "HTML tag" verification, copy only the `content` value into `NEXT_PUBLIC_GSC_VERIFICATION`, redeploy, click Verify.
3. Sitemaps > submit `sitemap.xml`, `video-sitemap.xml`, `image-sitemap.xml`.
4. URL Inspection > paste the home page URL > Request indexing. Repeat for /services/, /products/, /contact/ and 5 to 10 key pages.

## 3. Bing + IndexNow
- Bing Webmaster Tools > import from Search Console. Optional: `NEXT_PUBLIC_BING_VERIFICATION`.
- IndexNow: create `public/<key>.txt` containing the key, then `INDEXNOW_KEY=<key> SITE_URL=https://yourdomain node scripts/indexnow.mjs`.

## 4. Google Business Profile (biggest local-SEO win)
- Claim/verify the Banjara Hills listing, use the same name, address and phone as in `lib/site.ts`, add the website URL, services, photos, hours.
- Put its Maps link in `NEXT_PUBLIC_MAPS_URL`. Justdial, Facebook, Instagram, LinkedIn, Pinterest and YouTube are already in schema `sameAs`.
- Keep NAP (name, address, phone) identical on Justdial and every directory.

## 5. After deploy
- Run PageSpeed Insights (pagespeed.web.dev) on `/`, `/services/`, a product page. Run `npm run check:all` locally after `npm run build` before each release.
- Check Search Console > Pages after 3 to 7 days. Service-by-area pages (about 1,670) are indexable and in the sitemap. Watch Search Console > Pages for 'Crawled - currently not indexed'; if many appear, add real local facts (`localFacts` in `data/serviceAreaPages.ts`) for the localities that matter most.

## 6. Security checklist (done in code, finish on the host)
- Security headers (CSP, HSTS, X-Frame-Options DENY, COOP, Permissions-Policy) are set in `next.config.mjs`. Check at securityheaders.com after deploy.
- Lead API (`/api/lead`): same-origin check, size limit, rate limit, timeouts, input cleaning. Add Cloudflare Turnstile keys for real bot protection.
- `/.well-known/security.txt` is served. Renew the `Expires` date in `app/.well-known/security.txt/route.ts` every year.
- Never commit secrets. API keys go only in the host's Environment Variables. `.env.production` holds only the public domain.
- Run `npm audit` and `npm update next react react-dom` before each release.

## 7. Oct 25 2026: fix for 14 "Crawled - currently not indexed" pages
Added unique content and internal links for: 4 blog guides (`data/blogBoost.ts`), 6 Hyderabad areas incl. Bolarum (`data/areaSeo.ts`, `localFacts` in `data/serviceAreaPages.ts`), Sangareddy and Hanumakonda (`data/districtSeo.ts`), `/projects/`, and the conveyor high speed door (`data/richProducts.ts`). Footer links to them from every page (`data/featured.ts`). `SITE.updated` bumped so sitemap lastmod changes.
After deploying: Search Console > URL Inspection > Request indexing for each of the 13 URLs, then Page indexing > Crawled - currently not indexed > Validate fix.

## Indexing checklist (Search Console)
1. Copy your `public/` folder into the project root before `npm run build` (it is not part of the code zip). Names are case-sensitive.
2. Production env: `NEXT_PUBLIC_SITE_URL=https://zenitrixautomations.com`. Do not set `NEXT_PUBLIC_RELEASE_BATCH`.
3. After deploy open https://zenitrixautomations.com/hyderabad/kismatpura/boom-barriers/ with View Source: there must be NO `<meta name="robots" content="noindex">`.
4. Search Console: Sitemaps -> submit `sitemap.xml`, `image-sitemap.xml`, `video-sitemap.xml`; Pages -> each issue -> Validate fix.
5. "Discovered - currently not indexed" means Google knows the URL but has not crawled it yet (new site, ~1,900 URLs). It clears over weeks as the site earns links and fast responses. Use URL Inspection -> Request indexing for the top 10 pages each day (home, product categories, Hyderabad hub, top areas), and run `npm run indexnow` for Bing.

## 8. Oct 31 2026: automation-gates keywords and brand spelling
- New landing pages: `/automation-gates-hyderabad/` and `/entrance-automation-gates-hyderabad/` (in sitemap, footer on every page, home page, site search). Home title, H1 and description now lead with "Automation Gates Hyderabad" and "Entrance Automation".
- Brand spelling: `SITE.altNames` in `lib/site.ts` feeds schema `alternateName` (Organization and WebSite), the About page, home page and footer ("Zentrix Automation" and other spellings). Edit that one list to add or remove spellings.
- CSP `connect-src` now allows `*.google-analytics.com` (GA4 regional endpoints). No other security setting changed.
- After deploy: Search Console > URL Inspection > Request indexing for both new URLs and `/`; resubmit `sitemap.xml`. Put the same business name and both spellings in your Google Business Profile description and Justdial listing. Ranking position cannot be guaranteed; check Search Console > Performance for these queries after 1 to 3 weeks.
