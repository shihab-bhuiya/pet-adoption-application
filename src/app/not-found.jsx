'use client'; // ✅ Required for interactive features like useRouter and onClick handlers

import Link from 'next/link';
import { useRouter } from 'next/navigation'; // ✅ Use Next.js native router
import { Home, ArrowLeft, HelpCircle } from 'lucide-react';

export default function NotFound() {
  const router = useRouter(); // ✅ Initialize the router

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-slate-50 px-6 py-12">
      <div className="text-center max-w-xl mx-auto">
        {/* Animated Badge / Status */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-error/10 text-error text-sm font-bold tracking-wide uppercase mb-6 animate-pulse">
          <HelpCircle size={16} />
          Error 404
        </div>

        {/* Playful Heading */}
        <h1 className="text-7xl md:text-9xl font-black text-slate-300 tracking-tight select-none">
          🐾 404
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mt-4 tracking-tight">
          Oops! This page went chasing butterflies.
        </h2>
        
        <p className="text-gray-500 mt-4 text-base md:text-lg max-w-md mx-auto leading-relaxed">
          The page you are looking for {"doesn't "}exist, has been moved, or our furry friends chewed through the cables.
        </p>

        {/* Decorative Divider */}
        <div className="divider my-8 max-w-xs mx-auto opacity-40"></div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/" 
            className="btn btn-accent text-white w-full sm:w-auto font-bold px-6 shadow-md transition-all hover:scale-[1.02] flex items-center gap-2 rounded-xl"
          >
            <Home size={18} />
            Back to Home
          </Link>
          
          <button 
            // ✅ Fixed: Now passing a clean function that calls Next.js navigation history
            onClick={() => router.back()} 
            className="btn btn-outline btn-neutral w-full sm:w-auto font-bold px-6 flex items-center gap-2 rounded-xl"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}