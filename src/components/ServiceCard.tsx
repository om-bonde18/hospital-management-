import React from 'react';
import { MedicalService } from '../types';
import { 
  Stethoscope, 
  HeartPulse, 
  Baby, 
  Activity, 
  Sparkles, 
  Brain, 
  ShieldCheck, 
  Microscope, 
  ArrowUpRight 
} from 'lucide-react';

interface ServiceCardProps {
  service: MedicalService;
  onSelect: (service: MedicalService) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect }) => {
  // Map icon names to Lucide icons
  const renderIcon = () => {
    const iconClass = "w-6 h-6 text-[#171717] transition-transform duration-300 group-hover:scale-110";
    switch (service.iconName) {
      case 'Stethoscope':
        return <Stethoscope className={iconClass} strokeWidth={1.75} />;
      case 'HeartPulse':
        return <HeartPulse className={iconClass} strokeWidth={1.75} />;
      case 'Baby':
        return <Baby className={iconClass} strokeWidth={1.75} />;
      case 'Activity':
        return <Activity className={iconClass} strokeWidth={1.75} />;
      case 'Sparkles':
        return <Sparkles className={iconClass} strokeWidth={1.75} />;
      case 'Brain':
        return <Brain className={iconClass} strokeWidth={1.75} />;
      case 'ShieldCheck':
        return <ShieldCheck className={iconClass} strokeWidth={1.75} />;
      case 'Microscope':
      default:
        return <Microscope className={iconClass} strokeWidth={1.75} />;
    }
  };

  return (
    <article
      onClick={() => onSelect(service)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(service);
        }
      }}
      tabIndex={0}
      role="button"
      className="group bg-white rounded-3xl p-6 sm:p-7 border border-[#E7E5DF] hover:border-[#171717] hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-left cursor-pointer hover:-translate-y-1 focus:outline-none"
    >
      <div>
        {/* Top Icon and Arrow */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#F7F5EF] flex items-center justify-center border border-[#ECE9E2] group-hover:bg-[#FFF4B8] transition-colors">
            {renderIcon()}
          </div>
          <div className="w-9 h-9 rounded-full border border-[#E7E5DF] flex items-center justify-center text-[#555555] group-hover:border-[#171717] group-hover:bg-[#171717] group-hover:text-white transition-all">
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-[#171717] group-hover:text-black transition-colors mb-2">
          {service.name}
        </h3>
        <p className="text-sm text-[#555555] leading-relaxed line-clamp-3">
          {service.description}
        </p>
      </div>

      {/* Footer / Treatments Preview */}
      <div className="mt-6 pt-4 border-t border-[#F0EFEA] flex items-center justify-between text-xs text-[#737373]">
        <span>{service.treatments.length} Specialized Procedures</span>
        <span className="font-medium text-[#171717] group-hover:underline">Explore Details</span>
      </div>
    </article>
  );
};
