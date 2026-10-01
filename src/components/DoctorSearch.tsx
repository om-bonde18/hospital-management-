import React, { useState } from 'react';
import { DOCTORS, HOSPITAL_INFO } from '../data/mockData';
import { Doctor } from '../types';
import { DoctorCard } from './DoctorCard';
import { Search, Clock, Phone, MapPin, CheckCircle, ShieldCheck } from 'lucide-react';

interface DoctorSearchProps {
  onViewProfile: (doctor: Doctor) => void;
  onBookAppointment: (doctor: Doctor) => void;
}

export const DoctorSearch: React.FC<DoctorSearchProps> = ({
  onViewProfile,
  onBookAppointment
}) => {
  const doctor = DOCTORS[0]; // Dr. Tushar Bayaskar
  const [searchTerm, setSearchTerm] = useState('');

  const matches = !searchTerm.trim() || 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.focusAreas.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="w-full">
      {/* Search Header Bar */}
      <div className="bg-[#FDFCF9] rounded-3xl p-6 sm:p-8 border border-[#E7E5DF] mb-8">
        <div className="relative">
          <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Dr. Tushar Bayaskar's clinical focus (e.g. fever, diabetes, hypertension, general checkup)..."
            className="w-full bg-white border border-[#E7E5DF] rounded-2xl pl-12 pr-4 py-3 text-sm text-[#171717] placeholder-neutral-400 focus:border-[#171717] outline-none shadow-xs"
          />
        </div>

        {/* Quick Filter Tags */}
        <div className="mt-4 flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-neutral-500 font-medium">Quick Clinical Tags:</span>
          {['Fever Workup', 'Diabetes Management', 'Hypertension & BP', 'Inpatient Care', 'Routine Checkup'].map((tag, i) => (
            <button
              key={i}
              onClick={() => setSearchTerm(tag)}
              className="bg-white hover:bg-[#EBE8DF] border border-[#E7E5DF] px-3 py-1 rounded-full text-neutral-700 transition-colors"
            >
              {tag}
            </button>
          ))}
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-neutral-500 hover:text-neutral-900 underline ml-2"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Doctor Display */}
      {matches ? (
        <div className="max-w-2xl mx-auto">
          <DoctorCard
            doctor={doctor}
            onViewProfile={onViewProfile}
            onBookAppointment={onBookAppointment}
          />
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#E7E5DF]">
          <p className="text-base text-neutral-600 mb-3">
            No specific clinical tag matched "{searchTerm}".
          </p>
          <button
            onClick={() => setSearchTerm('')}
            className="px-5 py-2.5 bg-[#171717] text-white text-xs font-semibold rounded-full hover:bg-neutral-800"
          >
            Show Dr. Tushar Bayaskar Profile
          </button>
        </div>
      )}
    </div>
  );
};
