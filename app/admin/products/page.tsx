import { getScooters, getBrands } from '@/lib/db'
import Link from 'next/link'

export default async function ProductsPage() {
  const [scooters, brands] = await Promise.all([
    getScooters(),
    getBrands(),
  ])

  const brandMap = Object.fromEntries(brands.map(b => [b.id, b.name]))

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Products</h1>
        <Link
          href="/admin/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm whitespace-nowrap"
        >
          + Add Product
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Brand</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Range</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Speed</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {scooters.map((scooter) => (
                <tr key={scooter.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                      <img src={scooter.images[0]} alt={scooter.name} className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{scooter.name}</td>
                  <td className="px-6 py-4 text-gray-500">{brandMap[scooter.brand] || scooter.brand}</td>
                  <td className="px-6 py-4 text-blue-600 font-semibold">{scooter.price} DH</td>
                  <td className="px-6 py-4 text-gray-500">{scooter.range} km</td>
                  <td className="px-6 py-4 text-gray-500">{scooter.maxSpeed} km/h</td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/products/edit/${scooter.id}`}
                      className="text-blue-600 hover:text-blue-800 mr-3 text-sm"
                    >
                      Edit
                    </Link>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        if (confirm('Delete this product?')) {
                          fetch(`/api/admin/products?id=${scooter.id}`, { method: 'DELETE' })
                            .then(() => window.location.reload())
                        }
                      }}
                    >
                      <button type="submit" className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-gray-200">
          {scooters.map((scooter) => (
            <div key={scooter.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
                  <img src={scooter.images[0]} alt={scooter.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 text-sm truncate">{scooter.name}</h3>
                  <p className="text-sm text-gray-500">{brandMap[scooter.brand] || scooter.brand}</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded">{scooter.price} DH</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">{scooter.range} km</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">{scooter.maxSpeed} km/h</span>
                  </div>
                  <div className="mt-3 flex gap-3">
                    <Link
                      href={`/admin/products/edit/${scooter.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Edit
                    </Link>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        if (confirm('Delete this product?')) {
                          fetch(`/api/admin/products?id=${scooter.id}`, { method: 'DELETE' })
                            .then(() => window.location.reload())
                        }
                      }}
                    >
                      <button type="submit" className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
