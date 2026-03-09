import { login } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { password } = await request.json()
  const success = await login(password)
  
  if (success) {
    return NextResponse.json({ success: true })
  }
  return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
}
