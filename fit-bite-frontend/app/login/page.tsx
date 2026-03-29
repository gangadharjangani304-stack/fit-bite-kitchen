'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // This cleverly catches the "?redirectTo=/checkout" from the URL!
  const redirectTo = searchParams.get('redirectTo') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🚀 THE BYPASS FIX: SIMULATED LOGIN
    // Instead of crashing when the backend isn't running, we force a success!
    // This allows you to test the checkout flow immediately.
    
    localStorage.setItem('user', JSON.stringify({ 
      email: email, 
      name: 'Gangadhar', // Setting your name as the default test user!
      token: 'secure-mock-token-123' 
    }));

    // Instantly route to the checkout page!
    router.push(redirectTo);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100">
          <h2 className="mt-2 mb-8 text-center text-3xl font-heading font-extrabold text-[#5C3D2E]">
            Welcome Back
          </h2>
          
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-bold text-gray-700">Email Address</label>
              <div className="mt-2">
                <input 
                  type="email" 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="appearance-none block w-full px-4 py-3 border-2 border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-600 sm:text-sm bg-gray-50 font-medium" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700">Password</label>
              <div className="mt-2">
                <input 
                  type="password" 
                  required 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="appearance-none block w-full px-4 py-3 border-2 border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-600 sm:text-sm bg-gray-50 font-medium" 
                />
              </div>
            </div>

            <div className="pt-2">
              <button 
                type="submit" 
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-extrabold text-white bg-green-800 hover:bg-green-900 focus:outline-none transition-all"
              >
                Log In
              </button>
            </div>
            
            <p className="text-center text-sm font-bold text-green-700 bg-green-50 py-2 rounded-md border border-green-200">
              Test Mode Active: Any email/password will work!
            </p>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm font-medium text-gray-600">
              Don't have an account?{' '}
              <Link href="/signup" className="font-extrabold text-[#5C3D2E] hover:text-green-800 transition">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Next.js requires SearchParams to be wrapped in a Suspense boundary
export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-2xl font-bold text-green-800">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}