import { isAuthenticated } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    redirect('/admin-login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gray-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 h-auto sm:h-16 py-3 sm:py-0">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-8 w-full sm:w-auto">
              <Link href="/admin/dashboard" className="text-lg sm:text-xl font-bold whitespace-nowrap">
                Admin Panel
              </Link>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 justify-center sm:justify-start">
                <Link href="/admin/dashboard" className="text-sm hover:text-gray-300 px-2 py-1 rounded hover:bg-gray-800 transition">
                  Dashboard
                </Link>
                <Link href="/admin/brands" className="text-sm hover:text-gray-300 px-2 py-1 rounded hover:bg-gray-800 transition">
                  Brands
                </Link>
                <Link href="/admin/products" className="text-sm hover:text-gray-300 px-2 py-1 rounded hover:bg-gray-800 transition">
                  Products
                </Link>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto justify-center sm:justify-end">
              <Link href="/" className="text-sm hover:text-gray-300 px-3 py-2 rounded hover:bg-gray-800 transition whitespace-nowrap" target="_blank">
                View Site
              </Link>
              <form action="/api/admin/logout" method="POST" className="inline">
                <button type="submit" className="text-sm hover:text-gray-300 px-3 py-2 rounded hover:bg-gray-800 transition whitespace-nowrap">
                  Logout
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>
    </div>
  )
}
