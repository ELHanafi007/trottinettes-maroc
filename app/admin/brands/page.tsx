import { getBrands } from '@/lib/db'
import Link from 'next/link'

export default async function BrandsPage() {
  const brands = await getBrands()

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Brands</h1>
        <Link
          href="/admin/brands/new"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm whitespace-nowrap"
        >
          + Add Brand
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Logo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tagline</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Origin</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Products</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {brands.map((brand) => (
                <tr key={brand.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                      <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain" />
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{brand.name}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{brand.tagline}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{brand.origin}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{brand.products.length}</td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/brands/edit/${brand.id}`}
                      className="text-blue-600 hover:text-blue-800 mr-3 text-sm"
                    >
                      Edit
                    </Link>
                    <form action={`/api/admin/brands?id=${brand.id}`} method="POST" className="inline"
                      onSubmit={(e) => {
                        e.preventDefault()
                        if (confirm('Delete this brand?')) {
                          fetch(e.currentTarget.action, { method: 'DELETE' }).then(() => window.location.reload())
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
          {brands.map((brand) => (
            <div key={brand.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 text-sm">{brand.name}</h3>
                  <p className="text-sm text-gray-500 truncate">{brand.tagline}</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded">{brand.origin}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">{brand.products.length} products</span>
                  </div>
                  <div className="mt-3 flex gap-3">
                    <Link
                      href={`/admin/brands/edit/${brand.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Edit
                    </Link>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        if (confirm('Delete this brand?')) {
                          fetch(e.currentTarget.action, { method: 'DELETE' }).then(() => window.location.reload())
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
