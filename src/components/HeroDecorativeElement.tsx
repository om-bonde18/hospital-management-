import React from 'react';
import { ArrowDownRight } from 'lucide-react';

interface HeroDecorativeElementProps {
  onClick?: () => void;
}

export const HeroDecorativeElement: React.FC<HeroDecorativeElementProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative z-10 flex items-center justify-center cursor-pointer focus:outline-none"
      aria-label="Explore Medical Services"
    >
      {/* Outer rotating ring / dashed or smooth border */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-[#171717]/25 bg-white/90 backdrop-blur-md shadow-lg flex flex-col items-center justify-center p-3 text-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:border-[#171717]">
        
        {/* Curved circular text visual or two-line typography */}
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#171717] leading-none">
          Explore
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#171717] leading-none mt-1">
          Service
        </span>

        {/* Small arrow icon with smooth rotate on hover */}
        <div className="mt-1.5 w-6 h-6 rounded-full bg-[#171717] text-white flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
          <ArrowDownRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </button>
  );
};
