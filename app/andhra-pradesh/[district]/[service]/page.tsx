import { regionServiceParams } from '@/data/regionServicePages'
import { RegionServiceView, regionServiceMetadata } from '@/components/regions/RegionService'

export const dynamicParams = false
export const generateStaticParams = () => regionServiceParams('andhra-pradesh')
type Props = { params: Promise<{ district: string; service: string }> }
export async function generateMetadata({ params }: Props) { const p = await params; return regionServiceMetadata('andhra-pradesh', p.district, p.service) }
export default async function Page({ params }: Props) { const p = await params; return <RegionServiceView state="andhra-pradesh" district={p.district} service={p.service} /> }
