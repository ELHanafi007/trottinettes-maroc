import { getScooters, getBrands } from '@/lib/db'

export default async function DashboardPage() {
  const [scooters, brands] = await Promise.all([
    getScooters(),
    getBrands(),
  ])

  const stats = [
    { name: 'Total Products', value: scooters.length, color: 'bg-blue-500' },
    { name: 'Total Brands', value: brands.length, color: 'bg-green-500' },
    { name: 'Avg Price', value: `${Math.round(scooters.reduce((acc, s) => acc + s.price, 0) / scooters.length)} DH`, color: 'bg-purple-500' },
    { name: 'Price Range', value: `${Math.min(...scooters.map(s => s.price))} - ${Math.max(...scooters.map(s => s.price))} DH`, color: 'bg-orange-500' },
  ]

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className={`${stat.color} rounded-lg p-4 sm:p-6 text-white shadow-md`}>
            <p className="text-xs sm:text-sm opacity-80">{stat.name}</p>
            <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2 break-words">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">Recent Products</h2>
          <div className="space-y-2 sm:space-y-3">
            {scooters.slice(0, 5).map((scooter) => (
              <div key={scooter.id} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{scooter.name}</p>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">{scooter.brand}</p>
                </div>
                <p className="text-blue-600 font-semibold text-sm sm:text-base whitespace-nowrap ml-2">{scooter.price} DH</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">Brands</h2>
          <div className="space-y-2 sm:space-y-3">
            {brands.map((brand) => (
              <div key={brand.id} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{brand.name}</p>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">{brand.products.length} products</p>
                </div>
                <p className="text-sm text-gray-500 whitespace-nowrap ml-2 text-xs">{brand.origin}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-3 text-sm sm:text-base">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <a href="/admin/products/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm whitespace-nowrap">
            + Add Product
          </a>
          <a href="/admin/brands/new" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm whitespace-nowrap">
            + Add Brand
          </a>
        </div>
      </div>
    </div>
  )
}
