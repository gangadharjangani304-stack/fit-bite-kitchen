'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (res.ok) {
        alert("✅ Account created successfully! You can now log in.");
        router.push('/login');
      } else {
        alert(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      alert("❌ Backend is offline. Please start the server.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8F5] flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full border">
        <h2 className="text-3xl font-bold text-[#5C3D2E] text-center mb-6">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" required onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full mt-1 p-2 border rounded-md focus:ring-green-500 outline-none" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" required onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full mt-1 p-2 border rounded-md focus:ring-green-500 outline-none" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" required onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full mt-1 p-2 border rounded-md focus:ring-green-500 outline-none" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full bg-[#5C3D2E] text-white py-2 rounded-md font-bold hover:bg-[#7a5441] transition">
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link href="/login" className="text-green-600 font-bold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}