import { getScooters } from '@/data/scooters'
import { getBrands } from '@/data/brands'
import ProductsClient from './ProductsClient'

export default async function ProductsPage() {
  const [scooters, brands] = await Promise.all([
    getScooters(),
    getBrands(),
  ])

  return <ProductsClient scooters={scooters} brands={brands} />
}
