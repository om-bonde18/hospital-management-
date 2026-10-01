import React from 'react';
import { ArrowRight, ShieldCheck, Award, HeartHandshake, Eye, CheckCircle2, Phone, MapPin, Navigation, Accessibility, Microscope } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/mockData';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full">
      {/* Top Banner */}
      <section className="bg-linear-to-b from-[#F7F5EF] to-white border-b border-[#E7E5DF] py-12 sm:py-16 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#737373] font-bold">
            Late Govardhanrao Bayaskar Memorial Hospital · Murtizapur
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal text-[#171717] leading-tight max-w-4xl">
            Where clinical medicine meets genuine community dedication.
          </h1>
          <p className="text-base sm:text-lg text-[#555555] max-w-3xl leading-relaxed">
            Established in honoring memory of Late Govardhanrao Bayaskar, our hospital provides accessible, dignifying healthcare to families across Murtizapur, Akola district, and neighboring Vidarbha communities.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-16">
        {/* Hospital Hero Card & Creed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 aspect-16/10 rounded-3xl overflow-hidden shadow-sm border border-[#E7E5DF]">
            <img
              src="/src/assets/images/hospital_building_1790875342234.jpg"
              alt="Late Govardhanrao Bayaskar Memorial Hospital Campus"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="lg:col-span-5 bg-[#FDFCF9] rounded-3xl p-8 border border-[#E7E5DF] space-y-6">
            <h3 className="text-2xl font-bold font-editorial text-[#171717]">Memorial Heritage & Vision</h3>
            <p className="text-sm text-[#555555] leading-relaxed">
              The hospital stands as a lasting monument of care in Ashirwad Nagar, Murtizapur. Spearheaded by Dr. Tushar Bayaskar (MBBS, MD Medicine), the institution emphasizes evidence-based clinical diagnostics, patient-friendly transparency, and round-the-clock emergency medical response.
            </p>
            <div className="space-y-3 pt-2 text-xs text-neutral-700">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Affordable ₹300 consultation fee for specialist MD physician care.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Wheelchair-accessible parking & entry/exit for mobility ease.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Associated Dr. Bayaskar Pathology Lab with home sample pickup.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 sm:p-10 rounded-3xl bg-[#F7F5EF] border border-[#ECE9E2]">
          <div>
            <div className="text-3xl sm:text-5xl font-bold font-editorial text-[#171717]">4.3 ⭐</div>
            <div className="text-xs text-[#737373] mt-1 font-semibold uppercase tracking-wider">Patient Trust Rating</div>
          </div>
          <div>
            <div className="text-3xl sm:text-5xl font-bold font-editorial text-[#171717]">₹300</div>
            <div className="text-xs text-[#737373] mt-1 font-semibold uppercase tracking-wider">Consultation Fee</div>
          </div>
          <div>
            <div className="text-3xl sm:text-5xl font-bold font-editorial text-[#171717]">24/7</div>
            <div className="text-xs text-[#737373] mt-1 font-semibold uppercase tracking-wider">Emergency & Admissions</div>
          </div>
          <div>
            <div className="text-3xl sm:text-5xl font-bold font-editorial text-[#171717]">7+</div>
            <div className="text-xs text-[#737373] mt-1 font-semibold uppercase tracking-wider">Medical Specialties</div>
          </div>
        </div>

        {/* Clinical Foundations */}
        <div className="space-y-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#737373] font-semibold">Hospital Services</span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#171717] mt-1">Our Core Commitments</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl bg-white border border-[#E7E5DF] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF4B8] flex items-center justify-center text-[#171717]">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#171717]">MD Physician Clinical Guidance</h3>
              <p className="text-sm text-[#555555] leading-relaxed">
                Consultant physician Dr. Tushar Bayaskar personally guides clinical workups, chronic management plans for diabetes and hypertension, and acute inpatient recoveries.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-[#E7E5DF] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#DFF5EE] flex items-center justify-center text-[#171717]">
                <Accessibility className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#171717]">Universal Accessibility</h3>
              <p className="text-sm text-[#555555] leading-relaxed">
                Hospital premises feature designated wheelchair-accessible parking and step-free entrance/exit ramps, ensuring elderly and infirm patients can access care without hindrance.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-[#E7E5DF] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F7F5EF] flex items-center justify-center text-[#171717]">
                <Microscope className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#171717]">Comprehensive Diagnostics</h3>
              <p className="text-sm text-[#555555] leading-relaxed">
                Integrated pathology services through Dr. Bayaskar Pathology Lab ensure timely CBC, KFT, LFT, Widal, and digital WhatsApp/email reports for fast clinical decision-making.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA banner */}
        <div className="bg-[#171717] text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold font-editorial">Have a medical question or need consultation?</h3>
            <p className="text-sm text-neutral-400">Call Dr. Bayaskar Hospital directly or schedule an appointment online.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="tel:9075569687"
              className="bg-white text-[#171717] font-semibold text-xs px-6 py-3.5 rounded-full hover:bg-neutral-100 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call 90755 69687</span>
            </a>
            <button
              onClick={() => onNavigate('/appointments')}
              className="bg-neutral-800 text-white font-semibold text-xs px-6 py-3.5 rounded-full hover:bg-neutral-700 transition-colors"
            >
              Book OPD
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
