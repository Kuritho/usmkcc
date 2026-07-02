import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc, 
  query, 
  where, 
  orderBy, 
  limit,
  updateDoc,
  deleteDoc,
  Timestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './config';

// Collection references
const newsCollection = collection(db, 'news');
const eventsCollection = collection(db, 'events');
const announcementsCollection = collection(db, 'announcements');

// Helper function to upload image with retry logic and better error handling
export const uploadImage = async (file, path) => {
  if (!file) return '';
  
  try {
    console.log('Starting upload for:', file.name);
    const storageRef = ref(storage, path);
    
    // Add metadata to help with CORS
    const metadata = {
      contentType: file.type,
      cacheControl: 'public, max-age=31536000',
    };
    
    // Upload with metadata
    const snapshot = await uploadBytes(storageRef, file, metadata);
    console.log('Upload successful, getting download URL...');
    
    // Get download URL
    const url = await getDownloadURL(snapshot.ref);
    console.log('Download URL obtained:', url);
    
    return url;
  } catch (error) {
    console.error('Detailed upload error:', error);
    throw new Error(`Upload failed: ${error.message}`);
  }
};

// NEWS SERVICES
export const createNews = async (newsData, imageFile) => {
  try {
    console.log('Creating news with data:', newsData);
    
    let imageUrl = '';
    if (imageFile) {
      // Generate a unique filename
      const timestamp = Date.now();
      const safeFileName = imageFile.name.replace(/[^a-zA-Z0-9.]/g, '_');
      const filePath = `news/${timestamp}_${safeFileName}`;
      
      imageUrl = await uploadImage(imageFile, filePath);
      console.log('Image uploaded successfully:', imageUrl);
    }

    const docData = {
      ...newsData,
      imageUrl,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      published: true,
      sdgTags: newsData.sdgTags || []
    };

    console.log('Saving to Firestore:', docData);
    const docRef = await addDoc(newsCollection, docData);
    console.log('Document saved with ID:', docRef.id);
    
    return { id: docRef.id, success: true };
  } catch (error) {
    console.error('Error creating news:', error);
    return { 
      success: false, 
      error: error.message || 'Unknown error occurred'
    };
  }
};

// EVENTS SERVICES
export const createEvent = async (eventData, imageFile) => {
  try {
    console.log('Creating event with data:', eventData);
    
    let imageUrl = '';
    if (imageFile) {
      const timestamp = Date.now();
      const safeFileName = imageFile.name.replace(/[^a-zA-Z0-9.]/g, '_');
      const filePath = `events/${timestamp}_${safeFileName}`;
      
      imageUrl = await uploadImage(imageFile, filePath);
      console.log('Image uploaded successfully:', imageUrl);
    }

    const docData = {
      ...eventData,
      imageUrl,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      published: true,
      sdgTags: eventData.sdgTags || []
    };

    console.log('Saving to Firestore:', docData);
    const docRef = await addDoc(eventsCollection, docData);
    console.log('Document saved with ID:', docRef.id);
    
    return { id: docRef.id, success: true };
  } catch (error) {
    console.error('Error creating event:', error);
    return { 
      success: false, 
      error: error.message || 'Unknown error occurred'
    };
  }
};

// ANNOUNCEMENTS SERVICES
export const createAnnouncement = async (announcementData) => {
  try {
    console.log('Creating announcement with data:', announcementData);
    
    const docData = {
      ...announcementData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      published: true
    };

    const docRef = await addDoc(announcementsCollection, docData);
    console.log('Announcement saved with ID:', docRef.id);
    
    return { id: docRef.id, success: true };
  } catch (error) {
    console.error('Error creating announcement:', error);
    return { 
      success: false, 
      error: error.message || 'Unknown error occurred'
    };
  }
};

// GET ALL NEWS
export const getAllNews = async () => {
  try {
    const q = query(newsCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate()
    }));
  } catch (error) {
    console.error('Error getting news:', error);
    return [];
  }
};

// GET NEWS BY SDG
export const getNewsBySDG = async (sdgId) => {
  try {
    const q = query(
      newsCollection, 
      where('sdgTags', 'array-contains', parseInt(sdgId)),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate()
    }));
  } catch (error) {
    console.error('Error getting news by SDG:', error);
    return [];
  }
};

// GET NEWS BY ID
export const getNewsById = async (id) => {
  try {
    const docRef = doc(db, 'news', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting news:', error);
    return null;
  }
};

// GET ALL EVENTS
export const getAllEvents = async () => {
  try {
    const q = query(eventsCollection, orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate()
    }));
  } catch (error) {
    console.error('Error getting events:', error);
    return [];
  }
};

// GET EVENTS BY SDG
export const getEventsBySDG = async (sdgId) => {
  try {
    const q = query(
      eventsCollection, 
      where('sdgTags', 'array-contains', parseInt(sdgId)),
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate()
    }));
  } catch (error) {
    console.error('Error getting events by SDG:', error);
    return [];
  }
};

// GET EVENT BY ID
export const getEventById = async (id) => {
  try {
    const docRef = doc(db, 'events', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting event:', error);
    return null;
  }
};

// GET ALL ANNOUNCEMENTS
export const getAllAnnouncements = async () => {
  try {
    const q = query(announcementsCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate()
    }));
  } catch (error) {
    console.error('Error getting announcements:', error);
    return [];
  }
};

// GET ALL CONTENT BY SDG
export const getAllContentBySDG = async (sdgId) => {
  try {
    const [news, events] = await Promise.all([
      getNewsBySDG(sdgId),
      getEventsBySDG(sdgId)
    ]);
    
    return {
      news,
      events,
      all: [...news, ...events].sort((a, b) => {
        const dateA = a.createdAt || a.date;
        const dateB = b.createdAt || b.date;
        return new Date(dateB) - new Date(dateA);
      })
    };
  } catch (error) {
    console.error('Error getting content by SDG:', error);
    return { news: [], events: [], all: [] };
  }
};