import { isAuthenticated } from '@/lib/auth'
import { getScooters, saveScooter, deleteScooter } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get('id')
  
  if (id) {
    const scooter = await getScooterById(id)
    if (!scooter) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    return NextResponse.json(scooter)
  }

  const scooters = await getScooters()
  return NextResponse.json(scooters)
}

export async function POST(request: NextRequest) {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  await saveScooter(body)
  return NextResponse.json({ success: true })
}

export async function DELETE(request: NextRequest) {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get('id')
  
  if (!id) {
    return NextResponse.json({ error: 'Product ID required' }, { status: 400 })
  }

  await deleteScooter(id)
  return NextResponse.json({ success: true })
}

async function getScooterById(id: string) {
  const scooters = await getScooters()
  return scooters.find(s => s.id === id)
}
