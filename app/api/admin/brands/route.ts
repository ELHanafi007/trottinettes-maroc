import { isAuthenticated } from '@/lib/auth'
import { getBrands, saveBrand, deleteBrand } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get('id')
  
  if (id) {
    const brand = await getBrands().then(brands => brands.find(b => b.id === id))
    if (!brand) {
      return NextResponse.json({ error: 'Brand not found' }, { status: 404 })
    }
    return NextResponse.json(brand)
  }

  const brands = await getBrands()
  return NextResponse.json(brands)
}

export async function POST(request: NextRequest) {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  await saveBrand(body)
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
    return NextResponse.json({ error: 'Brand ID required' }, { status: 400 })
  }

  await deleteBrand(id)
  return NextResponse.json({ success: true })
}
