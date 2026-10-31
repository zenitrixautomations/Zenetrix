'use client'
import { useEffect } from 'react'
import { GA4 } from '@/lib/ga4'

// Blueprint 16/18: GA4 events for phone_click and whatsapp_click, and a WhatsApp message that names the page
// the visitor was on. Works through one delegated listener so every tel: and wa.me link on the site is covered.
export function Tracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null
      const a = el?.closest?.('a') as HTMLAnchorElement | null
      if (!a) return
      const href = a.getAttribute('href') || ''
      if (href.startsWith('tel:')) {
        GA4.phone({ link_location: a.closest('footer') ? 'footer' : a.closest('header') ? 'header' : a.closest('.sticky-bar') ? 'sticky_bar' : 'content' })
      } else if (href.includes('wa.me/')) {
        GA4.whatsapp({ link_location: a.closest('footer') ? 'footer' : a.closest('header') ? 'header' : a.closest('.sticky-bar') ? 'sticky_bar' : 'content' })
        try {
          const u = new URL(href)
          const text = u.searchParams.get('text') || ''
          if (!text.includes('(Page:')) {
            const page = document.title.split('|')[0].trim() || location.pathname
            u.searchParams.set('text', `${text} (Page: ${page})`.trim())
            a.href = u.toString()
          }
        } catch { /* leave the link unchanged */ }
      }
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])
  return null
}
