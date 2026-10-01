import React, { useState } from 'react';
import { DOCTORS, SERVICES, TESTIMONIALS, LOCATIONS, BLOG_POSTS, INITIAL_FEATURE_CARDS, HOSPITAL_INFO } from '../data/mockData';
import { Doctor, MedicalService, BlogPost, HospitalLocation } from '../types';
import { HeroDecorativeElement } from '../components/HeroDecorativeElement';
import { ServiceCard } from '../components/ServiceCard';
import { DoctorCard } from '../components/DoctorCard';
import { DoctorSearch } from '../components/DoctorSearch';
import { AppointmentForm } from '../components/AppointmentForm';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Star, 
  Check, 
  ShieldCheck, 
  Users, 
  Activity, 
  Clock, 
  Award, 
  Sparkles,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Send,
  Navigation,
  Microscope,
  Accessibility,
  Calendar,
  Stethoscope
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onSelectDoctor: (doctor: Doctor) => void;
  onSelectService: (service: MedicalService) => void;
  onSelectArticle: (post: BlogPost) => void;
  onBookDoctor: (doctor: Doctor) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectDoctor,
  onSelectService,
  onSelectArticle,
  onBookDoctor
}) => {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full space-y-16 sm:space-y-24">
      
      {/* ==================================================================== */}
      {/* 6. HERO SECTION & 7. HERO DECORATIVE ELEMENT & 8. HERO STATISTICS */}
      {/* ==================================================================== */}
      <section className="w-full bg-linear-to-b from-[#FAF7EE]/60 via-[#F7F5EF]/30 to-white pt-8 sm:pt-14 pb-12 sm:pb-16 px-4 sm:px-8 lg:px-12 border-b border-[#E7E5DF]">
        <div className="max-w-7xl mx-auto">
          
          {/* Hospital Header Pill Badge */}
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 bg-[#FFF4B8] border border-[#f0e39c] px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#171717]">
              <span className="flex items-center gap-1 text-amber-900">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <strong>4.3</strong>
              </span>
              <span>·</span>
              <span>Hospital</span>
              <span>·</span>
              <span className="text-emerald-800 font-bold">Open 24/7 (Admissions)</span>
            </div>

            <a
              href={HOSPITAL_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#F7F5EF] hover:bg-[#EBE8DF] border border-[#E7E5DF] px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#171717] transition-colors"
            >
              <Navigation className="w-3.5 h-3.5 text-blue-600" />
              <span>Behind Ashirwad Lawn, Murtizapur</span>
            </a>

            <a
              href="tel:9075569687"
              className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-900 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>Call: 90755 69687</span>
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* LEFT SIDE: Large editorial headline, verified doctor badge, CTA, and dual stats */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest text-[#737373] font-bold">
                  Late Govardhanrao Bayaskar Memorial Hospital
                </span>
                <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-[74px] font-normal tracking-tight text-[#171717] leading-[1.05]">
                  We care for your <br />
                  <span className="italic font-normal">health every day</span>
                </h1>
              </div>

              <div className="p-4 rounded-2xl bg-[#FDFCF9] border border-[#E7E5DF] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#171717]">
                    Dr. Tushar Bayaskar — MBBS, MD (Medicine)
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    OPD: 11 AM – 5 PM
                  </span>
                </div>
                <p className="text-xs text-[#555555]">
                  Consultant Physician · Consultation Fee: <strong>₹300</strong> · Phone: <strong>90755 69687</strong>
                </p>
              </div>

              <p className="text-base sm:text-lg text-[#555555] max-w-lg leading-relaxed font-sans">
                Experience trusted healthcare in Murtizapur with experienced medical consultation, 24/7 emergency & critical care, and Dr. Bayaskar Pathology Lab.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  onClick={() => onNavigate('/appointments')}
                  className="bg-[#171717] hover:bg-[#2e2e2e] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase px-7 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 inline-flex items-center gap-2 group"
                >
                  <span>BOOK AN APPOINTMENT</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => scrollToSection('doctor-search')}
                  className="text-xs sm:text-sm font-semibold text-[#171717] hover:text-neutral-600 underline underline-offset-8 transition-colors py-2 px-1"
                >
                  FIND A DOCTOR
                </button>

                <button
                  onClick={() => onNavigate('/pathology-lab')}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#171717] bg-[#FFF4B8] hover:bg-[#fae98f] px-5 py-3 rounded-full transition-colors"
                >
                  <Microscope className="w-4 h-4" />
                  <span>Bayaskar Pathology Lab</span>
                </button>
              </div>

              {/* HERO STATISTICS */}
              <div className="pt-6 sm:pt-8 grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch border-t border-[#E7E5DF]">
                
                {/* Statistic 1: Pale yellow card with avatars */}
                <div className="sm:col-span-7 bg-[#FFF4B8] border border-[#f0e39c] rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-2xs">
                  <div className="space-y-1">
                    <div className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight font-sans">
                      2148
                    </div>
                    <p className="text-xs font-medium text-[#403B26] leading-tight">
                      Patients Took a Step Toward Wellness Today
                    </p>
                  </div>
                  
                  {/* Tiny patient avatars */}
                  <div className="flex -space-x-2 shrink-0 ml-auto">
                    <img
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120"
                      alt="Patient"
                    />
                    <img
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
                      alt="Patient"
                    />
                    <img
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120"
                      alt="Patient"
                    />
                  </div>
                </div>

                {/* Statistic 2: Simple text without a large card */}
                <div className="sm:col-span-5 flex flex-col justify-center px-4 py-2 sm:py-0">
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight font-sans">
                    800+
                  </div>
                  <p className="text-xs text-[#555555] font-medium leading-tight mt-1">
                    Users Got Matched With a Doctor Today
                  </p>
                </div>

              </div>
            </div>

            {/* RIGHT SIDE: Hospital Overview Card + Explore Service badge */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl sm:rounded-[36px] overflow-hidden shadow-sm border border-[#E7E5DF] bg-[#FDFCF9] p-7 sm:p-10 flex flex-col justify-between min-h-[420px]">
                {/* Background subtle decorative radial gradient */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-amber-100/40 via-transparent to-transparent pointer-events-none rounded-full blur-2xl" />
                
                {/* Top bar with Hospital Status & Rating */}
                <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-[#F0EFEA] pb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      Open 24/7 Admissions & Emergency
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#FFF4B8] border border-[#f0e39c] px-3 py-1 rounded-full text-xs font-bold text-[#171717]">
                    <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                    <span>4.3 ⭐ (Verified Hospital)</span>
                  </div>
                </div>

                {/* Center Content */}
                <div className="relative space-y-4 my-5">
                  <span className="text-xs uppercase tracking-widest text-[#737373] font-bold">
                    Murtizapur · Akola District · Maharashtra
                  </span>
                  <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-[#171717] leading-tight">
                    Late Govardhanrao Bayaskar Memorial Hospital
                  </h3>
                  <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                    Behind Ashirwad Lawn, Ashirwad Nagar, Murtizapur – 444107. Compassionate healthcare combining consultant physician OPD, round-the-clock emergency admissions, and full diagnostic pathology.
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="bg-white p-4 rounded-2xl border border-[#E7E5DF] space-y-1">
                      <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">Consulting Physician</span>
                      <strong className="text-sm text-[#171717] block">Dr. Tushar Bayaskar</strong>
                      <span className="text-xs text-emerald-700 font-medium block">OPD: 11 AM – 5 PM · Fee: ₹300</span>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-[#E7E5DF] space-y-1">
                      <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">Pathology Diagnostic Lab</span>
                      <strong className="text-sm text-[#171717] block">Dr. Bayaskar Pathology Lab</strong>
                      <span className="text-xs text-neutral-600 font-medium block">CBC, KFT, LFT, Widal · 80105 76316</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Navigation & Directions */}
                <div className="relative pt-4 border-t border-[#F0EFEA] flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-neutral-600 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                    <span>Behind Ashirwad Lawn · Wheelchair Ramp Entry</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={HOSPITAL_INFO.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#171717] text-white text-xs font-semibold px-4 py-2.5 rounded-full hover:bg-neutral-800 transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <Navigation className="w-3.5 h-3.5 text-amber-300" />
                      <span>Directions</span>
                    </a>
                    <a
                      href="tel:9075569687"
                      className="bg-[#F7F5EF] hover:bg-[#EBE8DF] border border-[#E7E5DF] text-[#171717] text-xs font-semibold px-4 py-2.5 rounded-full transition-colors flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Call Reception</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Circular Explore Service floating element at top-left */}
              <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6">
                <HeroDecorativeElement onClick={() => scrollToSection('services-section')} />
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ==================================================================== */}
      {/* 9. FEATURE CARDS (4 horizontal cards under hero) */}
      {/* ==================================================================== */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Dr. Tushar Bayaskar Consulting */}
          <div 
            onClick={() => onNavigate('/doctors')}
            className="group relative h-72 sm:h-80 rounded-2xl sm:rounded-3xl p-6 flex flex-col justify-between cursor-pointer border border-[#f0e39c] bg-[#FFF9E8] hover:bg-[#FFF4D6] shadow-2xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-bold text-amber-900 bg-amber-200/80 px-2.5 py-1 rounded-full">
                Consultant Physician
              </span>
              <div className="w-9 h-9 rounded-full bg-white/80 border border-amber-200 flex items-center justify-center text-neutral-800 group-hover:bg-[#171717] group-hover:text-white transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-xs border border-amber-200 text-neutral-900">
                <Users className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="text-xl font-bold font-editorial text-[#171717] leading-snug">
                Dr. Tushar Bayaskar <br />
                <span className="text-sm font-sans font-semibold text-neutral-600">MBBS, MD (Medicine)</span>
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                OPD: 11:00 AM – 5:00 PM · Listed Fee: ₹300. Daily clinical consultations & inpatient care.
              </p>
            </div>
          </div>

          {/* Card 2: 24/7 Emergency & Critical Care */}
          <div 
            onClick={() => onNavigate('/services')}
            className="group relative h-72 sm:h-80 rounded-2xl sm:rounded-3xl p-6 flex flex-col justify-between cursor-pointer border border-emerald-200 bg-[#EBF7F2] hover:bg-[#E2F4EC] shadow-2xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-900 bg-emerald-200/80 px-2.5 py-1 rounded-full">
                24/7 Admissions
              </span>
              <div className="w-9 h-9 rounded-full bg-white/80 border border-emerald-200 flex items-center justify-center text-neutral-800 group-hover:bg-[#171717] group-hover:text-white transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-xs border border-emerald-200 text-neutral-900">
                <Activity className="w-5 h-5 text-emerald-700" />
              </div>
              <h3 className="text-xl font-bold font-editorial text-[#171717] leading-tight">
                Critical Care & Inpatient Units
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Continuous vital monitoring, oxygen support, acute fever triage & emergency patient beds.
              </p>
            </div>
          </div>

          {/* Card 3: Dr. Bayaskar Pathology Lab */}
          <div 
            onClick={() => onNavigate('/pathology-lab')}
            className="group relative h-72 sm:h-80 rounded-2xl sm:rounded-3xl p-6 flex flex-col justify-between cursor-pointer border border-blue-200 bg-[#F0F5FA] hover:bg-[#E6EFF8] shadow-2xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-bold text-blue-900 bg-blue-200/80 px-2.5 py-1 rounded-full">
                Lab: 80105 76316
              </span>
              <div className="w-9 h-9 rounded-full bg-white/80 border border-blue-200 flex items-center justify-center text-neutral-800 group-hover:bg-[#171717] group-hover:text-white transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-xs border border-blue-200 text-neutral-900">
                <Microscope className="w-5 h-5 text-blue-700" />
              </div>
              <h3 className="text-xl font-bold font-editorial text-[#171717] leading-tight">
                Dr. Bayaskar Pathology Lab
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                CBC, KFT, LFT, Widal test. Home sample pickup & fast digital WhatsApp/Email E-reports.
              </p>
            </div>
          </div>

          {/* Card 4: Wheelchair Accessible Facilities */}
          <div 
            onClick={() => onNavigate('/locations')}
            className="group relative h-72 sm:h-80 rounded-2xl sm:rounded-3xl p-6 flex flex-col justify-between cursor-pointer border border-[#E7E5DF] bg-[#F7F5EF] hover:bg-[#EFECE2] shadow-2xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-bold text-neutral-700 bg-neutral-200/80 px-2.5 py-1 rounded-full">
                Step-Free Access
              </span>
              <div className="w-9 h-9 rounded-full bg-white/80 border border-neutral-300 flex items-center justify-center text-neutral-800 group-hover:bg-[#171717] group-hover:text-white transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-xs border border-neutral-300 text-neutral-900">
                <Accessibility className="w-5 h-5 text-neutral-700" />
              </div>
              <h3 className="text-xl font-bold font-editorial text-[#171717] leading-snug">
                Wheelchair-Accessible <br />
                <span className="text-sm font-sans font-semibold text-neutral-600">Parking & Entry/Exit</span>
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Ramp access for easy mobility. Located Behind Ashirwad Lawn, Ashirwad Nagar, Murtizapur.
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* ==================================================================== */}
      {/* 10. ABOUT SECTION */}
      {/* ==================================================================== */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Memorial Dedication Showcase Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl p-8 sm:p-10 border border-[#E7E5DF] bg-[#FDFCF9] shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-[#F0EFEA] pb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">Hospital Heritage</span>
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                  Rating 4.3 ⭐
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-bold font-editorial text-[#171717]">
                  Late Govardhanrao Bayaskar Memorial Hospital
                </h3>
                <p className="text-sm text-[#555555] leading-relaxed">
                  Established in honoring memory of Late Govardhanrao Bayaskar, serving the people of Murtizapur, Akola district, and rural Vidarbha with dedicated medical stewardship.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-white p-4 rounded-2xl border border-[#E7E5DF] space-y-1">
                  <strong className="text-lg font-bold text-[#171717] block">₹300</strong>
                  <span className="text-xs text-neutral-500 font-medium">Affordable OPD Physician Fee</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-[#E7E5DF] space-y-1">
                  <strong className="text-lg font-bold text-[#171717] block">24 Hours</strong>
                  <span className="text-xs text-neutral-500 font-medium">Emergency Care & Admissions</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#F0EFEA] text-xs text-neutral-600 flex items-center justify-between">
                <span>Behind Ashirwad Lawn, Murtizapur</span>
                <span className="font-semibold text-neutral-900">Dr. Tushar Bayaskar (MD)</span>
              </div>
            </div>
          </div>

          {/* Right: Text, statistics, and CTA */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#737373] font-semibold">
                About The Hospital
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171717] leading-tight">
                Healthcare designed around you.
              </h2>
            </div>

            <p className="text-base text-[#555555] leading-relaxed">
              Named in honoring memory of Late Govardhanrao Bayaskar, the hospital serves as a trusted medical institution in Murtizapur and Akola district. With consulting physician Dr. Tushar Bayaskar (MBBS, MD Medicine), we combine compassionate general medicine, emergency admissions, intensive monitoring, and comprehensive diagnostic laboratory support.
            </p>

            {/* Statistics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-[#E7E5DF]">
              <div>
                <div className="text-3xl font-bold font-editorial text-[#171717]">4.3 ⭐</div>
                <div className="text-xs text-[#737373] mt-1 font-medium">Public Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold font-editorial text-[#171717]">₹300</div>
                <div className="text-xs text-[#737373] mt-1 font-medium">Consultation Fee</div>
              </div>
              <div>
                <div className="text-3xl font-bold font-editorial text-[#171717]">24/7</div>
                <div className="text-xs text-[#737373] mt-1 font-medium">Hospital Care</div>
              </div>
              <div>
                <div className="text-3xl font-bold font-editorial text-[#171717]">7+</div>
                <div className="text-xs text-[#737373] mt-1 font-medium">Specialties</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('/about')}
                className="inline-flex items-center gap-2 bg-[#171717] hover:bg-[#2e2e2e] text-white text-xs font-semibold px-7 py-3.5 rounded-full transition-all duration-200"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:9075569687"
                className="inline-flex items-center gap-2 bg-[#F7F5EF] hover:bg-[#EBE8DF] border border-[#E7E5DF] text-[#171717] text-xs font-semibold px-6 py-3.5 rounded-full transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-700" />
                <span>Call 90755 69687</span>
              </a>
            </div>

          </div>

        </div>
      </section>


      {/* ==================================================================== */}
      {/* 11. SERVICES SECTION */}
      {/* ==================================================================== */}
      <section id="services-section" className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#737373] font-semibold">
              Medical Specialties & Departments
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171717] mt-1">
              Explore our services
            </h2>
            <p className="text-xs text-neutral-500 mt-1 max-w-xl">
              Specialties recognized under government hospital listings. Note: Daily specialist schedules vary; calling 90755 69687 prior to your visit is recommended.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/services')}
            className="text-xs font-semibold text-[#171717] hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All Departments</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelect={onSelectService}
            />
          ))}
        </div>
      </section>


      {/* ==================================================================== */}
      {/* 12. DOCTOR SECTION */}
      {/* ==================================================================== */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#737373] font-semibold">
              Consulting Physician & Clinical Head
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171717] mt-1">
              Consulting Doctor
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/doctors')}
            className="text-xs font-semibold text-[#171717] hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Doctor Profile & Credentials</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Doctor Featured Profile */}
        <div className="bg-[#FDFCF9] rounded-3xl p-6 sm:p-10 border border-[#E7E5DF] shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {DOCTORS[0].image ? (
              <div className="lg:col-span-4 aspect-4/3 sm:aspect-square rounded-2xl overflow-hidden shadow-sm bg-neutral-100">
                <img
                  src={DOCTORS[0].image}
                  alt={DOCTORS[0].name}
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
                    Consulting Physician
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
                  <span>OPD: 11:00 AM – 5:00 PM</span>
                </span>
                <span className="text-xs font-semibold text-neutral-700 bg-white border border-[#E7E5DF] px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>4.8 Rating</span>
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold font-editorial text-[#171717]">
                  {DOCTORS[0].name}
                </h3>
                <p className="text-sm font-semibold text-[#737373] mt-0.5">
                  {DOCTORS[0].title} · {DOCTORS[0].specialty}
                </p>
              </div>

              <p className="text-sm text-[#555555] leading-relaxed">
                {DOCTORS[0].bio}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {DOCTORS[0].focusAreas.map((area, i) => (
                  <span key={i} className="text-xs bg-white border border-[#E7E5DF] text-neutral-700 px-3 py-1 rounded-full">
                    {area}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-neutral-700">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
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
                  onClick={() => onBookDoctor(DOCTORS[0])}
                  className="bg-[#171717] text-white text-xs font-semibold px-6 py-3 rounded-full hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Appointment (₹300)</span>
                </button>
                <button
                  onClick={() => onSelectDoctor(DOCTORS[0])}
                  className="bg-white border border-[#E7E5DF] text-[#171717] text-xs font-semibold px-5 py-3 rounded-full hover:bg-[#F7F5EF] transition-colors"
                >
                  View Full Profile
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
      </section>


      {/* ==================================================================== */}
      {/* 13. DOCTOR SEARCH SECTION */}
      {/* ==================================================================== */}
      <section id="doctor-search" className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-4">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs uppercase tracking-widest text-[#737373] font-semibold">
            Directory & Consultation Finder
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171717] mt-1">
            Find the right doctor for you.
          </h2>
          <p className="text-sm text-[#555555] mt-2">
            Search clinical consultations by physician, specialty (General Medicine, Critical Care, Pulmonology, Nephrology), or test requirements.
          </p>
        </div>

        <DoctorSearch
          onViewProfile={onSelectDoctor}
          onBookAppointment={onBookDoctor}
        />
      </section>


      {/* ==================================================================== */}
      {/* 14. APPOINTMENT SYSTEM */}
      {/* ==================================================================== */}
      <section id="appointment-booking" className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-6">
        <div className="bg-[#FDFCF9] rounded-3xl border border-[#E7E5DF] p-6 sm:p-10">
          <div className="max-w-4xl mx-auto">
            <AppointmentForm />
          </div>
        </div>
      </section>


      {/* ==================================================================== */}
      {/* 15. WHY CHOOSE US */}
      {/* ==================================================================== */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#737373] font-semibold">
            Healthcare Quality Standards
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171717] mt-1">
            Why patients choose Late Govardhanrao Bayaskar Memorial Hospital
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Dr. Tushar Bayaskar (MD Medicine)',
              description: 'Experienced consulting physician dedicated to accurate diagnostics, rational medications, and compassionate bedside care.',
              icon: Award
            },
            {
              title: 'Reasonable ₹300 Consultation',
              description: 'Transparent and affordable OPD consultation pricing structured for the residents of Murtizapur and Akola district.',
              icon: ShieldCheck
            },
            {
              title: '24/7 Emergency & Inpatient Care',
              description: 'Round-the-clock emergency patient stabilization, oxygen beds, and clinical monitoring in Murtizapur.',
              icon: Clock
            },
            {
              title: 'Dr. Bayaskar Pathology Lab',
              description: 'CBC, KFT, LFT, Widal, and fast E-reports with home sample collection available across the town (Phone: 80105 76316).',
              icon: Microscope
            },
            {
              title: 'Wheelchair-Accessible Infrastructure',
              description: 'Thoughtfully designed wheelchair-accessible parking and smooth ramp entrance/exit for senior and mobility-impaired patients.',
              icon: Accessibility
            },
            {
              title: 'Government-Recognized Scope',
              description: 'Covering General Medicine, Critical Care, Pulmonology, Endocrinology, Gastroenterology, Nephrology, and Neurology.',
              icon: Activity
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-white p-7 rounded-3xl border border-[#E7E5DF] hover:border-[#171717] transition-all hover:shadow-xs"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#F7F5EF] flex items-center justify-center text-[#171717] mb-5">
                  <Icon className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-bold text-[#171717] mb-2">{item.title}</h3>
                <p className="text-sm text-[#555555] leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>


      {/* ==================================================================== */}
      {/* 16. TESTIMONIALS */}
      {/* ==================================================================== */}
      <section id="testimonials-section" className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#737373] font-semibold">
            Patient Stories & Outcomes
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171717] mt-1">
            Trusted by the people we care for.
          </h2>
          <p className="text-sm text-[#555555] mt-2">
            Verified patient feedback from Murtizapur, Ashirwad Nagar, and Akola district.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div 
              key={t.id}
              className="bg-white rounded-3xl p-7 sm:p-8 border border-[#E7E5DF] flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex text-amber-500 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-[#171717] font-editorial italic leading-relaxed mb-6">
                  "{t.review}"
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-[#F0EFEA]">
                <img
                  src={t.avatar}
                  alt={t.patientName}
                  className="w-11 h-11 rounded-full object-cover border border-neutral-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#171717]">{t.patientName}</h4>
                  <p className="text-xs text-[#737373]">{t.department} · {t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ==================================================================== */}
      {/* 17. HOSPITAL LOCATIONS */}
      {/* ==================================================================== */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#737373] font-semibold">
              Murtizapur Location & Diagnostics
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171717] mt-1">
              Our locations
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/locations')}
            className="text-xs font-semibold text-[#171717] hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View Maps & Parking</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LOCATIONS.map((loc) => (
            <div 
              key={loc.id}
              className="group bg-white rounded-3xl border border-[#E7E5DF] overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {loc.image ? (
                  <div className="aspect-16/9 overflow-hidden relative">
                    <img
                      src={loc.image}
                      alt={loc.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#171717] text-[11px] font-semibold px-3 py-1 rounded-full shadow-xs">
                      {loc.campusType}
                    </div>
                  </div>
                ) : (
                  <div className="p-6 bg-linear-to-r from-[#FDFCF9] to-[#F7F5EF] border-b border-[#E7E5DF] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-white border border-[#E7E5DF] flex items-center justify-center text-[#171717] shadow-2xs">
                        {loc.id.includes('lab') ? <Microscope className="w-5 h-5 text-blue-700" /> : <MapPin className="w-5 h-5 text-emerald-700" />}
                      </div>
                      <div>
                        <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">{loc.campusType}</span>
                        <span className="text-sm font-bold text-[#171717]">Murtizapur, Akola</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold bg-[#171717] text-white px-2.5 py-1 rounded-full">
                      {loc.id.includes('lab') ? '9 AM – 8 PM' : 'Open 24/7'}
                    </span>
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#171717] mb-2 group-hover:text-black">
                    {loc.name}
                  </h3>
                  <div className="space-y-1.5 text-xs text-[#555555]">
                    <p className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                      <span>{loc.address}, {loc.city}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span>{loc.hours}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span>{loc.phone}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex gap-2">
                <a
                  href={HOSPITAL_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-xs font-semibold py-2.5 px-4 rounded-full bg-[#171717] text-white hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5 text-center"
                >
                  <Navigation className="w-3.5 h-3.5 text-amber-300" />
                  <span>Get Directions</span>
                </a>
                <button
                  onClick={() => onNavigate('/locations')}
                  className="w-full text-xs font-semibold py-2.5 px-4 rounded-full border border-[#E7E5DF] text-[#171717] hover:bg-[#F7F5EF] transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ==================================================================== */}
      {/* 18. BLOG / HEALTH ARTICLES */}
      {/* ==================================================================== */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#737373] font-semibold">
              Medical Guidance
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171717] mt-1">
              Health insights
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/blog')}
            className="text-xs font-semibold text-[#171717] hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <article 
              key={post.id}
              onClick={() => onSelectArticle(post)}
              className="group bg-white rounded-3xl border border-[#E7E5DF] overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {post.image ? (
                  <div className="aspect-16/10 overflow-hidden relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#171717] text-[11px] font-semibold px-3 py-1 rounded-full shadow-xs">
                      {post.category}
                    </div>
                  </div>
                ) : (
                  <div className="p-6 bg-linear-to-r from-[#FDFCF9] to-[#F7F5EF] border-b border-[#E7E5DF] flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-800 bg-white border border-[#E7E5DF] px-3 py-1 rounded-full shadow-2xs">
                      {post.category}
                    </span>
                    <span className="text-xs text-neutral-500 font-medium">{post.readTime}</span>
                  </div>
                )}

                <div className="p-6">
                  <div className="text-xs text-[#737373] mb-2 flex items-center gap-2">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold font-editorial text-[#171717] mb-2.5 group-hover:text-black leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-[#555555] line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between text-xs font-semibold text-[#171717] border-t border-[#F0EFEA] mt-2">
                <span>By {post.author.name}</span>
                <span className="flex items-center gap-1 group-hover:underline">
                  Read Article <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>


      {/* ==================================================================== */}
      {/* 19. CONTACT SECTION */}
      {/* ==================================================================== */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-4 pb-12">
        <div className="bg-[#FDFCF9] rounded-3xl border border-[#E7E5DF] p-6 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            
            {/* Left Info */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#737373] font-semibold">
                  Get In Touch With The Hospital
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-[#171717] mt-1">
                  Let's take care of your health.
                </h2>
                <p className="text-sm text-[#555555] mt-2 leading-relaxed">
                  Direct inquiries regarding OPD consultations with Dr. Tushar Bayaskar, emergency admissions, or pathology testing at Dr. Bayaskar Pathology Lab.
                </p>
              </div>

              <div className="space-y-4 text-sm text-[#555555]">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#171717] shrink-0 mt-1" />
                  <div>
                    <strong className="text-[#171717] block">Hospital & Doctor Phone</strong>
                    <a href="tel:9075569687" className="text-emerald-700 font-semibold hover:underline">
                      +91 90755 69687
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Microscope className="w-4 h-4 text-[#171717] shrink-0 mt-1" />
                  <div>
                    <strong className="text-[#171717] block">Bayaskar Pathology Lab Desk</strong>
                    <a href="tel:8010576316" className="text-emerald-700 font-semibold hover:underline">
                      +91 80105 76316
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#171717] shrink-0 mt-1" />
                  <div>
                    <strong className="text-[#171717] block">Hospital Email</strong>
                    <a href="mailto:bayaskartushar2020@gmail.com" className="hover:underline">
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

                <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                  <div>
                    <strong className="block font-semibold">Hospital Emergency & IPD</strong>
                    Open 24 Hours / 7 Days a week
                  </div>
                  <a
                    href={HOSPITAL_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-[#171717] underline ml-2"
                  >
                    <Navigation className="w-3 h-3 text-amber-600" />
                    <span>Map</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E5DF] shadow-2xs">
              {contactSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold font-editorial text-[#171717]">
                    Message Sent to Hospital Desk
                  </h3>
                  <p className="text-sm text-[#555555] max-w-sm mx-auto">
                    Thank you, {contactForm.name || 'valued patient'}. The team at Late Govardhanrao Bayaskar Memorial Hospital will review your message promptly.
                  </p>
                  <button
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactForm({ name: '', email: '', phone: '', message: '' });
                    }}
                    className="text-xs font-semibold text-[#171717] underline hover:text-neutral-600"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="e.g. Rameshwar Patil"
                        className="w-full bg-[#F7F5EF] border border-[#E7E5DF] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:bg-white focus:border-[#171717] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={contactForm.email}
                        onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="yourname@gmail.com"
                        className="w-full bg-[#F7F5EF] border border-[#E7E5DF] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:bg-white focus:border-[#171717] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={contactForm.phone}
                      onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
                      placeholder="e.g. 9075569687"
                      className="w-full bg-[#F7F5EF] border border-[#E7E5DF] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:bg-white focus:border-[#171717] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
                      How Can We Help You? *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={contactForm.message}
                      onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Inquire about Dr. Tushar Bayaskar's OPD, emergency admissions, or pathology reports..."
                      className="w-full bg-[#F7F5EF] border border-[#E7E5DF] rounded-xl p-3 text-sm text-[#171717] focus:bg-white focus:border-[#171717] outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#171717] hover:bg-neutral-800 text-white text-xs font-semibold px-8 py-3.5 rounded-full transition-colors"
                  >
                    <span>Send Message to Hospital</span>
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
