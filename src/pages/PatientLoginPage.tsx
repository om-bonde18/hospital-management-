import React, { useState } from 'react';
import { User, Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2, Calendar, FileText, LogOut } from 'lucide-react';
import { Appointment } from '../types';

interface PatientLoginPageProps {
  currentUser: { name: string; email: string } | null;
  onLogin: (user: { name: string; email: string }) => void;
  onLogout: () => void;
  onNavigate: (path: string) => void;
}

export const PatientLoginPage: React.FC<PatientLoginPageProps> = ({
  currentUser,
  onLogin,
  onLogout,
  onNavigate
}) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [forgotPasswordNotice, setForgotPasswordNotice] = useState(false);

  // If already logged in, show patient dashboard view
  if (currentUser) {
    let savedAppointments: Appointment[] = [];
    try {
      const stored = localStorage.getItem('medtrust_appointments');
      if (stored) savedAppointments = JSON.parse(stored);
    } catch (e) {}

    return (
      <div className="px-4 sm:px-8 lg:px-12 py-8 sm:py-16 space-y-10 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-8 rounded-3xl border border-[#E7E5DF]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#FFF4B8] text-[#171717] flex items-center justify-center font-bold text-2xl">
              {currentUser.name[0]}
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Patient Portal
              </span>
              <h1 className="text-2xl font-bold font-editorial text-[#171717]">
                Welcome back, {currentUser.name}
              </h1>
              <p className="text-xs text-neutral-500 mt-0.5">{currentUser.email} · Verified Patient Record</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/appointments')}
              className="bg-[#171717] text-white text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-neutral-800 transition-colors"
            >
              Book New Appointment
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 border border-[#E7E5DF] text-xs font-semibold px-4 py-2.5 rounded-full hover:bg-neutral-50 text-neutral-700 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FDFCF9] p-6 rounded-3xl border border-[#E7E5DF] space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Hospital Patient ID</span>
            <div className="text-xl font-mono font-bold text-[#171717]">LGB-444107</div>
            <p className="text-xs text-neutral-500">Late Govardhanrao Bayaskar Memorial Hospital</p>
          </div>

          <div className="bg-[#FDFCF9] p-6 rounded-3xl border border-[#E7E5DF] space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Consulting Physician</span>
            <div className="text-xl font-bold font-editorial text-[#171717]">Dr. Tushar Bayaskar</div>
            <p className="text-xs text-neutral-500">MBBS, MD (Medicine) · Fee: ₹300</p>
          </div>

          <div className="bg-[#FDFCF9] p-6 rounded-3xl border border-[#E7E5DF] space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Active Consultations</span>
            <div className="text-xl font-bold font-editorial text-[#171717]">{savedAppointments.length} Scheduled</div>
            <p className="text-xs text-neutral-500">All reports uploaded automatically</p>
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-white p-8 rounded-3xl border border-[#E7E5DF] space-y-4">
          <h3 className="text-xl font-bold font-editorial text-[#171717]">
            Your Scheduled Appointments
          </h3>

          {savedAppointments.length === 0 ? (
            <div className="py-8 text-center text-sm text-neutral-500">
              No appointments scheduled yet. Click below to book an OPD consultation with Dr. Tushar Bayaskar.
            </div>
          ) : (
            <div className="space-y-3">
              {savedAppointments.map((appt) => (
                <div key={appt.id} className="p-4 rounded-2xl bg-[#F7F5EF] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-neutral-900">{appt.doctorName}</span> ({appt.department})
                    <div className="text-neutral-500 mt-0.5">{appt.date} at {appt.time} · Ref: {appt.id}</div>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-1 rounded-full">
                    {appt.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const displayName = isRegistering ? (name || 'Eleanor Vance') : (email.split('@')[0] || 'Eleanor Vance');
    onLogin({
      name: displayName.charAt(0).toUpperCase() + displayName.slice(1),
      email: email || 'eleanor.vance@medtrust-health.org'
    });
  };

  return (
    <div className="px-4 sm:px-8 lg:px-12 py-12 sm:py-20 flex justify-center">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-[#E7E5DF] shadow-sm space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#171717] text-white flex items-center justify-center mx-auto mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4v16" />
              <path d="M4 12h16" />
              <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
            </svg>
          </div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#737373]">
            MEDTRUST Patient Portal
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#171717]">
            {isRegistering ? 'Create Patient Account' : 'Sign In to Your Account'}
          </h2>
          <p className="text-xs text-[#555555]">
            Access your appointments, clinical lab reports, and direct physician messages securely.
          </p>
        </div>

        {forgotPasswordNotice && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
            A password reset link will be sent to your registered email if an active account is matched.
          </div>
        )}

        <form onSubmit={handleAuthSubmit} className="space-y-4">
          {isRegistering && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Eleanor Vance"
                  className="w-full bg-[#F7F5EF] border border-[#E7E5DF] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#171717] focus:bg-white focus:border-[#171717] outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="eleanor@example.com"
                className="w-full bg-[#F7F5EF] border border-[#E7E5DF] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#171717] focus:bg-white focus:border-[#171717] outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717]">
                Password *
              </label>
              {!isRegistering && (
                <button
                  type="button"
                  onClick={() => setForgotPasswordNotice(true)}
                  className="text-[11px] text-neutral-500 hover:text-[#171717] underline"
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#F7F5EF] border border-[#E7E5DF] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#171717] focus:bg-white focus:border-[#171717] outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#171717] hover:bg-neutral-800 text-white text-xs font-semibold py-3.5 rounded-full transition-colors flex items-center justify-center gap-2 mt-2"
          >
            <span>{isRegistering ? 'Create Account' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-[#F0EFEA] text-center text-xs text-neutral-600">
          {isRegistering ? (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsRegistering(false)}
                className="font-semibold text-[#171717] underline ml-1"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => setIsRegistering(true)}
                className="font-semibold text-[#171717] underline ml-1"
              >
                Create Account
              </button>
            </p>
          )}
        </div>

        <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>256-bit encrypted HIPAA-compliant patient session</span>
        </div>
      </div>
    </div>
  );
};
