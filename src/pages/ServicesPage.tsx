import React, { useState } from 'react';
import { SERVICES, HOSPITAL_INFO } from '../data/mockData';
import { MedicalService } from '../types';
import { ServiceCard } from '../components/ServiceCard';
import { ServiceModal } from '../components/ServiceModal';
import { Search, ArrowRight, ShieldCheck, Clock, CheckCircle, Phone, AlertCircle } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
  onSelectServiceModal: (service: MedicalService) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, onSelectServiceModal }) => {
  const [activeModalService, setActiveModalService] = useState<MedicalService | null>(null);

  return (
    <div className="w-full">
      {/* Top Banner */}
      <section className="bg-linear-to-b from-[#F7F5EF] to-white border-b border-[#E7E5DF] py-12 sm:py-16 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#737373] font-bold">
            Late Govardhanrao Bayaskar Memorial Hospital · Clinical Scope
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal text-[#171717] leading-tight max-w-4xl">
            Comprehensive medical specialties in Murtizapur.
          </h1>
          <p className="text-base sm:text-lg text-[#555555] max-w-3xl leading-relaxed">
            From daily physician OPD consultations with Dr. Tushar Bayaskar (MBBS, MD Medicine) to 24/7 critical care, pulmonology, endocrinology, nephrology, and on-site pathology.
          </p>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 max-w-3xl flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>Government-Listed Hospital Specialties:</strong> The specialties shown below reflect recognized clinical services associated with the hospital. Daily specialist availability and visiting consultation hours vary; please call <strong>90755 69687</strong> prior to your visit.
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelect={(s) => setActiveModalService(s)}
            />
          ))}
        </div>

        {/* Clinical Standards Note */}
        <div className="bg-[#FDFCF9] rounded-3xl p-8 sm:p-10 border border-[#E7E5DF] grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-[#171717] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-[#171717]">Dr. Tushar Bayaskar OPD</h4>
              <p className="text-xs text-[#555555] mt-1">Daily physician clinic 11:00 AM – 5:00 PM. Listed consultation fee: ₹300.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#171717] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-[#171717]">24/7 Emergency Care</h4>
              <p className="text-xs text-[#555555] mt-1">Round-the-clock emergency medical triage, inpatient observation, and oxygen beds.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-[#171717]">Bayaskar Pathology Lab</h4>
              <p className="text-xs text-[#555555] mt-1">CBC, KFT, LFT, Widal, and home sample collection across Murtizapur (Call 80105 76316).</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Detail Modal if opened */}
      <ServiceModal
        service={activeModalService}
        onClose={() => setActiveModalService(null)}
        onBookAppointment={(dept) => {
          setActiveModalService(null);
          onNavigate('/appointments');
        }}
      />
    </div>
  );
};
