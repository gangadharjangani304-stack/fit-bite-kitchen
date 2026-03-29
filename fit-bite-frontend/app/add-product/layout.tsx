'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // We use pathname to figure out which page you are on, so we can highlight the button!
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* 🚀 ADMIN NAVIGATION BAR (Hidden when you print shipping labels!) */}
      <nav className="bg-gray-900 text-white print:hidden shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo / Brand */}
            <div className="flex items-center gap-3">
              <span className="text-2xl">🥗</span>
              <span className="font-bold text-xl tracking-wider text-green-400">FIT BITE ADMIN</span>
            </div>

            {/* Navigation Links */}
            <div className="flex space-x-4">
              <Link 
                href="/admin/dashboard" 
                className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${
                  pathname === '/admin/dashboard' 
                    ? 'bg-green-600 text-white shadow-inner' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                📦 Live Orders
              </Link>
              
              <Link 
                href="/admin/add-product" 
                className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${
                  pathname === '/admin/add-product' 
                    ? 'bg-green-600 text-white shadow-inner' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                ➕ Add Menu Item
              </Link>
            </div>

            {/* Back to Storefront */}
            <div>
              <Link 
                href="/products" 
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors border border-gray-600 hover:border-gray-400 px-5 py-2 rounded-full"
              >
                Exit to Store 🏃‍♂️
              </Link>
            </div>

          </div>
        </div>
      </nav>

      {/* 🚀 THIS IS WHERE YOUR ACTUAL PAGE CONTENT LOADS */}
      <main>
        {children}
      </main>
      
    </div>
  );
}