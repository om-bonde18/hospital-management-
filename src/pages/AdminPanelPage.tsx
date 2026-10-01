import React, { useState, useEffect, useMemo } from 'react';
import { 
  subscribeAppointments, 
  updateAppointmentStatus, 
  deleteAppointment, 
  saveAppointment,
  subscribeContactMessages,
  subscribePathologyRequests,
  HospitalMessage,
  PathologyRequest
} from '../lib/firebase';
import { Appointment } from '../types';
import { DOCTORS, SERVICES, HOSPITAL_INFO } from '../data/mockData';
import { 
  Shield, 
  Lock, 
  User, 
  Calendar, 
  Clock, 
  Phone, 
  Mail, 
  Search, 
  CheckCircle, 
  Clock3, 
  XCircle, 
  Trash2, 
  Plus, 
  RefreshCw, 
  Filter, 
  FileText, 
  Microscope, 
  Check, 
  LogOut, 
  ArrowUpRight, 
  Database, 
  Activity, 
  AlertCircle,
  ExternalLink,
  MessageSquare,
  Building
} from 'lucide-react';

interface AdminPanelPageProps {
  onNavigate: (path: string) => void;
}

export const AdminPanelPage: React.FC<AdminPanelPageProps> = ({ onNavigate }) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState('ombonde667@gmail.com');
  const [loginPassword, setLoginPassword] = useState('om@54321');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Data state
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [messages, setMessages] = useState<HospitalMessage[]>([]);
  const [pathologyRequests, setPathologyRequests] = useState<PathologyRequest[]>([]);
  const [activeTab, setActiveTab] = useState<'appointments' | 'pathology' | 'messages' | 'overview'>('appointments');

  // Filter state for appointments
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Pending' | 'Confirmed' | 'Completed'>('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  // Manual Add Appointment Modal
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [manualForm, setManualForm] = useState({
    patientName: '',
    phone: '',
    email: '',
    department: 'General Medicine',
    doctorId: 'dr-tushar-bayaskar',
    date: new Date().toISOString().split('T')[0],
    time: '11:30 AM',
    reason: 'Walk-in OPD Consultation'
  });

  // Check existing admin session
  useEffect(() => {
    const adminSession = localStorage.getItem('medtrust_admin_auth');
    if (adminSession === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Subscribe to real-time Firebase collections
  useEffect(() => {
    if (!isAuthenticated) return;

    const unsubAppts = subscribeAppointments((list) => {
      setAppointments(list);
    });

    const unsubMsgs = subscribeContactMessages((list) => {
      setMessages(list);
    });

    const unsubLab = subscribePathologyRequests((list) => {
      setPathologyRequests(list);
    });

    return () => {
      unsubAppts();
      unsubMsgs();
      unsubLab();
    };
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    setTimeout(() => {
      // Validate with user specified credentials:
      // ombonde667@gmail.com and om@54321
      if (
        loginEmail.trim().toLowerCase() === 'ombonde667@gmail.com' &&
        loginPassword === 'om@54321'
      ) {
        setIsAuthenticated(true);
        localStorage.setItem('medtrust_admin_auth', 'true');
        setLoginLoading(false);
      } else {
        setLoginError('Invalid administrator credentials. Please check your email and password.');
        setLoginLoading(false);
      }
    }, 400);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('medtrust_admin_auth');
  };

  const handleStatusChange = async (id: string, status: 'Pending' | 'Confirmed' | 'Completed') => {
    await updateAppointmentStatus(id, status);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this appointment record?')) {
      await deleteAppointment(id);
    }
  };

  const handleCreateWalkIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const docObj = DOCTORS.find(d => d.id === manualForm.doctorId);
    const doctorName = docObj ? docObj.name : 'Dr. Tushar Bayaskar (MD Medicine)';

    const newAppt: Appointment = {
      id: 'LGB-' + Math.floor(100000 + Math.random() * 900000),
      patientName: manualForm.patientName,
      email: manualForm.email || 'walkin@hospital.local',
      phone: manualForm.phone,
      department: manualForm.department,
      doctorId: manualForm.doctorId,
      doctorName: doctorName,
      date: manualForm.date,
      time: manualForm.time,
      reason: manualForm.reason,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    await saveAppointment(newAppt);
    setAddModalOpen(false);
    setManualForm({
      patientName: '',
      phone: '',
      email: '',
      department: 'General Medicine',
      doctorId: 'dr-tushar-bayaskar',
      date: new Date().toISOString().split('T')[0],
      time: '11:30 AM',
      reason: 'Walk-in OPD Consultation'
    });
  };

  // Filtered Appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter(a => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = a.patientName.toLowerCase().includes(q);
        const matchesPhone = a.phone.toLowerCase().includes(q);
        const matchesId = a.id.toLowerCase().includes(q);
        const matchesDoc = a.doctorName.toLowerCase().includes(q);
        if (!matchesName && !matchesPhone && !matchesId && !matchesDoc) return false;
      }

      // Status
      if (statusFilter !== 'all' && a.status !== statusFilter) {
        return false;
      }

      // Department
      if (departmentFilter !== 'all' && a.department !== departmentFilter) {
        return false;
      }

      return true;
    });
  }, [appointments, searchQuery, statusFilter, departmentFilter]);

  // Key metrics
  const pendingCount = appointments.filter(a => a.status === 'Pending').length;
  const confirmedCount = appointments.filter(a => a.status === 'Confirmed').length;
  const todayDateStr = new Date().toISOString().split('T')[0];
  const todayCount = appointments.filter(a => a.date === todayDateStr).length;

  // -------------------------------------------------------------
  // LOGIN SCREEN
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-[85vh] bg-[#F7F5EF] flex items-center justify-center p-4 py-16">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-[#E7E5DF] shadow-md space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#171717] text-white flex items-center justify-center mx-auto shadow-sm">
              <Shield className="w-7 h-7 text-amber-400" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#737373]">
              Hospital Administration Console
            </span>
            <h1 className="text-2xl font-bold font-editorial text-[#171717]">
              Admin Portal Login
            </h1>
            <p className="text-xs text-[#555555]">
              Late Govardhanrao Bayaskar Memorial Hospital
              <br />
              <span className="text-neutral-400 font-mono text-[10px]">Database: hospital-management-syst-ba0af</span>
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
                Admin Email ID *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  placeholder="ombonde667@gmail.com"
                  className="w-full bg-[#F7F5EF] border border-[#E7E5DF] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#171717] focus:bg-white focus:border-[#171717] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
                Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#F7F5EF] border border-[#E7E5DF] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#171717] focus:bg-white focus:border-[#171717] outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-[#171717] hover:bg-neutral-800 text-white text-xs font-semibold py-3.5 rounded-full transition-colors flex items-center justify-center gap-2"
            >
              {loginLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In as Hospital Administrator</span>
                  <ArrowUpRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 text-xs text-neutral-600 space-y-1">
            <div className="font-semibold text-neutral-900 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-emerald-600" />
              <span>Firebase Database Integration Active</span>
            </div>
            <p className="text-[11px] text-neutral-500">
              Live sync with <code className="bg-white px-1 py-0.5 rounded font-mono text-[10px]">hospital-management-syst-ba0af</code>.
            </p>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => onNavigate('/')}
              className="text-xs text-neutral-500 hover:text-neutral-900 underline"
            >
              Return to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED ADMIN DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="w-full min-h-screen bg-[#F7F5EF]/60">
      
      {/* Top Admin Header Bar */}
      <div className="w-full bg-[#171717] text-white px-4 sm:px-8 py-3.5 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-400 text-[#171717] flex items-center justify-center font-bold">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base text-white">Hospital Admin Console</span>
              <span className="bg-emerald-500 text-[#171717] text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#171717] animate-pulse"></span>
                LIVE FIREBASE
              </span>
            </div>
            <div className="text-xs text-neutral-400">
              Late Govardhanrao Bayaskar Memorial Hospital · Murtizapur
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-xs bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-800 text-neutral-300">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-mono text-[11px]">hospital-management-syst-ba0af</span>
          </div>

          <button
            onClick={() => onNavigate('/')}
            className="text-xs text-neutral-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-neutral-800 flex items-center gap-1"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Website</span>
          </button>

          <button
            onClick={handleLogout}
            className="text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-white px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        
        {/* KPI Counter Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#E7E5DF] shadow-2xs space-y-1">
            <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">Total Appointments</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#171717]">{appointments.length}</div>
            <p className="text-[11px] text-neutral-500">Stored in Firebase Firestore</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E7E5DF] shadow-2xs space-y-1">
            <span className="text-xs uppercase tracking-wider text-amber-700 font-semibold">Pending Review</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-600">{pendingCount}</div>
            <p className="text-[11px] text-neutral-500">Requires confirmation</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E7E5DF] shadow-2xs space-y-1">
            <span className="text-xs uppercase tracking-wider text-emerald-700 font-semibold">Today's Consultations</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">{todayCount}</div>
            <p className="text-[11px] text-neutral-500">Dr. Tushar Bayaskar OPD</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E7E5DF] shadow-2xs space-y-1">
            <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">Estimated OPD Fees</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#171717]">₹{appointments.length * 300}</div>
            <p className="text-[11px] text-neutral-500">@ ₹300 per consultation</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E7E5DF] pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('appointments')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                activeTab === 'appointments'
                  ? 'bg-[#171717] text-white shadow-xs'
                  : 'bg-white text-neutral-600 hover:text-neutral-900 border border-[#E7E5DF]'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Appointments ({appointments.length})</span>
              {pendingCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse ml-0.5" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('pathology')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                activeTab === 'pathology'
                  ? 'bg-[#171717] text-white shadow-xs'
                  : 'bg-white text-neutral-600 hover:text-neutral-900 border border-[#E7E5DF]'
              }`}
            >
              <Microscope className="w-3.5 h-3.5" />
              <span>Bayaskar Lab Requests ({pathologyRequests.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                activeTab === 'messages'
                  ? 'bg-[#171717] text-white shadow-xs'
                  : 'bg-white text-neutral-600 hover:text-neutral-900 border border-[#E7E5DF]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Messages & Inquiries ({messages.length})</span>
            </button>
          </div>

          {activeTab === 'appointments' && (
            <button
              onClick={() => setAddModalOpen(true)}
              className="bg-[#171717] hover:bg-neutral-800 text-white text-xs font-semibold px-4 py-2.5 rounded-full flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Walk-In Patient</span>
            </button>
          )}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: APPOINTMENTS MANAGEMENT */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            {/* Search & Filter Bar */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E7E5DF] flex flex-wrap items-center justify-between gap-4">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search by patient name, phone, or appointment ID..."
                  className="w-full bg-[#F7F5EF] border border-[#E7E5DF] rounded-xl pl-10 pr-4 py-2 text-xs text-[#171717] focus:bg-white focus:border-[#171717] outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value as any)}
                  className="bg-[#F7F5EF] border border-[#E7E5DF] rounded-xl px-3 py-2 text-xs text-[#171717] outline-none font-medium"
                >
                  <option value="all">All Statuses</option>
                  <option value="Pending">Pending Only</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                </select>

                <select
                  value={departmentFilter}
                  onChange={e => setDepartmentFilter(e.target.value)}
                  className="bg-[#F7F5EF] border border-[#E7E5DF] rounded-xl px-3 py-2 text-xs text-[#171717] outline-none font-medium"
                >
                  <option value="all">All Specialties</option>
                  {SERVICES.map(s => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </select>

                {(searchQuery || statusFilter !== 'all' || departmentFilter !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setStatusFilter('all');
                      setDepartmentFilter('all');
                    }}
                    className="text-xs text-neutral-500 hover:text-neutral-900 underline"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>

            {/* Appointments Table / Cards */}
            {filteredAppointments.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#E7E5DF] space-y-3">
                <Calendar className="w-12 h-12 text-neutral-300 mx-auto" />
                <h3 className="text-lg font-bold text-neutral-800">No Appointments Matched</h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  New appointment submissions from the website will automatically populate here via Firebase Firestore in real-time.
                </p>
                <button
                  onClick={() => setAddModalOpen(true)}
                  className="inline-flex items-center gap-1.5 bg-[#171717] text-white text-xs font-semibold px-4 py-2 rounded-full"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Register Patient</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredAppointments.map((appt) => {
                  const isPending = appt.status === 'Pending';
                  const isConfirmed = appt.status === 'Confirmed';
                  const isCompleted = appt.status === 'Completed';

                  return (
                    <div
                      key={appt.id}
                      className={`bg-white rounded-2xl p-5 border transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-2xs ${
                        isPending
                          ? 'border-amber-300 bg-amber-50/20'
                          : 'border-[#E7E5DF] hover:border-neutral-400'
                      }`}
                    >
                      {/* Left: Patient and booking details */}
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-[11px] font-bold bg-[#F7F5EF] text-[#171717] px-2 py-0.5 rounded">
                            {appt.id}
                          </span>
                          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                            isPending
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : isConfirmed
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                              : 'bg-neutral-100 text-neutral-800'
                          }`}>
                            {appt.status}
                          </span>
                          <span className="text-[11px] text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded">
                            Fee: ₹300
                          </span>
                          <span className="text-[11px] text-neutral-400">
                            Booked: {new Date(appt.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-baseline gap-2">
                          <h4 className="text-base font-bold text-[#171717]">
                            {appt.patientName}
                          </h4>
                          <span className="text-xs text-neutral-500">
                            → {appt.doctorName} ({appt.department})
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-600 pt-0.5">
                          <a href={`tel:${appt.phone}`} className="flex items-center gap-1 font-semibold text-emerald-800 hover:underline">
                            <Phone className="w-3.5 h-3.5" />
                            <span>{appt.phone}</span>
                          </a>
                          {appt.email && (
                            <span className="flex items-center gap-1 text-neutral-500">
                              <Mail className="w-3.5 h-3.5" />
                              <span>{appt.email}</span>
                            </span>
                          )}
                          <span className="flex items-center gap-1 text-neutral-800 font-medium">
                            <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                            <span>{appt.date}</span>
                          </span>
                          <span className="flex items-center gap-1 text-neutral-800 font-medium">
                            <Clock className="w-3.5 h-3.5 text-neutral-400" />
                            <span>{appt.time}</span>
                          </span>
                        </div>

                        {appt.reason && (
                          <p className="text-xs text-neutral-500 italic pt-1">
                            Notes: "{appt.reason}"
                          </p>
                        )}
                      </div>

                      {/* Right: Actions */}
                      <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-neutral-100">
                        {isPending && (
                          <button
                            onClick={() => handleStatusChange(appt.id, 'Confirmed')}
                            className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center gap-1 transition-colors"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Confirm Slot</span>
                          </button>
                        )}

                        {isConfirmed && (
                          <button
                            onClick={() => handleStatusChange(appt.id, 'Completed')}
                            className="bg-neutral-800 hover:bg-neutral-900 text-white text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center gap-1 transition-colors"
                          >
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Mark Completed</span>
                          </button>
                        )}

                        <a
                          href={`tel:${appt.phone}`}
                          className="bg-[#F7F5EF] hover:bg-[#EBE8DF] text-[#171717] text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-1 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Call</span>
                        </a>

                        <button
                          onClick={() => handleDelete(appt.id)}
                          className="text-neutral-400 hover:text-red-700 hover:bg-red-50 p-2 rounded-xl transition-colors"
                          title="Remove Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: PATHOLOGY LAB REQUESTS */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'pathology' && (
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-[#E7E5DF] flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#171717]">Dr. Bayaskar Pathology Lab Requests</h3>
                <p className="text-xs text-neutral-500">Home sample collection requests in Murtizapur</p>
              </div>
              <span className="text-xs font-semibold text-neutral-600 bg-[#F7F5EF] px-3 py-1 rounded-full">
                Total Requests: {pathologyRequests.length}
              </span>
            </div>

            {pathologyRequests.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#E7E5DF]">
                <Microscope className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
                <p className="text-sm text-neutral-600">No home sample requests currently pending.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pathologyRequests.map((req) => (
                  <div key={req.id} className="bg-white p-5 rounded-2xl border border-[#E7E5DF] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-bold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded">{req.id}</span>
                        <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full">{req.testRequired}</span>
                      </div>
                      <h4 className="text-base font-bold text-[#171717]">{req.patientName}</h4>
                      <p className="text-xs text-neutral-600">Address: <strong>{req.address}</strong></p>
                      <p className="text-xs text-neutral-500">Preferred Date: {req.preferredDate}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${req.phone}`}
                        className="bg-[#171717] text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call {req.phone}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: CONTACT MESSAGES */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'messages' && (
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-[#E7E5DF] flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#171717]">Patient Inquiries & Messages</h3>
                <p className="text-xs text-neutral-500">Submitted through the hospital contact forms</p>
              </div>
              <span className="text-xs font-semibold text-neutral-600 bg-[#F7F5EF] px-3 py-1 rounded-full">
                Messages: {messages.length}
              </span>
            </div>

            {messages.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#E7E5DF]">
                <MessageSquare className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
                <p className="text-sm text-neutral-600">No contact inquiries in database yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((m) => (
                  <div key={m.id} className="bg-white p-5 rounded-2xl border border-[#E7E5DF] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#171717]">{m.name}</span>
                        <span className="text-xs text-neutral-500 font-mono">({m.phone})</span>
                      </div>
                      <span className="text-[11px] text-neutral-400">{new Date(m.createdAt).toLocaleString()}</span>
                    </div>

                    <div className="text-xs font-semibold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-md inline-block">
                      Subject: {m.subject}
                    </div>

                    <p className="text-xs text-neutral-700 leading-relaxed bg-[#F7F5EF] p-3 rounded-xl">
                      "{m.message}"
                    </p>

                    <div className="flex items-center gap-3 pt-1">
                      <a href={`tel:${m.phone}`} className="text-xs font-semibold text-emerald-800 hover:underline flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call {m.phone}</span>
                      </a>
                      {m.email && (
                        <a href={`mailto:${m.email}`} className="text-xs text-neutral-600 hover:underline flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5" />
                          <span>{m.email}</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Manual Add Walk-In Patient Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E7E5DF] relative">
            <button
              onClick={() => setAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold font-editorial text-[#171717] mb-1">
              Register Walk-In Patient
            </h3>
            <p className="text-xs text-neutral-500 mb-5">
              Directly saves to Firebase Firestore (<code className="font-mono text-[10px]">hospital-management-syst-ba0af</code>)
            </p>

            <form onSubmit={handleCreateWalkIn} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                  Patient Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={manualForm.patientName}
                  onChange={e => setManualForm({ ...manualForm, patientName: e.target.value })}
                  placeholder="Patient Name"
                  className="w-full bg-[#F7F5EF] border border-[#E7E5DF] rounded-xl px-3 py-2 text-xs outline-none focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={manualForm.phone}
                    onChange={e => setManualForm({ ...manualForm, phone: e.target.value })}
                    placeholder="9075569687"
                    className="w-full bg-[#F7F5EF] border border-[#E7E5DF] rounded-xl px-3 py-2 text-xs outline-none focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                    Department *
                  </label>
                  <select
                    value={manualForm.department}
                    onChange={e => setManualForm({ ...manualForm, department: e.target.value })}
                    className="w-full bg-[#F7F5EF] border border-[#E7E5DF] rounded-xl px-3 py-2 text-xs outline-none focus:bg-white"
                  >
                    {SERVICES.map(s => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={manualForm.date}
                    onChange={e => setManualForm({ ...manualForm, date: e.target.value })}
                    className="w-full bg-[#F7F5EF] border border-[#E7E5DF] rounded-xl px-3 py-2 text-xs outline-none focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                    Time Slot *
                  </label>
                  <input
                    type="text"
                    required
                    value={manualForm.time}
                    onChange={e => setManualForm({ ...manualForm, time: e.target.value })}
                    placeholder="11:30 AM"
                    className="w-full bg-[#F7F5EF] border border-[#E7E5DF] rounded-xl px-3 py-2 text-xs outline-none focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                  Reason / Symptoms
                </label>
                <input
                  type="text"
                  value={manualForm.reason}
                  onChange={e => setManualForm({ ...manualForm, reason: e.target.value })}
                  placeholder="e.g. Acute fever, BP checkup"
                  className="w-full bg-[#F7F5EF] border border-[#E7E5DF] rounded-xl px-3 py-2 text-xs outline-none focus:bg-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-neutral-300 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#171717] text-white text-xs font-semibold hover:bg-neutral-800"
                >
                  Save to Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
