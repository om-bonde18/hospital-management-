/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { EmergencyButton } from './components/EmergencyButton';
import { QuickSearchModal } from './components/QuickSearchModal';
import { DoctorModal } from './components/DoctorModal';
import { ServiceModal } from './components/ServiceModal';
import { ArticleModal } from './components/ArticleModal';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { DoctorsPage } from './pages/DoctorsPage';
import { AppointmentsPage } from './pages/AppointmentsPage';
import { PathologyLabPage } from './pages/PathologyLabPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { LocationsPage } from './pages/LocationsPage';
import { PatientLoginPage } from './pages/PatientLoginPage';
import { AdminPanelPage } from './pages/AdminPanelPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { DOCTORS, SERVICES, BLOG_POSTS } from './data/mockData';
import { Doctor, MedicalService, BlogPost } from './types';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedService, setSelectedService] = useState<MedicalService | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);
  const [prefilledDoctorId, setPrefilledDoctorId] = useState<string>('dr-tushar-bayaskar');
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);

  // Load user session from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('medtrust_user');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Listen to browser URL changes
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname || '/';
      setCurrentPath(path);

      // Check for deep links like /doctors/:id or /services/:id or /blog/:id
      if (path.startsWith('/doctors/')) {
        const id = path.replace('/doctors/', '');
        const doc = DOCTORS.find(d => d.id === id);
        if (doc) setSelectedDoctor(doc);
      } else if (path.startsWith('/services/')) {
        const id = path.replace('/services/', '');
        const srv = SERVICES.find(s => s.id === id);
        if (srv) setSelectedService(srv);
      } else if (path.startsWith('/blog/')) {
        const id = path.replace('/blog/', '');
        const post = BLOG_POSTS.find(b => b.id === id || b.slug === id);
        if (post) setSelectedArticle(post);
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigateTo = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (user: { name: string; email: string }) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('medtrust_user', JSON.stringify(user));
    } catch (e) {}
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('medtrust_user');
    } catch (e) {}
    navigateTo('/');
  };

  const handleBookDoctor = (doctor: Doctor) => {
    setPrefilledDoctorId(doctor.id);
    navigateTo('/appointments');
  };

  // Render current page component
  const renderPage = () => {
    if (currentPath === '/') {
      return (
        <HomePage
          onNavigate={navigateTo}
          onSelectDoctor={(doc) => setSelectedDoctor(doc)}
          onSelectService={(srv) => setSelectedService(srv)}
          onSelectArticle={(post) => setSelectedArticle(post)}
          onBookDoctor={handleBookDoctor}
        />
      );
    }

    if (currentPath === '/about') {
      return <AboutPage onNavigate={navigateTo} />;
    }

    if (currentPath.startsWith('/services')) {
      return (
        <ServicesPage
          onNavigate={navigateTo}
          onSelectServiceModal={(srv) => setSelectedService(srv)}
        />
      );
    }

    if (currentPath.startsWith('/doctors')) {
      return (
        <DoctorsPage
          onNavigate={navigateTo}
          onBookDoctor={handleBookDoctor}
        />
      );
    }

    if (currentPath === '/appointments') {
      return <AppointmentsPage initialDoctorId={prefilledDoctorId} />;
    }

    if (currentPath === '/pathology-lab') {
      return <PathologyLabPage />;
    }

    if (currentPath.startsWith('/blog')) {
      return (
        <BlogPage
          onSelectArticle={(post) => setSelectedArticle(post)}
        />
      );
    }

    if (currentPath === '/contact') {
      return <ContactPage />;
    }

    if (currentPath === '/locations') {
      return <LocationsPage />;
    }

    if (currentPath === '/patient-login') {
      return (
        <PatientLoginPage
          currentUser={currentUser}
          onLogin={handleLogin}
          onLogout={handleLogout}
          onNavigate={navigateTo}
        />
      );
    }

    if (currentPath === '/admin' || currentPath === '/admin-panel') {
      return (
        <AdminPanelPage
          onNavigate={navigateTo}
        />
      );
    }

    return <NotFoundPage onNavigate={navigateTo} />;
  };

  return (
    <div className="w-full min-h-screen bg-white text-[#171717] flex flex-col selection:bg-[#FFF4B8]">
      
      {/* Sticky Full-Width Navigation */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenSearch={() => setSearchOpen(true)}
        user={currentUser}
        onLogout={handleLogout}
      />

      {/* Full-Screen Dynamic Page Content */}
      <main className="w-full grow">
        {renderPage()}
      </main>

      {/* Full-Width Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Persistent 24/7 Emergency Button */}
      <EmergencyButton />

      {/* Global Quick Search Modal */}
      <QuickSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectDoctor={(doc) => setSelectedDoctor(doc)}
        onSelectService={(srv) => setSelectedService(srv)}
        onSelectArticle={(post) => setSelectedArticle(post)}
        onNavigate={navigateTo}
      />

      {/* Doctor Profile Modal */}
      <DoctorModal
        doctor={selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
        onBook={handleBookDoctor}
      />

      {/* Service Details Modal */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBookAppointment={(dept) => {
          setSelectedService(null);
          navigateTo('/appointments');
        }}
      />

      {/* Blog Article Reader Modal */}
      <ArticleModal
        post={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

    </div>
  );
}
