import { getScooters, getBrands } from '@/lib/db'
import ProductListClient from './ProductListClient'

export default async function ProductsPage() {
  const [scooters, brands] = await Promise.all([
    getScooters(),
    getBrands(),
  ])

  const brandMap = Object.fromEntries(brands.map(b => [b.id, b.name]))

  return <ProductListClient scooters={scooters} brandMap={brandMap} />
}
