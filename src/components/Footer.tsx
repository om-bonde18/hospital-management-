import React from 'react';
import { ArrowUpRight, Mail, Phone, MapPin, Heart, Shield, Navigation, Microscope } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/mockData';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#171717] text-[#A3A3A3] pt-16 pb-12 border-t border-neutral-800">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-neutral-800">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white text-[#171717] flex items-center justify-center font-bold">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v18" />
                  <path d="M3 12h18" />
                  <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div>
                <span className="text-base sm:text-lg font-bold tracking-tight text-white font-sans block leading-tight">
                  Late Govardhanrao Bayaskar Memorial Hospital
                </span>
                <span className="text-xs text-neutral-400">Dr. Bayaskar Hospital · Murtizapur</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#8E8E8E] leading-relaxed max-w-md">
              Serving Murtizapur and Akola district with dedicated clinical medicine, 24/7 emergency & inpatient care, and specialized diagnostics. Consulting Physician: Dr. Tushar Bayaskar (MBBS, MD Medicine).
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-[#A3A3A3]">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="text-white font-medium">Hospital Rating: 4.3 ⭐ · Emergency & IPD 24 Hours Open</span>
              </div>
              <div className="text-neutral-400">
                Wheelchair-accessible parking and ramp entry/exit available.
              </div>
            </div>
          </div>

          {/* Column: Departments */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-white font-semibold">Specialties & OPD</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('/services')} className="hover:text-white transition-colors">
                  General Medicine (Dr. Tushar Bayaskar)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/services')} className="hover:text-white transition-colors">
                  Critical Care & Emergency
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/services')} className="hover:text-white transition-colors">
                  Pulmonology (Chest & Asthma)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/services')} className="hover:text-white transition-colors">
                  Endocrinology (Diabetes Care)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/services')} className="hover:text-white transition-colors">
                  Medical Gastroenterology
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/services')} className="hover:text-white transition-colors">
                  Nephrology & Renal Health
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-white font-semibold">Hospital Services</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('/appointments')} className="hover:text-white transition-colors">
                  Book OPD Appointment (₹300)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/pathology-lab')} className="hover:text-white transition-colors">
                  Dr. Bayaskar Pathology Lab
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/doctors')} className="hover:text-white transition-colors">
                  Doctor Profile & Timings
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/locations')} className="hover:text-white transition-colors">
                  Directions (Behind Ashirwad Lawn)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/patient-login')} className="hover:text-white transition-colors">
                  Patient Portal Login
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/admin')} className="text-amber-300 hover:text-amber-200 transition-colors font-semibold flex items-center gap-1">
                  <span>Admin Panel (Database Console)</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-white font-semibold">Contact & Location</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                <span>Behind Ashirwad Lawn, Ashirwad Nagar, Murtizapur, Akola, Maharashtra – 444107</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="tel:9075569687" className="text-white hover:underline font-semibold">
                  +91 90755 69687
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-white shrink-0" />
                <a href="mailto:bayaskartushar2020@gmail.com" className="hover:text-white truncate">
                  bayaskartushar2020@gmail.com
                </a>
              </li>
              <li className="pt-1">
                <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-amber-300 font-semibold">
                    <Microscope className="w-3 h-3" />
                    <span>Dr. Bayaskar Pathology Lab:</span>
                  </div>
                  <div className="text-[11px] text-white font-medium">Phone: 80105 76316</div>
                  <div className="text-[10px] text-neutral-400">Mon–Sat: 9:00 AM – 8:00 PM</div>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#737373]">
          <p>© 2026 Late Govardhanrao Bayaskar Memorial Hospital (Dr. Bayaskar Hospital). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href={HOSPITAL_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline flex items-center gap-1"
            >
              <Navigation className="w-3 h-3 text-amber-400" />
              <span>Google Maps Directions</span>
            </a>
            <span>·</span>
            <button onClick={() => onNavigate('/about')} className="hover:text-white transition-colors">About Memorial</button>
            <span>·</span>
            <button onClick={() => onNavigate('/contact')} className="hover:text-white transition-colors">Contact Hospital</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
