import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import { Scooter, Brand, Sale } from '@/types'

const dbPath = path.join(process.cwd(), 'data', 'db.json')

export async function readDb(): Promise<{ scooters: Scooter[]; brands: Brand[]; sales: Sale[] }> {
  const data = await readFile(dbPath, 'utf-8')
  const parsed = JSON.parse(data)
  return {
    scooters: parsed.scooters || [],
    brands: parsed.brands || [],
    sales: parsed.sales || [],
  }
}

export async function writeDb(data: { scooters: Scooter[]; brands: Brand[]; sales: Sale[] }): Promise<void> {
  await writeFile(dbPath, JSON.stringify(data, null, 2), 'utf-8')
}

export async function getScooters(): Promise<Scooter[]> {
  const db = await readDb()
  return db.scooters
}

export async function getScooterById(id: string): Promise<Scooter | undefined> {
  const db = await readDb()
  return db.scooters.find((s) => s.id === id)
}

export async function saveScooter(scooter: Scooter): Promise<void> {
  const db = await readDb()
  const index = db.scooters.findIndex((s) => s.id === scooter.id)
  if (index >= 0) {
    db.scooters[index] = scooter
  } else {
    db.scooters.push(scooter)
  }
  await writeDb(db)
}

export async function deleteScooter(id: string): Promise<void> {
  const db = await readDb()
  db.scooters = db.scooters.filter((s) => s.id !== id)
  await writeDb(db)
}

export async function getBrands(): Promise<Brand[]> {
  const db = await readDb()
  return db.brands
}

export async function getBrandById(id: string): Promise<Brand | undefined> {
  const db = await readDb()
  return db.brands.find((b) => b.id === id)
}

export async function saveBrand(brand: Brand): Promise<void> {
  const db = await readDb()
  const index = db.brands.findIndex((b) => b.id === brand.id)
  if (index >= 0) {
    db.brands[index] = brand
  } else {
    db.brands.push(brand)
  }
  await writeDb(db)
}

export async function deleteBrand(id: string): Promise<void> {
  const db = await readDb()
  db.brands = db.brands.filter((b) => b.id !== id)
  await writeDb(db)
}

export async function getSales(): Promise<Sale[]> {
  const db = await readDb()
  return db.sales
}

export async function saveSale(sale: Sale): Promise<void> {
  const db = await readDb()
  db.sales.push(sale)
  await writeDb(db)
}
