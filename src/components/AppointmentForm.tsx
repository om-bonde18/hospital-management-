import React, { useState } from 'react';
import { DOCTORS, SERVICES, HOSPITAL_INFO } from '../data/mockData';
import { Doctor, Appointment } from '../types';
import { Calendar, Clock, CheckCircle2, User, Mail, Phone, FileText, ArrowRight, Banknote, MapPin } from 'lucide-react';
import { saveAppointment } from '../lib/firebase';

interface AppointmentFormProps {
  initialDoctorId?: string;
  initialDepartment?: string;
  onAppointmentBooked?: (appointment: Appointment) => void;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  initialDoctorId = 'dr-tushar-bayaskar',
  initialDepartment = 'General Medicine',
  onAppointmentBooked
}) => {
  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    phone: '',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '11:30 AM',
    department: initialDepartment || 'General Medicine',
    doctorId: initialDoctorId || 'dr-tushar-bayaskar',
    reason: ''
  });

  const [submittedAppointment, setSubmittedAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const selectedDoc = DOCTORS.find(d => d.id === formData.doctorId);
      const doctorName = selectedDoc ? selectedDoc.name : 'Dr. Tushar Bayaskar (MD Medicine)';

      const newAppt: Appointment = {
        id: 'LGB-' + Math.floor(100000 + Math.random() * 900000),
        patientName: formData.patientName,
        email: formData.email,
        phone: formData.phone,
        department: formData.department,
        doctorId: formData.doctorId,
        doctorName: doctorName,
        date: formData.date,
        time: formData.time,
        reason: formData.reason || 'General Consultation',
        status: 'Pending',
        createdAt: new Date().toISOString()
      };

      // Save to Firebase Firestore & local state
      await saveAppointment(newAppt);

      setLoading(false);
      setSubmittedAppointment(newAppt);
      if (onAppointmentBooked) {
        onAppointmentBooked(newAppt);
      }
    } catch (err) {
      console.error('Error saving appointment:', err);
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmittedAppointment(null);
    setFormData({
      patientName: '',
      email: '',
      phone: '',
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      time: '11:30 AM',
      department: 'General Medicine',
      doctorId: 'dr-tushar-bayaskar',
      reason: ''
    });
  };

  if (submittedAppointment) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E7E5DF] text-center max-w-xl mx-auto shadow-sm animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold font-editorial text-[#171717] mb-2">
          Appointment Request Received
        </h3>
        <p className="text-sm text-[#555555] leading-relaxed max-w-md mx-auto mb-6">
          We'll contact you shortly at <strong>{submittedAppointment.phone}</strong> to confirm your consultation time at Late Govardhanrao Bayaskar Memorial Hospital.
        </p>

        {/* Summary Card */}
        <div className="bg-[#F7F5EF] p-6 rounded-2xl border border-[#ECE9E2] text-left text-xs space-y-3 mb-6">
          <div className="flex justify-between border-b border-[#E3E0D6] pb-2">
            <span className="text-[#737373]">Reference ID</span>
            <span className="font-mono font-bold text-[#171717]">{submittedAppointment.id}</span>
          </div>
          <div className="flex justify-between border-b border-[#E3E0D6] pb-2">
            <span className="text-[#737373]">Patient Name</span>
            <span className="font-semibold text-[#171717]">{submittedAppointment.patientName}</span>
          </div>
          <div className="flex justify-between border-b border-[#E3E0D6] pb-2">
            <span className="text-[#737373]">Doctor / Service</span>
            <span className="font-semibold text-[#171717]">
              {submittedAppointment.doctorName}
            </span>
          </div>
          <div className="flex justify-between border-b border-[#E3E0D6] pb-2">
            <span className="text-[#737373]">Consultation Fee</span>
            <span className="font-bold text-emerald-800">₹300 (Payable at hospital OPD)</span>
          </div>
          <div className="flex justify-between border-b border-[#E3E0D6] pb-2">
            <span className="text-[#737373]">Date & Time</span>
            <span className="font-semibold text-[#171717]">
              {submittedAppointment.date} at {submittedAppointment.time}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#737373]">Hospital Location</span>
            <span className="font-medium text-[#171717]">Behind Ashirwad Lawn, Murtizapur</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleReset}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#171717] hover:bg-neutral-800 text-white text-xs font-semibold transition-colors"
          >
            Book Another Consultation
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E7E5DF] shadow-sm">
      <div className="mb-6 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-xl sm:text-2xl font-bold font-editorial text-[#171717]">
            Schedule Your Hospital Consultation
          </h3>
          <span className="bg-[#FFF4B8] text-[#171717] font-bold text-xs px-3 py-1 rounded-full border border-[#f0e39c]">
            Listed Fee: ₹300
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#555555]">
          Dr. Tushar Bayaskar (MBBS, MD Medicine) OPD: 11:00 AM – 5:00 PM. Emergency & IPD open 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        {/* Patient Name */}
        <div>
          <label className="block text-xs font-semibold text-[#171717] uppercase tracking-wider mb-2">
            Full Patient Name *
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              required
              value={formData.patientName}
              onChange={e => setFormData({ ...formData, patientName: e.target.value })}
              placeholder="e.g. Rameshwar Patil"
              className="w-full bg-[#F7F5EF] border border-[#E7E5DF] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#171717] focus:bg-white focus:border-[#171717] outline-none transition-colors"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-[#171717] uppercase tracking-wider mb-2">
            Contact Phone Number *
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              placeholder="e.g. 9075569687"
              className="w-full bg-[#F7F5EF] border border-[#E7E5DF] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#171717] focus:bg-white focus:border-[#171717] outline-none transition-colors"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-[#171717] uppercase tracking-wider mb-2">
            Email Address (Optional)
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              placeholder="patient@gmail.com"
              className="w-full bg-[#F7F5EF] border border-[#E7E5DF] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#171717] focus:bg-white focus:border-[#171717] outline-none transition-colors"
            />
          </div>
        </div>

        {/* Department */}
        <div>
          <label className="block text-xs font-semibold text-[#171717] uppercase tracking-wider mb-2">
            Medical Specialty / Department *
          </label>
          <select
            value={formData.department}
            onChange={e => setFormData({ ...formData, department: e.target.value })}
            className="w-full bg-[#F7F5EF] border border-[#E7E5DF] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:bg-white focus:border-[#171717] outline-none transition-colors"
          >
            {SERVICES.map(s => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Doctor Selection */}
        <div>
          <label className="block text-xs font-semibold text-[#171717] uppercase tracking-wider mb-2">
            Consulting Physician *
          </label>
          <select
            value={formData.doctorId}
            onChange={e => setFormData({ ...formData, doctorId: e.target.value })}
            className="w-full bg-[#F7F5EF] border border-[#E7E5DF] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:bg-white focus:border-[#171717] outline-none transition-colors"
          >
            {DOCTORS.map(doc => (
              <option key={doc.id} value={doc.id}>
                {doc.name} ({doc.specialty})
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-xs font-semibold text-[#171717] uppercase tracking-wider mb-2">
            Preferred Date *
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
            <input
              type="date"
              required
              min={new Date().toISOString().split('T')[0]}
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
              className="w-full bg-[#F7F5EF] border border-[#E7E5DF] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#171717] focus:bg-white focus:border-[#171717] outline-none transition-colors"
            />
          </div>
        </div>

        {/* Preferred Time */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-[#171717] uppercase tracking-wider mb-2">
            Preferred Time Slot (Dr. Bayaskar OPD: 11 AM – 5 PM) *
          </label>
          <div className="relative">
            <Clock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
            <select
              value={formData.time}
              onChange={e => setFormData({ ...formData, time: e.target.value })}
              className="w-full bg-[#F7F5EF] border border-[#E7E5DF] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#171717] focus:bg-white focus:border-[#171717] outline-none transition-colors"
            >
              {[
                '11:00 AM', 
                '11:30 AM', 
                '12:00 PM', 
                '12:30 PM', 
                '01:00 PM', 
                '02:00 PM', 
                '02:30 PM', 
                '03:00 PM', 
                '03:30 PM', 
                '04:00 PM', 
                '04:30 PM'
              ].map((slot, i) => (
                <option key={i} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Reason for Visit */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-[#171717] uppercase tracking-wider mb-2">
            Clinical Symptoms or Inquiries (Optional)
          </label>
          <textarea
            rows={3}
            value={formData.reason}
            onChange={e => setFormData({ ...formData, reason: e.target.value })}
            placeholder="Briefly state symptoms (e.g. fever, blood pressure checkup, chest discomfort, or lab review)..."
            className="w-full bg-[#F7F5EF] border border-[#E7E5DF] rounded-xl p-3 text-sm text-[#171717] focus:bg-white focus:border-[#171717] outline-none transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#F0EFEA]">
        <div className="text-xs text-[#737373] text-left">
          Direct telephone booking also available: <a href="tel:9075569687" className="font-bold text-[#171717] underline">90755 69687</a>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#171717] hover:bg-neutral-800 text-white text-xs font-semibold px-8 py-3.5 rounded-full transition-all duration-200 disabled:opacity-50"
        >
          {loading ? (
            <span>Registering Appointment...</span>
          ) : (
            <>
              <span>Confirm OPD Appointment (₹300)</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};
