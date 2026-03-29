import Link from 'next/link';

export default function OrderSuccess() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-brand-green mb-4">Order Successful!</h1>
      <Link href="/" className="text-brand-brown underline">Go Home</Link>
    </div>
  );
}