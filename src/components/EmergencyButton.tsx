import React, { useState } from 'react';
import { PhoneCall, AlertCircle, X, MapPin, Ambulance, Navigation } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/mockData';

export const EmergencyButton: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Floating Action Pill */}
      <aside aria-label="Emergency Contact" className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40">
        <button
          onClick={() => setModalOpen(true)}
          className="group flex items-center gap-2.5 bg-white border border-[#E7E5DF] text-[#171717] px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl hover:border-red-300 transition-all duration-300 focus:outline-none"
          aria-label="24/7 Hospital Contact Late Govardhanrao Bayaskar Memorial Hospital"
        >
          {/* Subtle pulsating red status light */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D64545]"></span>
          </span>

          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#D64545]">
                Hospital & Emergency
              </span>
            </div>
            <span className="text-xs font-semibold text-[#171717] group-hover:text-red-700 transition-colors">
              90755 69687
            </span>
          </div>
          
          <div className="w-7 h-7 rounded-full bg-red-50 text-[#D64545] flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-colors ml-1">
            <PhoneCall className="w-3.5 h-3.5" />
          </div>
        </button>
      </aside>

      {/* Emergency Assistance Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-red-100 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-[#D64545] flex items-center justify-center">
                <Ambulance className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#171717]">Hospital Emergency & Care</h3>
                <p className="text-xs text-[#555555]">Late Govardhanrao Bayaskar Memorial Hospital</p>
              </div>
            </div>

            <div className="p-4 bg-red-50/70 rounded-2xl border border-red-100 mb-5">
              <p className="text-xs text-red-900 leading-relaxed font-medium">
                Hospital is open 24/7 for emergency admissions, acute medical observation, and oxygen support in Murtizapur. For immediate attention, please call directly.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <a
                href="tel:9075569687"
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#D64545] text-white hover:bg-red-700 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <PhoneCall className="w-4 h-4" />
                  <span className="text-sm font-semibold">Call Hospital: 90755 69687</span>
                </div>
                <span className="text-xs opacity-90">Direct Line</span>
              </a>

              <a
                href="tel:8010576316"
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-neutral-100 text-[#171717] hover:bg-neutral-200 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <PhoneCall className="w-4 h-4 text-[#555555]" />
                  <span className="text-sm font-semibold">Dr. Bayaskar Pathology Lab</span>
                </div>
                <span className="text-xs text-neutral-600">80105 76316</span>
              </a>

              <a
                href={HOSPITAL_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#F7F5EF] text-[#171717] hover:bg-[#EBE8DF] transition-colors border border-[#E7E5DF]"
              >
                <div className="flex items-center gap-2.5">
                  <Navigation className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-semibold">Directions on Google Maps</span>
                </div>
                <span className="text-xs text-neutral-600">Navigate</span>
              </a>
            </div>

            <div className="pt-4 border-t border-neutral-100 flex items-start gap-2.5 text-xs text-neutral-600">
              <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-neutral-900 block">Hospital Location:</strong>
                Behind Ashirwad Lawn, Ashirwad Nagar, Murtizapur, Akola – 444107
                <br />
                <span className="text-emerald-700 font-medium">Wheelchair-accessible parking & entry/exit available</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
