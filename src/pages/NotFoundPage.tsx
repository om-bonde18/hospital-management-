import React from 'react';
import { ArrowLeft, Home } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="px-4 sm:px-8 lg:px-12 py-20 text-center space-y-6 max-w-xl mx-auto">
      <div className="text-6xl sm:text-8xl font-bold font-editorial text-[#171717]">
        404
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold font-editorial text-[#171717]">
        Page Not Found
      </h1>
      <p className="text-sm text-[#555555] leading-relaxed">
        The clinical resource or page you requested may have moved or is temporarily unavailable. Please return to the homepage or search our medical directory.
      </p>
      <div className="pt-4 flex items-center justify-center gap-4">
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 bg-[#171717] hover:bg-neutral-800 text-white text-xs font-semibold px-6 py-3 rounded-full transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </button>
        <button
          onClick={() => onNavigate('/services')}
          className="inline-flex items-center gap-2 border border-[#E7E5DF] hover:bg-[#F7F5EF] text-[#171717] text-xs font-semibold px-6 py-3 rounded-full transition-colors"
        >
          <span>Explore Services</span>
        </button>
      </div>
    </div>
  );
};
