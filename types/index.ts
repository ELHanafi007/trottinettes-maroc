export interface Scooter {
  id: string
  name: string
  description: string
  price: number
  maxSpeed: number
  range: number
  weight: number
  motorPower: number
  batteryCapacity: number
  images: string[]
  badge?: string
  brand: string
}

export interface Brand {
  id: string
  name: string
  logo: string
  tagline: string
  description: string
  products: string[]
  founded?: string
  origin?: string
}

export interface Sale {
  id: string
  productId: string
  productName: string
  amount: number
  date: string
  customerName: string
}
