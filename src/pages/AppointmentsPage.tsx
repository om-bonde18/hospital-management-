import React, { useState, useEffect } from 'react';
import { AppointmentForm } from '../components/AppointmentForm';
import { Appointment } from '../types';
import { Calendar, Clock, MapPin, CheckCircle, User, AlertCircle, Trash2, Phone, Navigation } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/mockData';
import { subscribeAppointments, deleteAppointment } from '../lib/firebase';

interface AppointmentsPageProps {
  initialDoctorId?: string;
  initialDepartment?: string;
}

export const AppointmentsPage: React.FC<AppointmentsPageProps> = ({
  initialDoctorId = 'dr-tushar-bayaskar',
  initialDepartment = 'General Medicine'
}) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeAppointments((list) => {
      setAppointments(list);
    });
    return () => unsubscribe();
  }, []);

  const handleCancel = async (id: string) => {
    await deleteAppointment(id);
  };

  return (
    <div className="w-full">
      {/* Top Banner */}
      <section className="bg-linear-to-b from-[#F7F5EF] to-white border-b border-[#E7E5DF] py-12 sm:py-16 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#737373] font-bold">
            Late Govardhanrao Bayaskar Memorial Hospital · Murtizapur
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal text-[#171717] leading-tight max-w-4xl">
            Book an appointment with ease.
          </h1>
          <p className="text-base sm:text-lg text-[#555555] max-w-3xl leading-relaxed">
            Reserve your consultation slot with Dr. Tushar Bayaskar (MBBS, MD Medicine) or select specialized hospital care. Consultation fee: ₹300 payable at OPD.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="tel:9075569687"
              className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-900 border border-emerald-200 px-4 py-2 rounded-full text-xs font-semibold"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Direct Phone Booking: 90755 69687</span>
            </a>
            <span className="text-xs text-neutral-500">OPD Timings: 11:00 AM – 5:00 PM</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-12">
        <div className="max-w-4xl mx-auto">
          <AppointmentForm
            initialDoctorId={initialDoctorId}
            initialDepartment={initialDepartment}
          />
        </div>

        {/* Active Scheduled Appointments Section (from localStorage) */}
        {appointments.length > 0 && (
          <div className="max-w-4xl mx-auto space-y-6 pt-8 border-t border-[#E7E5DF]">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold font-editorial text-[#171717]">
                Your Registered Hospital Consultations ({appointments.length})
              </h3>
              <span className="text-xs text-neutral-500">Stored locally in your browser</span>
            </div>

            <div className="space-y-4">
              {appointments.map((appt) => (
                <div 
                  key={appt.id}
                  className="bg-white rounded-2xl p-6 border border-[#E7E5DF] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded">
                        {appt.id}
                      </span>
                      <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                        {appt.status}
                      </span>
                      <span className="text-xs font-bold text-[#171717] bg-[#FFF4B8] px-2 py-0.5 rounded">
                        Fee: ₹300
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-[#171717]">
                      {appt.doctorName} · {appt.department}
                    </h4>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 pt-1">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {appt.patientName}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {appt.date}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {appt.time}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleCancel(appt.id)}
                      className="text-xs text-red-600 hover:text-red-800 hover:bg-red-50 p-2.5 rounded-full transition-colors"
                      title="Cancel Appointment"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Location & Arrival Information Box */}
        <div className="max-w-4xl mx-auto bg-[#FDFCF9] rounded-2xl p-6 border border-[#E7E5DF] flex items-start gap-3 text-xs text-neutral-600">
          <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-neutral-900 block font-semibold">Location & Arrival Note:</strong>
            <p>
              Late Govardhanrao Bayaskar Memorial Hospital is located Behind Ashirwad Lawn, Ashirwad Nagar, Murtizapur, Akola – 444107. Wheelchair-accessible ramp and parking available. Please arrive 10 minutes prior to your preferred time slot.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
