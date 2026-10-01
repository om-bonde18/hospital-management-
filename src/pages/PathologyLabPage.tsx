import React, { useState } from 'react';
import { PATHOLOGY_TESTS, HOSPITAL_INFO } from '../data/mockData';
import { PathologyTest } from '../types';
import { 
  Microscope, 
  PhoneCall, 
  FileText, 
  Clock, 
  Home, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  Calendar,
  Share2
} from 'lucide-react';
import { savePathologyRequest } from '../lib/firebase';

export const PathologyLabPage: React.FC = () => {
  const [selectedTest, setSelectedTest] = useState<PathologyTest | null>(null);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    patientName: '',
    phone: '',
    address: '',
    testRequired: 'Complete Blood Count (CBC)',
    preferredDate: new Date().toISOString().split('T')[0]
  });

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await savePathologyRequest(bookingForm);
      setBookingSubmitted(true);
    } catch {
      setBookingSubmitted(true);
    }
  };

  return (
    <div className="w-full">
      {/* Top Banner / Header */}
      <section className="bg-linear-to-b from-[#F7F5EF] to-white border-b border-[#E7E5DF] py-12 sm:py-16 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#FFF4B8] border border-[#f0e39c] px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#171717]">
            <Microscope className="w-3.5 h-3.5" />
            <span>Murtizapur Diagnostic Center</span>
          </div>

          <div className="space-y-3">
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal text-[#171717] leading-tight">
              Dr. Bayaskar Pathology Lab
            </h1>
            <p className="text-base sm:text-lg text-[#555555] max-w-2xl leading-relaxed">
              Precision clinical laboratory diagnostics in Murtizapur. Offering CBC, KFT, LFT, Widal, routine metabolic screenings, convenient home sample collections, and quick digital E-reports.
            </p>
          </div>

          {/* Quick Highlight Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="bg-white p-5 rounded-2xl border border-[#E7E5DF] shadow-2xs space-y-1.5">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">Laboratory Contact</span>
              <div className="text-xl font-bold text-[#171717]">80105 76316</div>
              <p className="text-xs text-neutral-500">Call for test queries or home collection</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E7E5DF] shadow-2xs space-y-1.5">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">Working Hours</span>
              <div className="text-xl font-bold text-[#171717]">9:00 AM – 8:00 PM</div>
              <p className="text-xs text-neutral-500">Monday to Saturday</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E7E5DF] shadow-2xs space-y-1.5">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">Digital Delivery</span>
              <div className="text-xl font-bold text-[#171717]">E-Reports on Phone</div>
              <p className="text-xs text-neutral-500">Delivered directly via WhatsApp & Email</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid: Test Catalog & Home Collection Form */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-16">
        {/* Test Catalog */}
        <div className="space-y-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#737373] font-semibold">
              Diagnostic Scope
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#171717] mt-1">
              Available Clinical Pathology Tests
            </h2>
            <p className="text-sm text-[#555555] mt-1">
              Routine and specialized biochemical and hematological investigations with quality control standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PATHOLOGY_TESTS.map((test) => (
              <div
                key={test.id}
                className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E7E5DF] hover:border-[#171717] hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono px-2.5 py-1 rounded bg-[#F7F5EF] text-[#171717]">
                      {test.shortName}
                    </span>
                    <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {test.turnaroundTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#171717] leading-snug">
                    {test.name}
                  </h3>

                  <p className="text-xs text-[#555555] leading-relaxed">
                    {test.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0EFEA] flex items-center justify-between text-xs text-neutral-600">
                  <span>Sample: <strong>{test.sampleType}</strong></span>
                  <span className={`px-2 py-0.5 rounded text-[11px] ${test.fastingRequired ? 'bg-amber-100 text-amber-800' : 'bg-neutral-100 text-neutral-700'}`}>
                    {test.fastingRequired ? 'Fasting Required' : 'Non-Fasting'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Home Sample Collection Booking & Emergency Contact */}
        <div className="bg-[#FDFCF9] rounded-3xl border border-[#E7E5DF] p-6 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Info */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#737373] font-semibold">
                  Doorstep Convenience
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl text-[#171717] mt-1">
                  Home Sample Collection in Murtizapur
                </h2>
                <p className="text-sm text-[#555555] mt-2 leading-relaxed">
                  Elderly patients or individuals unable to visit the laboratory can request certified phlebotomists to collect blood and urine samples directly from home.
                </p>
              </div>

              <div className="space-y-3 text-xs text-neutral-700">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Sterile vacuum-sealed vacutainers used for all samples.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Digital E-Reports sent via WhatsApp within hours of testing.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Direct coordination with Dr. Tushar Bayaskar for clinical interpretation.</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="tel:8010576316"
                  className="inline-flex items-center gap-2 bg-[#171717] text-white text-xs font-semibold px-6 py-3.5 rounded-full hover:bg-neutral-800 transition-colors"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Direct Lab Desk: 80105 76316</span>
                </a>
              </div>
            </div>

            {/* Right Booking Form */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#E7E5DF] shadow-xs">
              {bookingSubmitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold font-editorial text-[#171717]">
                    Sample Request Registered
                  </h3>
                  <p className="text-xs text-[#555555] max-w-sm mx-auto">
                    Thank you, {bookingForm.patientName}. The Dr. Bayaskar Pathology Lab team will call <strong>{bookingForm.phone}</strong> to confirm the technician's arrival time.
                  </p>
                  <button
                    onClick={() => {
                      setBookingSubmitted(false);
                      setBookingForm({
                        patientName: '',
                        phone: '',
                        address: '',
                        testRequired: 'Complete Blood Count (CBC)',
                        preferredDate: new Date().toISOString().split('T')[0]
                      });
                    }}
                    className="text-xs font-semibold text-[#171717] underline"
                  >
                    Book Another Test
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="space-y-4">
                  <h3 className="text-lg font-bold font-editorial text-[#171717]">
                    Request Home Sample Collection
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
                        Patient Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={bookingForm.patientName}
                        onChange={e => setBookingForm({ ...bookingForm, patientName: e.target.value })}
                        placeholder="Patient Full Name"
                        className="w-full bg-[#F7F5EF] border border-[#E7E5DF] rounded-xl px-4 py-2.5 text-xs text-[#171717] focus:bg-white focus:border-[#171717] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
                        Contact Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={bookingForm.phone}
                        onChange={e => setBookingForm({ ...bookingForm, phone: e.target.value })}
                        placeholder="e.g. 9075569687"
                        className="w-full bg-[#F7F5EF] border border-[#E7E5DF] rounded-xl px-4 py-2.5 text-xs text-[#171717] focus:bg-white focus:border-[#171717] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
                        Test Required *
                      </label>
                      <select
                        value={bookingForm.testRequired}
                        onChange={e => setBookingForm({ ...bookingForm, testRequired: e.target.value })}
                        className="w-full bg-[#F7F5EF] border border-[#E7E5DF] rounded-xl px-4 py-2.5 text-xs text-[#171717] focus:bg-white focus:border-[#171717] outline-none"
                      >
                        {PATHOLOGY_TESTS.map(t => (
                          <option key={t.id} value={t.name}>{t.name}</option>
                        ))}
                        <option value="Complete Executive Health Profile">Complete Health Profile (CBC + KFT + LFT + Sugar)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        value={bookingForm.preferredDate}
                        onChange={e => setBookingForm({ ...bookingForm, preferredDate: e.target.value })}
                        className="w-full bg-[#F7F5EF] border border-[#E7E5DF] rounded-xl px-4 py-2.5 text-xs text-[#171717] focus:bg-white focus:border-[#171717] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
                      Collection Address in Murtizapur *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={bookingForm.address}
                      onChange={e => setBookingForm({ ...bookingForm, address: e.target.value })}
                      placeholder="House/Plot no., Landmark, Area in Murtizapur..."
                      className="w-full bg-[#F7F5EF] border border-[#E7E5DF] rounded-xl p-3 text-xs text-[#171717] focus:bg-white focus:border-[#171717] outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#171717] hover:bg-neutral-800 text-white text-xs font-semibold py-3 rounded-full transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Request Home Sample Collection</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
