import { getScooters } from '@/data/scooters'
import { notFound } from 'next/navigation'
import ProductClient from './ProductClient'

export async function generateStaticParams() {
  const scooters = await getScooters()
  return scooters.map((scooter) => ({
    id: scooter.id,
  }))
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const scooters = await getScooters()
  const scooter = scooters.find((s) => s.id === params.id)
  
  if (!scooter) return notFound()

  const relatedProducts = scooters.filter(s => s.id !== scooter.id).slice(0, 3)

  return <ProductClient scooter={scooter} relatedProducts={relatedProducts} />
}
