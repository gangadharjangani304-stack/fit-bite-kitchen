'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '../../store/cartStore'; 

export default function CartPage() {
  const router = useRouter();
  
  // 🚀 GRAB THE ENTIRE STORE FIRST
  const store: any = useCartStore();
  
  // 🕵️ UNIVERSAL DETECTOR: Find the items no matter what they are named in your store!
  const activeCart = store.cart || store.cartItems || store.items || [];
  const removeFromCart = store.removeFromCart || store.removeItem || (() => console.log("Remove function missing"));
  const updateQuantity = store.updateQuantity || store.updateItemQuantity || (() => console.log("Update function missing"));

  // Prevent server-side Next.js crashes (Hydration fix)
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Wait for the browser to load to prevent glitches
  }

  // Safe math calculation
  const subtotal = activeCart.reduce((acc: any, item: any) => acc + (item.price * (item.quantity || 1)), 0);
  const total = subtotal;

  // 🔒 CRITICAL LOGIC: Forces Guest to Login ONLY at checkout
  const proceedToCheckout = () => {
    const userToken = localStorage.getItem('user'); 
    
    if (!userToken) {
      // 🛑 User is a guest. Stop them and redirect to login
      router.push('/login?redirectTo=/checkout');
    } else {
      // ✅ User is logged in. Let them proceed.
      router.push('/checkout');
    }
  };

  // If literally nothing is found in the store
  if (activeCart.length === 0) {
    return (
      <div className="bg-[#FDFBF7] min-h-screen py-16 px-6 flex flex-col items-center justify-center text-center">
        <div className="bg-white/50 backdrop-blur-md p-4 rounded-full border border-gray-100 mb-8 shadow-sm">
          {/* Using your actual logo for the empty cart state too! */}
          <img 
             src="https://full-coral-fzl3hee9o9.edgeone.app/fitbitekitchen_logo_no_background.png" 
             alt="Fit Bite Kitchen Logo" 
             className="w-24 h-24 object-contain"
          />
        </div>
        <h2 className="text-4xl font-heading font-extrabold text-[#5C3D2E] mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 font-medium mb-10 max-w-md">
          Looks like you haven't added any premium Laddus or delicious chocolates yet. Nourish your body with our 100% natural products!
        </p>
        <Link href="/products">
          <button className="bg-green-700 text-white font-extrabold text-lg px-10 py-4 rounded-xl hover:bg-green-800 transition shadow-lg">
            Explore Menu
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-16 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-heading font-extrabold text-[#5C3D2E] mb-10 tracking-tight">Your Shopping Cart ({activeCart.length} items)</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            {activeCart.map((item: any) => (
              <div key={item._id} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-6 group hover:border-green-100 transition">
                <div className="w-24 h-24 bg-gray-50 rounded-xl border border-gray-100 p-2 flex justify-center items-center">
                  <img src={item.images && item.images[0] ? item.images[0] : ''} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                  <div className="md:col-span-1 lg:col-span-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition line-clamp-1">{item.name}</h3>
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">{item.category} | {item.unit}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-extrabold text-green-700">₹{item.price}</p>
                    {item.originalPrice && (
                      <p className="text-sm text-gray-400 line-through">₹{item.originalPrice}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-4 bg-gray-50 border-2 border-gray-100 rounded-lg w-28 p-1 justify-center">
                    <button onClick={() => updateQuantity(item._id, Math.max(1, (item.quantity || 1) - 1))} className="font-bold text-gray-500 hover:text-green-700 px-2">-</button>
                    <span className="font-extrabold text-lg">{item.quantity || 1}</span>
                    <button onClick={() => updateQuantity(item._id, (item.quantity || 1) + 1)} className="font-bold text-gray-500 hover:text-green-700 px-2">+</button>
                  </div>
                  <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:text-red-700 font-bold text-sm md:col-span-1 lg:col-span-4 lg:text-right mt-2 lg:mt-0 transition">Remove</button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-10 rounded-2xl shadow-xl border-2 border-green-800 text-gray-800 sticky top-10">
              
              {/* 📸 THE BRAND LOGO & TITLE SECTION (FIXED HTML IMG TAG) */}
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex justify-center items-center border border-gray-100 shadow-inner p-2">
                  <img 
                    src="https://full-coral-fzl3hee9o9.edgeone.app/fitbitekitchen_logo_no_background.png"  
                    alt="Fit Bite Kitchen Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-heading font-extrabold text-gray-900 tracking-tighter">Order Summary</h2>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Fit Bite Kitchen - 100% Natural</p>
                </div>
              </div>
              
              <div className="space-y-6">
                  <div className="flex justify-between border-b border-gray-100 pb-4">
                    <p className="text-gray-600">Subtotal</p>
                    <p className="font-bold text-gray-900">₹{subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-4">
                    <p className="text-gray-600">Shipping</p>
                    <p className="text-sm text-gray-400 font-medium italic">Calculated at checkout</p>
                  </div>
                  <div className="flex justify-between text-2xl font-extrabold text-green-800 pt-2 pb-6 border-b-2 border-green-100">
                    <p>Total</p>
                    <p>₹{total.toFixed(2)}</p>
                  </div>

                  <button 
                    onClick={proceedToCheckout}
                    className="w-full bg-green-700 text-white font-extrabold py-4 rounded-xl text-lg hover:bg-green-800 transition shadow-lg flex justify-center items-center gap-2"
                  >
                    Proceed to Checkout
                  </button>
                  
                  <div className="pt-6 border-t border-gray-100 space-y-3">
                      <div className="flex items-center gap-3 text-green-800 text-sm font-bold">
                          <span className="text-lg">🔒</span> Razorpay Secured Checkout
                      </div>
                      <div className="flex items-center gap-3 text-green-800 text-sm font-bold">
                          <span className="text-lg">🌱</span> 100% Natural Ingredients
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}