'use client';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [printingOrder, setPrintingOrder] = useState<any>(null);

  // 📡 Fetch Real Orders from MongoDB
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://fit-bite-backend.onrender.com/api/orders');
      if (res.ok) {
        const data = await res.json();
        // Reverse so the newest orders are at the top!
        setOrders(data.reverse());
      } else {
        console.error("Failed to load orders");
      }
    } catch (error) {
      console.error("Backend not reachable", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🖨️ Handle Print Action
  const handlePrint = (order: any) => {
    setPrintingOrder(order);
    // Give the browser 100ms to render the label before opening the print dialog
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <>
      {/* 🌐 MAIN DASHBOARD UI (Hidden when printing) */}
      <div className="min-h-screen bg-[#FDFBF7] p-8 md:p-12 print:hidden">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#5C3D2E] font-heading tracking-tight">
              Admin Dashboard
            </h1>
            <button 
              onClick={fetchOrders}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-sm flex items-center gap-2 transition"
            >
              <span>🔄</span> Refresh Orders
            </button>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-gray-900 font-bold border-b border-gray-100 uppercase tracking-wider text-xs">
                  <tr>
                    <th className="p-5">Date & Time</th>
                    <th className="p-5">Customer Details</th>
                    <th className="p-5">Items Ordered</th>
                    <th className="p-5">Amount</th>
                    <th className="p-5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="p-10 text-center text-gray-400 font-medium">Loading orders from database...</td>
                    </tr>
                  ) : orders.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-10 text-center text-gray-400 font-medium">Waiting for first customer order...</td>
                    </tr>
                  ) : (
                    orders.map((order: any) => (
                      <tr key={order._id || Math.random()} className="hover:bg-gray-50 transition">
                        <td className="p-5 font-medium whitespace-nowrap">
                          {new Date(order.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                        </td>
                        <td className="p-5">
                          <p className="font-bold text-gray-900">{order.customerInfo?.firstName} {order.customerInfo?.lastName}</p>
                          <p className="text-xs text-gray-500">{order.customerInfo?.city}, {order.customerInfo?.state}</p>
                          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">📞 {order.customerInfo?.phone}</p>
                        </td>
                        <td className="p-5 max-w-xs">
                          <ul className="list-disc pl-4 text-xs space-y-1">
                            {order.items?.map((item: any, idx: number) => (
                              <li key={idx} className="line-clamp-1">
                                {item.quantity || 1}x {item.name}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="p-5">
                          <p className="font-bold text-green-700 text-lg">₹{order.totalAmount}</p>
                          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${order.paymentMethod === 'cod' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                            {order.paymentMethod === 'cod' ? 'Half COD' : 'Prepaid'}
                          </span>
                        </td>
                        <td className="p-5 text-center">
                          <button 
                            onClick={() => handlePrint(order)}
                            className="bg-gray-900 text-white hover:bg-black font-bold py-2 px-4 rounded-lg shadow-md transition text-xs uppercase tracking-wide"
                          >
                            Print Label
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 🖨️ PRINT ONLY UI (Hidden on website, shows only when printing) */}
      {printingOrder && (
        <div className="hidden print:block w-[100mm] mx-auto bg-white text-black p-4 font-sans">
          <div className="border-4 border-black p-4 relative">
            
            {/* Print Header */}
            <div className="flex justify-between items-start border-b-2 border-black pb-3 mb-3">
              <div>
                {/* 🚀 HERE IS YOUR BEAUTIFUL LOGO FIX! */}
                <div className="flex items-center gap-2 text-2xl font-black uppercase tracking-tighter text-black">
                  <img 
                    src="https://full-coral-fzl3hee9o9.edgeone.app/fitbitekitchen_logo_no_background.png" 
                    alt="Fit Bite Logo" 
                    className="w-8 h-8 object-contain grayscale" 
                  />
                  FIT BITE
                </div>
                <div className="text-[10px] font-bold tracking-widest uppercase mt-1">Official Shipping Label</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-gray-600">Placed: {new Date(printingOrder.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</div>
                <div className="text-[9px] text-gray-500 mt-1 uppercase">ID: {printingOrder._id}</div>
              </div>
            </div>

            {/* Print Address Section */}
            <div className="flex justify-between items-start mb-4">
              <div className="max-w-[65%]">
                <div className="font-bold text-sm underline mb-1">Deliver To:</div>
                <div className="font-bold text-lg leading-tight uppercase">
                  {printingOrder.customerInfo?.firstName} {printingOrder.customerInfo?.lastName}
                </div>
                <div className="text-xs mt-1 leading-snug">
                  {printingOrder.customerInfo?.address}<br/>
                  {printingOrder.customerInfo?.city}, {printingOrder.customerInfo?.state}<br/>
                  PIN: <span className="font-bold">{printingOrder.customerInfo?.pinCode}</span>
                </div>
                <div className="font-bold text-sm mt-2 flex items-center gap-1">
                  <span className="text-lg">📞</span> {printingOrder.customerInfo?.phone}
                </div>
              </div>
              
              {/* Fake QR Code for Aesthetics */}
              <div className="border-2 border-black p-1 text-center">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=FitBiteKitchenOrder" alt="QR" className="w-16 h-16" />
                <div className="text-[8px] font-bold mt-1 uppercase">Scan for Maps</div>
              </div>
            </div>

            {/* Print Order Summary */}
            <div className="border-t-2 border-black pt-3">
              <div className="font-bold text-sm mb-2">Kitchen Order Summary:</div>
              <div className="space-y-1 mb-4 border-b border-black border-dashed pb-3">
                {printingOrder.items?.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between text-xs font-bold">
                    <div>{item.quantity || 1}x {item.name}</div>
                    <div>₹{item.price * (item.quantity || 1)}</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center text-xl font-black uppercase">
                <div>Total:</div>
                <div>₹{printingOrder.totalAmount}</div>
              </div>
              <div className="text-right text-[10px] font-bold mt-1">
                {printingOrder.paymentMethod === 'cod' ? 'PAYMENT PENDING (COD)' : 'PAID ONLINE'}
              </div>
            </div>

          </div>
          <div className="text-center text-[10px] text-gray-500 mt-2">© 2026 Fit Bite Kitchen.</div>
        </div>
      )}
    </>
  );
}