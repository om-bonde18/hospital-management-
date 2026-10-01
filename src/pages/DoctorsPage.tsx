import React, { useState } from 'react';
import { DOCTORS, HOSPITAL_INFO } from '../data/mockData';
import { Doctor } from '../types';
import { DoctorSearch } from '../components/DoctorSearch';
import { DoctorModal } from '../components/DoctorModal';
import { Phone, Clock, Banknote, MapPin, AlertCircle, Stethoscope } from 'lucide-react';

interface DoctorsPageProps {
  onNavigate: (path: string) => void;
  onBookDoctor: (doctor: Doctor) => void;
}

export const DoctorsPage: React.FC<DoctorsPageProps> = ({ onNavigate, onBookDoctor }) => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const verifiedDoctor = DOCTORS[0]; // Dr. Tushar Bayaskar

  return (
    <div className="w-full">
      {/* Top Banner */}
      <section className="bg-linear-to-b from-[#F7F5EF] to-white border-b border-[#E7E5DF] py-12 sm:py-16 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#737373] font-bold">
            Medical Faculty & Consultants · Murtizapur
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal text-[#171717] leading-tight max-w-4xl">
            Doctors & clinical specialists.
          </h1>
          <p className="text-base sm:text-lg text-[#555555] max-w-3xl leading-relaxed">
            Consultant physician Dr. Tushar Bayaskar (MBBS, MD Medicine) leads daily medical consultations and inpatient management at Late Govardhanrao Bayaskar Memorial Hospital.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-12">
        
        {/* Prominent Profile Box: Dr. Tushar Bayaskar */}
        <div className="bg-[#FDFCF9] rounded-3xl p-6 sm:p-10 border border-[#E7E5DF] shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {verifiedDoctor.image ? (
              <div className="lg:col-span-4 aspect-4/3 sm:aspect-square rounded-2xl overflow-hidden shadow-sm bg-neutral-100">
                <img
                  src={verifiedDoctor.image}
                  alt={verifiedDoctor.name}
                  className="w-full h-full object-contain p-2"
                />
              </div>
            ) : (
              <div className="lg:col-span-4 p-8 rounded-2xl bg-linear-to-br from-[#171717] to-neutral-800 text-white flex flex-col justify-between aspect-4/3 sm:aspect-square shadow-sm border border-neutral-700">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-center border border-white/20">
                    <Stethoscope className="w-6 h-6 text-emerald-400" />
                  </div>
                  <span className="text-[11px] font-bold bg-amber-400 text-neutral-900 px-3 py-1 rounded-full">
                    ₹300 OPD
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                    Consultant Physician
                  </span>
                  <div className="text-3xl font-editorial font-bold text-white">Dr. TB</div>
                  <div className="text-xs text-neutral-300 font-sans">
                    MBBS, MD (Medicine) · 12 Yrs Exp.
                  </div>
                </div>
              </div>
            )}

            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                  Consultant Physician
                </span>
                <span className="text-xs font-bold text-neutral-800 bg-[#FFF4B8] px-3 py-1 rounded-full border border-[#f0e39c]">
                  Fee: ₹300
                </span>
                <span className="text-xs text-neutral-600 bg-white border border-[#E7E5DF] px-3 py-1 rounded-full flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>11:00 AM – 5:00 PM</span>
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#171717]">
                  {verifiedDoctor.name}
                </h2>
                <p className="text-sm font-semibold text-[#737373] mt-0.5">
                  {verifiedDoctor.title} · {verifiedDoctor.specialty}
                </p>
              </div>

              <p className="text-sm text-[#555555] leading-relaxed">
                {verifiedDoctor.bio}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-neutral-700">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-neutral-500 shrink-0" />
                  <span>Late Govardhanrao Bayaskar Memorial Hospital, Murtizapur</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                  <a href="tel:9075569687" className="font-bold text-[#171717] hover:underline">
                    Contact: +91 90755 69687
                  </a>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onBookDoctor(verifiedDoctor)}
                  className="bg-[#171717] text-white text-xs font-semibold px-6 py-3 rounded-full hover:bg-neutral-800 transition-colors"
                >
                  Book Appointment (₹300)
                </button>
                <a
                  href="tel:9075569687"
                  className="bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-semibold px-5 py-3 rounded-full hover:bg-emerald-100 transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call 90755 69687</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Consultation Search */}
        <div className="space-y-6">
          <div className="space-y-1">
            <h3 className="font-editorial text-2xl sm:text-3xl text-[#171717]">
              Consultation Search & Clinical Areas
            </h3>
            <p className="text-xs text-neutral-500">
              Search Dr. Tushar Bayaskar's clinical expertise across General Medicine, fever management, diabetes, and inpatient care.
            </p>
          </div>

          <DoctorSearch
            onViewProfile={(doc) => setSelectedDoctor(doc)}
            onBookAppointment={(doc) => onBookDoctor(doc)}
          />
        </div>

        {/* Note on visiting schedule */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong>Visiting Specialists Schedule:</strong> While Dr. Tushar Bayaskar conducts daily general physician consultations (11 AM – 5 PM), visiting consultants in Pulmonology, Nephrology, and Gastroenterology visit periodically. Please call <strong>90755 69687</strong> to confirm the exact date.
          </div>
        </div>
      </section>

      {/* Doctor Detail Modal */}
      <DoctorModal
        doctor={selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
        onBook={(doc) => onBookDoctor(doc)}
      />
    </div>
  );
};
