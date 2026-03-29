'use client';
import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { useCartStore } from '../../../store/cartStore'; 
import ProductCard from '../../../components/ProductCard'; 

// 🚀 COMPLETE 16-ITEM MENU DATA
const fullMenu = [
  // Chocolates
  { _id: 'c1', name: 'Dry Fruit Chocolates', price: 140, originalPrice: 199, unit: '10 pieces', category: 'Chocolates', images: [ 'https://visible-aquamarine-xzx4mmjxeg.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2012_45_48%20PM.png', 'https://visible-aquamarine-xzx4mmjxeg.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2012_45_48%20PM.png', 'https://visible-aquamarine-xzx4mmjxeg.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2012_45_48%20PM.png' ], description: 'Premium homemade chocolates.', ingredients: 'Premium Cocoa, Roasted Almonds, Cashews, Dates, Organic Honey.', benefits: 'Rich in antioxidants, provides instant energy, and satisfies sweet cravings guilt-free.' },
  { _id: 'c2', name: 'Cranberry & Nuts Chocolates', price: 200, originalPrice: 249, unit: '10 pieces', category: 'Chocolates', images: [ 'https://continued-amaranth-teftynqgk6.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_08_18%20PM.png', 'https://continued-amaranth-teftynqgk6.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_08_18%20PM.png', 'https://continued-amaranth-teftynqgk6.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_08_18%20PM.png' ], description: 'Tangy cranberries and crunchy nuts dipped in smooth chocolate.', ingredients: 'Dark Chocolate, Dried Cranberries, Walnuts, Pistachios.', benefits: 'Cranberries support urinary tract health, while walnuts provide heart-healthy Omega-3s.' },
  { _id: 'c3', name: 'Pista Chocolates', price: 200, unit: '10 pieces', category: 'Chocolates', images: [ 'https://embarrassing-violet-mtaavgccah.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_12_39%20PM.png', 'https://embarrassing-violet-mtaavgccah.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_12_39%20PM.png', 'https://embarrassing-violet-mtaavgccah.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_12_39%20PM.png' ], description: 'Rich, smooth chocolate perfectly balanced with crunchy pistachios.', ingredients: 'Milk Chocolate, Roasted Salted Pistachios, Cocoa Butter.', benefits: 'High in protein and fiber. Pistachios help maintain healthy blood sugar levels.' },
  // Biscuits
  { _id: 'b1', name: 'Ragi & Multigrain Biscuits', price: 80, originalPrice: 120, unit: '10 pieces', category: 'Biscuits', images: [ 'https://successive-plum-qov3ugo9zf.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_33_01%20PM.png', 'https://successive-plum-qov3ugo9zf.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_33_01%20PM.png', 'https://successive-plum-qov3ugo9zf.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_33_01%20PM.png' ], description: 'Healthy, crunchy biscuits made from nutritious whole grains.', ingredients: 'Ragi Flour, Whole Wheat, Jaggery, Cardamom, Clarified Butter (Ghee).', benefits: 'Excellent source of calcium for strong bones. High dietary fiber aids digestion.' },
  // Health Powders 
  { _id: 'h1', name: 'Moringa Leaf Powder (Raw)', price: 160, unit: '100 gms', category: 'Health Powders', images: [ 'https://unexpected-indigo-szxhxbryzs.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_35_47%20PM.png', 'https://unexpected-indigo-szxhxbryzs.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_35_47%20PM.png', 'https://unexpected-indigo-szxhxbryzs.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_35_47%20PM.png' ], description: '100% pure raw moringa.', ingredients: 'Sun-dried premium Moringa Oleifera leaves.', benefits: 'Superfood packed with Iron, Vitamin C, and Calcium. Boosts immunity and skin health.' },
  { _id: 'h2', name: 'Moringa Chetny Podi', price: 80, unit: '100 gms', category: 'Health Powders', images: [ 'https://filthy-green-an5g8c6xp7.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_42_42%20PM.png', 'https://filthy-green-an5g8c6xp7.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_42_42%20PM.png', 'https://filthy-green-an5g8c6xp7.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_42_42%20PM.png' ], description: 'Spicy and healthy chutney powder.', ingredients: 'Moringa Leaves, Urad Dal, Chana Dal, Red Chilies, Cumin, Garlic, Salt.', benefits: 'Combines the nutritional power of Moringa with protein-rich lentils. Great for gut health.' },
  { _id: 'h3', name: 'Curry Leaf Chetny Podi', price: 90, unit: '100 gms', category: 'Health Powders', images: [ 'https://provincial-amethyst-s1dur0onsa.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_46_40%20PM.png', 'https://provincial-amethyst-s1dur0onsa.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_46_40%20PM.png', 'https://provincial-amethyst-s1dur0onsa.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_46_40%20PM.png' ], description: 'Traditional spice blend.', ingredients: 'Fresh Curry Leaves, Roasted Lentils, Tamarind, Spices.', benefits: 'Rich in iron and folic acid. Promotes healthy hair growth and improves digestion.' },
  // Laddus
  { 
    _id: 'l1', name: 'Dry Fruit Laddus', price: 1100, originalPrice: 1400, unit: '1kg', category: 'Laddus', 
    weightOptions: [{ weight: '250g', price: 275, originalPrice: 350 }, { weight: '500g', price: 550, originalPrice: 700 }, { weight: '1kg', price: 1100, originalPrice: 1400 }],
    images: [ 'https://sweet-lime-ah0qwnr45f.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_50_01%20PM.png', 'https://sweet-lime-ah0qwnr45f.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_50_01%20PM.png', 'https://sweet-lime-ah0qwnr45f.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_50_01%20PM.png' ], description: 'Energy-packed dry fruit laddus with no added sugar.', ingredients: 'Almonds, Cashews, Pistachios, Dates, Figs, Edible Gum (Gondh). No added sugar.', benefits: 'Provides sustained energy, promotes muscle recovery, and keeps you full longer.' 
  },
  { 
    _id: 'l2', name: 'Gondh Laddus', price: 1200, originalPrice: 1500, unit: '1kg', category: 'Laddus', 
    weightOptions: [{ weight: '250g', price: 300, originalPrice: 375 }, { weight: '500g', price: 600, originalPrice: 750 }, { weight: '1kg', price: 1200, originalPrice: 1500 }],
    images: [ 'https://scary-green-yfllw19ttu.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_52_45%20PM.png', 'https://scary-green-yfllw19ttu.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_52_45%20PM.png', 'https://scary-green-yfllw19ttu.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_52_45%20PM.png' ], description: 'Traditional healthy edible gum laddus.', ingredients: 'Edible Gum (Gondh), Whole Wheat Flour, Jaggery, Pure Cow Ghee, Dry Fruits.', benefits: 'Highly nutritious, traditionally used to strengthen bones and boost stamina.' 
  },
  // Salads
  { _id: 's1', name: 'Vegetable Salad', price: 25, unit: '100 gms', category: 'Salads', images: [ 'https://head-brown-3ucetqnigl.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_57_20%20PM.png', 'https://head-brown-3ucetqnigl.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_57_20%20PM.png', 'https://head-brown-3ucetqnigl.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_57_20%20PM.png' ], description: 'Freshly chopped mixed vegetables.', ingredients: 'Cucumber, Tomatoes, Carrots, Onions, Lemon Juice, Black Pepper.', benefits: 'Hydrating, low in calories, and rich in essential daily vitamins.' },
  { _id: 's2', name: 'Boiled Sprouts & Vegetables', price: 30, unit: '100 gms', category: 'Salads', images: [ 'https://possible-fuchsia-pgfksbkwup.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2002_00_15%20PM.png', 'https://possible-fuchsia-pgfksbkwup.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2002_00_15%20PM.png', 'https://possible-fuchsia-pgfksbkwup.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2002_00_15%20PM.png' ], description: 'Nutritious mix of sprouted grains and fresh boiled vegetables.', ingredients: 'Lightly boiled Green Gram Sprouts, Carrots, Capsicum, Chaat Masala.', benefits: 'Sprouting increases nutrient absorption. Excellent source of plant-based protein.' },
  { _id: 's3', name: 'Paneer & Boiled Sprouts', price: 50, unit: '100 gms', category: 'Salads', images: [ 'https://asleep-teal-abar6a2upf.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2002_03_41%20PM.png', 'https://asleep-teal-abar6a2upf.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2002_03_41%20PM.png', 'https://asleep-teal-abar6a2upf.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2002_03_41%20PM.png' ], description: 'High-protein paneer and sprouts.', ingredients: 'Fresh Cottage Cheese (Paneer), Mixed Sprouts, Mint Leaves, Lemon Dressing.', benefits: 'Perfect post-workout meal. Paneer provides casein protein for muscle repair.' },
  { _id: 's4', name: 'Mushrooms Salad', price: 50, unit: '100 gms', category: 'Salads', images: [ 'https://bottom-amethyst-ysjpxvzhcz.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2002_22_38%20PM.png', 'https://bottom-amethyst-ysjpxvzhcz.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2002_22_38%20PM.png', 'https://bottom-amethyst-ysjpxvzhcz.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2002_22_38%20PM.png' ], description: 'Healthy tossed mushroom salad.', ingredients: 'Sautéed Button Mushrooms, Garlic, Olive Oil, Parsley, Spinach.', benefits: 'Mushrooms are a great source of Vitamin D and selenium, supporting immune function.' },
  // Juices
  { _id: 'j1', name: 'Carrot Juice', price: 40, originalPrice: 60, unit: '250ml', category: 'Juices', images: [ 'https://safe-green-daqascngvt.edgeone.app/Mar%201,%202026,%2002_28_41%20PM.png', 'https://safe-green-daqascngvt.edgeone.app/Mar%201,%202026,%2002_28_41%20PM.png', 'https://safe-green-daqascngvt.edgeone.app/Mar%201,%202026,%2002_28_41%20PM.png' ], description: 'Freshly squeezed pure farm-fresh carrots.', ingredients: '100% Fresh Farm Carrots. No added sugar or water.', benefits: 'Loaded with Vitamin A and beta-carotene. Promotes healthy vision and glowing skin.' },
  { _id: 'j2', name: 'Beetroot Juice', price: 40, unit: '250ml', category: 'Juices', images: [ 'https://elegant-fuchsia-oexlrhz5dl.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2006_15_31%20PM.png', 'https://elegant-fuchsia-oexlrhz5dl.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2006_15_31%20PM.png', 'https://elegant-fuchsia-oexlrhz5dl.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2006_15_31%20PM.png' ], description: 'Iron-rich, freshly pressed beetroot juice.', ingredients: 'Pure Beetroots, dash of Lemon.', benefits: 'Naturally lowers blood pressure, increases stamina, and purifies the blood.' },
  { _id: 'j3', name: 'Carrot & Beetroot Mixed Juice', price: 40, unit: '250ml', category: 'Juices', images: [ 'https://yappiest-magenta-5nqtikgue8.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2006_29_00%20PM.png', 'https://yappiest-magenta-5nqtikgue8.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2006_29_00%20PM.png', 'https://yappiest-magenta-5nqtikgue8.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2006_29_00%20PM.png' ], description: 'The perfect healthy blend of carrot and beetroot.', ingredients: 'Fresh Carrots, Beetroots, Ginger, Lemon.', benefits: 'The ultimate detox drink. Combines eye-health benefits with blood-purifying properties.' }
];

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const addToCart = useCartStore((state: any) => state.addToCart);
  const product = fullMenu.find((p) => p._id === params.id);
  
  const [selectedVariant, setSelectedVariant] = useState<any>(
    product?.weightOptions ? product.weightOptions[2] : null
  );
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    notFound();
  }

  const activePrice = selectedVariant ? selectedVariant.price : product.price;
  const activeOriginalPrice = selectedVariant ? selectedVariant.originalPrice : product.originalPrice;
  const activeUnit = selectedVariant ? selectedVariant.weight : product.unit;

  const suggestions = fullMenu
    .filter((p) => p.category === product.category && p._id !== product._id)
    .slice(0, 4);

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      _id: selectedVariant ? `${product._id}-${selectedVariant.weight}` : product._id,
      name: selectedVariant ? `${product.name} (${selectedVariant.weight})` : product.name,
      price: activePrice,
      unit: activeUnit,
    };

    for (let i = 0; i < quantity; i++) {
      addToCart(cartItem);
    }
    
    alert(`Added ${quantity}x ${cartItem.name} to your cart!`);
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-sm text-gray-500 mb-8 flex gap-2">
          <Link href="/products" className="hover:text-green-800">Menu</Link> 
          <span>/</span> 
          <span className="text-gray-400">{product.category}</span>
          <span>/</span> 
          <span className="font-medium text-gray-800">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 bg-white p-6 md:p-10 rounded-2xl shadow-lg border border-gray-100">
          
          <div className="space-y-4">
            <div className="w-full aspect-square bg-gray-50 rounded-xl border border-gray-100 overflow-hidden shadow-inner flex justify-center items-center">
              <img 
                src={product.images[selectedImageIndex]} 
                alt={`${product.name} view ${selectedImageIndex + 1}`} 
                className="w-full h-full object-contain p-4"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((imgUrl, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square rounded-lg border-4 transition-all overflow-hidden bg-gray-50 flex justify-center items-center p-1 ${
                    index === selectedImageIndex ? 'border-green-600 shadow-md scale-105' : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-6 text-gray-800">
            <div>
              <h1 className="text-5xl font-extrabold font-heading text-gray-900 tracking-tighter leading-tight mb-2">
                {product.name}
              </h1>
              
              {/* ⭐ 5-STAR RATING ADDED HERE */}
              <div className="flex items-center gap-2 mt-3 mb-4">
                <span className="text-[#FBBF24] text-xl tracking-widest">★★★★★</span>
                <span className="text-md font-extrabold text-gray-700">4.9</span>
                <span className="text-sm text-gray-400 underline cursor-pointer hover:text-green-600 transition">(128 customer reviews)</span>
              </div>

              <p className="text-gray-500 font-bold uppercase tracking-wider text-sm mt-2">
                Category: {product.category} | Selection: {activeUnit}
              </p>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <p className="text-4xl font-extrabold text-green-700">₹{activePrice}</p>
              {activeOriginalPrice && (
                <>
                  <p className="text-xl text-gray-400 line-through">₹{activeOriginalPrice}</p>
                  <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Sale
                  </span>
                </>
              )}
            </div>

            {product.weightOptions && (
              <div className="pt-4 space-y-3">
                <label className="text-sm font-bold text-gray-600 uppercase tracking-wider">Select Box Size</label>
                <div className="flex flex-wrap gap-3">
                  {product.weightOptions.map((opt: any) => (
                    <button
                      key={opt.weight}
                      onClick={() => setSelectedVariant(opt)}
                      className={`px-5 py-3 border-2 rounded-xl font-extrabold transition-all shadow-sm ${
                        selectedVariant?.weight === opt.weight
                          ? 'border-green-800 bg-green-50 text-green-900 scale-105'
                          : 'border-gray-200 text-gray-500 hover:border-green-400 hover:text-green-800'
                      }`}
                    >
                      {opt.weight}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 space-y-2">
              <label className="text-sm font-bold text-gray-600 uppercase tracking-wider">Quantity</label>
              <div className="flex items-center border-2 border-gray-200 rounded-xl w-36 bg-gray-50">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-5 py-3 text-xl font-bold text-gray-600 hover:text-green-800 disabled:opacity-40">-</button>
                <span className="flex-1 text-center text-lg font-extrabold">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="px-5 py-3 text-xl font-bold text-gray-600 hover:text-green-800">+</button>
              </div>
            </div>

            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                onClick={handleAddToCart}
                className="w-full bg-white border-2 border-green-800 text-green-900 font-bold py-4 rounded-xl text-lg hover:bg-green-50 transition shadow-md"
              >
                Add to Cart 🛒
              </button>
              <Link href="/cart" className="w-full">
                <button className="w-full bg-green-800 text-white font-extrabold py-4 rounded-xl text-lg hover:bg-green-900 transition shadow-md">
                  Buy it now
                </button>
              </Link>
            </div>

            <div className="pt-6 border-t border-gray-100 space-y-3">
              <div className="flex items-center gap-3 text-green-800 text-sm font-bold">
                <span className="text-lg">✅</span> No preservatives
              </div>
              <div className="flex items-center gap-3 text-green-800 text-sm font-bold">
                <span className="text-lg">✅</span> No artificial flavours
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <p className="text-gray-700 text-base leading-relaxed">{product.description}</p>
            </div>

            <div className="pt-6">
              <h2 className="text-2xl font-bold text-orange-900 border-b-2 border-orange-100 pb-2 mb-4 inline-block font-heading">
                🌿 Ingredients
              </h2>
              <p className="text-orange-950 bg-orange-50/50 p-4 rounded-xl border border-orange-100 text-base leading-relaxed">
                {product.ingredients}
              </p>
            </div>

            <div className="pt-6">
              <h2 className="text-2xl font-bold text-green-900 border-b-2 border-green-100 pb-2 mb-4 inline-block font-heading">
                💪 Health Benefits
              </h2>
              <p className="text-green-950 bg-green-50/50 p-4 rounded-xl border border-green-100 text-base leading-relaxed">
                {product.benefits}
              </p>
            </div>

          </div>
        </div>

        {suggestions.length > 0 && (
          <div className="mt-20 border-t-2 border-green-100 pt-16 mb-20">
            <h2 className="text-4xl font-extrabold font-heading text-gray-900 mb-10 tracking-tighter">
              You might also like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {suggestions.map((p: any, index: number) => (
                <ProductCard key={p._id} product={p} addToCart={addToCart} index={index} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}