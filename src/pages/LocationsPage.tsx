import React, { useState } from 'react';
import { LOCATIONS, HOSPITAL_INFO } from '../data/mockData';
import { HospitalLocation } from '../types';
import { MapPin, Phone, Clock, Navigation, CheckCircle2, Shield, Accessibility, Microscope } from 'lucide-react';

export const LocationsPage: React.FC = () => {
  const [activeLocation, setActiveLocation] = useState<HospitalLocation>(LOCATIONS[0]);

  return (
    <div className="w-full">
      {/* Top Banner */}
      <section className="bg-linear-to-b from-[#F7F5EF] to-white border-b border-[#E7E5DF] py-12 sm:py-16 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#737373] font-bold">
            Murtizapur, Akola, Maharashtra – 444107
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal text-[#171717] leading-tight max-w-4xl">
            Hospital location & directions.
          </h1>
          <p className="text-base sm:text-lg text-[#555555] max-w-3xl leading-relaxed">
            Conveniently situated Behind Ashirwad Lawn in Ashirwad Nagar, Murtizapur. Easily accessible with dedicated wheelchair parking and step-free entrances.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={HOSPITAL_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#171717] text-white text-xs font-semibold px-6 py-3 rounded-full hover:bg-neutral-800 transition-colors"
            >
              <Navigation className="w-4 h-4 text-amber-300" />
              <span>Open in Google Maps</span>
            </a>
            <a
              href="tel:9075569687"
              className="inline-flex items-center gap-2 bg-[#F7F5EF] hover:bg-[#EBE8DF] border border-[#E7E5DF] text-[#171717] text-xs font-semibold px-6 py-3 rounded-full transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-700" />
              <span>Call Reception: 90755 69687</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-12">
        {/* Locations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {LOCATIONS.map((loc) => {
            const isSelected = activeLocation.id === loc.id;
            return (
              <div
                key={loc.id}
                onClick={() => setActiveLocation(loc)}
                className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#171717] shadow-lg ring-1 ring-[#171717]'
                    : 'border-[#E7E5DF] hover:border-neutral-400 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="aspect-16/9 overflow-hidden relative">
                    <img
                      src={loc.image}
                      alt={loc.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#171717] text-[11px] font-semibold px-3 py-1 rounded-full shadow-xs">
                      {loc.campusType}
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-4">
                    <h3 className="text-2xl font-bold font-editorial text-[#171717]">
                      {loc.name}
                    </h3>

                    <div className="space-y-2 text-xs text-[#555555]">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                        <span className="font-medium text-neutral-800">{loc.address}, {loc.city}</span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-neutral-400 shrink-0" />
                        <span>{loc.hours}</span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span className="font-semibold text-neutral-900">{loc.phone}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#F0EFEA] space-y-2">
                      {loc.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-neutral-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 pt-0 flex gap-2">
                  <a
                    href={HOSPITAL_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-full text-xs font-semibold bg-[#171717] text-white hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <Navigation className="w-3.5 h-3.5 text-amber-300" />
                    <span>Navigate</span>
                  </a>
                  <button
                    className={`w-full py-2.5 px-4 rounded-full text-xs font-semibold transition-colors flex items-center justify-center gap-2 border border-[#E7E5DF] text-[#171717] hover:bg-[#F7F5EF]`}
                  >
                    <span>{isSelected ? 'Viewing' : 'Select'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Facility Deep Dive */}
        <div className="bg-[#FDFCF9] rounded-3xl p-8 sm:p-12 border border-[#E7E5DF]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#737373] font-semibold">
                Facility & Landmark Guide
              </span>
              <h2 className="text-3xl font-bold font-editorial text-[#171717]">
                {activeLocation.name}
              </h2>
              <p className="text-sm text-[#555555] leading-relaxed">
                Located {activeLocation.address}, our facility is recognized by patients for its clean premises, quiet recovery rooms, and dedicated emergency stabilization capacity.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-neutral-700">
                <div className="p-4 rounded-xl bg-white border border-[#E7E5DF] space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-neutral-900">
                    <Accessibility className="w-4 h-4 text-emerald-700" />
                    <span>Wheelchair Access:</span>
                  </div>
                  <p className="text-neutral-600">Designated disabled parking bays with ramp access to OPD consultation chambers and inpatient wards.</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#E7E5DF] space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-neutral-900">
                    <MapPin className="w-4 h-4 text-blue-700" />
                    <span>Key Landmark:</span>
                  </div>
                  <p className="text-neutral-600">Directly Behind Ashirwad Lawn, Ashirwad Nagar, Murtizapur. Easily identified from main township approaches.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#E7E5DF] space-y-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF4B8] text-[#171717] flex items-center justify-center mx-auto">
                <Shield className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-[#171717]">Need Immediate Assistance?</h4>
              <p className="text-xs text-[#555555] leading-relaxed">
                Hospital emergency triage and admission staff are present 24 hours a day in Murtizapur.
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href="tel:9075569687"
                  className="inline-flex items-center justify-center gap-2 bg-[#171717] text-white text-xs font-semibold px-5 py-3 rounded-full hover:bg-neutral-800 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Call Hospital: 90755 69687</span>
                </a>
                <a
                  href="tel:8010576316"
                  className="inline-flex items-center justify-center gap-2 bg-[#F7F5EF] text-[#171717] text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-[#EBE8DF] border border-[#E7E5DF]"
                >
                  <Microscope className="w-3.5 h-3.5" />
                  <span>Pathology Lab: 80105 76316</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
