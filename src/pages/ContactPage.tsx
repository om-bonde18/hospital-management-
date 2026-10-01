import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, AlertCircle, Check, Send, Navigation, Microscope } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/mockData';
import { saveContactMessage } from '../lib/firebase';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveContactMessage(form);
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
  };

  return (
    <div className="w-full">
      {/* Top Banner */}
      <section className="bg-linear-to-b from-[#F7F5EF] to-white border-b border-[#E7E5DF] py-12 sm:py-16 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#737373] font-bold">
            Late Govardhanrao Bayaskar Memorial Hospital · Contact & Inquiries
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal text-[#171717] leading-tight max-w-4xl">
            We are here to assist your healthcare journey.
          </h1>
          <p className="text-base sm:text-lg text-[#555555] max-w-3xl leading-relaxed">
            Reach out to our clinical reception, doctor consultation desk, or Dr. Bayaskar Pathology Lab. We ensure prompt and courteous responses.
          </p>
        </div>
      </section>

      {/* Main Grid: Info + Contact Form */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FDFCF9] rounded-3xl p-8 border border-[#E7E5DF] space-y-6">
              <h3 className="text-xl font-bold font-editorial text-[#171717]">Direct Contact Channels</h3>

              <div className="space-y-4 text-sm text-[#555555]">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-emerald-700 shrink-0 mt-1" />
                  <div>
                    <strong className="text-[#171717] block">Main Hospital & Doctor Line</strong>
                    <a href="tel:9075569687" className="text-emerald-700 font-semibold hover:underline">
                      +91 90755 69687
                    </a>
                    <span className="block text-xs text-neutral-500 mt-0.5">Associated with Dr. Tushar Bayaskar & Hospital</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Microscope className="w-4 h-4 text-neutral-900 shrink-0 mt-1" />
                  <div>
                    <strong className="text-[#171717] block">Dr. Bayaskar Pathology Lab</strong>
                    <a href="tel:8010576316" className="text-neutral-900 font-semibold hover:underline">
                      +91 80105 76316
                    </a>
                    <span className="block text-xs text-neutral-500 mt-0.5">Mon–Sat: 9:00 AM – 8:00 PM (Home sample collection)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#171717] shrink-0 mt-1" />
                  <div>
                    <strong className="text-[#171717] block">Official Email</strong>
                    <a href="mailto:bayaskartushar2020@gmail.com" className="text-neutral-700 hover:underline">
                      bayaskartushar2020@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#171717] shrink-0 mt-1" />
                  <div>
                    <strong className="text-[#171717] block">Hospital Location</strong>
                    Behind Ashirwad Lawn, Ashirwad Nagar, Murtizapur, Akola, Maharashtra – 444107
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#171717] shrink-0 mt-1" />
                  <div>
                    <strong className="text-[#171717] block">Consultation & Hospital Timings</strong>
                    Dr. Tushar Bayaskar OPD: 11:00 AM – 5:00 PM (Fee: ₹300) <br />
                    Emergency & IPD Admissions: Open 24 Hours
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={HOSPITAL_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#171717] text-white text-xs font-semibold py-3 rounded-full hover:bg-neutral-800 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-amber-300" />
                  <span>Open Directions on Google Maps</span>
                </a>
              </div>
            </div>

            <div className="bg-[#F7F5EF] rounded-3xl p-6 border border-[#ECE9E2] text-xs text-neutral-700 space-y-1.5">
              <strong className="block text-[#171717] font-semibold">Wheelchair Accessibility Note:</strong>
              <p>The hospital entrance and vehicle drop-off area are ramped and barrier-free for wheelchair users and stretcher access.</p>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#E7E5DF] shadow-2xs">
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-editorial text-[#171717]">Message Received</h3>
                <p className="text-sm text-[#555555] max-w-sm mx-auto">
                  Thank you for reaching out to Late Govardhanrao Bayaskar Memorial Hospital. Our administrative desk will respond to your inquiry shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-semibold text-[#171717] underline hover:text-neutral-600"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold font-editorial text-[#171717]">
                  Send a Message to the Hospital
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Rameshwar Patil"
                      className="w-full bg-[#F7F5EF] border border-[#E7E5DF] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:bg-white focus:border-[#171717] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      placeholder="e.g. 9075569687"
                      className="w-full bg-[#F7F5EF] border border-[#E7E5DF] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:bg-white focus:border-[#171717] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="yourname@gmail.com"
                      className="w-full bg-[#F7F5EF] border border-[#E7E5DF] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:bg-white focus:border-[#171717] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
                      Inquiry Topic
                    </label>
                    <select
                      value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-[#F7F5EF] border border-[#E7E5DF] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:bg-white focus:border-[#171717] outline-none"
                    >
                      <option value="General Inquiry">General Doctor Inquiry</option>
                      <option value="OPD Consultation">Dr. Tushar Bayaskar OPD (₹300)</option>
                      <option value="Pathology Testing">Bayaskar Pathology Lab (80105 76316)</option>
                      <option value="Emergency Admission">Emergency & Inpatient Beds</option>
                      <option value="Location & Directions">Location Behind Ashirwad Lawn</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="How can our hospital desk or pathology laboratory assist you?"
                    className="w-full bg-[#F7F5EF] border border-[#E7E5DF] rounded-xl p-3 text-sm text-[#171717] focus:bg-white focus:border-[#171717] outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#171717] hover:bg-neutral-800 text-white text-xs font-semibold px-8 py-3.5 rounded-full transition-colors"
                >
                  <span>Submit Message to Hospital</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
};
