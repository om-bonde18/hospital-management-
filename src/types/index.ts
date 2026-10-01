export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  department: string;
  experienceYears: number;
  education: string;
  hospital: string;
  location: string;
  availability: 'Today' | 'This Week' | 'Next Available';
  image: string;
  rating: number;
  reviewCount: number;
  bio: string;
  languages: string[];
  focusAreas: string[];
  consultationFee?: string;
  consultationTiming?: string;
}

export interface PathologyTest {
  id: string;
  name: string;
  shortName: string;
  description: string;
  turnaroundTime: string;
  fastingRequired: boolean;
  sampleType: string;
}

export interface MedicalService {
  id: string;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  treatments: string[];
  departmentHead: string;
  averageWaitTime: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  email: string;
  phone: string;
  department: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  reason: string;
  status: 'Pending' | 'Confirmed' | 'Completed';
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  summary: string;
  content: string[];
  image: string;
}

export interface HospitalLocation {
  id: string;
  name: string;
  campusType: string;
  address: string;
  city: string;
  phone: string;
  emergencyPhone: string;
  hours: string;
  image: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  patientName: string;
  avatar: string;
  role: string;
  rating: number;
  review: string;
  department: string;
}
