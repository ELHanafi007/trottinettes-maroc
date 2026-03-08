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

export const brands: Brand[] = [
  {
    id: 'ninebot',
    name: 'Segway-Ninebot',
    logo: '/brands/ninebot.svg',
    tagline: 'Leader Mondial de la Mobilité',
    description: 'Segway-Ninebot domine le marché mondial avec plus de 50% de part de marché. Innovation, qualité et fiabilité inégalées.',
    products: [
      'Ninebot Max G2',
      'Ninebot F2 Pro',
      'Segway E2 Plus',
      'Ninebot KickScooter D38',
    ],
    founded: '2015',
    origin: 'Chine/USA',
  },
  {
    id: 'xiaomi',
    name: 'Xiaomi',
    logo: '/brands/xiaomi.svg',
    tagline: 'La Technologie Accessible',
    description: 'Xiaomi révolutionne la mobilité urbaine avec des trottinettes alliant design minimaliste, performance et prix accessible. Plus de 10 millions d\'unités vendues.',
    products: [
      'Mi Scooter 4 Ultra',
      'Mi Scooter 4 Pro 2nd',
      'Mi Scooter 4 Lite',
      'Mi Scooter Essential',
    ],
    founded: '2010',
    origin: 'Chine',
  },
  {
    id: 'vespa',
    name: 'Vespa',
    logo: '/brands/vespa.svg',
    tagline: 'L\'Icone Italienne Électrique',
    description: 'Depuis 1946, Vespa incarne l\'élégance italienne. Leur gamme électrique maintient l\'héritage de qualité et de style intemporel.',
    products: [
      'Vespa Elettrica 70',
      'Vespa Elettrica Red',
      'Vespa Elettrica Yellows',
    ],
    founded: '1946',
    origin: 'Italie',
  },
  {
    id: 'bmw',
    name: 'BMW',
    logo: '/brands/bmw.svg',
    tagline: 'L\'Excellence Allemande',
    description: 'BMW apporte son savoir-faire automobile à la mobilité électrique urbaine. Ingénierie de précision, sécurité et prestige allemand.',
    products: [
      'BMW iX1 Scooter',
      'BMW CE 02',
      'BMW i Mobility Scooter',
    ],
    founded: '1916',
    origin: 'Allemagne',
  },
  {
    id: 'kaabo',
    name: 'Kaabo',
    logo: '/brands/kaabo.svg',
    tagline: 'Performance Tout-Terrain',
    description: 'Kaabo est la référence des trottinettes performance et tout-terrain. Conçues pour les riders exigeants qui cherchent puissance et aventure.',
    products: [
      'Wolf King GT Pro',
      'Mantis King GT',
      'Wolf Warrior X',
      'Skywalker 8 Pro',
    ],
    founded: '2014',
    origin: 'Chine',
  },
  {
    id: 'inokim',
    name: 'Inokim',
    logo: '/brands/inokim.svg',
    tagline: 'Premium Israélien',
    description: 'Inokim combine ingénierie israélienne de pointe et design élégant. Des trottinettes haut de gamme avec une attention particulière aux détails.',
    products: [
      'Inokim OXO',
      'Inokim Quick 4',
      'Inokim Light 2 Pro',
      'Inokim Mini 2',
    ],
    founded: '2010',
    origin: 'Israël',
  },
]
