import Link from 'next/link'
import Image from 'next/image'
import { scooters } from '@/data/scooters'
import { notFound } from 'next/navigation'
import ProductClient from './ProductClient'

export function generateStaticParams() {
  return scooters.map((scooter) => ({
    id: scooter.id,
  }))
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const scooter = scooters.find((s) => s.id === params.id)
  if (!scooter) return notFound()

  return <ProductClient scooter={scooter} />
}
