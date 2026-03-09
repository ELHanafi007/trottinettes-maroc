import { readDb } from '@/lib/db'
import { Scooter } from '@/types'

export async function getScooters(): Promise<Scooter[]> {
  const db = await readDb()
  return db.scooters
}

export async function getScooterById(id: string): Promise<Scooter | undefined> {
  const db = await readDb()
  return db.scooters.find((s: Scooter) => s.id === id)
}
