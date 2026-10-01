import React from 'react';
import { MedicalService } from '../types';
import { X, CheckCircle, Clock, UserCheck, Calendar, ArrowRight } from 'lucide-react';

interface ServiceModalProps {
  service: MedicalService | null;
  onClose: () => void;
  onBookAppointment: (departmentName: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose, onBookAppointment }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E7E5DF] relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors"
          aria-label="Close Service Overview"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 border-b border-[#E7E5DF] bg-[#FDFCF9]">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#737373]">
            Clinical Department
          </span>
          <h2 id="service-modal-title" className="text-2xl sm:text-3xl font-bold text-[#171717] mt-1">
            {service.name}
          </h2>
          <p className="text-sm text-[#555555] mt-1.5 leading-relaxed">
            {service.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-600 mt-4">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-neutral-500" />
              Avg. Intake: <strong>{service.averageWaitTime}</strong>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-neutral-500" />
              Department Head: <strong>{service.departmentHead}</strong>
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#737373] mb-2.5">
              Overview & Clinical Methodology
            </h4>
            <p className="text-sm text-[#555555] leading-relaxed">
              {service.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#737373] mb-3">
              Key Diagnostic & Treatment Procedures
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.treatments.map((treatment, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F7F5EF] border border-[#ECE9E2]">
                  <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-neutral-800 leading-snug">{treatment}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 text-xs text-amber-900 leading-relaxed">
            All appointments in this department include comprehensive baseline review, dedicated diagnostic review, and direct follow-up access through our patient portal.
          </div>

          <div className="pt-4 border-t border-[#E7E5DF] flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-[#E7E5DF] text-xs font-semibold text-neutral-800 hover:bg-neutral-50"
            >
              Back to Services
            </button>
            <button
              onClick={() => {
                onBookAppointment(service.name);
                onClose();
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#171717] hover:bg-neutral-800 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Book In {service.name}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
