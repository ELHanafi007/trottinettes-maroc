import { readDb } from '@/lib/db'
import { Brand } from '@/types'

export async function getBrands(): Promise<Brand[]> {
  const db = await readDb()
  return db.brands
}

export async function getBrandById(id: string): Promise<Brand | undefined> {
  const db = await readDb()
  return db.brands.find((b: Brand) => b.id === id)
}
