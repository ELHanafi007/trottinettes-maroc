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
  image: string
  imageFull: string
  badge?: string
  brand: string
}

export const scooters: Scooter[] = [
  {
    id: 'ninebot-max-g2',
    name: 'Ninebot Max G2',
    description: 'La trottinette la plus avancée de Ninebot. Suspension avant/arrière, clignotants intégrés, autonomie exceptionnelle.',
    price: 4200,
    maxSpeed: 25,
    range: 70,
    weight: 24,
    motorPower: 450,
    batteryCapacity: 15.3,
    image: '/scooters/speedster-pro.webp',
    imageFull: '/scooters/speedster-pro.webp',
    badge: 'Best Seller',
    brand: 'ninebot',
  },
  {
    id: 'xiaomi-ultra-4',
    name: 'Xiaomi 4 Ultra',
    description: 'Le flagship de Xiaomi. Double freinage, autonomie de 70km, design primé. La référence du marché.',
    price: 3800,
    maxSpeed: 25,
    range: 70,
    weight: 17,
    motorPower: 500,
    batteryCapacity: 12.8,
    image: '/scooters/city-rider.webp',
    imageFull: '/scooters/city-rider.webp',
    brand: 'xiaomi',
  },
  {
    id: 'vespa-elettrica-70',
    name: 'Vespa Elettrica 70',
    description: 'L\'icône italienne réinventée. Design intemporel Vespa, technologie électrique moderne, luxe et prestige.',
    price: 6500,
    maxSpeed: 45,
    range: 100,
    weight: 130,
    motorPower: 4000,
    batteryCapacity: 4.2,
    image: '/scooters/eco-glide.webp',
    imageFull: '/scooters/eco-glide.webp',
    badge: 'Luxe',
    brand: 'vespa',
  },
  {
    id: 'bmw-ce-02',
    name: 'BMW CE 02',
    description: 'L\'excellence allemande urbaine. Conception BMW i, qualité automobile, technologie de pointe.',
    price: 8500,
    maxSpeed: 45,
    range: 90,
    weight: 115,
    motorPower: 11000,
    batteryCapacity: 8.9,
    image: '/scooters/sport-x.webp',
    imageFull: '/scooters/sport-x.webp',
    badge: 'Premium',
    brand: 'bmw',
  },
  {
    id: 'kaabo-wolf-king',
    name: 'Kaabo Wolf King GT Pro',
    description: 'La bête tout-terrain. 100km/h, 150km d\'autonomie, suspension hydraulique. Pour les riders extrêmes.',
    price: 12500,
    maxSpeed: 100,
    range: 150,
    weight: 45,
    motorPower: 2400,
    batteryCapacity: 35,
    image: '/scooters/mini-go.webp',
    imageFull: '/scooters/mini-go.webp',
    badge: 'Tout-Terrain',
    brand: 'kaabo',
  },
  {
    id: 'inokim-oxo',
    name: 'Inokim OXO',
    description: 'Le summum du luxe israélien. Double moteur, finition premium, confort exceptionnel.',
    price: 9500,
    maxSpeed: 65,
    range: 100,
    weight: 42,
    motorPower: 2000,
    batteryCapacity: 25.2,
    image: '/scooters/power-beast.webp',
    imageFull: '/scooters/power-beast.webp',
    badge: 'Haut de Gamme',
    brand: 'inokim',
  },
]
