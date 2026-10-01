import React from 'react';
import { Doctor } from '../types';
import { X, Calendar, Star, GraduationCap, MapPin, Globe, CheckCircle2, Clock, Phone, Banknote } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/mockData';

interface DoctorModalProps {
  doctor: Doctor | null;
  onClose: () => void;
  onBook: (doctor: Doctor) => void;
}

export const DoctorModal: React.FC<DoctorModalProps> = ({ doctor, onClose, onBook }) => {
  if (!doctor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E7E5DF] relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="doctor-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-neutral-100 text-neutral-600 transition-colors"
          aria-label="Close Doctor Details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Doctor Crest or Picture */}
        <div className="flex flex-col sm:flex-row gap-6 p-6 sm:p-8 bg-[#FDFCF9] border-b border-[#E7E5DF]">
          {doctor.image ? (
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shrink-0 shadow-md bg-white border border-[#E7E5DF]">
              <img 
                src={doctor.image} 
                alt={doctor.name} 
                className="w-full h-full object-contain p-2"
              />
            </div>
          ) : (
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-linear-to-br from-[#171717] to-neutral-800 text-white flex flex-col items-center justify-center shrink-0 shadow-md border-2 border-neutral-700">
              <span className="font-editorial text-3xl font-bold tracking-wider">TB</span>
              <span className="text-[10px] uppercase tracking-widest text-amber-300 font-semibold mt-0.5">MD Medicine</span>
            </div>
          )}

          <div className="flex flex-col justify-center space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                Active Medical OPD
              </span>
              {doctor.consultationFee && (
                <span className="text-xs font-bold text-neutral-800 bg-[#FFF4B8] px-2.5 py-0.5 rounded-full">
                  Consultation Fee: {doctor.consultationFee}
                </span>
              )}
            </div>

            <h2 id="doctor-modal-title" className="text-2xl sm:text-3xl font-bold text-[#171717]">
              {doctor.name}
            </h2>
            <p className="text-sm font-semibold text-[#737373]">{doctor.title} · {doctor.specialty}</p>

            {doctor.consultationTiming && (
              <p className="text-xs text-neutral-700 flex items-center gap-1.5 pt-0.5">
                <Clock className="w-3.5 h-3.5 text-neutral-500" />
                <span>Listed Timing: <strong>{doctor.consultationTiming}</strong></span>
              </p>
            )}

            <div className="flex items-center gap-4 text-xs text-neutral-600 pt-1">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <strong>{doctor.rating}</strong> ({doctor.reviewCount} verified reviews)
              </span>
              <span>·</span>
              <span>{doctor.experienceYears} Years Experience</span>
            </div>
          </div>
        </div>

        {/* Body Details */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Biography */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#737373] mb-2">About The Doctor</h4>
            <p className="text-sm text-[#555555] leading-relaxed">
              {doctor.bio}
            </p>
          </div>

          {/* Clinical Focus Areas */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#737373] mb-2.5">Key Clinical Focus</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {doctor.focusAreas.map((area, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-neutral-700 bg-[#F7F5EF] p-2 rounded-lg">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Facility */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#F0EFEA] text-xs text-neutral-700">
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-[#171717]">
                <GraduationCap className="w-4 h-4 text-[#737373]" />
                <span>Education & Credentials</span>
              </div>
              <p className="text-neutral-600 pl-5.5">{doctor.education}</p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-[#171717]">
                <MapPin className="w-4 h-4 text-[#737373]" />
                <span>Hospital Location</span>
              </div>
              <p className="text-neutral-600 pl-5.5">{HOSPITAL_INFO.name}, Behind Ashirwad Lawn, Murtizapur</p>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <div className="flex items-center gap-1.5 font-semibold text-[#171717]">
                <Globe className="w-4 h-4 text-[#737373]" />
                <span>Consultation Languages</span>
              </div>
              <p className="text-neutral-600 pl-5.5">{doctor.languages.join(', ')}</p>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-[#E7E5DF] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-neutral-500">
              For direct queries, call hospital reception: <strong className="text-neutral-900">90755 69687</strong>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href="tel:9075569687"
                className="w-full sm:w-auto px-4 py-2.5 rounded-full border border-emerald-300 bg-emerald-50 text-xs font-semibold text-emerald-900 hover:bg-emerald-100 flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call 90755 69687</span>
              </a>
              <button
                onClick={() => {
                  onBook(doctor);
                  onClose();
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#171717] hover:bg-neutral-800 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
