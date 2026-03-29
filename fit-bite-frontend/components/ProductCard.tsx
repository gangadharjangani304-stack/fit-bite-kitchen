'use client';
import Link from 'next/link';

export default function ProductCard({ product, addToCart }: { product: any, addToCart: any }) {
  const mainImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : product.imageUrl;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col overflow-hidden group">
      
      <Link href={`/products/${product._id}`} className="flex flex-col flex-grow cursor-pointer">
        <div className="relative h-56 w-full overflow-hidden bg-gray-50 flex justify-center items-center p-4">
          <img 
            src={mainImage} 
            alt={product.name} 
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" 
          />
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>
          
          {/* ⭐ 5-STAR RATING ADDED HERE */}
          <div className="flex items-center gap-1 mb-2">
            <span className="text-[#FBBF24] text-sm tracking-widest">★★★★★</span>
            <span className="text-xs text-gray-500 font-extrabold ml-1">4.9</span>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xl font-extrabold text-green-700">₹{product.price}</p>
            {product.originalPrice && (
              <p className="text-sm text-gray-400 line-through">₹{product.originalPrice}</p>
            )}
          </div>
          
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-3">
            Unit: {product.unit}
          </p>
          
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>
        </div>
      </Link>

      <div className="px-5 pb-5 mt-auto pt-4 border-t border-gray-50">
        <button 
          onClick={(e) => {
            e.preventDefault(); 
            addToCart(product);
          }}
          className="w-full bg-white border-2 border-green-800 text-green-900 py-2.5 rounded-lg font-bold hover:bg-green-800 hover:text-white transition-colors shadow-sm flex justify-center items-center gap-2"
        >
          Add to Cart 🛒
        </button>
      </div>
      
    </div>
  );
}