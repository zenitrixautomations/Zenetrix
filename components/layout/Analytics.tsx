'use client'
import { useEffect } from 'react'

// GA4 (G-5CL4FQ4XC7) is now loaded directly in <head> in app/layout.tsx. This component only handles Clarity.
const CLARITY = process.env.NEXT_PUBLIC_CLARITY_ID

type W = Window & { __clLoaded?: boolean; dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void; clarity?: ((...a: unknown[]) => void) & { q?: unknown[] } }

const GA_ID = 'G-5CL4FQ4XC7'
// gtag.js is injected on first interaction or shortly after load (never during page load, lower TBT/LCP cost).
// The inline gtag() stub in <head> queues every event in dataLayer, so no click or lead event is lost.
function loadGtag() {
  const w = window as W & { __gaLoaded?: boolean }
  if (w.__gaLoaded) return
  w.__gaLoaded = true
  const s = document.createElement('script'); s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`; document.head.appendChild(s)
}

// Microsoft Clarity (Blueprint 18): session recordings and heatmaps, loaded only after consent.
function loadClarity() {
  const w = window as W
  if (!CLARITY || w.__clLoaded) return
  w.__clLoaded = true
  w.clarity = w.clarity || function () { (w.clarity!.q = w.clarity!.q || []).push(arguments) }
  const s = document.createElement('script'); s.async = true; s.src = `https://www.clarity.ms/tag/${CLARITY}`; document.head.appendChild(s)
}

// Loads analytics silently (no cookie banner). Does nothing unless NEXT_PUBLIC_GA4_ID / NEXT_PUBLIC_CLARITY_ID are set.
// Third-party scripts wait for the first real interaction (scroll, tap, key, mouse) or, failing that, 8 s after load,
// so they never compete with the page for the main thread during load (lower TBT on mobile).
export function Analytics() {
  useEffect(() => {
    const evs = ['scroll', 'pointerdown', 'keydown', 'touchstart', 'mousemove'] as const
    let done = false, t: ReturnType<typeof setTimeout> | undefined
    const go = () => { if (done) return; done = true; evs.forEach(e => window.removeEventListener(e, go)); if (t) clearTimeout(t); loadGtag(); loadClarity() }
    evs.forEach(e => window.addEventListener(e, go, { passive: true, once: true }))
    const arm = () => { t = setTimeout(go, 3500) }
    if (document.readyState === 'complete') arm(); else window.addEventListener('load', arm, { once: true })
    return () => { evs.forEach(e => window.removeEventListener(e, go)); if (t) clearTimeout(t); window.removeEventListener('load', arm) }
  }, [])
  return null
}
