'use client';
import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { useCartStore } from '../../store/cartStore';

const fallbackMenu = [
  // Chocolates
  { _id: 'c1', name: 'Dry Fruit Chocolates', price: 140, originalPrice: 199, unit: '10 pieces', category: 'Chocolates', images: [ 'https://visible-aquamarine-xzx4mmjxeg.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2012_45_48%20PM.png' ], description: 'Premium homemade chocolates.', ingredients: 'Premium Cocoa, Roasted Almonds, Cashews, Dates, Organic Honey.', benefits: 'Rich in antioxidants.' },
  { _id: 'c2', name: 'Cranberry & Nuts Chocolates', price: 200, originalPrice: 249, unit: '10 pieces', category: 'Chocolates', images: [ 'https://continued-amaranth-teftynqgk6.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_08_18%20PM.png' ], description: 'Tangy cranberries and crunchy nuts.', ingredients: 'Dark Chocolate, Dried Cranberries, Walnuts, Pistachios.', benefits: 'Heart-healthy Omega-3s.' },
  { _id: 'c3', name: 'Pista Chocolates', price: 200, unit: '10 pieces', category: 'Chocolates', images: [ 'https://embarrassing-violet-mtaavgccah.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_12_39%20PM.png' ], description: 'Rich chocolate with pistachios.', ingredients: 'Milk Chocolate, Roasted Salted Pistachios.', benefits: 'High in protein.' },
  // Biscuits
  { _id: 'b1', name: 'Ragi & Multigrain Biscuits', price: 80, originalPrice: 120, unit: '10 pieces', category: 'Biscuits', images: [ 'https://successive-plum-qov3ugo9zf.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_33_01%20PM.png' ], description: 'Healthy, crunchy biscuits.', ingredients: 'Ragi Flour, Whole Wheat, Jaggery.', benefits: 'Excellent source of calcium.' },
  // Health Powders 
  { _id: 'h1', name: 'Moringa Leaf Powder (Raw)', price: 160, unit: '100 gms', category: 'Health Powders', images: [ 'https://unexpected-indigo-szxhxbryzs.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_35_47%20PM.png' ], description: '100% pure raw moringa.', ingredients: 'Sun-dried premium Moringa leaves.', benefits: 'Packed with Iron and Vitamin C.' },
  { _id: 'h2', name: 'Moringa Chetny Podi', price: 80, unit: '100 gms', category: 'Health Powders', images: [ 'https://filthy-green-an5g8c6xp7.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_42_42%20PM.png' ], description: 'Spicy and healthy chutney powder.', ingredients: 'Moringa Leaves, Urad Dal, Spices.', benefits: 'Great for gut health.' },
  { _id: 'h3', name: 'Curry Leaf Chetny Podi', price: 90, unit: '100 gms', category: 'Health Powders', images: [ 'https://provincial-amethyst-s1dur0onsa.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_46_40%20PM.png' ], description: 'Traditional spice blend.', ingredients: 'Fresh Curry Leaves, Roasted Lentils.', benefits: 'Promotes healthy hair growth.' },
  // Laddus
  { _id: 'l1', name: 'Dry Fruit Laddus', price: 1100, originalPrice: 1400, unit: '1kg', category: 'Laddus', weightOptions: [{ weight: '250g', price: 275 }, { weight: '500g', price: 550 }, { weight: '1kg', price: 1100 }], images: [ 'https://sweet-lime-ah0qwnr45f.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_50_01%20PM.png' ], description: 'Energy-packed dry fruit laddus.', ingredients: 'Almonds, Cashews, Pistachios, Dates.', benefits: 'Provides sustained energy.' },
  { _id: 'l2', name: 'Gondh Laddus', price: 1200, originalPrice: 1500, unit: '1kg', category: 'Laddus', weightOptions: [{ weight: '250g', price: 300 }, { weight: '500g', price: 600 }, { weight: '1kg', price: 1200 }], images: [ 'https://scary-green-yfllw19ttu.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_52_45%20PM.png' ], description: 'Traditional healthy edible gum laddus.', ingredients: 'Edible Gum, Wheat Flour, Jaggery.', benefits: 'Traditionally used to strengthen bones.' },
  // Salads
  { _id: 's1', name: 'Vegetable Salad', price: 25, unit: '100 gms', category: 'Salads', images: [ 'https://head-brown-3ucetqnigl.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_57_20%20PM.png' ], description: 'Freshly chopped mixed vegetables.', ingredients: 'Cucumber, Tomatoes, Carrots.', benefits: 'Hydrating and low in calories.' },
  { _id: 's2', name: 'Boiled Sprouts & Vegetables', price: 30, unit: '100 gms', category: 'Salads', images: [ 'https://possible-fuchsia-pgfksbkwup.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2002_00_15%20PM.png' ], description: 'Nutritious mix of sprouted grains.', ingredients: 'Green Gram Sprouts, Carrots.', benefits: 'Excellent source of protein.' },
  { _id: 's3', name: 'Paneer & Boiled Sprouts', price: 50, unit: '100 gms', category: 'Salads', images: [ 'https://asleep-teal-abar6a2upf.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2002_03_41%20PM.png' ], description: 'High-protein paneer and sprouts.', ingredients: 'Paneer, Mixed Sprouts, Mint.', benefits: 'Perfect post-workout meal.' },
  { _id: 's4', name: 'Mushrooms Salad', price: 50, unit: '100 gms', category: 'Salads', images: [ 'https://bottom-amethyst-ysjpxvzhcz.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2002_22_38%20PM.png' ], description: 'Healthy tossed mushroom salad.', ingredients: 'Button Mushrooms, Garlic, Olive Oil.', benefits: 'Great source of Vitamin D.' },
  // Juices
  { _id: 'j1', name: 'Carrot Juice', price: 40, originalPrice: 60, unit: '250ml', category: 'Juices', images: [ 'https://safe-green-daqascngvt.edgeone.app/Mar%201,%202026,%2002_28_41%20PM.png' ], description: 'Freshly squeezed pure carrots.', ingredients: '100% Fresh Farm Carrots.', benefits: 'Promotes healthy vision.' },
  { _id: 'j2', name: 'Beetroot Juice', price: 40, unit: '250ml', category: 'Juices', images: [ 'https://elegant-fuchsia-oexlrhz5dl.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2006_15_31%20PM.png' ], description: 'Iron-rich beetroot juice.', ingredients: 'Pure Beetroots, dash of Lemon.', benefits: 'Purifies the blood.' },
  { _id: 'j3', name: 'Carrot & Beetroot Mixed Juice', price: 40, unit: '250ml', category: 'Juices', images: [ 'https://yappiest-magenta-5nqtikgue8.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2006_29_00%20PM.png' ], description: 'The perfect healthy blend.', ingredients: 'Fresh Carrots, Beetroots.', benefits: 'The ultimate detox drink.' }
];

const categoriesList = ['Chocolates', 'Biscuits', 'Health Powders', 'Laddus', 'Salads', 'Juices'];

export default function ProductsPage() {
  const [products, setProducts] = useState(fallbackMenu);
  
  // Safely grab the cart store function
  const store = useCartStore();
  const addToCart = store.addToCart || store.addItem || (() => console.log('Cart function not found'));

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => {
        if (!res.ok) throw new Error('Backend not responding');
        return res.json();
      })
      .then((data) => {
        if (data && data.products && data.products.length > 0) {
          setProducts(data.products);
        }
      })
      .catch((error) => {
        console.warn('Using fallback menu:', error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <div className="py-12 px-4 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-heading font-extrabold text-[#5C3D2E] mb-4 tracking-tight drop-shadow-sm">
            Our Fresh Menu
          </h2>
          <p className="text-gray-600 font-medium text-lg">100% Natural ingredients prepared fresh daily.</p>
        </div>

        {/* Product Grid */}
        {categoriesList.map((category) => {
          const categoryProducts = products.filter(p => p.category === category);
          if (categoryProducts.length === 0) return null; 

          return (
            <div key={category} className="mb-20">
              <h3 className="text-3xl font-extrabold text-green-900 mb-8 pb-2 inline-block border-b-4 border-green-200 drop-shadow-sm">
                {category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {categoryProducts.map((p) => (
                  <ProductCard key={p._id} product={p} addToCart={addToCart} />
                ))}
              </div>
            </div>
          );
        })}

        {/* 📹 SECTION: CUSTOMER VIDEO REVIEWS */}
        <div className="mt-24 pt-20 border-t-2 border-green-100/60 pb-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#5C3D2E] mb-4 font-heading tracking-tight">
              Real Customers. <span className="text-green-600">Real Results.</span>
            </h2>
            <p className="text-gray-600 font-medium text-lg">See why people are falling in love with Fit Bite Kitchen.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Video Review 1 */}
            <div className="bg-gray-900 rounded-3xl shadow-xl overflow-hidden border-4 border-white relative h-[500px] transform hover:-translate-y-2 transition-all duration-300">
              <iframe 
                src="https://screenpal.com/player/cOerewnThcT?width=100%&height=100%" 
                className="w-full h-full absolute inset-0 z-0"
                style={{ border: 0 }}
                allowFullScreen
                scrolling="no"
              />
              <div className="absolute top-4 left-4 right-4 z-10 pointer-events-none">
                <div className="bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-lg">
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-[#FBBF24] text-sm tracking-widest">★★★★★</span>
                  </div>
                  <p className="font-bold text-white text-sm leading-relaxed">&quot;The Dry Fruit Laddus give me so much energy before my workout! Totally sugar-free.&quot;</p>
                  <p className="text-xs text-gray-300 mt-2 font-medium uppercase tracking-wider">- Anjali P.</p>
                </div>
              </div>
            </div>

            {/* Video Review 2 */}
            <div className="bg-gray-900 rounded-3xl shadow-xl overflow-hidden border-4 border-white relative h-[500px] transform hover:-translate-y-2 transition-all duration-300 md:mt-8">
              <iframe 
                src="https://screenpal.com/player/cOerewnThcO?width=100%&height=100%" 
                className="w-full h-full absolute inset-0 z-0"
                style={{ border: 0 }}
                allowFullScreen
                scrolling="no"
              />
              <div className="absolute top-4 left-4 right-4 z-10 pointer-events-none">
                <div className="bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-lg">
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-[#FBBF24] text-sm tracking-widest">★★★★★</span>
                  </div>
                  <p className="font-bold text-white text-sm leading-relaxed">&quot;I replaced my junk snacks with their homemade chocolates. Tastes amazing, zero guilt!&quot;</p>
                  <p className="text-xs text-gray-300 mt-2 font-medium uppercase tracking-wider">- Priya M.</p>
                </div>
              </div>
            </div>

            {/* Video Review 3 */}
            <div className="bg-gray-900 rounded-3xl shadow-xl overflow-hidden border-4 border-white relative h-[500px] transform hover:-translate-y-2 transition-all duration-300">
              <iframe 
                src="https://screenpal.com/player/cOerewnThct?width=100%&height=100%" 
                className="w-full h-full absolute inset-0 z-0"
                style={{ border: 0 }}
                allowFullScreen
                scrolling="no"
              />
              <div className="absolute top-4 left-4 right-4 z-10 pointer-events-none">
                <div className="bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-lg">
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-[#FBBF24] text-sm tracking-widest">★★★★★</span>
                  </div>
                  <p className="font-bold text-white text-sm leading-relaxed">&quot;The Moringa powder has completely fixed my digestion issues. A customer for life.&quot;</p>
                  <p className="text-xs text-gray-300 mt-2 font-medium uppercase tracking-wider">- Rahul S.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* 🌍 FOOTER */}
      <footer className="bg-[#111827] text-gray-300 py-16 mt-20 border-t-4 border-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Brand Info */}
            <div className="space-y-4">
              <h3 className="text-2xl font-extrabold text-white flex items-center gap-2">
                <img src="https://full-coral-fzl3hee9o9.edgeone.app/fitbitekitchen_logo_no_background.png" alt="Logo" className="w-8 h-8 object-contain bg-white rounded-full p-1" />
                Fit Bite Kitchen
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Freshly made premium dry fruit laddus, healthy chocolates, and fresh salads crafted with love, using the finest natural ingredients for every bite.
              </p>
              <div className="flex gap-4 pt-2">
                <a href="https://www.instagram.com/fitbite_kitchen?igsh=dWt2d2xybTFmeXFj" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-2 rounded-md hover:bg-pink-600 transition"><span className="text-white">📷</span></a>
                <a href="#" className="bg-gray-800 p-2 rounded-md hover:bg-green-600 transition"><span className="text-white">▶</span></a>
                <a href="https://wa.me/916281014496" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-2 rounded-md hover:bg-green-600 transition"><span className="text-white">💬</span></a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="/products" className="hover:text-green-400 transition">Shop Menu</a></li>
                <li><a href="/login" className="hover:text-green-400 transition">My Account</a></li>
                <li><a href="#" className="hover:text-green-400 transition">FAQs</a></li>
                <li><a href="https://wa.me/916281014496" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition">Contact Us</a></li>
              </ul>
            </div>

            {/* Policy Links */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6">Policy</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="/policy/privacy" className="hover:text-green-400 transition">Privacy Policy</a></li>
                <li><a href="/policy/refund" className="hover:text-green-400 transition">Refund Policy</a></li>
                <li><a href="/policy/shipping" className="hover:text-green-400 transition">Shipping Policy</a></li>
                <li><a href="/policy/terms" className="hover:text-green-400 transition">Terms of Service</a></li>
              </ul>
            </div>

            {/* Get in Touch */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6">Get in Touch</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 text-lg">📍</span>
                  <span>Vidya Nagar colony, Kamareddy</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500 text-lg">📞</span>
                  <span>+91 6281014496</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-blue-400 text-lg">✉️</span>
                  <span>fitbitekitchen11@gmail.com</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="mt-16 pt-8 border-t border-gray-800 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
            <p>© 2026 Fit Bite Kitchen. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Developed & Designed by Gangadhar Jangani</p>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <a 
        href="https://wa.me/916281014496" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 flex items-center justify-center border-2 border-white"
        title="Chat with us on WhatsApp"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.559 0 11.896-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>

    </div>
  );
}