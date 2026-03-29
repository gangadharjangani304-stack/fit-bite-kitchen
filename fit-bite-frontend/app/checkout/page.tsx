'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCartStore } from '../../store/cartStore'; 

export default function CheckoutPage() {
  const router = useRouter();
  
  // 🚀 GRAB THE ENTIRE CART STORE
  const store: any = useCartStore();
  const activeCart = store.cart || store.cartItems || store.items || [];
  const clearCart = store.clearCart || store.emptyCart || (() => console.log("Clear cart missing"));
  const totalItems = activeCart.reduce((acc: any, item: any) => acc + (item.quantity || 1), 0);

  // Prevent hydration errors
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<any>(null);

  // State management for the multi-step form
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '', 
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    phone: '',
    shippingMethod: '',
    paymentMethod: 'razorpay', 
  });

  // 🔒 CRITICAL LOGIC: Check for the bypassed login user!
  useEffect(() => {
    setIsMounted(true);
    const storedUserToken = localStorage.getItem('user');
    
    if (!storedUserToken) {
      router.push('/login?redirectTo=/checkout');
    } else {
      const parsedUser = JSON.parse(storedUserToken);
      setUser(parsedUser);
      setFormData(prev => ({ ...prev, email: parsedUser.email || '' }));
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🧮 ORDER CALCULATIONS (Including 50% split)
  const subtotal = activeCart.reduce((acc: any, item: any) => acc + (item.price * (item.quantity || 1)), 0);
  const shippingCharge = 99; // Simulating a fixed charge
  const totalCharge = subtotal + shippingCharge;
  
  // 50% Advance Math
  const advancePayment = totalCharge / 2;
  const pendingPayment = totalCharge - advancePayment;

  // 📡 SENDING THE ORDER TO MONGODB
  const finalizeOrder = async () => {
    try {
      // 📦 1. Package all the order details together
      const orderData = {
        customerInfo: formData,
        items: activeCart,
        subtotal: subtotal,
        shippingFee: shippingCharge,
        totalAmount: totalCharge,
        paymentMethod: formData.paymentMethod,
        amountToPayNow: formData.paymentMethod === 'cod' ? advancePayment : totalCharge,
        paymentStatus: 'Pending', 
        status: 'New'
      };

      // 🚀 2. Send it to your backend server!
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        // ✅ 3. Success! Now we show the alert and clear the cart
        if (formData.paymentMethod === 'razorpay') {
            alert(`Order saved to Database! Redirecting to Razorpay for full payment: ₹${totalCharge.toFixed(2)}`);
        } else {
            alert(`Order saved! 50% Advance (₹${advancePayment.toFixed(2)}) pending. Remaining ₹${pendingPayment.toFixed(2)} will be collected on delivery.`);
        }
        clearCart();
        router.push('/products'); 
      } else {
        alert("Oops! The backend received it, but couldn't save it. Check your backend terminal for errors.");
      }

    } catch (error) {
      console.error("Error saving order:", error);
      alert("Could not connect to the backend. Make sure your node server is running on port 5000!");
    }
  };

  if (!isMounted) return null;

  if (activeCart.length === 0) {
    router.push('/products');
    return null;
  }

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-16 px-6 md:px-12 flex flex-col items-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[60%_40%] gap-12 items-start">
        
        {/* THE MULTI-STEP CHECKOUT FORM (Left Column) */}
        <div className="space-y-10">
          <Link href="/cart" className="text-sm font-medium text-gray-500 hover:text-green-700 flex items-center gap-1 mb-6">
            <span>←</span> Back to Cart
          </Link>
          
          <h1 className="text-5xl md:text-6xl font-heading font-extrabold text-[#5C3D2E] tracking-tight drop-shadow-sm mb-10">
            Secure Checkout
          </h1>

          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-100 text-gray-800 space-y-10">
            
            {/* STEP 1: CONTACT INFO */}
            <section className={`transition-opacity ${activeStep >= 1 ? 'opacity-100' : 'opacity-40'}`}>
                <h2 className="text-2xl font-bold font-heading text-gray-900 border-b border-gray-100 pb-3 mb-6">
                    Step 1: Contact Info
                </h2>
                <div className="space-y-4">
                    <label className="text-sm font-bold text-gray-600 uppercase tracking-wider">Email Address</label>
                    <input 
                        type="email" name="email" value={formData.email} onChange={handleInputChange} 
                        placeholder="your@email.com" 
                        disabled={!!user} 
                        className="w-full p-4 border-2 border-gray-200 rounded-lg text-lg bg-gray-50 disabled:bg-gray-100 disabled:text-gray-500 font-medium" 
                    />
                    {user && (
                        <p className="text-sm text-green-700 font-bold flex items-center gap-2">
                          <span className="text-lg">✅</span> Securely logged in as {user.name || 'User'}
                        </p>
                    )}
                </div>
                {activeStep === 1 && (
                    <button onClick={() => setActiveStep(2)} className="mt-8 bg-green-700 text-white font-extrabold text-lg px-8 py-3 rounded-lg hover:bg-green-800 transition shadow-lg">Proceed to Delivery Address</button>
                )}
            </section>

            {/* STEP 2: DELIVERY ADDRESS */}
            <section className={`transition-opacity ${activeStep >= 2 ? 'opacity-100' : 'opacity-40'}`}>
                <h2 className="text-2xl font-bold font-heading text-gray-900 border-b border-gray-100 pb-3 mb-6">
                    Step 2: Delivery Address
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="text-sm font-bold text-gray-600 uppercase tracking-wider">Country/Region</label>
                        <select className="w-full p-4 border-2 border-gray-200 rounded-lg text-lg bg-gray-50 disabled:bg-gray-100 font-medium" defaultValue="india" disabled>
                            <option value="india">India</option>
                        </select>
                    </div>
                    <div>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" className="w-full p-4 border-2 border-gray-200 rounded-lg text-lg bg-gray-50 font-medium" />
                    </div>
                    <div>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" className="w-full p-4 border-2 border-gray-200 rounded-lg text-lg bg-gray-50 font-medium" />
                    </div>
                    <div className="md:col-span-2">
                        <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Full Address (House, Street, Area, Landmark)" className="w-full p-4 border-2 border-gray-200 rounded-lg text-lg bg-gray-50 font-medium" />
                    </div>
                    <div>
                        <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="City" className="w-full p-4 border-2 border-gray-200 rounded-lg text-lg bg-gray-50 font-medium" />
                    </div>
                    <div>
                        <input type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="State" className="w-full p-4 border-2 border-gray-200 rounded-lg text-lg bg-gray-50 font-medium" />
                    </div>
                    <div>
                        <input type="text" name="pinCode" value={formData.pinCode} onChange={handleInputChange} placeholder="PIN Code" className="w-full p-4 border-2 border-gray-200 rounded-lg text-lg bg-gray-50 font-medium" />
                    </div>
                    <div className="md:col-span-1">
                        <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone Number (+91)" className="w-full p-4 border-2 border-gray-200 rounded-lg text-lg bg-gray-50 font-medium" />
                    </div>
                </div>
                {activeStep === 2 && (
                    <button onClick={() => setActiveStep(3)} className="mt-8 bg-green-700 text-white font-extrabold text-lg px-8 py-3 rounded-lg hover:bg-green-800 transition shadow-lg">Confirm Address & Set Shipping</button>
                )}
            </section>

            {/* STEP 3: SHIPPING METHOD */}
            <section className={`transition-opacity ${activeStep >= 3 ? 'opacity-100' : 'opacity-40'}`}>
                <h2 className="text-2xl font-bold font-heading text-gray-900 border-b border-gray-100 pb-3 mb-6">
                    Step 3: Shipping Method
                </h2>
                <div className="space-y-4">
                    {formData.address ? (
                        <div className="bg-green-50/50 p-6 rounded-xl border-2 border-green-200 flex justify-between items-center gap-4">
                            <div>
                                <p className="font-extrabold text-green-900 text-lg">Standard Delivery</p>
                                <p className="text-sm text-green-700 font-medium">Estimated delivery: 3-5 business days.</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <p className="text-xl font-bold text-green-900">₹{shippingCharge.toFixed(2)}</p>
                                <input type="radio" name="shippingMethod" checked={true} readOnly className="h-6 w-6 text-green-700 border-green-200" />
                            </div>
                        </div>
                    ) : (
                        <div className="p-6 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-500 font-medium italic">
                            Enter your full shipping address in Step 2 to view available shipping methods.
                        </div>
                    )}
                </div>
                {activeStep === 3 && formData.address && (
                    <button onClick={() => setActiveStep(4)} className="mt-8 bg-green-700 text-white font-extrabold text-lg px-8 py-3 rounded-lg hover:bg-green-800 transition shadow-lg">Select Payment Method</button>
                )}
            </section>

            {/* STEP 4: PAYMENT METHOD & FINALIZATION */}
            <section className={`transition-opacity ${activeStep >= 4 ? 'opacity-100' : 'opacity-40'}`}>
                <h2 className="text-2xl font-bold font-heading text-gray-900 border-b border-gray-100 pb-3 mb-6">
                    Step 4: Payment
                </h2>
                <div className="space-y-4">
                    {/* Full Online Option */}
                    <div className={`p-6 rounded-xl border-2 transition cursor-pointer flex justify-between items-center ${formData.paymentMethod === 'razorpay' ? 'border-green-800 bg-green-50 shadow-sm' : 'border-gray-200 hover:border-green-300'}`} onClick={() => setFormData({ ...formData, paymentMethod: 'razorpay' })}>
                        <div>
                            <p className="font-extrabold text-gray-900 text-lg flex items-center gap-2">
                                Pay Online Now (100%)
                            </p>
                            <p className="text-sm text-gray-500 font-medium">Fast, secure, supports UPI, Cards, & Wallets via Razorpay.</p>
                        </div>
                        <input type="radio" name="paymentMethod" checked={formData.paymentMethod === 'razorpay'} readOnly className="h-6 w-6 text-green-700 border-green-200" />
                    </div>
                    
                    {/* Partial COD Option */}
                    <div className={`p-6 rounded-xl border-2 transition cursor-pointer flex justify-between items-center ${formData.paymentMethod === 'cod' ? 'border-amber-800 bg-amber-50 shadow-sm' : 'border-gray-200 hover:border-amber-300'}`} onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}>
                        <div>
                            <p className="font-extrabold text-gray-900 text-lg">Partial COD (50% Advance)</p>
                            <p className="text-sm text-gray-500 font-medium">Pay 50% online now to confirm order, and 50% cash on delivery.</p>
                        </div>
                        <input type="radio" name="paymentMethod" checked={formData.paymentMethod === 'cod'} readOnly className="h-6 w-6 text-amber-700 border-amber-200" />
                    </div>
                </div>
                {activeStep === 4 && (
                    <button onClick={finalizeOrder} className="mt-12 w-full bg-green-700 text-white font-extrabold py-5 rounded-xl text-xl hover:bg-green-800 transition shadow-xl flex justify-center items-center gap-2">
                        {formData.paymentMethod === 'razorpay' ? `Pay Securely (₹${totalCharge.toFixed(2)})` : `Pay 50% Advance (₹${advancePayment.toFixed(2)})`}
                    </button>
                )}
            </section>
          </div>
        </div>

        {/* ORDER SUMMARY (Right Column) */}
        <div className="space-y-10 lg:sticky lg:top-10">
          <div className="bg-white p-10 rounded-2xl shadow-xl border-2 border-green-800 text-gray-800 space-y-6">
            
            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
                <div className="w-14 h-14 bg-gray-50 rounded-full flex justify-center items-center border border-gray-100 shadow-inner p-1">
                  <img 
                    src="https://full-coral-fzl3hee9o9.edgeone.app/fitbitekitchen_logo_no_background.png"  
                    alt="Fit Bite Kitchen Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-heading font-extrabold text-gray-900 tracking-tighter">Order Summary</h2>
                </div>
            </div>
            
            {activeCart.map((item: any) => (
                <div key={item._id} className="flex justify-between items-center gap-4 py-3 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center p-2">
                           <img src={item.images && item.images[0] ? item.images[0] : ''} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 text-base line-clamp-1">{item.name}</p>
                            <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">{item.category} | x{item.quantity || 1}</p>
                        </div>
                    </div>
                    <p className="text-lg font-extrabold text-green-700">₹{item.price * (item.quantity || 1)}</p>
                </div>
            ))}

            <div className="pt-8 border-t border-gray-100 space-y-4">
                <div className="flex justify-between items-center text-gray-600 font-medium">
                    <p>Subtotal ({totalItems} items)</p>
                    <p className="font-bold text-gray-900">₹{subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center text-gray-600 font-medium pb-4 border-b border-gray-100">
                    <p>Shipping Charge</p>
                    <p className="font-bold text-gray-900">₹{shippingCharge.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-2xl font-extrabold text-green-800 pt-2 pb-4">
                    <p>Total</p>
                    <p>₹{totalCharge.toFixed(2)}</p>
                </div>

                {/* 🚀 Dynamic Payment Split Display */}
                {formData.paymentMethod === 'cod' && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-2 mt-2">
                        <div className="flex justify-between text-amber-900 font-bold">
                            <p>To Pay Now (50% Advance)</p>
                            <p>₹{advancePayment.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between text-gray-500 font-semibold text-sm">
                            <p>To Pay on Delivery</p>
                            <p>₹{pendingPayment.toFixed(2)}</p>
                        </div>
                    </div>
                )}
                
                <div className="pt-6 text-center space-y-4">
                    <p className="text-green-800 text-sm font-bold flex items-center justify-center gap-2">
                        <span className="text-lg">🔒</span> Razorpay Secured Checkout
                    </p>
                </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}