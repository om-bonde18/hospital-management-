import React, { useState } from 'react';
import { Search, Menu, X, ArrowUpRight, User, Phone, MapPin, Navigation, Microscope, Shield } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/mockData';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  user: { name: string; email: string } | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onOpenSearch,
  user,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Doctors', path: '/doctors' },
    { label: 'Appointments', path: '/appointments' },
    { label: 'Pathology Lab', path: '/pathology-lab' },
    { label: 'Directions & Map', path: '/locations' },
    { label: 'Health Insights', path: '/blog' }
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  return (
    <header className="w-full sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E7E5DF] transition-all">
      {/* Top Notification / Hotline Ribbon */}
      <div className="w-full bg-[#171717] text-white py-1.5 px-4 sm:px-8 text-[11px] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium">Late Govardhanrao Bayaskar Memorial Hospital · 4.3 ⭐ · Open 24/7 for Admissions</span>
          <span className="hidden md:inline text-neutral-400">|</span>
          <span className="hidden md:inline text-neutral-300">OPD: 11:00 AM – 5:00 PM (Fee: ₹300)</span>
        </div>
        <div className="flex items-center gap-4 text-neutral-300">
          <a href="tel:9075569687" className="hover:text-white flex items-center gap-1 font-semibold text-white">
            <Phone className="w-3 h-3 text-emerald-400" />
            <span>90755 69687</span>
          </a>
          <a
            href={HOSPITAL_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white flex items-center gap-1 text-[11px]"
          >
            <Navigation className="w-3 h-3 text-amber-300" />
            <span className="hidden sm:inline">Directions</span>
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-3 group text-left focus:outline-none shrink-0"
            aria-label="Late Govardhanrao Bayaskar Memorial Hospital Home"
          >
            <div className="w-10 h-10 rounded-xl bg-[#171717] text-white flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xs">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v18" />
                <path d="M3 12h18" />
                <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-tight text-[#171717] group-hover:text-black transition-colors font-sans leading-tight">
                Late Govardhanrao Bayaskar Memorial Hospital
              </span>
              <span className="text-[11px] text-[#737373] font-medium flex items-center gap-1.5 mt-0.5">
                <span>Dr. Bayaskar Hospital</span>
                <span>·</span>
                <span>Ashirwad Nagar, Murtizapur</span>
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-6" aria-label="Main Navigation">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`text-xs font-semibold uppercase tracking-wider transition-colors relative py-1.5 focus:outline-none ${
                  isActive(item.path)
                    ? 'text-[#171717] font-bold'
                    : 'text-[#555555] hover:text-[#171717]'
                }`}
              >
                {item.label}
                {isActive(item.path) && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#171717] rounded-full animate-in fade-in duration-200" />
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#555555] hover:text-[#171717] hover:bg-[#F7F5EF] rounded-full transition-colors focus:outline-none"
              title="Search Doctors, Services, and Pathology"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            <a
              href="tel:9075569687"
              className="hidden xl:flex items-center gap-1.5 text-xs font-semibold text-[#171717] bg-[#F7F5EF] hover:bg-[#EBE8DF] px-3.5 py-2 rounded-full transition-colors"
              title="Call Hospital & Dr. Tushar Bayaskar"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>90755 69687</span>
            </a>

            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavClick('/patient-login')}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#171717] bg-[#F7F5EF] hover:bg-[#EBE8DF] px-3.5 py-2 rounded-full transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{user.name.split(' ')[0]}</span>
                </button>
                <button
                  onClick={onLogout}
                  className="text-xs text-[#737373] hover:text-[#171717] underline transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('/patient-login')}
                className="text-xs font-semibold text-[#555555] hover:text-[#171717] transition-colors py-2 px-1"
              >
                Patient Portal
              </button>
            )}

            <button
              onClick={() => handleNavClick('/admin')}
              className="flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 px-3 py-1.5 rounded-full transition-colors"
              title="Hospital Admin Panel (Firebase)"
            >
              <Shield className="w-3.5 h-3.5 text-amber-700" />
              <span>Admin Panel</span>
            </button>

            <button
              onClick={() => handleNavClick('/appointments')}
              className="inline-flex items-center gap-1.5 bg-[#171717] hover:bg-[#2e2e2e] text-white text-xs font-semibold px-4.5 py-2.5 rounded-full transition-all duration-200 hover:shadow-md focus:outline-none shrink-0"
            >
              <span>Book OPD (₹300)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-2">
            <a
              href="tel:9075569687"
              className="p-2 text-emerald-700 bg-emerald-50 rounded-full"
              aria-label="Call Hospital"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#555555] hover:text-[#171717] focus:outline-none"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#171717] hover:bg-[#F7F5EF] rounded-lg focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[#E7E5DF] bg-white px-4 pt-4 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
                  isActive(item.path)
                    ? 'bg-[#F7F5EF] text-[#171717] font-bold'
                    : 'text-[#555555] hover:bg-neutral-50 hover:text-[#171717]'
                }`}
              >
                <span>{item.label}</span>
                {isActive(item.path) && <span className="w-2 h-2 rounded-full bg-[#171717]" />}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E7E5DF] flex flex-col gap-2.5">
            <a
              href="tel:9075569687"
              className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-50 text-emerald-900 text-xs font-bold border border-emerald-200"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Hospital: 90755 69687</span>
            </a>

            <a
              href={HOSPITAL_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#F7F5EF] text-[#171717] text-xs font-semibold border border-[#E7E5DF]"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Open Directions (Behind Ashirwad Lawn)</span>
            </a>

            {user ? (
              <div className="flex items-center justify-between px-3 py-2 bg-[#F7F5EF] rounded-lg">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#171717]" />
                  <span className="text-xs font-medium text-[#171717]">{user.name}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="text-xs text-[#737373] hover:text-black underline"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('/patient-login')}
                className="w-full text-center py-2.5 text-xs font-semibold text-[#171717] bg-[#F7F5EF] rounded-full hover:bg-[#EBE8DF]"
              >
                Patient Portal / Sign In
              </button>
            )}

            <button
              onClick={() => handleNavClick('/admin')}
              className="w-full text-center py-2.5 text-xs font-bold text-amber-900 bg-amber-100 border border-amber-300 rounded-full flex items-center justify-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Panel (Database: hospital-management-syst-ba0af)</span>
            </button>

            <button
              onClick={() => handleNavClick('/appointments')}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#171717] text-white text-xs font-semibold py-3 rounded-full hover:bg-neutral-800"
            >
              <span>Book Appointment (Dr. Tushar Bayaskar)</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
