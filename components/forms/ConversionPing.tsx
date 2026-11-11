'use client'
import { useEffect } from 'react'
import { GA4 } from '@/lib/ga4'
// Thank-you page: counts the lead once. If LeadForm already fired generate_lead in this tab, nothing is sent twice.
export function ConversionPing() {
  useEffect(() => { GA4.leadOnThankYou() }, [])
  return null
}
