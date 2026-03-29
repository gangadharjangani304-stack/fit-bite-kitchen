'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '../store/cartStore';

export default function Navbar() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<any>(null);

  // 🛒 Get cart items for the notification badge
  const store: any = useCartStore();
  const activeCart = store.cart || store.cartItems || store.items || [];
  const totalItems = activeCart.reduce((acc: any, item: any) => acc + (item.quantity || 1), 0);

  // 🔒 Check if the user is logged in
  useEffect(() => {
    setIsMounted(true);
    const storedUserToken = localStorage.getItem('user');
    if (storedUserToken) {
      setUser(JSON.parse(storedUserToken));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  if (!isMounted) return null; // Prevent hydration mismatch

  return (
    // 🚀 THE MAGIC FIX: "print:hidden" completely hides this bar during printing!
    <nav className="print:hidden sticky top-0 z-50 bg-[#5C3D2E] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* LEFT SIDE: Brand & Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
            <div className="w-12 h-12 bg-white/10 rounded-full p-1 border border-white/20 flex items-center justify-center">
              <img 
                src="https://full-coral-fzl3hee9o9.edgeone.app/fitbitekitchen_logo_no_background.png" 
                alt="Fit Bite Kitchen" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-2xl font-extrabold font-heading tracking-wide">
              Fit Bite Kitchen
            </span>
          </Link>

          {/* RIGHT SIDE: Links & Buttons */}
          <div className="flex items-center gap-6 md:gap-8">
            
            <Link href="/products" className="font-bold text-lg hover:text-green-300 transition">
              Menu
            </Link>

            <Link href="/cart" className="relative font-bold text-lg hover:text-green-300 transition flex items-center gap-1">
              Cart 🛒
              {totalItems > 0 && (
                <span className="absolute -top-3 -right-4 bg-green-500 text-white text-xs font-black px-2 py-0.5 rounded-full border-2 border-[#5C3D2E]">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Auth Section */}
            <div className="flex items-center gap-4 border-l border-white/20 pl-6 ml-2">
              {user ? (
                <>
                  <Link href="/admin/dashboard" className="font-medium text-green-300 hover:text-white transition">
                    Hello, {user.name?.split(' ')[0] || 'Admin'}
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-5 rounded-lg transition shadow-md text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="font-bold hover:text-green-300 transition">
                    Login
                  </Link>
                  <Link href="/signup">
                    <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-5 rounded-lg transition shadow-md text-sm">
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
}