import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  onSnapshot, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  serverTimestamp, 
  setDoc 
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Appointment } from '../types';

export const firebaseConfig = {
  apiKey: "AIzaSyDmrhlRcyKXc10aEcrVlVMImIluma_QauM",
  authDomain: "hospital-management-syst-ba0af.firebaseapp.com",
  projectId: "hospital-management-syst-ba0af",
  storageBucket: "hospital-management-syst-ba0af.firebasestorage.app",
  messagingSenderId: "493181004749",
  appId: "1:493181004749:web:7a33682e78e2c1f35af284",
  measurementId: "G-BRK67QNMX6"
};

// Initialize Firebase safely
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Save Appointment to Firebase Firestore & fallback to localStorage
export async function saveAppointment(appointment: Appointment): Promise<string> {
  // Always update local storage first as backup
  try {
    const stored = localStorage.getItem('medtrust_appointments');
    const list: Appointment[] = stored ? JSON.parse(stored) : [];
    // If not already in list, prepend
    if (!list.some(a => a.id === appointment.id)) {
      list.unshift(appointment);
      localStorage.setItem('medtrust_appointments', JSON.stringify(list));
    }
  } catch (err) {
    console.warn('Local storage write warning', err);
  }

  // Attempt Firestore write
  try {
    const colRef = collection(db, 'appointments');
    // Using doc with appointment.id so ID matches
    const docRef = doc(db, 'appointments', appointment.id);
    await setDoc(docRef, {
      ...appointment,
      firestoreCreatedAt: serverTimestamp()
    }, { merge: true });
    return appointment.id;
  } catch (error) {
    console.warn('Firestore write notice (falling back to offline state):', error);
    return appointment.id;
  }
}

// Real-time listener for Appointments (combines Firestore + local state)
export function subscribeAppointments(callback: (appointments: Appointment[]) => void): () => void {
  let unsubscribeFirestore = () => {};

  const getLocalAppointments = (): Appointment[] => {
    try {
      const stored = localStorage.getItem('medtrust_appointments');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  try {
    const q = query(collection(db, 'appointments'), orderBy('createdAt', 'desc'));
    unsubscribeFirestore = onSnapshot(q, (snapshot) => {
      const fbList: Appointment[] = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        fbList.push({
          id: docSnap.id,
          patientName: data.patientName || '',
          email: data.email || '',
          phone: data.phone || '',
          department: data.department || '',
          doctorId: data.doctorId || '',
          doctorName: data.doctorName || '',
          date: data.date || '',
          time: data.time || '',
          reason: data.reason || '',
          status: data.status || 'Confirmed',
          createdAt: data.createdAt || new Date().toISOString()
        });
      });

      // Merge with local appointments to ensure no new local appointment is dropped
      const localList = getLocalAppointments();
      const mergedMap = new Map<string, Appointment>();

      // Put firebase first
      fbList.forEach(a => mergedMap.set(a.id, a));
      // Add local ones if not present
      localList.forEach(a => {
        if (!mergedMap.has(a.id)) {
          mergedMap.set(a.id, a);
        }
      });

      const merged = Array.from(mergedMap.values()).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      // Keep localStorage in sync with Firestore
      try {
        localStorage.setItem('medtrust_appointments', JSON.stringify(merged));
      } catch {}

      callback(merged);
    }, (error) => {
      console.warn('Firestore subscription fallback to local cache:', error);
      callback(getLocalAppointments());
    });
  } catch (err) {
    console.warn('Failed to start Firestore snapshot listener:', err);
    callback(getLocalAppointments());
  }

  // Also listen for storage events from other tabs
  const storageListener = () => {
    callback(getLocalAppointments());
  };
  window.addEventListener('storage', storageListener);

  return () => {
    unsubscribeFirestore();
    window.removeEventListener('storage', storageListener);
  };
}

// Update Appointment Status in Firebase & local cache
export async function updateAppointmentStatus(id: string, status: 'Pending' | 'Confirmed' | 'Completed'): Promise<void> {
  // Update local
  try {
    const stored = localStorage.getItem('medtrust_appointments');
    if (stored) {
      const list: Appointment[] = JSON.parse(stored);
      const updated = list.map(a => a.id === id ? { ...a, status } : a);
      localStorage.setItem('medtrust_appointments', JSON.stringify(updated));
    }
  } catch {}

  // Update Firestore
  try {
    const docRef = doc(db, 'appointments', id);
    await updateDoc(docRef, { status });
  } catch (err) {
    console.warn('Firestore status update notice:', err);
  }
}

// Delete Appointment
export async function deleteAppointment(id: string): Promise<void> {
  // Delete local
  try {
    const stored = localStorage.getItem('medtrust_appointments');
    if (stored) {
      const list: Appointment[] = JSON.parse(stored);
      const updated = list.filter(a => a.id !== id);
      localStorage.setItem('medtrust_appointments', JSON.stringify(updated));
    }
  } catch {}

  // Delete Firestore
  try {
    const docRef = doc(db, 'appointments', id);
    await deleteDoc(docRef);
  } catch (err) {
    console.warn('Firestore delete notice:', err);
  }
}

// Contact messages support
export interface HospitalMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export async function saveContactMessage(msg: Omit<HospitalMessage, 'id' | 'createdAt' | 'read'>): Promise<string> {
  const id = 'MSG-' + Date.now();
  const fullMsg: HospitalMessage = {
    ...msg,
    id,
    createdAt: new Date().toISOString(),
    read: false
  };

  try {
    const stored = localStorage.getItem('medtrust_messages');
    const list: HospitalMessage[] = stored ? JSON.parse(stored) : [];
    list.unshift(fullMsg);
    localStorage.setItem('medtrust_messages', JSON.stringify(list));
  } catch {}

  try {
    const docRef = doc(db, 'contact_messages', id);
    await setDoc(docRef, {
      ...fullMsg,
      firestoreCreatedAt: serverTimestamp()
    });
  } catch (e) {
    console.warn('Firestore message save notice:', e);
  }

  return id;
}

export function subscribeContactMessages(callback: (messages: HospitalMessage[]) => void): () => void {
  const getLocal = (): HospitalMessage[] => {
    try {
      const stored = localStorage.getItem('medtrust_messages');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  try {
    const q = query(collection(db, 'contact_messages'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snap) => {
      const list: HospitalMessage[] = [];
      snap.forEach(d => {
        const data = d.data();
        list.push({
          id: d.id,
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          subject: data.subject || '',
          message: data.message || '',
          createdAt: data.createdAt || new Date().toISOString(),
          read: data.read ?? false
        });
      });
      callback(list.length > 0 ? list : getLocal());
    }, () => callback(getLocal()));
  } catch {
    callback(getLocal());
    return () => {};
  }
}

// Pathology Sample Requests
export interface PathologyRequest {
  id: string;
  patientName: string;
  phone: string;
  address: string;
  testRequired: string;
  preferredDate: string;
  createdAt: string;
  status: 'Pending' | 'Technician Dispatched' | 'Collected' | 'Report Generated';
}

export async function savePathologyRequest(req: Omit<PathologyRequest, 'id' | 'createdAt' | 'status'>): Promise<string> {
  const id = 'LAB-' + Date.now();
  const fullReq: PathologyRequest = {
    ...req,
    id,
    createdAt: new Date().toISOString(),
    status: 'Pending'
  };

  try {
    const stored = localStorage.getItem('medtrust_lab_requests');
    const list: PathologyRequest[] = stored ? JSON.parse(stored) : [];
    list.unshift(fullReq);
    localStorage.setItem('medtrust_lab_requests', JSON.stringify(list));
  } catch {}

  try {
    const docRef = doc(db, 'pathology_requests', id);
    await setDoc(docRef, {
      ...fullReq,
      firestoreCreatedAt: serverTimestamp()
    });
  } catch (e) {
    console.warn('Firestore lab request notice:', e);
  }

  return id;
}

export function subscribePathologyRequests(callback: (requests: PathologyRequest[]) => void): () => void {
  const getLocal = (): PathologyRequest[] => {
    try {
      const stored = localStorage.getItem('medtrust_lab_requests');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  try {
    const q = query(collection(db, 'pathology_requests'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snap) => {
      const list: PathologyRequest[] = [];
      snap.forEach(d => {
        const data = d.data();
        list.push({
          id: d.id,
          patientName: data.patientName || '',
          phone: data.phone || '',
          address: data.address || '',
          testRequired: data.testRequired || '',
          preferredDate: data.preferredDate || '',
          createdAt: data.createdAt || new Date().toISOString(),
          status: data.status || 'Pending'
        });
      });
      callback(list.length > 0 ? list : getLocal());
    }, () => callback(getLocal()));
  } catch {
    callback(getLocal());
    return () => {};
  }
}
