import React from 'react';
import { Doctor } from '../types';
import { Calendar, Star, ArrowUpRight, Clock, Banknote, Phone, Stethoscope, Award } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
  onViewProfile: (doctor: Doctor) => void;
  onBookAppointment: (doctor: Doctor) => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  onViewProfile,
  onBookAppointment
}) => {
  return (
    <article className="group bg-white rounded-3xl border border-[#E7E5DF] overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      <div>
        {/* Doctor Header / Seal or Photo */}
        {doctor.image ? (
          <div className="relative aspect-4/3 overflow-hidden bg-neutral-100">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-full object-contain p-2"
              loading="lazy"
            />
            {doctor.consultationFee && (
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs text-[#171717] px-3 py-1 rounded-full text-xs font-bold border border-white/40 shadow-xs flex items-center gap-1">
                <span>Fee: {doctor.consultationFee}</span>
              </div>
            )}
            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-[#171717] px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border border-white/40 shadow-xs">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{doctor.rating}</span>
            </div>
          </div>
        ) : (
          <div className="relative p-7 bg-linear-to-br from-[#171717] to-neutral-800 text-white flex flex-col justify-between min-h-48">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-center border border-white/20">
                <Stethoscope className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  Verified MD
                </span>
                <span className="text-[11px] font-bold bg-amber-400 text-neutral-900 px-2.5 py-0.5 rounded-full">
                  {doctor.consultationFee}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                Consultant Physician
              </span>
              <h3 className="font-editorial text-2xl font-bold text-white mt-0.5">
                {doctor.name}
              </h3>
              <p className="text-xs text-neutral-300 font-sans mt-0.5">
                {doctor.title} · 12 Yrs Exp.
              </p>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-2 text-xs text-[#737373] mb-1.5 font-medium">
            <span>{doctor.specialty}</span>
            <span>·</span>
            <span className="flex items-center gap-1 text-emerald-700">
              <Clock className="w-3 h-3" />
              {doctor.availability}
            </span>
          </div>

          <h3 className="text-xl font-bold text-[#171717] group-hover:text-black transition-colors">
            {doctor.name}
          </h3>
          <p className="text-xs text-[#737373] mt-0.5 mb-2">{doctor.title}</p>

          {doctor.consultationTiming && (
            <div className="p-2.5 rounded-xl bg-[#F7F5EF] text-[11px] text-[#403B26] font-medium mb-3 flex items-center gap-2 border border-[#ECE8DC]">
              <Clock className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>OPD Timings: <strong>{doctor.consultationTiming}</strong></span>
            </div>
          )}

          <p className="text-sm text-[#555555] line-clamp-2 leading-relaxed">
            {doctor.bio}
          </p>

          {/* Focus Areas */}
          <div className="mt-4 pt-4 border-t border-[#F0EFEA] flex flex-wrap gap-1.5">
            {doctor.focusAreas.slice(0, 2).map((area, i) => (
              <span key={i} className="text-[11px] text-[#555555] bg-[#F7F5EF] px-2.5 py-0.5 rounded-full">
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 pt-0 grid grid-cols-2 gap-2.5">
        <button
          onClick={() => onViewProfile(doctor)}
          className="w-full text-xs font-semibold py-2.5 px-3 rounded-full border border-[#E7E5DF] text-[#171717] hover:bg-[#F7F5EF] transition-colors text-center"
        >
          View Profile
        </button>

        <button
          onClick={() => onBookAppointment(doctor)}
          className="w-full text-xs font-semibold py-2.5 px-3 rounded-full bg-[#171717] text-white hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5 text-center"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book OPD</span>
        </button>
      </div>
    </article>
  );
};
