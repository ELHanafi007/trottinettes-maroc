import { getBrands } from '@/lib/db'
import Link from 'next/link'
import Image from 'next/image'

export default async function BrandsPage() {
  const brands = await getBrands()

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Gestion des Marques</h1>
        <Link
          href="/admin/brands/new"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm whitespace-nowrap shadow-md"
        >
          + Ajouter une Marque
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Logo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slogan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Origine</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produits</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {brands.map((brand) => (
                <tr key={brand.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center overflow-hidden p-1">
                      <Image src={brand.logo} alt={brand.name} width={48} height={48} className="w-full h-full object-contain" />
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{brand.name}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm italic">{brand.tagline}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{brand.origin}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm font-semibold">{brand.products.length}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`/admin/brands/edit/${brand.id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Modifier
                      </Link>
                      <button
                        onClick={async () => {
                          if (confirm('Voulez-vous vraiment supprimer cette marque ?')) {
                            const res = await fetch(`/api/admin/brands?id=${brand.id}`, { method: 'DELETE' })
                            if (res.ok) window.location.reload()
                          }
                        }}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Supprimer
                      </button>
                    </div>
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
                <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center overflow-hidden p-2">
                  <Image src={brand.logo} alt={brand.name} width={64} height={64} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 text-sm">{brand.name}</h3>
                  <p className="text-sm text-gray-500 truncate italic">{brand.tagline}</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded">{brand.origin}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded font-semibold">{brand.products.length} produits</span>
                  </div>
                  <div className="mt-3 flex gap-4">
                    <Link
                      href={`/admin/brands/edit/${brand.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Modifier
                    </Link>
                    <button
                      onClick={async () => {
                        if (confirm('Supprimer cette marque ?')) {
                          const res = await fetch(`/api/admin/brands?id=${brand.id}`, { method: 'DELETE' })
                          if (res.ok) window.location.reload()
                        }
                      }}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Supprimer
                    </button>
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
