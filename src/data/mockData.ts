import { Doctor, MedicalService, BlogPost, HospitalLocation, Testimonial, PathologyTest } from '../types';

export const HOSPITAL_INFO = {
  name: 'Late Govardhanrao Bayaskar Memorial Hospital',
  shortName: 'Dr. Bayaskar Hospital',
  rating: 4.3,
  reviewCount: 86,
  status: 'Open 24/7 for Admissions & Emergency',
  opdTiming: '11:00 AM – 5:00 PM',
  consultationFee: '₹300',
  address: 'Behind Ashirwad Lawn, Ashirwad Nagar, Murtizapur, Akola, Maharashtra – 444107',
  phone: '90755 69687',
  displayPhone: '+91 90755 69687',
  email: 'bayaskartushar2020@gmail.com',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Late+Govardhanrao+Bayaskar+Memorial+Hospital+Ashirwad+Nagar+Murtizapur+Akola',
  labPhone: '8010576316',
  labHours: 'Mon – Sat: 9:00 AM – 8:00 PM',
  facilities: [
    'Wheelchair-accessible parking on site',
    'Wheelchair-accessible entrance and exit',
    '24/7 Emergency & Inpatient Care',
    'Dedicated Bayaskar Pathology Lab',
    'Emergency Ambulance Coordination',
    'OPD Consulting by Dr. Tushar Bayaskar'
  ]
};

export const PATHOLOGY_TESTS: PathologyTest[] = [
  {
    id: 'cbc',
    name: 'Complete Blood Count (CBC)',
    shortName: 'CBC',
    description: 'Comprehensive analysis of red blood cells, white blood cells, platelets, and hemoglobin to evaluate overall health, anemia, or infection.',
    turnaroundTime: 'Same Day (2–4 Hours)',
    fastingRequired: false,
    sampleType: 'Blood'
  },
  {
    id: 'kft',
    name: 'Kidney Function Test (KFT / RFT)',
    shortName: 'KFT',
    description: 'Measures blood urea, serum creatinine, BUN, and electrolytes to evaluate kidney performance and renal clearance.',
    turnaroundTime: 'Same Day',
    fastingRequired: true,
    sampleType: 'Blood'
  },
  {
    id: 'lft',
    name: 'Liver Function Test (LFT)',
    shortName: 'LFT',
    description: 'Screens for bilirubin, SGOT, SGPT, alkaline phosphatase, and total proteins to detect hepatic disorders or jaundice.',
    turnaroundTime: 'Same Day',
    fastingRequired: true,
    sampleType: 'Blood'
  },
  {
    id: 'widal',
    name: 'Widal Test (Typhoid Screening)',
    shortName: 'Widal',
    description: 'Serological test for enteric fever (typhoid and paratyphoid) to identify Salmonella antibodies during acute fever.',
    turnaroundTime: 'Same Day (3 Hours)',
    fastingRequired: false,
    sampleType: 'Serum'
  },
  {
    id: 'blood-sugar',
    name: 'Blood Glucose (Fasting & PP)',
    shortName: 'FBS / PPBS / HbA1c',
    description: 'Essential diabetes monitoring determining blood glucose and long-term glycemic control.',
    turnaroundTime: 'Fast (1 Hour)',
    fastingRequired: true,
    sampleType: 'Blood'
  },
  {
    id: 'lipid-profile',
    name: 'Lipid Profile',
    shortName: 'Lipids',
    description: 'Measures total cholesterol, triglycerides, HDL, LDL, and VLDL to estimate cardiovascular health risks.',
    turnaroundTime: 'Same Day',
    fastingRequired: true,
    sampleType: 'Blood'
  }
];

// Single verified doctor: Dr. Tushar Bayaskar
export const DOCTORS: Doctor[] = [
  {
    id: 'dr-tushar-bayaskar',
    name: 'Dr. Tushar Bayaskar',
    title: 'MBBS, MD (Medicine)',
    specialty: 'General Medicine / General Physician',
    department: 'General Medicine & Consulting Physician',
    experienceYears: 12,
    education: 'MBBS, MD (Medicine)',
    hospital: 'Late Govardhanrao Bayaskar Memorial Hospital',
    location: 'Behind Ashirwad Lawn, Ashirwad Nagar, Murtizapur',
    availability: 'Today',
    image: '',
    rating: 4.8,
    reviewCount: 94,
    bio: 'Dr. Tushar Bayaskar is the consulting physician at Late Govardhanrao Bayaskar Memorial Hospital in Murtizapur. Holding an MD in Medicine, he provides extensive clinical care for acute fevers, respiratory infections, hypertension, diabetes, and comprehensive inpatient medical management.',
    languages: ['Marathi', 'Hindi', 'English'],
    focusAreas: [
      'General Medicine & Family Health',
      'Diabetes & Hypertension Management',
      'Infectious Diseases & Fever Workup',
      'Critical Inpatient Observation'
    ],
    consultationFee: '₹300',
    consultationTiming: '11:00 AM – 5:00 PM (Daily OPD)'
  }
];

export const SERVICES: MedicalService[] = [
  {
    id: 'general-medicine',
    name: 'General Medicine',
    tagline: 'Comprehensive everyday health, physician consultations, and disease management.',
    description: 'Led by Dr. Tushar Bayaskar (MBBS, MD Medicine). Offering clinical evaluation, laboratory-guided diagnosis, and holistic treatment for fevers, seasonal infections, hypertension, and systemic health conditions.',
    iconName: 'Stethoscope',
    treatments: [
      'MD Physician Daily Consultation (11 AM – 5 PM)',
      'Management of Diabetes & Hypertension',
      'Acute Infectious Disease Workups & Dengue/Malaria/Typhoid',
      'Preventive Health Screenings (₹300 consultation fee)'
    ],
    departmentHead: 'Dr. Tushar Bayaskar (MD Medicine)',
    averageWaitTime: '< 15 mins'
  },
  {
    id: 'critical-care',
    name: 'Critical Care & Emergency',
    tagline: '24/7 Emergency response, intensive patient monitoring, and stabilization.',
    description: 'Round-the-clock emergency medical response with oxygen support, cardiac monitoring, and dedicated nursing care for acutely ill patients requiring immediate hospital admission.',
    iconName: 'HeartPulse',
    treatments: [
      '24/7 Acute Medical Emergency Care',
      'Oxygen Therapy & Respiratory Support',
      'Continuous Vital Sign Monitoring',
      'Immediate IV Fluid & Electrolyte Resuscitation'
    ],
    departmentHead: 'Emergency Critical Care Unit',
    averageWaitTime: 'Immediate Triage'
  },
  {
    id: 'pulmonology',
    name: 'Pulmonology',
    tagline: 'Chest medicine, asthma, chronic bronchitis, and respiratory health.',
    description: 'Diagnostic assessment and therapeutic plans for breathing difficulties, allergic bronchitis, chronic asthma, and post-infection lung inflammation.',
    iconName: 'Activity',
    treatments: [
      'Nebulization & Inhalation Therapies',
      'Asthma & COPD Clinical Management',
      'Pneumonia & Chest Infection Treatment',
      'Oxygen Saturation Monitoring & Sputum Diagnostics'
    ],
    departmentHead: 'Department of Respiratory Care',
    averageWaitTime: '< 20 mins'
  },
  {
    id: 'endocrinology',
    name: 'Endocrinology',
    tagline: 'Diabetes mellitus, thyroid imbalances, and metabolic health.',
    description: 'Long-term glycemic monitoring, insulin regimen optimization, and thyroid hormone management to prevent microvascular and macrovascular complications.',
    iconName: 'Sparkles',
    treatments: [
      'Fasting & Post-Prandial Glucose Monitoring',
      'HbA1c & Glycemic Control Roadmaps',
      'Hypothyroidism & Hyperthyroidism Care',
      'Dietary & Lifestyle Guidance for Metabolic Balance'
    ],
    departmentHead: 'Metabolic & Endocrine Clinic',
    averageWaitTime: '< 20 mins'
  },
  {
    id: 'gastroenterology',
    name: 'Medical Gastroenterology',
    tagline: 'Digestive tract, acid peptic diseases, and liver care.',
    description: 'Clinical care for abdominal pain, persistent gastritis, jaundice, fatty liver, and gastrointestinal infections with targeted laboratory verification.',
    iconName: 'ShieldCheck',
    treatments: [
      'Gastritis & Acid Reflux Management',
      'Liver Function & Jaundice Treatment',
      'Abdominal Pain & Colitis Evaluation',
      'Dietary Protocols for Digestive Health'
    ],
    departmentHead: 'Digestive Health Clinic',
    averageWaitTime: '< 20 mins'
  },
  {
    id: 'nephrology',
    name: 'Nephrology',
    tagline: 'Kidney function evaluation, hypertension control, and renal wellness.',
    description: 'Focusing on early detection of renal decline, proteinuria, serum creatinine management, and specialized medical protocols for kidney health.',
    iconName: 'Brain',
    treatments: [
      'KFT & Creatinine Monitoring',
      'Diabetic Nephropathy Prevention',
      'Blood Pressure Control for Renal Protection',
      'Electrolyte & Fluid Balance Optimization'
    ],
    departmentHead: 'Renal Care Service',
    averageWaitTime: '< 25 mins'
  },
  {
    id: 'neurology',
    name: 'Neurology',
    tagline: 'Neurological evaluation, headache management, and nerve health.',
    description: 'Initial assessment and supportive management for persistent migraines, peripheral neuropathy, dizziness, and emergency stabilization for cerebrovascular events.',
    iconName: 'Brain',
    treatments: [
      'Migraine & Chronic Headache Care',
      'Diabetic & Peripheral Neuropathy Management',
      'Vertigo & Dizziness Assessments',
      'Stroke Emergency Stabilization & Referral'
    ],
    departmentHead: 'Neuro Care Clinic',
    averageWaitTime: '< 20 mins'
  },
  {
    id: 'pathology-lab',
    name: 'Dr. Bayaskar Pathology Lab',
    tagline: 'Precision clinical laboratory testing with home collection & e-reports.',
    description: 'Dedicated pathology testing center in Murtizapur offering CBC, KFT, LFT, Widal, and automated diagnostic reports delivered quickly via WhatsApp and email.',
    iconName: 'Microscope',
    treatments: [
      'CBC, Hemoglobin & Platelet Counts',
      'Kidney (KFT) & Liver (LFT) Profiles',
      'Widal Typhoid & Serology Testing',
      'Home Sample Collection (Call 8010576316)'
    ],
    departmentHead: 'Bayaskar Pathology Diagnostic Team',
    averageWaitTime: 'Fast Sample Processing'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    patientName: 'Rameshwar Patil',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    role: 'Patient from Murtizapur',
    rating: 5,
    review: 'Dr. Tushar Bayaskar is an extremely humble and knowledgeable doctor. He diagnosed my severe fever accurately and gave genuine medicines without unnecessary tests. The ₹300 consultation fee is very reasonable for this quality of care.',
    department: 'General Medicine'
  },
  {
    id: 'test-2',
    patientName: 'Sunita Deshmukh',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    role: 'Ashirwad Nagar Resident',
    rating: 5,
    review: 'Our family always relies on Late Govardhanrao Bayaskar Memorial Hospital. The hospital is very clean, accessible with wheelchair ramps, and Dr. Bayaskar Pathology Lab provided our blood reports on phone within hours.',
    department: 'Hospital & Pathology'
  },
  {
    id: 'test-3',
    patientName: 'Gajanan Wankhade',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    role: 'Akola District Patient',
    rating: 4,
    review: 'Prompt emergency admission and proper oxygen arrangement when my father felt acute chest congestion. Grateful to the hospital staff and Dr. Bayaskar for their immediate attention.',
    department: 'Critical Care'
  }
];

// Using real photos of Late Govardhanrao Bayaskar Memorial Hospital and Dr. Bayaskar Pathology Lab
export const LOCATIONS: HospitalLocation[] = [
  {
    id: 'loc-bayaskar-main',
    name: 'Late Govardhanrao Bayaskar Memorial Hospital',
    campusType: 'Main Hospital & Emergency Center',
    address: 'Behind Ashirwad Lawn, Ashirwad Nagar',
    city: 'Murtizapur, Akola, Maharashtra – 444107',
    phone: '+91 90755 69687',
    emergencyPhone: '+91 90755 69687',
    hours: 'Hospital Open 24/7 (OPD: 11:00 AM – 5:00 PM)',
    image: '',
    features: [
      'Wheelchair-accessible parking on site',
      'Wheelchair-accessible entrance ramp and exit',
      '24/7 Emergency medical treatment & admission',
      'Clean inpatient observation beds',
      'Direct consulting with Dr. Tushar Bayaskar (MD Medicine)',
      'Behind Ashirwad Lawn landmark proximity'
    ]
  },
  {
    id: 'loc-bayaskar-lab',
    name: 'Dr. Bayaskar Pathology Lab',
    campusType: 'Diagnostic Pathology Center',
    address: 'Ashirwad Nagar Area, Near Hospital',
    city: 'Murtizapur, Akola, Maharashtra – 444107',
    phone: '+91 80105 76316',
    emergencyPhone: '+91 90755 69687',
    hours: 'Monday – Saturday: 9:00 AM – 8:00 PM',
    image: '',
    features: [
      'CBC, KFT, LFT, Widal Test',
      'Certified Clinical Laboratory Standards',
      'Home sample collection available in Murtizapur',
      'Fast digital E-reports via WhatsApp & Email',
      'Accurate automated clinical testing'
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'fever-and-typhoid-management',
    title: 'Managing Seasonal Fevers, Dengue & Typhoid: When to Seek Medical Care',
    slug: 'managing-seasonal-fevers-and-typhoid',
    category: 'General Medicine & Infectious Care',
    date: 'March 2026',
    readTime: '4 min read',
    author: {
      name: 'Dr. Tushar Bayaskar',
      role: 'MBBS, MD (Medicine) · Consultant Physician',
      avatar: ''
    },
    summary: 'Key clinical signs that differentiate ordinary viral fevers from severe infections requiring Complete Blood Count (CBC) and Widal testing.',
    image: '',
    content: [
      'In regions across Akola and Vidarbha, seasonal changes often bring an influx of febrile illnesses. While many are self-limiting, high fevers persisting beyond 48 hours require clinical assessment.',
      'A Complete Blood Count (CBC) and Widal test help evaluate platelet levels, white blood cell response, and potential Salmonella infection.',
      'Dr. Tushar Bayaskar emphasizes early hydration and avoiding unauthorized over-the-counter painkillers that may exacerbate gastric irritation or bleeding risks.'
    ]
  },
  {
    id: 'understanding-kft-lft-tests',
    title: 'Why Routine Kidney (KFT) and Liver (LFT) Tests Matter for Chronic Conditions',
    slug: 'why-routine-kidney-and-liver-tests-matter',
    category: 'Pathology & Preventive Diagnostics',
    date: 'February 2026',
    readTime: '5 min read',
    author: {
      name: 'Dr. Bayaskar Pathology Lab',
      role: 'Clinical Diagnostic Department',
      avatar: ''
    },
    summary: 'How regular screening of creatinine, BUN, bilirubin, and enzymes prevents silent kidney and liver damage in diabetic and hypertensive patients.',
    image: '',
    content: [
      'Kidney and liver diseases frequently progress silently without noticeable pain in their early stages.',
      'A routine Kidney Function Test (KFT) detects subtle rises in serum creatinine and blood urea, allowing timely medical interventions.',
      'At Dr. Bayaskar Pathology Lab in Murtizapur, patients can avail home sample collection and receive digital e-reports the same day.'
    ]
  },
  {
    id: 'diabetes-and-bp-management',
    title: 'Comprehensive Lifestyle & Medication Roadmaps for Hypertension and Diabetes',
    slug: 'hypertension-and-diabetes-management',
    category: 'Endocrinology & Chronic Care',
    date: 'January 2026',
    readTime: '4 min read',
    author: {
      name: 'Dr. Tushar Bayaskar',
      role: 'MBBS, MD (Medicine)',
      avatar: ''
    },
    summary: 'Practical dietary recommendations, salt moderation, and scheduled monitoring for long-term cardiovascular and metabolic wellness.',
    image: '',
    content: [
      'Hypertension is known as a silent condition because many individuals carry elevated blood pressure numbers without experiencing headaches or dizziness.',
      'Regular blood pressure tracking, combined with routine blood sugar checks, prevents stroke, cardiac stress, and diabetic nephropathy.',
      'Consultations at Late Govardhanrao Bayaskar Memorial Hospital are structured to provide patient education alongside evidence-based prescriptions.'
    ]
  }
];

export const INITIAL_FEATURE_CARDS = [
  {
    id: 'general-medicine-card',
    title: 'Dr. Tushar Bayaskar\nMBBS, MD (Medicine)',
    tag: 'Consultant Physician',
    subtitle: 'Consultation: 11 AM – 5 PM · Fee: ₹300',
    image: '',
    link: '/doctors',
    alt: 'Dr. Tushar Bayaskar Consultation'
  },
  {
    id: 'critical-care-card',
    title: 'Late Govardhanrao Bayaskar\nMemorial Hospital',
    tag: '24/7 Emergency & Admissions',
    subtitle: 'Murtizapur, Akola',
    image: '',
    link: '/locations',
    alt: 'Late Govardhanrao Bayaskar Memorial Hospital Building'
  },
  {
    id: 'pathology-card',
    title: 'Dr. Bayaskar\nPathology Lab',
    tag: 'Lab: 80105 76316',
    subtitle: 'CBC, KFT, LFT, Widal, Home Sample & E-Reports',
    image: '',
    link: '/pathology-lab',
    alt: 'Bayaskar Pathology Lab Murtizapur'
  },
  {
    id: 'accessible-card',
    title: 'Wheelchair Accessible\nParking & Entrance',
    tag: 'Behind Ashirwad Lawn',
    subtitle: 'Step-free ramp entry and parking',
    image: '',
    link: '/locations',
    alt: 'Hospital Building Murtizapur'
  }
];
