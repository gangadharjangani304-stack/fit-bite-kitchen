import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center pt-10 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* 📝 LEFT SIDE: Your Text & Buttons */}
        <div className="space-y-8 text-center md:text-left">
          
          <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold text-sm tracking-wide shadow-sm border border-green-200">
            🌿 100% Natural & Healthy
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#5C3D2E] leading-tight tracking-tight">
            Fit Bite <br />
            <span className="text-green-600">Kitchen.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto md:mx-0 font-medium">
            Nourish your body with our premium dry fruit laddus, healthy homemade chocolates, and fresh salads. No preservatives, just pure taste.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
            {/* Just the Explore Menu button now! */}
            <Link href="/products">
              <button className="w-full sm:w-auto bg-[#FBBF24] text-amber-950 px-8 py-4 rounded-full font-extrabold text-lg hover:bg-amber-400 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                Explore Menu 🛒
              </button>
            </Link>
          </div>
        </div>

        {/* 📸 RIGHT SIDE: The Powerful Image! */}
        <div className="relative flex justify-center mt-12 md:mt-0">
          
          <div className="absolute inset-0 bg-green-300 rounded-full blur-3xl opacity-30 transform scale-110"></div>
          
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop"
            alt="Delicious healthy food"
            className="relative z-10 w-full max-w-md lg:max-w-lg rounded-3xl shadow-2xl border-8 border-white transform hover:scale-[1.02] transition duration-500 object-cover aspect-square"
          />
          
          <div className="absolute -bottom-6 -left-6 z-20 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3 animate-bounce">
            <span className="text-3xl">⭐</span>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase">Customer Favorite</p>
              <p className="text-sm font-extrabold text-gray-900">Dry Fruit Laddus</p>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
}