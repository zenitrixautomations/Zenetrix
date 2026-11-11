import { regionServiceParams } from '@/data/regionServicePages'
import { RegionServiceView, regionServiceMetadata } from '@/components/regions/RegionService'

export const dynamicParams = false
export const generateStaticParams = () => regionServiceParams('telangana')
type Props = { params: Promise<{ district: string; service: string }> }
export async function generateMetadata({ params }: Props) { const p = await params; return regionServiceMetadata('telangana', p.district, p.service) }
export default async function Page({ params }: Props) { const p = await params; return <RegionServiceView state="telangana" district={p.district} service={p.service} /> }
