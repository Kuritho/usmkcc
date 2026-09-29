// src/pages/Admin.js - Complete with Multiple Images (Thumbnail + Content Images)
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Table, Modal, Spinner, ListGroup, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { 
  createNewsWithImages,
  createAnnouncementWithImages,
  createEventWithImages,
  checkBuckets,
  getNews,
  getEvents,
  getAnnouncements,
  deleteNews,
  deleteEvent,
  deleteAnnouncement,
  getGalleryImages,
  uploadGalleryImage,
  deleteGalleryImage,
  getOffices,
  addOfficeStaff,
  removeOfficeStaff,
  getOfficeById,
  addOffice,
  updateOffice,
  deleteOffice,
  updateNewsWithImages,
  updateAnnouncementWithImages,
  updateEventWithImages,
  getNewsById,
  getAnnouncementById,
  getEventById,
  getKeyOfficials,
  createKeyOfficial,
  updateKeyOfficial,
  deleteKeyOfficial,
  getKeyOfficialById,
  getFaculty,
  createFaculty,
  updateFaculty,
  deleteFaculty,
  getFacultyById,
  getFacultyByCollege,
  getDeansByCollege,
  getProgramHeads,
  getDepartmentHeads
} from '../supabase/services';
import { supabase } from '../supabase/supabaseClient';
import { sdgGoals } from '../components/SDGHub';
import Select from 'react-select';
import { authService } from '../services/authService';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [loading, setLoading] = useState(false);
  const [bucketStatus, setBucketStatus] = useState(null);
  const [checkingBuckets, setCheckingBuckets] = useState(false);
  const [stats, setStats] = useState({ news: 0, events: 0, announcements: 0, gallery: 0, offices: 0, officials: 0, faculty: 0 });
  const [setupStorageLoading, setSetupStorageLoading] = useState(false);
  
  // State for managing published content
  const [publishedNews, setPublishedNews] = useState([]);
  const [publishedEvents, setPublishedEvents] = useState([]);
  const [publishedAnnouncements, setPublishedAnnouncements] = useState([]);
  const [loadingContent, setLoadingContent] = useState(false);
  
  // State for gallery
  const [galleryImages, setGalleryImages] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [galleryFormData, setGalleryFormData] = useState({
    title: '',
    description: '',
    imageFile: null
  });
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [showDeleteGalleryModal, setShowDeleteGalleryModal] = useState(false);
  const [galleryImageToDelete, setGalleryImageToDelete] = useState(null);
  const [deletingGallery, setDeletingGallery] = useState(false);
  
  // State for office management
  const [offices, setOffices] = useState([]);
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [officeStaff, setOfficeStaff] = useState([]);
  const [staffFormData, setStaffFormData] = useState({ 
    name: '', 
    position: '', 
    imageFile: null,
    imagePreview: null
  });
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [loadingOffices, setLoadingOffices] = useState(false);
  const [uploadingStaffImage, setUploadingStaffImage] = useState(false);
  
  // State for add/edit office modal
  const [showOfficeModal, setShowOfficeModal] = useState(false);
  const [editingOffice, setEditingOffice] = useState(null);
  const [officeFormData, setOfficeFormData] = useState({
    name: '',
    description: '',
    contact: '',
    email: '',
    hours: '',
    location: '',
    icon: 'bi-building'
  });
  const [savingOffice, setSavingOffice] = useState(false);
  
  // Modal states for delete confirmation
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [showDeleteOfficeModal, setShowDeleteOfficeModal] = useState(false);
  const [officeToDelete, setOfficeToDelete] = useState(null);
  
  // State for Edit Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editType, setEditType] = useState('');
  const [editFormData, setEditFormData] = useState({
    title: '',
    category: '',
    content: '',
    summary: '',
    sdgTags: [],
    priority: 'normal',
    date: '',
    time: '',
    location: '',
    description: '',
    images: []
  });
  const [editImageFiles, setEditImageFiles] = useState([]);
  const [editImagePreviews, setEditImagePreviews] = useState([]);
  const [editExistingImages, setEditExistingImages] = useState([]);
  const [loadingEdit, setLoadingEdit] = useState(false);
  
  // Multiple image states for create
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  
  // Key Officials state
  const [keyOfficials, setKeyOfficials] = useState([]);
  const [loadingKeyOfficials, setLoadingKeyOfficials] = useState(false);
  const [showOfficialModal, setShowOfficialModal] = useState(false);
  const [editingOfficial, setEditingOfficial] = useState(null);
  const [officialFormData, setOfficialFormData] = useState({
    name: '',
    position: '',
    email: '',
    phone: '',
    bio: '',
    level: 0,
    category: 'administration',
    display_order: 0,
    is_active: true
  });
  const [officialImageFile, setOfficialImageFile] = useState(null);
  const [officialImagePreview, setOfficialImagePreview] = useState(null);
  const [savingOfficial, setSavingOfficial] = useState(false);
  const [showDeleteOfficialModal, setShowDeleteOfficialModal] = useState(false);
  const [officialToDelete, setOfficialToDelete] = useState(null);
  
  // Faculty state
  const [facultyMembers, setFacultyMembers] = useState([]);
  const [loadingFaculty, setLoadingFaculty] = useState(false);
  const [showFacultyModal, setShowFacultyModal] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [facultyFormData, setFacultyFormData] = useState({
    name: '',
    designation: '',
    program: '',
    college: '',
    designations: [],
    is_active: true,
    is_allied: false,
    is_program_head: false,
    is_dean: false,
    is_department_head: false,
    display_order: 0
  });
  const [facultyImageFile, setFacultyImageFile] = useState(null);
  const [facultyImagePreview, setFacultyImagePreview] = useState(null);
  const [savingFaculty, setSavingFaculty] = useState(false);
  const [showDeleteFacultyModal, setShowDeleteFacultyModal] = useState(false);
  const [facultyToDelete, setFacultyToDelete] = useState(null);
  
  // Faculty search state
  const [facultySearchTerm, setFacultySearchTerm] = useState('');
  const [filteredFaculty, setFilteredFaculty] = useState([]);
  
  // Extension News state
  const [extensionNewsForm, setExtensionNewsForm] = useState({
    title: '',
    content: '',
    summary: '',
    sdgTags: [],
    images: [],
    category: 'extension'
  });
  
  // News Form with Thumbnail and Content Images
  const [newsForm, setNewsForm] = useState({
    title: '',
    category: '',
    content: '',
    summary: '',
    sdgTags: [],
    thumbnailImage: null,
    thumbnailPreview: null,
    contentImages: [],
    contentImagePreviews: [],
    showOnReso: false
  });
  
  const navigate = useNavigate();

  // SDG options for react-select
  const sdgOptions = sdgGoals.map(goal => ({
    value: goal.id,
    label: `SDG ${goal.id}: ${goal.title}`,
    color: goal.color
  }));

  // College and program options for faculty
  const collegeOptions = [
    { value: 'College of Engineering', label: 'College of Engineering' },
    { value: 'College of Education, Arts and Sciences', label: 'College of Education, Arts and Sciences' },
    { value: 'College of Technology', label: 'College of Technology' }
  ];

  const programOptions = {
  'College of Engineering': [
    'Bachelor of Science in Industrial Engineering',
    'Bachelor of Science in Mechanical Engineering',
    'Bachelor of Science in Electrical Engineering',
    'Allied Engineering Faculty'
  ],
  'College of Education, Arts and Sciences': [
    'Bachelor of Secondary Education major in Filipino',
    'Bachelor of Secondary Education major in English',
    'Bachelor of Secondary Education major in Mathematics',
    'Bachelor of Secondary Education major in Social Studies',
    'Bachelor of Technical-Vocational Teacher Education major in Automotive Technology',
    'Bachelor of Technical-Vocational Teacher Education major in Electronics Technology',
    'Bachelor of Technical-Vocational Teacher Education major in Food and Services Management',
    'Bachelor of Technical-Vocational Teacher Education major in Garments, Fashion, and Design',
    'General and Professional Education Program'
  ],
  'College of Technology': [
    'Bachelor of Industrial Technology (BIndTech) major in Automotive Technology',
    'Bachelor of Industrial Technology (BIndTech) major in Construction Technology',
    'Bachelor of Industrial Technology (BIndTech) major in Electronics Technology',
    'Bachelor of Industrial Technology (BIndTech) major in Electrical Technology',
    'Bachelor of Industrial Technology (BIndTech) major in Heating, Ventilating, and Air-Conditioning',
    'Bachelor of Industrial Technology (BIndTech) major in Mechanical Technology',
    'Bachelor of Industrial Technology (BIndTech) major in Welding and Fabrication Technology',
    'Bachelor of Industrial Technology (BIndTech) major in Food Science and Technology',
    'Bachelor of Industrial Technology (BIndTech) Major in Food and Beverage Preparation and Service Technology',
    'Bachelor of Industrial Technology (BIT) Major in Food and Beverage Preparation and Service Technology',
    'Bachelor of Industrial Technology (BInTech) Major in Culinary Technology',
    'Bachelor of Technology (BT) major in Automotive Technology',
    'Bachelor of Technology (BT) major in Civil Technology',
    'Bachelor of Technology (BT) major in Electrical Technology',
    'Bachelor of Technology (BT) major in Electronics Technology',
    'Bachelor of Technology (BT) major in Heating, Ventilating, Air Conditioning Technology',
    'Bachelor of Technology (BT) major in Mechanical Technology',
    'Bachelor of Technology (BT) major in Welding and Fabrication Technology',
    'Diploma of Technology (DT) major in Automotive Technology',
    'Diploma of Technology (DT) major in Civil Technology',
    'Diploma of Technology (DT) major in Electrical Technology',
    'Diploma of Technology (DT) major in Electronics Technology',
    'Diploma of Technology (DT) major in Heating, Ventilating, Air Conditioning Technology',
    'Diploma of Technology (DT) major in Mechanical Technology',
    'Diploma of Technology (DT) major in Welding and Fabrication Technology',
    'Food Preparation and Services (FPST)',
    'Allied Food Science and Technology Faculty'
  ]
};

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = authService.isAuthenticated();
      if (isAuth) {
        setIsAuthenticated(true);
        setAdminUser(authService.getCurrentUser());
      } else {
        navigate('/');
      }
    };
    
    checkAuth();
    checkBucketStatus();
    loadStats();
    loadPublishedContent();
    loadGalleryImages();
    loadOffices();
    loadKeyOfficials();
    loadFaculty();
  }, [navigate]);

  // Reset search when switching away from faculty tab
  useEffect(() => {
    if (activeTab !== 'faculty') {
      setFacultySearchTerm('');
      setFilteredFaculty(facultyMembers);
    }
  }, [activeTab, facultyMembers]);

  // Load dashboard stats
  const loadStats = async () => {
    try {
      const [newsResult, eventsResult, announcementsResult, galleryResult, officesResult, officialsResult, facultyResult] = await Promise.all([
        getNews(),
        getEvents(),
        getAnnouncements(),
        getGalleryImages(),
        getOffices(),
        getKeyOfficials(),
        getFaculty()
      ]);
      
      setStats({
        news: newsResult.success ? newsResult.data.length : 0,
        events: eventsResult.success ? eventsResult.data.length : 0,
        announcements: announcementsResult.success ? announcementsResult.data.length : 0,
        gallery: galleryResult.success ? galleryResult.data.length : 0,
        offices: officesResult.success ? officesResult.data.length : 0,
        officials: officialsResult.success ? officialsResult.data.length : 0,
        faculty: facultyResult.success ? facultyResult.data.length : 0
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  // Load published content for management
  const loadPublishedContent = async () => {
    setLoadingContent(true);
    try {
      const [newsResult, eventsResult, announcementsResult] = await Promise.all([
        getNews(),
        getEvents(),
        getAnnouncements()
      ]);
      
      if (newsResult.success) {
        setPublishedNews(newsResult.data);
      }
      if (eventsResult.success) {
        setPublishedEvents(eventsResult.data);
      }
      if (announcementsResult.success) {
        setPublishedAnnouncements(announcementsResult.data);
      }
    } catch (error) {
      console.error('Error loading published content:', error);
    } finally {
      setLoadingContent(false);
    }
  };

  // Load gallery images
  const loadGalleryImages = async () => {
    setLoadingGallery(true);
    try {
      const result = await getGalleryImages();
      if (result.success) {
        setGalleryImages(result.data);
      } else {
        setUploadError('Failed to load gallery images');
      }
    } catch (error) {
      console.error('Error loading gallery:', error);
      setUploadError('Error loading gallery images');
    } finally {
      setLoadingGallery(false);
    }
  };

  // Load offices
  const loadOffices = async () => {
    setLoadingOffices(true);
    try {
      const result = await getOffices();
      if (result.success) {
        setOffices(result.data);
      }
    } catch (error) {
      console.error('Error loading offices:', error);
    } finally {
      setLoadingOffices(false);
    }
  };

  // Load office staff
  const loadOfficeStaff = async (officeId) => {
    const office = offices.find(o => o.id === officeId);
    setSelectedOffice(office);
    try {
      const result = await getOfficeById(officeId);
      if (result.success) {
        setOfficeStaff(result.data.staff || []);
      }
    } catch (error) {
      console.error('Error loading staff:', error);
    }
  };

  // Load key officials
  const loadKeyOfficials = async () => {
    setLoadingKeyOfficials(true);
    try {
      const result = await getKeyOfficials();
      if (result.success) {
        setKeyOfficials(result.data);
      } else {
        setUploadError('Failed to load key officials');
      }
    } catch (error) {
      console.error('Error loading key officials:', error);
      setUploadError('Error loading key officials');
    } finally {
      setLoadingKeyOfficials(false);
    }
  };

  // Load faculty
  const loadFaculty = async () => {
    setLoadingFaculty(true);
    try {
      const result = await getFaculty();
      if (result.success) {
        setFacultyMembers(result.data);
        setFilteredFaculty(result.data);
      } else {
        setUploadError('Failed to load faculty members');
      }
    } catch (error) {
      console.error('Error loading faculty:', error);
      setUploadError('Error loading faculty members');
    } finally {
      setLoadingFaculty(false);
    }
  };

  // Faculty search handler
  const handleFacultySearch = (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    setFacultySearchTerm(searchTerm);
    
    if (!searchTerm) {
      setFilteredFaculty(facultyMembers);
      return;
    }
    
    const filtered = facultyMembers.filter(faculty => {
      return (
        faculty.name?.toLowerCase().includes(searchTerm) ||
        faculty.program?.toLowerCase().includes(searchTerm) ||
        faculty.college?.toLowerCase().includes(searchTerm) ||
        faculty.designation?.toLowerCase().includes(searchTerm) ||
        faculty.designations?.some(d => d.toLowerCase().includes(searchTerm))
      );
    });
    
    setFilteredFaculty(filtered);
  };

  // Reset faculty search
  const resetFacultySearch = () => {
    setFacultySearchTerm('');
    setFilteredFaculty(facultyMembers);
  };

  // ==================== NEWS FUNCTIONS ====================

  // Thumbnail image handlers
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewsForm({ 
          ...newsForm, 
          thumbnailImage: file,
          thumbnailPreview: reader.result 
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeThumbnail = () => {
    setNewsForm({ 
      ...newsForm, 
      thumbnailImage: null,
      thumbnailPreview: null 
    });
    document.getElementById('news-thumbnail-input').value = '';
  };

  // Content images handlers
  const handleContentImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    setNewsForm({ 
      ...newsForm, 
      contentImages: [...newsForm.contentImages, ...files] 
    });
    
    const previews = files.map(file => URL.createObjectURL(file));
    setNewsForm(prev => ({
      ...prev,
      contentImagePreviews: [...prev.contentImagePreviews, ...previews]
    }));
  };

  const removeContentImage = (index) => {
    const newImages = [...newsForm.contentImages];
    const newPreviews = [...newsForm.contentImagePreviews];
    
    URL.revokeObjectURL(newPreviews[index]);
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setNewsForm({ 
      ...newsForm, 
      contentImages: newImages,
      contentImagePreviews: newPreviews 
    });
  };

  // News submit handler with thumbnail and content images
  const handleNewsSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUploadError('');
    setUploadSuccess('');
    
    try {
      if (!newsForm.title || !newsForm.content) {
        throw new Error('Title and content are required');
      }

      // Combine thumbnail and content images for upload
      const allImages = [];
      if (newsForm.thumbnailImage) {
        allImages.push(newsForm.thumbnailImage);
      }
      if (newsForm.contentImages && newsForm.contentImages.length > 0) {
        allImages.push(...newsForm.contentImages);
      }

      const newsData = {
        ...newsForm,
        date: new Date().toISOString().split('T')[0],
        type: 'news',
        category: newsForm.showOnReso ? 'research' : newsForm.category,
        originalCategory: newsForm.category,
        showOnReso: newsForm.showOnReso,
        thumbnailIndex: 0
      };
      
      console.log('Submitting news with images:', allImages.length);
      const result = await createNewsWithImages(newsData, allImages);
      
      if (result.success) {
        setUploadSuccess(`News article uploaded successfully with ${allImages.length} image(s)!`);
        setNewsForm({ 
          title: '', 
          category: '', 
          content: '', 
          summary: '', 
          sdgTags: [], 
          thumbnailImage: null,
          thumbnailPreview: null,
          contentImages: [],
          contentImagePreviews: [],
          showOnReso: false 
        });
        document.getElementById('news-thumbnail-input').value = '';
        document.getElementById('news-content-images-input').value = '';
        await loadStats();
        await loadPublishedContent();
      } else {
        setUploadError(`Failed to upload news: ${result.error || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setUploadError('An error occurred: ' + error.message);
    } finally {
      setLoading(false);
      setTimeout(() => setUploadSuccess(''), 5000);
    }
  };

  // ==================== EXTENSION NEWS FUNCTIONS ====================

  // Extension image handlers
  const handleExtensionImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    setExtensionNewsForm({ ...extensionNewsForm, images: files });
    
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const removeExtensionImage = (index) => {
    const newImages = [...extensionNewsForm.images];
    newImages.splice(index, 1);
    
    const newPreviews = [...imagePreviews];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
    
    setExtensionNewsForm({ ...extensionNewsForm, images: newImages });
  };

  // Extension News submit handler
  const handleExtensionNewsSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUploadError('');
    setUploadSuccess('');
    
    try {
      if (!extensionNewsForm.title || !extensionNewsForm.content) {
        throw new Error('Title and content are required');
      }

      const newsData = {
        ...extensionNewsForm,
        date: new Date().toISOString().split('T')[0],
        type: 'news',
        category: 'extension'
      };
      
      console.log('Submitting extension news with images:', extensionNewsForm.images.length);
      const result = await createNewsWithImages(newsData, extensionNewsForm.images);
      
      if (result.success) {
        setUploadSuccess(`Extension news uploaded successfully with ${extensionNewsForm.images.length} image(s)!`);
        setExtensionNewsForm({ 
          title: '', 
          content: '', 
          summary: '', 
          sdgTags: [], 
          images: [],
          category: 'extension'
        });
        setImagePreviews([]);
        document.getElementById('extension-news-images-input').value = '';
        await loadStats();
        await loadPublishedContent();
      } else {
        setUploadError(`Failed to upload extension news: ${result.error || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setUploadError('An error occurred: ' + error.message);
    } finally {
      setLoading(false);
      setTimeout(() => setUploadSuccess(''), 5000);
    }
  };

  // ==================== EDIT FUNCTIONS ====================

  const handleEditClick = async (item, type) => {
    setEditType(type);
    setEditingItem(item);
    setLoadingEdit(true);
    setShowEditModal(true);

    try {
      let fetchedItem = item;
      
      if (type === 'news') {
        if (!item.content) {
          const result = await getNewsById(item.id);
          if (result.success) fetchedItem = result.data;
        }
      } else if (type === 'announcement') {
        if (!item.content) {
          const result = await getAnnouncementById(item.id);
          if (result.success) fetchedItem = result.data;
        }
      } else if (type === 'event') {
        if (!item.description) {
          const result = await getEventById(item.id);
          if (result.success) fetchedItem = result.data;
        }
      }

      const formData = {
        title: fetchedItem.title || '',
        category: fetchedItem.category || '',
        content: fetchedItem.content || fetchedItem.description || '',
        summary: fetchedItem.summary || '',
        sdgTags: fetchedItem.sdg_tags || [],
        priority: fetchedItem.priority || 'normal',
        date: fetchedItem.date || '',
        time: fetchedItem.time || '',
        location: fetchedItem.location || '',
        description: fetchedItem.description || ''
      };
      
      setEditFormData(formData);
      
      const existingImages = fetchedItem.images || (fetchedItem.image_url ? [fetchedItem.image_url] : []);
      setEditExistingImages(existingImages);
      setEditImagePreviews([]);
      setEditImageFiles([]);
      
    } catch (error) {
      console.error('Error loading item for edit:', error);
      setUploadError('Failed to load item for editing');
    } finally {
      setLoadingEdit(false);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleEditSDGChange = (selected) => {
    setEditFormData({ 
      ...editFormData, 
      sdgTags: selected.map(s => s.value) 
    });
  };

  const handleEditImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    setEditImageFiles(files);
    const previews = files.map(file => URL.createObjectURL(file));
    setEditImagePreviews(previews);
  };

  const removeExistingImage = (index) => {
    const newImages = [...editExistingImages];
    newImages.splice(index, 1);
    setEditExistingImages(newImages);
  };

  const removeNewImage = (index) => {
    const newPreviews = [...editImagePreviews];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setEditImagePreviews(newPreviews);
    
    const newFiles = [...editImageFiles];
    newFiles.splice(index, 1);
    setEditImageFiles(newFiles);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUploadError('');
    setUploadSuccess('');

    try {
      let result;
      const typeMap = {
        'news': updateNewsWithImages,
        'announcement': updateAnnouncementWithImages,
        'event': updateEventWithImages
      };

      const updateFunction = typeMap[editType];
      if (!updateFunction) {
        throw new Error('Invalid edit type');
      }

      let updateData = {};
      if (editType === 'news') {
        updateData = {
          title: editFormData.title,
          category: editFormData.category,
          content: editFormData.content,
          summary: editFormData.summary,
          sdgTags: editFormData.sdgTags
        };
        result = await updateFunction(editingItem.id, updateData, editImageFiles);
      } else if (editType === 'announcement') {
        updateData = {
          title: editFormData.title,
          priority: editFormData.priority,
          content: editFormData.content
        };
        result = await updateFunction(editingItem.id, updateData, editImageFiles);
      } else if (editType === 'event') {
        updateData = {
          title: editFormData.title,
          date: editFormData.date,
          time: editFormData.time,
          location: editFormData.location,
          description: editFormData.description,
          sdgTags: editFormData.sdgTags
        };
        result = await updateFunction(editingItem.id, updateData, editImageFiles);
      }

      if (result.success) {
        setUploadSuccess(`${editType.charAt(0).toUpperCase() + editType.slice(1)} updated successfully!`);
        setShowEditModal(false);
        setEditingItem(null);
        setEditFormData({
          title: '',
          category: '',
          content: '',
          summary: '',
          sdgTags: [],
          priority: 'normal',
          date: '',
          time: '',
          location: '',
          description: '',
          images: []
        });
        setEditExistingImages([]);
        setEditImagePreviews([]);
        setEditImageFiles([]);
        await loadPublishedContent();
        await loadStats();
      } else {
        setUploadError(`Failed to update ${editType}: ${result.error || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Edit error:', error);
      setUploadError('An error occurred: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // ==================== KEY OFFICIALS FUNCTIONS ====================

  const handleOfficialImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOfficialImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setOfficialImageFile(file);
    }
  };

  const handleOfficialSubmit = async () => {
    if (!officialFormData.name || !officialFormData.position) {
      setUploadError('Name and position are required');
      return;
    }
    
    setSavingOfficial(true);
    setUploadError('');
    setUploadSuccess('');
    
    try {
      let result;
      if (editingOfficial) {
        result = await updateKeyOfficial(
          editingOfficial.id, 
          officialFormData, 
          officialImageFile
        );
      } else {
        result = await createKeyOfficial(officialFormData, officialImageFile);
      }
      
      if (result.success) {
        setUploadSuccess(editingOfficial ? 'Official updated successfully!' : 'Official added successfully!');
        setShowOfficialModal(false);
        setEditingOfficial(null);
        setOfficialFormData({
          name: '',
          position: '',
          email: '',
          phone: '',
          bio: '',
          level: 0,
          category: 'administration',
          display_order: 0,
          is_active: true
        });
        setOfficialImageFile(null);
        setOfficialImagePreview(null);
        await loadKeyOfficials();
        await loadStats();
      } else {
        setUploadError(result.error || 'Failed to save official');
      }
    } catch (error) {
      console.error('Error saving official:', error);
      setUploadError('An error occurred while saving official');
    } finally {
      setSavingOfficial(false);
    }
  };

  const openAddOfficialModal = () => {
    setEditingOfficial(null);
    setOfficialFormData({
      name: '',
      position: '',
      email: '',
      phone: '',
      bio: '',
      level: 0,
      category: 'administration',
      display_order: 0,
      is_active: true
    });
    setOfficialImageFile(null);
    setOfficialImagePreview(null);
    setShowOfficialModal(true);
  };

  const openEditOfficialModal = (official) => {
    setEditingOfficial(official);
    setOfficialFormData({
      name: official.name || '',
      position: official.position || '',
      email: official.email || '',
      phone: official.phone || '',
      bio: official.bio || '',
      level: official.level || 0,
      category: official.category || 'administration',
      display_order: official.display_order || 0,
      is_active: official.is_active !== undefined ? official.is_active : true
    });
    setOfficialImagePreview(official.image_url || null);
    setOfficialImageFile(null);
    setShowOfficialModal(true);
  };

  const handleDeleteOfficial = async () => {
    if (!officialToDelete) return;
    
    try {
      const result = await deleteKeyOfficial(officialToDelete.id, officialToDelete.image_path);
      if (result.success) {
        setUploadSuccess('Official deleted successfully!');
        setShowDeleteOfficialModal(false);
        setOfficialToDelete(null);
        await loadKeyOfficials();
        await loadStats();
      } else {
        setUploadError(result.error || 'Failed to delete official');
      }
    } catch (error) {
      console.error('Error deleting official:', error);
      setUploadError('An error occurred while deleting official');
    }
  };

  // ==================== FACULTY FUNCTIONS ====================

  const handleFacultyImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFacultyImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFacultyImageFile(file);
    }
  };

  const handleFacultySubmit = async () => {
    if (!facultyFormData.name || !facultyFormData.program || !facultyFormData.college) {
      setUploadError('Name, program, and college are required');
      return;
    }
    
    setSavingFaculty(true);
    setUploadError('');
    setUploadSuccess('');
    
    try {
      let result;
      if (editingFaculty) {
        result = await updateFaculty(
          editingFaculty.id, 
          facultyFormData, 
          facultyImageFile
        );
      } else {
        result = await createFaculty(facultyFormData, facultyImageFile);
      }
      
      if (result.success) {
        setUploadSuccess(editingFaculty ? 'Faculty updated successfully!' : 'Faculty added successfully!');
        setShowFacultyModal(false);
        setEditingFaculty(null);
        setFacultyFormData({
          name: '',
          designation: '',
          program: '',
          college: '',
          designations: [],
          is_active: true,
          is_allied: false,
          is_program_head: false,
          is_dean: false,
          is_department_head: false,
          display_order: 0
        });
        setFacultyImageFile(null);
        setFacultyImagePreview(null);
        await loadFaculty();
        await loadStats();
      } else {
        setUploadError(result.error || 'Failed to save faculty');
      }
    } catch (error) {
      console.error('Error saving faculty:', error);
      setUploadError('An error occurred while saving faculty');
    } finally {
      setSavingFaculty(false);
    }
  };

  const openAddFacultyModal = () => {
    setEditingFaculty(null);
    setFacultyFormData({
      name: '',
      designation: '',
      program: '',
      college: '',
      designations: [],
      is_active: true,
      is_allied: false,
      is_program_head: false,
      is_dean: false,
      is_department_head: false,
      display_order: 0
    });
    setFacultyImageFile(null);
    setFacultyImagePreview(null);
    setShowFacultyModal(true);
  };

  const openEditFacultyModal = (faculty) => {
    setEditingFaculty(faculty);
    setFacultyFormData({
      name: faculty.name || '',
      designation: faculty.designation || '',
      program: faculty.program || '',
      college: faculty.college || '',
      designations: faculty.designations || [],
      is_active: faculty.is_active !== undefined ? faculty.is_active : true,
      is_allied: faculty.is_allied || false,
      is_program_head: faculty.is_program_head || false,
      is_dean: faculty.is_dean || false,
      is_department_head: faculty.is_department_head || false,
      display_order: faculty.display_order || 0
    });
    setFacultyImagePreview(faculty.image_url || null);
    setFacultyImageFile(null);
    setShowFacultyModal(true);
  };

  const handleDeleteFaculty = async () => {
    if (!facultyToDelete) return;
    
    try {
      const result = await deleteFaculty(facultyToDelete.id, facultyToDelete.image_path);
      if (result.success) {
        setUploadSuccess('Faculty deleted successfully!');
        setShowDeleteFacultyModal(false);
        setFacultyToDelete(null);
        await loadFaculty();
        await loadStats();
      } else {
        setUploadError(result.error || 'Failed to delete faculty');
      }
    } catch (error) {
      console.error('Error deleting faculty:', error);
      setUploadError('An error occurred while deleting faculty');
    }
  };

  // Gallery handlers
  const handleGalleryFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGalleryFormData({ ...galleryFormData, imageFile: file });
    }
  };

  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    if (!galleryFormData.imageFile) {
      setUploadError('Please select an image to upload');
      return;
    }

    setUploadingGallery(true);
    setUploadError('');
    setUploadSuccess('');

    try {
      const result = await uploadGalleryImage(
        galleryFormData.imageFile,
        galleryFormData.title,
        galleryFormData.description
      );

      if (result.success) {
        setUploadSuccess('Gallery image uploaded successfully!');
        setGalleryFormData({ title: '', description: '', imageFile: null });
        document.getElementById('gallery-image-input').value = '';
        await loadGalleryImages();
        await loadStats();
      } else {
        setUploadError(result.error || 'Failed to upload gallery image');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError('An error occurred while uploading');
    } finally {
      setUploadingGallery(false);
      setTimeout(() => setUploadSuccess(''), 5000);
    }
  };

  const handleGalleryDeleteClick = (image) => {
    setGalleryImageToDelete(image);
    setShowDeleteGalleryModal(true);
  };

  const confirmGalleryDelete = async () => {
    if (!galleryImageToDelete) return;
    
    setDeletingGallery(true);
    try {
      const result = await deleteGalleryImage(galleryImageToDelete.id, galleryImageToDelete.image_path);
      if (result.success) {
        setUploadSuccess('Gallery image deleted successfully!');
        await loadGalleryImages();
        await loadStats();
        setShowDeleteGalleryModal(false);
        setGalleryImageToDelete(null);
      } else {
        setUploadError(result.error || 'Failed to delete gallery image');
      }
    } catch (error) {
      console.error('Delete error:', error);
      setUploadError('An error occurred while deleting');
    } finally {
      setDeletingGallery(false);
      setTimeout(() => setUploadSuccess(''), 5000);
    }
  };

  // Office staff handlers
  const handleStaffImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStaffFormData({ 
          ...staffFormData, 
          imageFile: file,
          imagePreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddStaff = async () => {
    if (!staffFormData.name || !staffFormData.position) {
      setUploadError('Name and position are required');
      return;
    }
    
    setUploadingStaffImage(true);
    
    try {
      const staffData = {
        name: staffFormData.name,
        position: staffFormData.position,
        display_order: 0
      };
      
      const result = await addOfficeStaff(
        selectedOffice.id, 
        staffData, 
        staffFormData.imageFile
      );
      
      if (result.success) {
        setUploadSuccess('Staff added successfully!');
        setShowStaffModal(false);
        setStaffFormData({ 
          name: '', 
          position: '', 
          imageFile: null,
          imagePreview: null 
        });
        await loadOfficeStaff(selectedOffice.id);
        await loadStats();
      } else {
        setUploadError(result.error || 'Failed to add staff');
      }
    } catch (error) {
      console.error('Error adding staff:', error);
      setUploadError('An error occurred while adding staff');
    } finally {
      setUploadingStaffImage(false);
    }
  };

  const handleRemoveStaff = async (staffId) => {
    if (window.confirm('Are you sure you want to remove this staff member?')) {
      try {
        const staff = officeStaff.find(s => s.id === staffId);
        const result = await removeOfficeStaff(staffId, staff?.image_path);
        
        if (result.success) {
          setUploadSuccess('Staff removed successfully!');
          await loadOfficeStaff(selectedOffice.id);
          await loadStats();
        } else {
          setUploadError(result.error || 'Failed to remove staff');
        }
      } catch (error) {
        console.error('Error removing staff:', error);
        setUploadError('An error occurred while removing staff');
      }
    }
  };

  // Office CRUD handlers
  const handleOfficeSubmit = async () => {
    if (!officeFormData.name) {
      setUploadError('Office name is required');
      return;
    }
    
    setSavingOffice(true);
    setUploadError('');
    setUploadSuccess('');
    
    try {
      let result;
      if (editingOffice) {
        result = await updateOffice(editingOffice.id, officeFormData);
      } else {
        result = await addOffice(officeFormData);
      }
      
      if (result.success) {
        setUploadSuccess(editingOffice ? 'Office updated successfully!' : 'Office added successfully!');
        setShowOfficeModal(false);
        setEditingOffice(null);
        setOfficeFormData({
          name: '',
          description: '',
          contact: '',
          email: '',
          hours: '',
          location: '',
          icon: 'bi-building'
        });
        await loadOffices();
        await loadStats();
      } else {
        setUploadError(result.error || 'Failed to save office');
      }
    } catch (error) {
      console.error('Error saving office:', error);
      setUploadError('An error occurred while saving office');
    } finally {
      setSavingOffice(false);
    }
  };

  const handleDeleteOffice = async () => {
    if (!officeToDelete) return;
    
    try {
      const result = await deleteOffice(officeToDelete.id);
      if (result.success) {
        setUploadSuccess('Office deleted successfully!');
        setShowDeleteOfficeModal(false);
        setOfficeToDelete(null);
        if (selectedOffice?.id === officeToDelete.id) {
          setSelectedOffice(null);
          setOfficeStaff([]);
        }
        await loadOffices();
        await loadStats();
      } else {
        setUploadError(result.error || 'Failed to delete office');
      }
    } catch (error) {
      console.error('Error deleting office:', error);
      setUploadError('An error occurred while deleting office');
    }
  };

  const openAddOfficeModal = () => {
    setEditingOffice(null);
    setOfficeFormData({
      name: '',
      description: '',
      contact: '',
      email: '',
      hours: '',
      location: '',
      icon: 'bi-building'
    });
    setShowOfficeModal(true);
  };

  const openEditOfficeModal = (office) => {
    setEditingOffice(office);
    setOfficeFormData({
      name: office.name || '',
      description: office.description || '',
      contact: office.contact || '',
      email: office.email || '',
      hours: office.hours || '',
      location: office.location || '',
      icon: office.icon || 'bi-building'
    });
    setShowOfficeModal(true);
  };

  // Function to setup storage buckets and policies
  const setupStorage = async () => {
    setSetupStorageLoading(true);
    setUploadError('');
    setUploadSuccess('');
    
    try {
      console.log('Starting storage setup...');
      
      const bucketNames = ['news-images', 'event-images', 'gallery-images', 'staff-images', 'announcement-images'];
      const createdBuckets = [];
      
      for (const bucketName of bucketNames) {
        console.log(`Checking bucket: ${bucketName}`);
        
        const { data: existingBuckets, error: listError } = await supabase.storage.listBuckets();
        
        if (listError) {
          console.error('Error listing buckets:', listError);
          throw new Error(`Failed to list buckets: ${listError.message}`);
        }
        
        const bucketExists = existingBuckets.some(b => b.name === bucketName);
        
        if (!bucketExists) {
          console.log(`Creating bucket: ${bucketName}`);
          const { data: newBucket, error: createError } = await supabase.storage
            .createBucket(bucketName, {
              public: true,
              fileSizeLimit: 5242880,
            });
          
          if (createError) {
            console.error(`Error creating bucket ${bucketName}:`, createError);
            throw new Error(`Failed to create bucket ${bucketName}: ${createError.message}`);
          }
          
          console.log(`Bucket ${bucketName} created successfully!`);
          createdBuckets.push(bucketName);
        } else {
          console.log(`Bucket ${bucketName} already exists`);
        }
      }
      
      await checkBucketStatus();
      
      if (createdBuckets.length > 0) {
        setUploadSuccess(`Buckets created successfully: ${createdBuckets.join(', ')}. Please add policies in Supabase Dashboard.`);
      } else {
        setUploadSuccess('All buckets already exist. Please ensure policies are configured in Supabase Dashboard.');
      }
      
    } catch (error) {
      console.error('Error setting up storage:', error);
      setUploadError(`Storage setup failed: ${error.message}`);
    } finally {
      setSetupStorageLoading(false);
    }
  };

  // Debug function to check buckets directly
  const debugBuckets = async () => {
    setCheckingBuckets(true);
    try {
      console.log('=== DEBUGGING BUCKETS ===');
      
      const { data: buckets, error: listError } = await supabase.storage.listBuckets();
      console.log('All buckets from Supabase:', buckets);
      console.log('List error:', listError);
      
      const bucketChecks = ['news-images', 'event-images', 'gallery-images', 'staff-images', 'announcement-images'];
      for (const bucketName of bucketChecks) {
        const { data, error } = await supabase.storage
          .from(bucketName)
          .list('', { limit: 1 });
        console.log(`${bucketName} access:`, { data, error });
      }
      
      if (buckets) {
        const bucketNames = buckets.map(b => b.name);
        console.log('Bucket names:', bucketNames);
        bucketChecks.forEach(name => {
          console.log(`${name} exists:`, bucketNames.includes(name));
        });
      }
      
      const allExist = bucketChecks.every(name => 
        buckets && buckets.some(b => b.name === name)
      );
      
      setBucketStatus({
        success: true,
        buckets: buckets || [],
        newsImagesExists: buckets ? buckets.some(b => b.name === 'news-images') : false,
        eventImagesExists: buckets ? buckets.some(b => b.name === 'event-images') : false,
        galleryImagesExists: buckets ? buckets.some(b => b.name === 'gallery-images') : false,
        staffImagesExists: buckets ? buckets.some(b => b.name === 'staff-images') : false,
        announcementImagesExists: buckets ? buckets.some(b => b.name === 'announcement-images') : false,
        allExist: allExist
      });
      
      if (!allExist) {
        setUploadError('Warning: Some storage buckets are missing. Please create them in Supabase.');
      } else {
        setUploadSuccess('All buckets exist!');
      }
      
    } catch (error) {
      console.error('Debug error:', error);
      setUploadError('Error debugging buckets: ' + error.message);
    } finally {
      setCheckingBuckets(false);
    }
  };

  // Function to check bucket status
  const checkBucketStatus = async () => {
    setCheckingBuckets(true);
    setUploadError('');
    
    try {
      const result = await checkBuckets();
      console.log('Bucket check result:', result);
      
      if (result.success) {
        if (!result.allExist) {
          await debugBuckets();
        } else {
          setBucketStatus(result);
        }
      } else {
        await debugBuckets();
      }
    } catch (error) {
      console.error('Error checking buckets:', error);
      await debugBuckets();
    } finally {
      setCheckingBuckets(false);
    }
  };

  // Delete handlers for content
  const handleDeleteClick = (item, type) => {
    setItemToDelete(item);
    setDeleteType(type);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    
    setDeleting(true);
    setUploadError('');
    setUploadSuccess('');
    
    try {
      let result;
      const typeMap = {
        'news': deleteNews,
        'event': deleteEvent,
        'announcement': deleteAnnouncement
      };
      
      const deleteFunction = typeMap[deleteType];
      if (!deleteFunction) {
        throw new Error('Invalid delete type');
      }
      
      result = await deleteFunction(itemToDelete.id);
      
      if (result.success) {
        setUploadSuccess(`${deleteType.charAt(0).toUpperCase() + deleteType.slice(1)} deleted successfully!`);
        await loadPublishedContent();
        await loadStats();
        setShowDeleteModal(false);
        setItemToDelete(null);
      } else {
        setUploadError(`Failed to delete ${deleteType}: ${result.error || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Delete error:', error);
      setUploadError(`Failed to delete: ${error.message}`);
    } finally {
      setDeleting(false);
    }
  };

  // Form states with multiple images
  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    priority: 'normal',
    content: '',
    images: []
  });

  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    sdgTags: [],
    images: []
  });

  // Multiple image handlers for create (for announcements and events)
  const handleMultipleImageChange = (e, formType) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    if (formType === 'announcement') {
      setAnnouncementForm({ ...announcementForm, images: files });
    } else if (formType === 'event') {
      setEventForm({ ...eventForm, images: files });
    }
    
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const removeImage = (index, formType) => {
    const newImages = [...(formType === 'announcement' ? announcementForm.images : eventForm.images)];
    newImages.splice(index, 1);
    
    const newPreviews = [...imagePreviews];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
    
    if (formType === 'announcement') {
      setAnnouncementForm({ ...announcementForm, images: newImages });
    } else if (formType === 'event') {
      setEventForm({ ...eventForm, images: newImages });
    }
  };

  // Submit handlers for create
  const handleAnnouncementSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUploadError('');
    setUploadSuccess('');
    
    try {
      const announcementData = {
        ...announcementForm,
        date: new Date().toISOString().split('T')[0],
        type: 'announcement'
      };
      
      const result = await createAnnouncementWithImages(announcementData, announcementForm.images);
      
      if (result.success) {
        setUploadSuccess(`Announcement published successfully with ${announcementForm.images.length} image(s)!`);
        setAnnouncementForm({ 
          title: '', 
          priority: 'normal', 
          content: '', 
          images: [] 
        });
        setImagePreviews([]);
        document.getElementById('announcement-images-input').value = '';
        await loadStats();
        await loadPublishedContent();
      } else {
        setUploadError(`Failed to publish announcement: ${result.error || 'Please try again.'}`);
      }
    } catch (error) {
      setUploadError('An error occurred: ' + error.message);
    } finally {
      setLoading(false);
      setTimeout(() => setUploadSuccess(''), 3000);
    }
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUploadError('');
    setUploadSuccess('');
    
    try {
      const eventData = {
        ...eventForm,
        type: 'event'
      };
      
      const result = await createEventWithImages(eventData, eventForm.images);
      
      if (result.success) {
        setUploadSuccess(`Event created successfully with ${eventForm.images.length} image(s)!`);
        setEventForm({ title: '', date: '', time: '', location: '', description: '', sdgTags: [], images: [] });
        setImagePreviews([]);
        document.getElementById('event-images-input').value = '';
        await loadStats();
        await loadPublishedContent();
      } else {
        setUploadError(`Failed to create event: ${result.error || 'Please try again.'}`);
      }
    } catch (error) {
      setUploadError('An error occurred: ' + error.message);
    } finally {
      setLoading(false);
      setTimeout(() => setUploadSuccess(''), 3000);
    }
  };

  const handleLogout = async () => {
    const result = await authService.logout();
    if (result.success) {
      navigate('/');
    }
  };

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  const customSelectStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? state.data.color : state.isFocused ? state.data.color + '20' : 'white',
      color: state.isSelected ? 'white' : 'black',
      ':hover': {
        backgroundColor: state.data.color + '40',
      }
    }),
    multiValue: (provided, state) => ({
      ...provided,
      backgroundColor: state.data.color,
      color: 'white'
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'white'
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: 'white',
      ':hover': {
        backgroundColor: 'rgba(255,255,255,0.3)',
        color: 'white'
      }
    })
  };

  const iconOptions = [
    { value: 'bi-building', label: 'Building' },
    { value: 'bi-person-badge', label: 'Person Badge' },
    { value: 'bi-file-earmark-text', label: 'File Text' },
    { value: 'bi-cash-coin', label: 'Cash Coin' },
    { value: 'bi-book', label: 'Book' },
    { value: 'bi-box-seam', label: 'Box Seam' },
    { value: 'bi-search', label: 'Search' },
    { value: 'bi-calculator', label: 'Calculator' },
    { value: 'bi-people', label: 'People' },
    { value: 'bi-mortarboard', label: 'Mortarboard' },
    { value: 'bi-laptop', label: 'Laptop' },
    { value: 'bi-gear', label: 'Gear' },
    { value: 'bi-chat-dots', label: 'Chat Dots' },
    { value: 'bi-envelope', label: 'Envelope' },
    { value: 'bi-phone', label: 'Phone' },
  ];

  return (
    <div style={{ 
      backgroundColor: '#f4f6f9', 
      minHeight: '100vh',
      padding: '2rem 0'
    }}>
      <Container fluid style={{ maxWidth: '1400px' }}>
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <div style={{ 
              backgroundColor: '#00482D',
              color: '#ffffff',
              padding: '1.5rem 2rem',
              borderRadius: '10px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <i className="fas fa-cog" style={{ color: '#FFD326' }}></i>
                    USM KCC Admin Dashboard
                  </h2>
                  <p style={{ margin: '0.5rem 0 0 0', opacity: '0.9' }}>
                    Welcome back, {adminUser?.username || 'Administrator'}! 
                    <small className="ms-2">(Secured by Supabase)</small>
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', opacity: '0.9' }}>
                    Role: <strong>{adminUser?.role || 'admin'}</strong>
                  </p>
                  <Button 
                    variant="outline-light" 
                    size="sm"
                    onClick={handleLogout}
                    style={{
                      borderColor: '#FFD326',
                      color: '#FFD326'
                    }}
                  >
                    <i className="fas fa-sign-out-alt me-2"></i>
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Storage Bucket Status */}
        <Row className="mb-3">
          <Col>
            <Card style={{ 
              border: 'none',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <Card.Body className="py-2 d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <span className="fw-bold">Storage Buckets:</span>
                  {checkingBuckets ? (
                    <span className="ms-2 text-muted">
                      <i className="fas fa-spinner fa-spin me-1"></i> Checking...
                    </span>
                  ) : bucketStatus ? (
                    <span className="ms-2">
                      {bucketStatus.newsImagesExists ? (
                        <span className="text-success"><i className="fas fa-check-circle me-1"></i> news-images ✓</span>
                      ) : (
                        <span className="text-danger"><i className="fas fa-times-circle me-1"></i> news-images ✗</span>
                      )}
                      <span className="mx-2">|</span>
                      {bucketStatus.eventImagesExists ? (
                        <span className="text-success"><i className="fas fa-check-circle me-1"></i> event-images ✓</span>
                      ) : (
                        <span className="text-danger"><i className="fas fa-times-circle me-1"></i> event-images ✗</span>
                      )}
                      <span className="mx-2">|</span>
                      {bucketStatus.galleryImagesExists ? (
                        <span className="text-success"><i className="fas fa-check-circle me-1"></i> gallery-images ✓</span>
                      ) : (
                        <span className="text-danger"><i className="fas fa-times-circle me-1"></i> gallery-images ✗</span>
                      )}
                      <span className="mx-2">|</span>
                      {bucketStatus.staffImagesExists ? (
                        <span className="text-success"><i className="fas fa-check-circle me-1"></i> staff-images ✓</span>
                      ) : (
                        <span className="text-danger"><i className="fas fa-times-circle me-1"></i> staff-images ✗</span>
                      )}
                      <span className="mx-2">|</span>
                      {bucketStatus.announcementImagesExists ? (
                        <span className="text-success"><i className="fas fa-check-circle me-1"></i> announcement-images ✓</span>
                      ) : (
                        <span className="text-danger"><i className="fas fa-times-circle me-1"></i> announcement-images ✗</span>
                      )}
                      {!bucketStatus.allExist && (
                        <span className="ms-2 text-warning">
                          <i className="fas fa-exclamation-triangle me-1"></i>
                          Missing buckets! Please create them in Supabase.
                        </span>
                      )}
                      {bucketStatus.allExist && (
                        <span className="ms-2 text-success">
                          <i className="fas fa-check-circle me-1"></i>
                          All buckets ready!
                        </span>
                      )}
                    </span>
                  ) : (
                    <span className="ms-2 text-muted">Not checked</span>
                  )}
                </div>
                <div className="d-flex gap-2 mt-2 mt-sm-0">
                  <Button 
                    variant="outline-secondary" 
                    size="sm" 
                    onClick={checkBucketStatus}
                    disabled={checkingBuckets}
                  >
                    <i className="fas fa-sync-alt me-1"></i>
                    Refresh
                  </Button>
                  <Button 
                    variant="outline-info" 
                    size="sm" 
                    onClick={debugBuckets}
                    disabled={checkingBuckets}
                  >
                    <i className="fas fa-bug me-1"></i>
                    Debug
                  </Button>
                  <Button 
                    variant="warning" 
                    size="sm" 
                    onClick={setupStorage}
                    disabled={setupStorageLoading || checkingBuckets}
                  >
                    {setupStorageLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                        Setting up...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-tools me-1"></i>
                        Setup Storage
                      </>
                    )}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Success/Error Messages */}
        {uploadSuccess && (
          <Alert variant="success" className="mb-4" onClose={() => setUploadSuccess('')} dismissible>
            <i className="fas fa-check-circle me-2"></i>
            {uploadSuccess}
          </Alert>
        )}
        {uploadError && (
          <Alert variant="danger" className="mb-4" onClose={() => setUploadError('')} dismissible>
            <i className="fas fa-exclamation-circle me-2"></i>
            {uploadError}
          </Alert>
        )}

        {/* Main Content */}
        <Row>
          {/* Sidebar */}
          <Col lg={3} className="mb-4">
            <Card style={{ 
              border: 'none',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <Card.Body style={{ padding: '1.5rem' }}>
                <div className="text-center mb-4">
                  <div style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#00482D',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem'
                  }}>
                    <i className="fas fa-user-shield" style={{ fontSize: '2.5rem', color: '#FFD326' }}></i>
                  </div>
                  <h5 style={{ color: '#00482D', fontWeight: '600' }}>
                    {adminUser?.username || 'Administrator'}
                  </h5>
                  <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>USM KCC</p>
                  <span className="badge" style={{ 
                    backgroundColor: '#00482D', 
                    color: '#FFD326',
                    padding: '5px 10px'
                  }}>
                    {adminUser?.role || 'admin'}
                  </span>
                </div>

                <div className="d-grid gap-2">
                  <Button 
                    variant={activeTab === 'dashboard' ? 'primary' : 'outline-primary'}
                    onClick={() => setActiveTab('dashboard')}
                    style={{
                      backgroundColor: activeTab === 'dashboard' ? '#00482D' : 'transparent',
                      color: activeTab === 'dashboard' ? '#FFD326' : '#00482D',
                      borderColor: '#00482D',
                      textAlign: 'left',
                      padding: '10px 15px',
                      borderRadius: '8px',
                      fontWeight: '500'
                    }}
                  >
                    <i className="fas fa-tachometer-alt me-2"></i>
                    Dashboard
                  </Button>
                  
                  <Button 
                    variant={activeTab === 'news' ? 'primary' : 'outline-primary'}
                    onClick={() => setActiveTab('news')}
                    style={{
                      backgroundColor: activeTab === 'news' ? '#00482D' : 'transparent',
                      color: activeTab === 'news' ? '#FFD326' : '#00482D',
                      borderColor: '#00482D',
                      textAlign: 'left',
                      padding: '10px 15px',
                      borderRadius: '8px',
                      fontWeight: '500'
                    }}
                  >
                    <i className="fas fa-newspaper me-2"></i>
                    Upload News
                  </Button>
                  
                  <Button 
                    variant={activeTab === 'extension-news' ? 'primary' : 'outline-primary'}
                    onClick={() => setActiveTab('extension-news')}
                    style={{
                      backgroundColor: activeTab === 'extension-news' ? '#00482D' : 'transparent',
                      color: activeTab === 'extension-news' ? '#FFD326' : '#00482D',
                      borderColor: '#00482D',
                      textAlign: 'left',
                      padding: '10px 15px',
                      borderRadius: '8px',
                      fontWeight: '500'
                    }}
                  >
                    <i className="fas fa-hand-holding-heart me-2"></i>
                    Extension News
                  </Button>
                  
                  <Button 
                    variant={activeTab === 'announcements' ? 'primary' : 'outline-primary'}
                    onClick={() => setActiveTab('announcements')}
                    style={{
                      backgroundColor: activeTab === 'announcements' ? '#00482D' : 'transparent',
                      color: activeTab === 'announcements' ? '#FFD326' : '#00482D',
                      borderColor: '#00482D',
                      textAlign: 'left',
                      padding: '10px 15px',
                      borderRadius: '8px',
                      fontWeight: '500'
                    }}
                  >
                    <i className="fas fa-bullhorn me-2"></i>
                    Announcements
                  </Button>
                  
                  <Button 
                    variant={activeTab === 'events' ? 'primary' : 'outline-primary'}
                    onClick={() => setActiveTab('events')}
                    style={{
                      backgroundColor: activeTab === 'events' ? '#00482D' : 'transparent',
                      color: activeTab === 'events' ? '#FFD326' : '#00482D',
                      borderColor: '#00482D',
                      textAlign: 'left',
                      padding: '10px 15px',
                      borderRadius: '8px',
                      fontWeight: '500'
                    }}
                  >
                    <i className="fas fa-calendar-alt me-2"></i>
                    Events
                  </Button>
                  
                  <Button 
                    variant={activeTab === 'gallery' ? 'primary' : 'outline-primary'}
                    onClick={() => setActiveTab('gallery')}
                    style={{
                      backgroundColor: activeTab === 'gallery' ? '#00482D' : 'transparent',
                      color: activeTab === 'gallery' ? '#FFD326' : '#00482D',
                      borderColor: '#00482D',
                      textAlign: 'left',
                      padding: '10px 15px',
                      borderRadius: '8px',
                      fontWeight: '500'
                    }}
                  >
                    <i className="fas fa-images me-2"></i>
                    Gallery
                  </Button>
                  
                  <Button 
                    variant={activeTab === 'offices' ? 'primary' : 'outline-primary'}
                    onClick={() => setActiveTab('offices')}
                    style={{
                      backgroundColor: activeTab === 'offices' ? '#00482D' : 'transparent',
                      color: activeTab === 'offices' ? '#FFD326' : '#00482D',
                      borderColor: '#00482D',
                      textAlign: 'left',
                      padding: '10px 15px',
                      borderRadius: '8px',
                      fontWeight: '500'
                    }}
                  >
                    <i className="fas fa-building me-2"></i>
                    Manage Offices
                  </Button>
                  
                  <Button 
                    variant={activeTab === 'officials' ? 'primary' : 'outline-primary'}
                    onClick={() => setActiveTab('officials')}
                    style={{
                      backgroundColor: activeTab === 'officials' ? '#00482D' : 'transparent',
                      color: activeTab === 'officials' ? '#FFD326' : '#00482D',
                      borderColor: '#00482D',
                      textAlign: 'left',
                      padding: '10px 15px',
                      borderRadius: '8px',
                      fontWeight: '500'
                    }}
                  >
                    <i className="fas fa-user-tie me-2"></i>
                    Key Officials
                  </Button>
                  
                  <Button 
                    variant={activeTab === 'faculty' ? 'primary' : 'outline-primary'}
                    onClick={() => setActiveTab('faculty')}
                    style={{
                      backgroundColor: activeTab === 'faculty' ? '#00482D' : 'transparent',
                      color: activeTab === 'faculty' ? '#FFD326' : '#00482D',
                      borderColor: '#00482D',
                      textAlign: 'left',
                      padding: '10px 15px',
                      borderRadius: '8px',
                      fontWeight: '500'
                    }}
                  >
                    <i className="fas fa-chalkboard-teacher me-2"></i>
                    Faculty
                  </Button>
                  
                  <Button 
                    variant={activeTab === 'manage' ? 'primary' : 'outline-primary'}
                    onClick={() => setActiveTab('manage')}
                    style={{
                      backgroundColor: activeTab === 'manage' ? '#00482D' : 'transparent',
                      color: activeTab === 'manage' ? '#FFD326' : '#00482D',
                      borderColor: '#00482D',
                      textAlign: 'left',
                      padding: '10px 15px',
                      borderRadius: '8px',
                      fontWeight: '500'
                    }}
                  >
                    <i className="fas fa-edit me-2"></i>
                    Manage Content
                  </Button>
                </div>

                <hr className="my-3" />

                <Button 
                  variant="outline-danger" 
                  className="w-100"
                  onClick={handleLogout}
                  style={{
                    borderColor: '#dc3545',
                    color: '#dc3545',
                    fontWeight: '500'
                  }}
                >
                  <i className="fas fa-sign-out-alt me-2"></i>
                  Logout
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Main Content Area */}
          <Col lg={9}>
            <Card style={{ 
              border: 'none',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              minHeight: '600px'
            }}>
              <Card.Body style={{ padding: '2rem' }}>
                {/* Dashboard Tab */}
                {activeTab === 'dashboard' && (
                  <div>
                    <h4 style={{ color: '#00482D', marginBottom: '1.5rem' }}>
                      <i className="fas fa-tachometer-alt me-2"></i>
                      Dashboard Overview
                    </h4>
                    <Row>
                      <Col md={4} lg={3} className="mb-3">
                        <Card style={{ backgroundColor: '#00482D', color: '#ffffff' }}>
                          <Card.Body className="text-center">
                            <i className="fas fa-newspaper" style={{ fontSize: '2rem', color: '#FFD326' }}></i>
                            <h3 className="mt-2">{stats.news}</h3>
                            <p className="mb-0">News Articles</p>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={4} lg={3} className="mb-3">
                        <Card style={{ backgroundColor: '#1a3d7c', color: '#ffffff' }}>
                          <Card.Body className="text-center">
                            <i className="fas fa-bullhorn" style={{ fontSize: '2rem', color: '#FFD326' }}></i>
                            <h3 className="mt-2">{stats.announcements}</h3>
                            <p className="mb-0">Announcements</p>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={4} lg={3} className="mb-3">
                        <Card style={{ backgroundColor: '#28a745', color: '#ffffff' }}>
                          <Card.Body className="text-center">
                            <i className="fas fa-calendar-alt" style={{ fontSize: '2rem', color: '#FFD326' }}></i>
                            <h3 className="mt-2">{stats.events}</h3>
                            <p className="mb-0">Events</p>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={4} lg={3} className="mb-3">
                        <Card style={{ backgroundColor: '#6f42c1', color: '#ffffff' }}>
                          <Card.Body className="text-center">
                            <i className="fas fa-images" style={{ fontSize: '2rem', color: '#FFD326' }}></i>
                            <h3 className="mt-2">{stats.gallery}</h3>
                            <p className="mb-0">Gallery Images</p>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={4} lg={3} className="mb-3">
                        <Card style={{ backgroundColor: '#fd7e14', color: '#ffffff' }}>
                          <Card.Body className="text-center">
                            <i className="fas fa-building" style={{ fontSize: '2rem', color: '#FFD326' }}></i>
                            <h3 className="mt-2">{stats.offices}</h3>
                            <p className="mb-0">Offices</p>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={4} lg={3} className="mb-3">
                        <Card style={{ backgroundColor: '#e83e8c', color: '#ffffff' }}>
                          <Card.Body className="text-center">
                            <i className="fas fa-user-tie" style={{ fontSize: '2rem', color: '#FFD326' }}></i>
                            <h3 className="mt-2">{stats.officials}</h3>
                            <p className="mb-0">Key Officials</p>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={4} lg={3} className="mb-3">
                        <Card style={{ backgroundColor: '#17a2b8', color: '#ffffff' }}>
                          <Card.Body className="text-center">
                            <i className="fas fa-chalkboard-teacher" style={{ fontSize: '2rem', color: '#FFD326' }}></i>
                            <h3 className="mt-2">{stats.faculty}</h3>
                            <p className="mb-0">Faculty Members</p>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>

                    <Row className="mt-4">
                      <Col md={12}>
                        <Card>
                          <Card.Body>
                            <h5 style={{ color: '#00482D' }}>
                              <i className="fas fa-info-circle me-2"></i>
                              Quick Information
                            </h5>
                            <hr />
                            <div style={{ fontSize: '0.95rem' }}>
                              <p><strong>Logged in as:</strong> {adminUser?.username}</p>
                              <p><strong>Role:</strong> {adminUser?.role}</p>
                              <p><strong>Authentication:</strong> Supabase Database</p>
                              <p className="text-muted">
                                <i className="fas fa-shield-alt me-1"></i>
                                Your session is secure and encrypted.
                              </p>
                              {bucketStatus && (
                                <div className="mt-2">
                                  <p><strong>Storage Status:</strong></p>
                                  <div className="d-flex gap-3 flex-wrap">
                                    <span>
                                      <i className={`fas fa-${bucketStatus.newsImagesExists ? 'check-circle text-success' : 'times-circle text-danger'}`}></i>
                                      news-images
                                    </span>
                                    <span>
                                      <i className={`fas fa-${bucketStatus.eventImagesExists ? 'check-circle text-success' : 'times-circle text-danger'}`}></i>
                                      event-images
                                    </span>
                                    <span>
                                      <i className={`fas fa-${bucketStatus.galleryImagesExists ? 'check-circle text-success' : 'times-circle text-danger'}`}></i>
                                      gallery-images
                                    </span>
                                    <span>
                                      <i className={`fas fa-${bucketStatus.staffImagesExists ? 'check-circle text-success' : 'times-circle text-danger'}`}></i>
                                      staff-images
                                    </span>
                                    <span>
                                      <i className={`fas fa-${bucketStatus.announcementImagesExists ? 'check-circle text-success' : 'times-circle text-danger'}`}></i>
                                      announcement-images
                                    </span>
                                  </div>
                                </div>
                              )}
                              <div className="mt-3 d-flex gap-2 flex-wrap">
                                <Button variant="outline-primary" size="sm" onClick={loadStats}>
                                  <i className="fas fa-sync-alt me-1"></i> Refresh Stats
                                </Button>
                                <Button variant="outline-success" size="sm" onClick={checkBucketStatus}>
                                  <i className="fas fa-database me-1"></i> Check Storage
                                </Button>
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                )}

                {/* News Upload Tab with Thumbnail and Content Images */}
                {activeTab === 'news' && (
                  <div>
                    <h4 style={{ color: '#00482D', marginBottom: '1.5rem' }}>
                      <i className="fas fa-newspaper me-2"></i>
                      Upload News Article
                    </h4>
                    
                    {/* Info Card */}
                    <Card className="mb-4" style={{ backgroundColor: '#f0f7ff' }}>
                      <Card.Body>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'flex-start', 
                          gap: '15px'
                        }}>
                          <i className="fas fa-info-circle" style={{ color: '#00482D', fontSize: '1.5rem', marginTop: '2px' }}></i>
                          <div>
                            <h6 style={{ color: '#00482D', fontWeight: '700', marginBottom: '5px' }}>
                              News Publishing Guidelines
                            </h6>
                            <p style={{ color: '#4a5568', marginBottom: '0', fontSize: '0.95rem' }}>
                              • <strong>Thumbnail Image:</strong> This will appear as the main image on the homepage and RESO page.<br />
                              • <strong>Content Images:</strong> These images will be displayed within the article content.<br />
                              • <strong>Show on RESO:</strong> Check this box to display the article on the RESO page.
                            </p>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                    
                    <Form onSubmit={handleNewsSubmit}>
                      <Row>
                        <Col md={8}>
                          <Form.Group className="mb-3">
                            <Form.Label>Title <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter news title"
                              value={newsForm.title}
                              onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                              value={newsForm.category}
                              onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                              required
                            >
                              <option value="">Select category</option>
                              <option value="academic">Academic</option>
                              <option value="campus">Campus News</option>
                              <option value="research">Research</option>
                              <option value="student">Student Affairs</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      {/* RESO Checkbox */}
                      <Form.Group className="mb-3">
                        <Form.Check
                          type="checkbox"
                          id="show-on-reso"
                          label={
                            <span style={{ fontWeight: '600', color: '#00482D' }}>
                              <i className="fas fa-flask me-2" style={{ color: '#FFD326' }}></i>
                              Show this news on the RESO page (Research & Extension)
                            </span>
                          }
                          checked={newsForm.showOnReso}
                          onChange={(e) => setNewsForm({ ...newsForm, showOnReso: e.target.checked })}
                        />
                        <Form.Text className="text-muted">
                          {newsForm.showOnReso 
                            ? '✅ This news will appear on the RESO page under the Research tab.' 
                            : 'Check this box if this news is research-related and should appear on the RESO page.'}
                        </Form.Text>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Summary/Excerpt <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          placeholder="Brief summary of the news article"
                          value={newsForm.summary}
                          onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                          required
                        />
                      </Form.Group>

                      {/* Thumbnail Image Upload */}
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <strong>Thumbnail Image</strong> 
                          <span className="text-muted ms-2" style={{ fontSize: '0.85rem' }}>
                            (Main image displayed on cards and listings)
                          </span>
                        </Form.Label>
                        <Form.Control
                          id="news-thumbnail-input"
                          type="file"
                          accept="image/*"
                          onChange={handleThumbnailChange}
                        />
                        <Form.Text className="text-muted">
                          Supported formats: JPG, PNG, GIF, WebP (Max 5MB)
                        </Form.Text>
                        
                        {newsForm.thumbnailPreview && (
                          <div className="mt-2 d-flex align-items-center gap-3">
                            <img 
                              src={newsForm.thumbnailPreview} 
                              alt="Thumbnail preview"
                              style={{ 
                                width: '150px', 
                                height: '100px', 
                                objectFit: 'cover',
                                borderRadius: '8px',
                                border: '2px solid #00482D'
                              }}
                            />
                            <Button 
                              variant="danger" 
                              size="sm"
                              onClick={removeThumbnail}
                            >
                              <i className="fas fa-times me-1"></i>
                              Remove
                            </Button>
                          </div>
                        )}
                      </Form.Group>

                      {/* Content Images Upload */}
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <strong>Content Images</strong>
                          <span className="text-muted ms-2" style={{ fontSize: '0.85rem' }}>
                            (Images that will appear within the article body)
                          </span>
                        </Form.Label>
                        <Form.Control
                          id="news-content-images-input"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleContentImagesChange}
                        />
                        <Form.Text className="text-muted">
                          Supported formats: JPG, PNG, GIF, WebP (Max 5MB each)
                        </Form.Text>
                        
                        {newsForm.contentImagePreviews.length > 0 && (
                          <div className="mt-3">
                            <p className="mb-2"><strong>Content Images ({newsForm.contentImagePreviews.length})</strong></p>
                            <div className="d-flex flex-wrap gap-2">
                              {newsForm.contentImagePreviews.map((preview, index) => (
                                <div key={index} style={{ position: 'relative', display: 'inline-block' }}>
                                  <img 
                                    src={preview} 
                                    alt={`Content ${index + 1}`}
                                    style={{ 
                                      width: '100px', 
                                      height: '100px', 
                                      objectFit: 'cover',
                                      borderRadius: '8px',
                                      border: '2px solid #00482D'
                                    }}
                                  />
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    style={{
                                      position: 'absolute',
                                      top: '-8px',
                                      right: '-8px',
                                      borderRadius: '50%',
                                      width: '24px',
                                      height: '24px',
                                      padding: '0',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontSize: '12px'
                                    }}
                                    onClick={() => removeContentImage(index)}
                                  >
                                    ×
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>SDG Tags</Form.Label>
                        <Select
                          isMulti
                          options={sdgOptions}
                          value={sdgOptions.filter(option => newsForm.sdgTags.includes(option.value))}
                          onChange={(selected) => setNewsForm({ 
                            ...newsForm, 
                            sdgTags: selected.map(s => s.value) 
                          })}
                          styles={customSelectStyles}
                          placeholder="Select SDG tags..."
                        />
                        <Form.Text className="text-muted">
                          Select all SDGs that this news article relates to
                        </Form.Text>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Content <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={8}
                          placeholder="Write your news article here..."
                          value={newsForm.content}
                          onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                          required
                        />
                        <Form.Text className="text-muted">
                          Tip: You can reference your content images by their position (Image 1, Image 2, etc.)
                        </Form.Text>
                      </Form.Group>

                      <div className="d-flex gap-2">
                        <Button 
                          type="submit" 
                          style={{ backgroundColor: '#00482D', color: '#FFD326', border: 'none' }}
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Uploading...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-upload me-2"></i>
                              Publish News
                            </>
                          )}
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline-secondary" 
                          onClick={() => {
                            setNewsForm({ 
                              title: '', 
                              category: '', 
                              content: '', 
                              summary: '', 
                              sdgTags: [], 
                              thumbnailImage: null,
                              thumbnailPreview: null,
                              contentImages: [],
                              contentImagePreviews: [],
                              showOnReso: false 
                            });
                            document.getElementById('news-thumbnail-input').value = '';
                            document.getElementById('news-content-images-input').value = '';
                          }}
                          disabled={loading}
                        >
                          Clear Form
                        </Button>
                      </div>
                    </Form>
                  </div>
                )}

                {/* Extension News Upload Tab */}
                {activeTab === 'extension-news' && (
                  <div>
                    <h4 style={{ color: '#00482D', marginBottom: '1.5rem' }}>
                      <i className="fas fa-hand-holding-heart me-2"></i>
                      Upload Extension News
                    </h4>
                    <Card className="mb-4" style={{ backgroundColor: '#f8f9fa' }}>
                      <Card.Body>
                        <div style={{ 
                          backgroundColor: '#e8f5e9', 
                          padding: '15px', 
                          borderRadius: '8px',
                          marginBottom: '20px',
                          borderLeft: '4px solid #00482D'
                        }}>
                          <i className="fas fa-info-circle me-2" style={{ color: '#00482D' }}></i>
                          <span style={{ color: '#00482D' }}>
                            <strong>Extension News</strong> - News posted here will appear on the RESO page under the Extension tab.
                            This content is specifically for extension-related activities and initiatives.
                          </span>
                        </div>
                        
                        <Form onSubmit={handleExtensionNewsSubmit}>
                          <Form.Group className="mb-3">
                            <Form.Label>Title <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter extension news title"
                              value={extensionNewsForm.title}
                              onChange={(e) => setExtensionNewsForm({ ...extensionNewsForm, title: e.target.value })}
                              required
                            />
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Summary/Excerpt <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={2}
                              placeholder="Brief summary of the extension news"
                              value={extensionNewsForm.summary}
                              onChange={(e) => setExtensionNewsForm({ ...extensionNewsForm, summary: e.target.value })}
                              required
                            />
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>SDG Tags</Form.Label>
                            <Select
                              isMulti
                              options={sdgOptions}
                              value={sdgOptions.filter(option => extensionNewsForm.sdgTags.includes(option.value))}
                              onChange={(selected) => setExtensionNewsForm({ 
                                ...extensionNewsForm, 
                                sdgTags: selected.map(s => s.value) 
                              })}
                              styles={customSelectStyles}
                              placeholder="Select SDG tags..."
                            />
                            <Form.Text className="text-muted">
                              Select all SDGs that this extension news relates to
                            </Form.Text>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Images (Select multiple)</Form.Label>
                            <Form.Control
                              id="extension-news-images-input"
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleExtensionImageChange}
                            />
                            <Form.Text className="text-muted">
                              Supported formats: JPG, PNG, GIF, WebP (Max 5MB each)
                            </Form.Text>
                            
                            {imagePreviews.length > 0 && (
                              <div className="mt-3">
                                <p className="mb-2"><strong>Selected Images ({imagePreviews.length})</strong></p>
                                <div className="d-flex flex-wrap gap-2">
                                  {imagePreviews.map((preview, index) => (
                                    <div key={index} style={{ position: 'relative', display: 'inline-block' }}>
                                      <img 
                                        src={preview} 
                                        alt={`Preview ${index + 1}`}
                                        style={{ 
                                          width: '100px', 
                                          height: '100px', 
                                          objectFit: 'cover',
                                          borderRadius: '8px',
                                          border: '2px solid #00482D'
                                        }}
                                      />
                                      <Button
                                        variant="danger"
                                        size="sm"
                                        style={{
                                          position: 'absolute',
                                          top: '-8px',
                                          right: '-8px',
                                          borderRadius: '50%',
                                          width: '24px',
                                          height: '24px',
                                          padding: '0',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          fontSize: '12px'
                                        }}
                                        onClick={() => removeExtensionImage(index)}
                                      >
                                        ×
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Content <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={8}
                              placeholder="Write your extension news article here..."
                              value={extensionNewsForm.content}
                              onChange={(e) => setExtensionNewsForm({ ...extensionNewsForm, content: e.target.value })}
                              required
                            />
                          </Form.Group>

                          <div className="d-flex gap-2">
                            <Button 
                              type="submit" 
                              style={{ backgroundColor: '#00482D', color: '#FFD326', border: 'none' }}
                              disabled={loading}
                            >
                              {loading ? (
                                <>
                                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                  Uploading...
                                </>
                              ) : (
                                <>
                                  <i className="fas fa-upload me-2"></i>
                                  Publish Extension News
                                </>
                              )}
                            </Button>
                            <Button 
                              type="button" 
                              variant="outline-secondary" 
                              onClick={() => {
                                setExtensionNewsForm({ 
                                  title: '', 
                                  content: '', 
                                  summary: '', 
                                  sdgTags: [], 
                                  images: [],
                                  category: 'extension'
                                });
                                setImagePreviews([]);
                                document.getElementById('extension-news-images-input').value = '';
                              }}
                              disabled={loading}
                            >
                              Clear Form
                            </Button>
                          </div>
                        </Form>
                      </Card.Body>
                    </Card>
                  </div>
                )}

                {/* Events Upload Tab */}
                {activeTab === 'events' && (
                  <div>
                    <h4 style={{ color: '#00482D', marginBottom: '1.5rem' }}>
                      <i className="fas fa-calendar-alt me-2"></i>
                      Create Event
                    </h4>
                    <Form onSubmit={handleEventSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label>Event Title</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter event title"
                          value={eventForm.title}
                          onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                          required
                        />
                      </Form.Group>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                              type="date"
                              value={eventForm.date}
                              onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Time</Form.Label>
                            <Form.Control
                              type="time"
                              value={eventForm.time}
                              onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-3">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter event location"
                          value={eventForm.location}
                          onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>SDG Tags</Form.Label>
                        <Select
                          isMulti
                          options={sdgOptions}
                          value={sdgOptions.filter(option => eventForm.sdgTags.includes(option.value))}
                          onChange={(selected) => setEventForm({ 
                            ...eventForm, 
                            sdgTags: selected.map(s => s.value) 
                          })}
                          styles={customSelectStyles}
                          placeholder="Select SDG tags..."
                        />
                        <Form.Text className="text-muted">
                          Select all SDGs that this event relates to
                        </Form.Text>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Event Images (Select multiple)</Form.Label>
                        <Form.Control
                          id="event-images-input"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => handleMultipleImageChange(e, 'event')}
                        />
                        <Form.Text className="text-muted">
                          Supported formats: JPG, PNG, GIF, WebP (Max 5MB each)
                        </Form.Text>
                        
                        {imagePreviews.length > 0 && (
                          <div className="mt-3">
                            <p className="mb-2"><strong>Selected Images ({imagePreviews.length})</strong></p>
                            <div className="d-flex flex-wrap gap-2">
                              {imagePreviews.map((preview, index) => (
                                <div key={index} style={{ position: 'relative', display: 'inline-block' }}>
                                  <img 
                                    src={preview} 
                                    alt={`Preview ${index + 1}`}
                                    style={{ 
                                      width: '100px', 
                                      height: '100px', 
                                      objectFit: 'cover',
                                      borderRadius: '8px',
                                      border: '2px solid #00482D'
                                    }}
                                  />
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    style={{
                                      position: 'absolute',
                                      top: '-8px',
                                      right: '-8px',
                                      borderRadius: '50%',
                                      width: '24px',
                                      height: '24px',
                                      padding: '0',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontSize: '12px'
                                    }}
                                    onClick={() => removeImage(index, 'event')}
                                  >
                                    ×
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          placeholder="Describe the event..."
                          value={eventForm.description}
                          onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                          required
                        />
                      </Form.Group>

                      <div className="d-flex gap-2">
                        <Button 
                          type="submit" 
                          style={{ backgroundColor: '#00482D', color: '#FFD326', border: 'none' }}
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Creating...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-plus-circle me-2"></i>
                              Create Event
                            </>
                          )}
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline-secondary" 
                          onClick={() => {
                            setEventForm({ title: '', date: '', time: '', location: '', description: '', sdgTags: [], images: [] });
                            setImagePreviews([]);
                            document.getElementById('event-images-input').value = '';
                          }}
                          disabled={loading}
                        >
                          Clear Form
                        </Button>
                      </div>
                    </Form>
                  </div>
                )}

                {/* Announcements Tab */}
                {activeTab === 'announcements' && (
                  <div>
                    <h4 style={{ color: '#00482D', marginBottom: '1.5rem' }}>
                      <i className="fas fa-bullhorn me-2"></i>
                      Create Announcement
                    </h4>
                    <Form onSubmit={handleAnnouncementSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter announcement title"
                          value={announcementForm.title}
                          onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Priority</Form.Label>
                        <Form.Select
                          value={announcementForm.priority}
                          onChange={(e) => setAnnouncementForm({ ...announcementForm, priority: e.target.value })}
                          required
                        >
                          <option value="normal">Normal</option>
                          <option value="high">High Priority</option>
                          <option value="urgent">Urgent</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Images (Select multiple)</Form.Label>
                        <Form.Control
                          id="announcement-images-input"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => handleMultipleImageChange(e, 'announcement')}
                        />
                        <Form.Text className="text-muted">
                          Supported formats: JPG, PNG, GIF, WebP (Max 5MB each)
                        </Form.Text>
                        
                        {imagePreviews.length > 0 && (
                          <div className="mt-3">
                            <p className="mb-2"><strong>Selected Images ({imagePreviews.length})</strong></p>
                            <div className="d-flex flex-wrap gap-2">
                              {imagePreviews.map((preview, index) => (
                                <div key={index} style={{ position: 'relative', display: 'inline-block' }}>
                                  <img 
                                    src={preview} 
                                    alt={`Preview ${index + 1}`}
                                    style={{ 
                                      width: '100px', 
                                      height: '100px', 
                                      objectFit: 'cover',
                                      borderRadius: '8px',
                                      border: '2px solid #00482D'
                                    }}
                                  />
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    style={{
                                      position: 'absolute',
                                      top: '-8px',
                                      right: '-8px',
                                      borderRadius: '50%',
                                      width: '24px',
                                      height: '24px',
                                      padding: '0',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontSize: '12px'
                                    }}
                                    onClick={() => removeImage(index, 'announcement')}
                                  >
                                    ×
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          placeholder="Write your announcement here..."
                          value={announcementForm.content}
                          onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })}
                          required
                        />
                      </Form.Group>

                      <div className="d-flex gap-2">
                        <Button 
                          type="submit" 
                          style={{ backgroundColor: '#00482D', color: '#FFD326', border: 'none' }}
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Publishing...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-paper-plane me-2"></i>
                              Publish Announcement
                            </>
                          )}
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline-secondary" 
                          onClick={() => {
                            setAnnouncementForm({ title: '', priority: 'normal', content: '', images: [] });
                            setImagePreviews([]);
                            document.getElementById('announcement-images-input').value = '';
                          }}
                          disabled={loading}
                        >
                          Clear Form
                        </Button>
                      </div>
                    </Form>
                  </div>
                )}

                {/* Gallery Tab */}
                {activeTab === 'gallery' && (
                  <div>
                    <h4 style={{ color: '#00482D', marginBottom: '1.5rem' }}>
                      <i className="fas fa-images me-2"></i>
                      Gallery Manager
                    </h4>
                    
                    <Card className="mb-4">
                      <Card.Header style={{ backgroundColor: '#00482D', color: '#FFD326' }}>
                        <h5 className="mb-0">
                          <i className="fas fa-upload me-2"></i>
                          Upload Gallery Image
                        </h5>
                      </Card.Header>
                      <Card.Body>
                        <Form onSubmit={handleGallerySubmit}>
                          <Row>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter image title"
                                  value={galleryFormData.title}
                                  onChange={(e) => setGalleryFormData({ ...galleryFormData, title: e.target.value })}
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter image description"
                                  value={galleryFormData.description}
                                  onChange={(e) => setGalleryFormData({ ...galleryFormData, description: e.target.value })}
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          
                          <Form.Group className="mb-3">
                            <Form.Label>Select Image</Form.Label>
                            <Form.Control
                              id="gallery-image-input"
                              type="file"
                              accept="image/*"
                              onChange={handleGalleryFileChange}
                              required
                            />
                            <Form.Text className="text-muted">
                              Supported formats: JPG, PNG, GIF, WebP (Max 10MB)
                            </Form.Text>
                          </Form.Group>

                          <Button 
                            type="submit" 
                            style={{ backgroundColor: '#00482D', color: '#FFD326', border: 'none' }}
                            disabled={uploadingGallery}
                          >
                            {uploadingGallery ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Uploading...
                              </>
                            ) : (
                              <>
                                <i className="fas fa-cloud-upload-alt me-2"></i>
                                Upload Image
                              </>
                            )}
                          </Button>
                        </Form>
                      </Card.Body>
                    </Card>

                    <Card>
                      <Card.Header style={{ backgroundColor: '#00482D', color: '#FFD326' }}>
                        <h5 className="mb-0">
                          <i className="fas fa-images me-2"></i>
                          Gallery Images ({galleryImages.length})
                          <Button 
                            variant="outline-light" 
                            size="sm" 
                            className="ms-2"
                            onClick={loadGalleryImages}
                            style={{ borderColor: '#FFD326', color: '#FFD326' }}
                          >
                            <i className="fas fa-sync-alt"></i>
                          </Button>
                        </h5>
                      </Card.Header>
                      <Card.Body>
                        {loadingGallery ? (
                          <div className="text-center py-4">
                            <Spinner animation="border" variant="success" />
                            <p className="mt-2">Loading gallery...</p>
                          </div>
                        ) : galleryImages.length > 0 ? (
                          <Table striped bordered hover responsive>
                            <thead>
                              <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Uploaded</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {galleryImages.map((image) => (
                                <tr key={image.id}>
                                  <td>
                                    <img 
                                      src={image.image_url} 
                                      alt={image.title || 'Gallery image'}
                                      style={{ 
                                        width: '60px', 
                                        height: '60px', 
                                        objectFit: 'cover',
                                        borderRadius: '4px'
                                      }}
                                    />
                                  </td>
                                  <td>{image.title || 'Untitled'}</td>
                                  <td>{image.description || 'No description'}</td>
                                  <td>{new Date(image.created_at).toLocaleDateString()}</td>
                                  <td>
                                    <Button 
                                      variant="danger" 
                                      size="sm"
                                      onClick={() => handleGalleryDeleteClick(image)}
                                    >
                                      <i className="fas fa-trash"></i>
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        ) : (
                          <p className="text-center text-muted py-4">No gallery images uploaded yet.</p>
                        )}
                      </Card.Body>
                    </Card>
                  </div>
                )}

                {/* Manage Offices Tab */}
                {activeTab === 'offices' && (
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h4 style={{ color: '#00482D', marginBottom: '0' }}>
                        <i className="fas fa-building me-2"></i>
                        Office Management
                      </h4>
                      <Button 
                        variant="success" 
                        onClick={openAddOfficeModal}
                        style={{ backgroundColor: '#00482D', borderColor: '#00482D' }}
                      >
                        <i className="fas fa-plus me-2"></i>
                        Add Office
                      </Button>
                    </div>
                    
                    {loadingOffices ? (
                      <div className="text-center py-4">
                        <Spinner animation="border" variant="success" />
                        <p className="mt-2">Loading offices...</p>
                      </div>
                    ) : (
                      <>
                        <Row>
                          <Col md={4}>
                            <Card className="mb-4">
                              <Card.Header style={{ backgroundColor: '#00482D', color: '#FFD326' }}>
                                <h6 className="mb-0">Offices List</h6>
                              </Card.Header>
                              <Card.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                {offices.length > 0 ? (
                                  <ListGroup variant="flush">
                                    {offices.map(office => (
                                      <ListGroup.Item 
                                        key={office.id}
                                        action
                                        active={selectedOffice?.id === office.id}
                                        onClick={() => loadOfficeStaff(office.id)}
                                        style={{
                                          cursor: 'pointer',
                                          backgroundColor: selectedOffice?.id === office.id ? '#00482D' : 'transparent',
                                          color: selectedOffice?.id === office.id ? '#FFD326' : '#00482D'
                                        }}
                                        className="d-flex justify-content-between align-items-center"
                                      >
                                        <div>
                                          <i className={`bi ${office.icon || 'bi-building'} me-2`}></i>
                                          <span>{office.name}</span>
                                        </div>
                                        <div>
                                          <Badge bg="secondary" className="me-2">{office.staff_count || 0}</Badge>
                                          <Button 
                                            variant="outline-danger" 
                                            size="sm"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setOfficeToDelete(office);
                                              setShowDeleteOfficeModal(true);
                                            }}
                                            style={{
                                              padding: '2px 6px',
                                              fontSize: '0.7rem'
                                            }}
                                          >
                                            <i className="fas fa-trash"></i>
                                          </Button>
                                          <Button 
                                            variant="outline-info" 
                                            size="sm"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              openEditOfficeModal(office);
                                            }}
                                            style={{
                                              padding: '2px 6px',
                                              fontSize: '0.7rem',
                                              marginLeft: '4px'
                                            }}
                                          >
                                            <i className="fas fa-edit"></i>
                                          </Button>
                                        </div>
                                      </ListGroup.Item>
                                    ))}
                                  </ListGroup>
                                ) : (
                                  <p className="text-center text-muted py-4">No offices created yet.</p>
                                )}
                              </Card.Body>
                              <Card.Footer>
                                <Button 
                                  variant="outline-primary" 
                                  size="sm" 
                                  onClick={loadOffices}
                                  className="w-100"
                                >
                                  <i className="fas fa-sync-alt me-2"></i>
                                  Refresh Offices
                                </Button>
                              </Card.Footer>
                            </Card>
                          </Col>
                          
                          <Col md={8}>
                            {selectedOffice ? (
                              <Card>
                                <Card.Header style={{ backgroundColor: '#00482D', color: '#FFD326' }}>
                                  <div className="d-flex justify-content-between align-items-center">
                                    <h6 className="mb-0">{selectedOffice.name} - Personnel</h6>
                                    <Button 
                                      variant="outline-light" 
                                      size="sm"
                                      onClick={() => {
                                        setEditingStaff(null);
                                        setStaffFormData({ 
                                          name: '', 
                                          position: '', 
                                          imageFile: null,
                                          imagePreview: null 
                                        });
                                        setShowStaffModal(true);
                                      }}
                                      style={{ borderColor: '#FFD326', color: '#FFD326' }}
                                    >
                                      <i className="fas fa-plus me-2"></i>
                                      Add Personnel
                                    </Button>
                                  </div>
                                </Card.Header>
                                <Card.Body>
                                  {officeStaff.length > 0 ? (
                                    <Table striped bordered hover responsive>
                                      <thead>
                                        <tr>
                                          <th>Photo</th>
                                          <th>Name</th>
                                          <th>Position</th>
                                          <th>Actions</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {officeStaff.map(staff => (
                                          <tr key={staff.id}>
                                            <td>
                                              <img 
                                                src={staff.image_url || '/images/placeholder.png'} 
                                                alt={staff.name}
                                                style={{ 
                                                  width: '40px', 
                                                  height: '40px', 
                                                  objectFit: 'cover',
                                                  borderRadius: '50%'
                                                }}
                                                onError={(e) => {
                                                  e.target.onerror = null;
                                                  e.target.src = '/images/placeholder.png';
                                                }}
                                              />
                                            </td>
                                            <td>{staff.name}</td>
                                            <td>{staff.position}</td>
                                            <td>
                                              <Button 
                                                variant="danger" 
                                                size="sm"
                                                onClick={() => handleRemoveStaff(staff.id)}
                                              >
                                                <i className="fas fa-trash"></i>
                                              </Button>
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </Table>
                                  ) : (
                                    <p className="text-center text-muted py-4">No personnel assigned to this office.</p>
                                  )}
                                </Card.Body>
                              </Card>
                            ) : (
                              <Card className="text-center">
                                <Card.Body className="py-5">
                                  <i className="fas fa-building" style={{ fontSize: '3rem', color: '#00482D' }}></i>
                                  <h5 className="mt-3">Select an Office</h5>
                                  <p className="text-muted">Choose an office from the list to manage its personnel.</p>
                                </Card.Body>
                              </Card>
                            )}
                          </Col>
                        </Row>
                      </>
                    )}
                  </div>
                )}

                {/* Key Officials Tab */}
                {activeTab === 'officials' && (
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h4 style={{ color: '#00482D', marginBottom: '0' }}>
                        <i className="fas fa-user-tie me-2"></i>
                        Key Officials Management
                      </h4>
                      <Button 
                        variant="success" 
                        onClick={openAddOfficialModal}
                        style={{ backgroundColor: '#00482D', borderColor: '#00482D' }}
                      >
                        <i className="fas fa-plus me-2"></i>
                        Add Official
                      </Button>
                    </div>
                    
                    {loadingKeyOfficials ? (
                      <div className="text-center py-4">
                        <Spinner animation="border" variant="success" />
                        <p className="mt-2">Loading key officials...</p>
                      </div>
                    ) : (
                      <Card>
                        <Card.Header style={{ backgroundColor: '#00482D', color: '#FFD326' }}>
                          <h6 className="mb-0">
                            <i className="fas fa-list me-2"></i>
                            All Officials ({keyOfficials.length})
                            <Button 
                              variant="outline-light" 
                              size="sm" 
                              className="ms-2"
                              onClick={loadKeyOfficials}
                              style={{ borderColor: '#FFD326', color: '#FFD326' }}
                            >
                              <i className="fas fa-sync-alt"></i>
                            </Button>
                          </h6>
                        </Card.Header>
                        <Card.Body>
                          {keyOfficials.length > 0 ? (
                            <Table striped bordered hover responsive>
                              <thead>
                                <tr>
                                  <th>Photo</th>
                                  <th>Name</th>
                                  <th>Position</th>
                                  <th>Category</th>
                                  <th>Level</th>
                                  <th>Status</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {keyOfficials.map(official => (
                                  <tr key={official.id}>
                                    <td>
                                      <img 
                                        src={official.image_url || '/images/placeholder-avatar.jpg'} 
                                        alt={official.name}
                                        style={{ 
                                          width: '50px', 
                                          height: '50px', 
                                          objectFit: 'cover',
                                          borderRadius: '50%'
                                        }}
                                        onError={(e) => {
                                          e.target.onerror = null;
                                          e.target.src = '/images/placeholder-avatar.jpg';
                                        }}
                                      />
                                    </td>
                                    <td><strong>{official.name}</strong></td>
                                    <td>{official.position}</td>
                                    <td>
                                      <span className="badge bg-primary">
                                        {official.category}
                                      </span>
                                    </td>
                                    <td>
                                      <span className="badge bg-secondary">
                                        Level {official.level}
                                      </span>
                                    </td>
                                    <td>
                                      <span className={`badge ${official.is_active ? 'bg-success' : 'bg-danger'}`}>
                                        {official.is_active ? 'Active' : 'Inactive'}
                                      </span>
                                    </td>
                                    <td>
                                      <div className="d-flex gap-1">
                                        <Button 
                                          variant="primary" 
                                          size="sm"
                                          onClick={() => openEditOfficialModal(official)}
                                        >
                                          <i className="fas fa-edit"></i>
                                        </Button>
                                        <Button 
                                          variant="danger" 
                                          size="sm"
                                          onClick={() => {
                                            setOfficialToDelete(official);
                                            setShowDeleteOfficialModal(true);
                                          }}
                                        >
                                          <i className="fas fa-trash"></i>
                                        </Button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          ) : (
                            <p className="text-center text-muted py-4">No key officials added yet.</p>
                          )}
                        </Card.Body>
                      </Card>
                    )}
                  </div>
                )}

                {/* Faculty Tab with Search */}
                {activeTab === 'faculty' && (
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h4 style={{ color: '#00482D', marginBottom: '0' }}>
                        <i className="fas fa-chalkboard-teacher me-2"></i>
                        Faculty Management
                      </h4>
                      <Button 
                        variant="success" 
                        onClick={openAddFacultyModal}
                        style={{ backgroundColor: '#00482D', borderColor: '#00482D' }}
                      >
                        <i className="fas fa-plus me-2"></i>
                        Add Faculty
                      </Button>
                    </div>
                    
                    {/* Search Bar */}
                    <div className="mb-4">
                      <Row>
                        <Col md={8}>
                          <Form.Group>
                            <div className="d-flex gap-2">
                              <Form.Control
                                type="text"
                                placeholder="🔍 Search faculty by name..."
                                value={facultySearchTerm}
                                onChange={handleFacultySearch}
                                style={{ 
                                  borderRadius: '8px',
                                  borderColor: facultySearchTerm ? '#00482D' : '#ced4da'
                                }}
                              />
                              {facultySearchTerm && (
                                <Button 
                                  variant="outline-secondary" 
                                  onClick={resetFacultySearch}
                                  style={{ borderRadius: '8px' }}
                                >
                                  <i className="fas fa-times"></i> Clear
                                </Button>
                              )}
                            </div>
                            <Form.Text className="text-muted">
                              {facultySearchTerm ? (
                                <span>Showing <strong>{filteredFaculty.length}</strong> of {facultyMembers.length} faculty members</span>
                              ) : (
                                <span>Total <strong>{facultyMembers.length}</strong> faculty members</span>
                              )}
                            </Form.Text>
                          </Form.Group>
                        </Col>
                        <Col md={4} className="d-flex justify-content-end align-items-end">
                          <Button 
                            variant="outline-primary" 
                            size="sm"
                            onClick={loadFaculty}
                            style={{ borderRadius: '8px' }}
                          >
                            <i className="fas fa-sync-alt me-1"></i> Refresh
                          </Button>
                        </Col>
                      </Row>
                    </div>
                    
                    {loadingFaculty ? (
                      <div className="text-center py-4">
                        <Spinner animation="border" variant="success" />
                        <p className="mt-2">Loading faculty members...</p>
                      </div>
                    ) : (
                      <Card>
                        <Card.Header style={{ backgroundColor: '#00482D', color: '#FFD326' }}>
                          <h6 className="mb-0">
                            <i className="fas fa-list me-2"></i>
                            {facultySearchTerm ? 'Search Results' : 'All Faculty'} ({filteredFaculty.length})
                          </h6>
                        </Card.Header>
                        <Card.Body>
                          {filteredFaculty.length > 0 ? (
                            <Table striped bordered hover responsive>
                              <thead>
                                <tr>
                                  <th>Photo</th>
                                  <th>Name</th>
                                  <th>Designation</th>
                                  <th>Program</th>
                                  <th>College</th>
                                  <th>Role</th>
                                  <th>Status</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {filteredFaculty.map(faculty => (
                                  <tr key={faculty.id}>
                                    <td>
                                      <img 
                                        src={faculty.image_url || '/images/staff/placeholder.png'} 
                                        alt={faculty.name}
                                        style={{ 
                                          width: '50px', 
                                          height: '50px', 
                                          objectFit: 'cover',
                                          borderRadius: '50%'
                                        }}
                                        onError={(e) => {
                                          e.target.onerror = null;
                                          e.target.src = '/images/staff/placeholder.png';
                                        }}
                                      />
                                    </td>
                                    <td><strong>{faculty.name}</strong></td>
                                    <td>{faculty.designation || 'Faculty'}</td>
                                    <td><span className="badge bg-info">{faculty.program}</span></td>
                                    <td><span className="badge bg-secondary">{faculty.college}</span></td>
                                    <td>
                                      {faculty.is_dean && <span className="badge bg-danger me-1">Dean</span>}
                                      {faculty.is_department_head && <span className="badge bg-warning me-1">Dept Head</span>}
                                      {faculty.is_program_head && <span className="badge bg-primary me-1">Program Head</span>}
                                      {faculty.is_allied && <span className="badge bg-secondary me-1">Allied</span>}
                                      {!faculty.is_dean && !faculty.is_department_head && !faculty.is_program_head && !faculty.is_allied && (
                                        <span className="badge bg-light text-dark">Faculty</span>
                                      )}
                                    </td>
                                    <td>
                                      <span className={`badge ${faculty.is_active ? 'bg-success' : 'bg-danger'}`}>
                                        {faculty.is_active ? 'Active' : 'Inactive'}
                                      </span>
                                    </td>
                                    <td>
                                      <div className="d-flex gap-1">
                                        <Button 
                                          variant="primary" 
                                          size="sm"
                                          onClick={() => openEditFacultyModal(faculty)}
                                        >
                                          <i className="fas fa-edit"></i>
                                        </Button>
                                        <Button 
                                          variant="danger" 
                                          size="sm"
                                          onClick={() => {
                                            setFacultyToDelete(faculty);
                                            setShowDeleteFacultyModal(true);
                                          }}
                                        >
                                          <i className="fas fa-trash"></i>
                                        </Button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          ) : (
                            <div className="text-center py-4">
                              {facultySearchTerm ? (
                                <>
                                  <i className="fas fa-search" style={{ fontSize: '2rem', color: '#6c757d' }}></i>
                                  <p className="mt-2 text-muted">No faculty members found matching "<strong>{facultySearchTerm}</strong>"</p>
                                  <Button variant="outline-secondary" size="sm" onClick={resetFacultySearch}>
                                    Clear Search
                                  </Button>
                                </>
                              ) : (
                                <p className="text-center text-muted py-4">No faculty members added yet.</p>
                              )}
                            </div>
                          )}
                        </Card.Body>
                      </Card>
                    )}
                  </div>
                )}

                {/* Manage Content Tab */}
                {activeTab === 'manage' && (
                  <div>
                    <h4 style={{ color: '#00482D', marginBottom: '1.5rem' }}>
                      <i className="fas fa-edit me-2"></i>
                      Manage Published Content
                    </h4>
                    
                    {loadingContent ? (
                      <div className="text-center py-4">
                        <Spinner animation="border" variant="success" />
                        <p className="mt-2">Loading content...</p>
                      </div>
                    ) : (
                      <>
                        {/* News Section */}
                        <h5 className="mt-4 mb-3">
                          <i className="fas fa-newspaper me-2 text-success"></i>
                          News Articles ({publishedNews.length})
                          <Button 
                            variant="outline-secondary" 
                            size="sm" 
                            className="ms-2"
                            onClick={loadPublishedContent}
                          >
                            <i className="fas fa-sync-alt"></i>
                          </Button>
                        </h5>
                        {publishedNews.length > 0 ? (
                          <Table striped bordered hover responsive>
                            <thead>
                              <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th>Images</th>
                                <th>SDGs</th>
                                <th>Show on RESO</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {publishedNews.map(item => (
                                <tr key={item.id}>
                                  <td>{item.title}</td>
                                  <td><span className="badge bg-secondary">{item.category || 'General'}</span></td>
                                  <td>{formatDate(item.date || item.created_at)}</td>
                                  <td>
                                    {item.images && item.images.length > 0 ? (
                                      <span className="badge bg-info">
                                        <i className="fas fa-image me-1"></i>
                                        {item.images.length}
                                      </span>
                                    ) : item.image_url ? (
                                      <span className="badge bg-secondary">1</span>
                                    ) : (
                                      <span className="text-muted">None</span>
                                    )}
                                  </td>
                                  <td>
                                    {item.sdg_tags && item.sdg_tags.length > 0 ? (
                                      item.sdg_tags.map(tag => (
                                        <span key={tag} className="badge bg-primary me-1">SDG {tag}</span>
                                      ))
                                    ) : (
                                      <span className="text-muted">None</span>
                                    )}
                                  </td>
                                  <td>
                                    {item.showOnReso || item.category === 'research' ? (
                                      <span className="badge bg-success">
                                        <i className="fas fa-check me-1"></i> Yes
                                      </span>
                                    ) : (
                                      <span className="badge bg-secondary">No</span>
                                    )}
                                  </td>
                                  <td>
                                    <div className="d-flex gap-1">
                                      <Button 
                                        variant="primary" 
                                        size="sm"
                                        onClick={() => handleEditClick(item, 'news')}
                                      >
                                        <i className="fas fa-edit"></i>
                                      </Button>
                                      <Button 
                                        variant="danger" 
                                        size="sm"
                                        onClick={() => handleDeleteClick(item, 'news')}
                                      >
                                        <i className="fas fa-trash"></i>
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        ) : (
                          <p className="text-muted">No news articles published yet.</p>
                        )}

                        {/* Events Section */}
                        <h5 className="mt-4 mb-3">
                          <i className="fas fa-calendar-alt me-2 text-info"></i>
                          Events ({publishedEvents.length})
                        </h5>
                        {publishedEvents.length > 0 ? (
                          <Table striped bordered hover responsive>
                            <thead>
                              <tr>
                                <th>Title</th>
                                <th>Date</th>
                                <th>Location</th>
                                <th>Images</th>
                                <th>SDGs</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {publishedEvents.map(item => (
                                <tr key={item.id}>
                                  <td>{item.title}</td>
                                  <td>{formatDate(item.date)}</td>
                                  <td>{item.location || 'TBA'}</td>
                                  <td>
                                    {item.images && item.images.length > 0 ? (
                                      <span className="badge bg-info">
                                        <i className="fas fa-image me-1"></i>
                                        {item.images.length}
                                      </span>
                                    ) : item.image_url ? (
                                      <span className="badge bg-secondary">1</span>
                                    ) : (
                                      <span className="text-muted">None</span>
                                    )}
                                  </td>
                                  <td>
                                    {item.sdg_tags && item.sdg_tags.length > 0 ? (
                                      item.sdg_tags.map(tag => (
                                        <span key={tag} className="badge bg-primary me-1">SDG {tag}</span>
                                      ))
                                    ) : (
                                      <span className="text-muted">None</span>
                                    )}
                                  </td>
                                  <td>
                                    <div className="d-flex gap-1">
                                      <Button 
                                        variant="primary" 
                                        size="sm"
                                        onClick={() => handleEditClick(item, 'event')}
                                      >
                                        <i className="fas fa-edit"></i>
                                      </Button>
                                      <Button 
                                        variant="danger" 
                                        size="sm"
                                        onClick={() => handleDeleteClick(item, 'event')}
                                      >
                                        <i className="fas fa-trash"></i>
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        ) : (
                          <p className="text-muted">No events created yet.</p>
                        )}

                        {/* Announcements Section */}
                        <h5 className="mt-4 mb-3">
                          <i className="fas fa-bullhorn me-2 text-warning"></i>
                          Announcements ({publishedAnnouncements.length})
                        </h5>
                        {publishedAnnouncements.length > 0 ? (
                          <Table striped bordered hover responsive>
                            <thead>
                              <tr>
                                <th>Title</th>
                                <th>Priority</th>
                                <th>Date</th>
                                <th>Images</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {publishedAnnouncements.map(item => (
                                <tr key={item.id}>
                                  <td>{item.title}</td>
                                  <td>
                                    <span className={`badge ${
                                      item.priority === 'urgent' ? 'bg-danger' :
                                      item.priority === 'high' ? 'bg-warning' :
                                      'bg-secondary'
                                    }`}>
                                      {item.priority || 'Normal'}
                                    </span>
                                  </td>
                                  <td>{formatDate(item.date || item.created_at)}</td>
                                  <td>
                                    {item.images && item.images.length > 0 ? (
                                      <span className="badge bg-info">
                                        <i className="fas fa-image me-1"></i>
                                        {item.images.length}
                                      </span>
                                    ) : item.image_url ? (
                                      <span className="badge bg-secondary">1</span>
                                    ) : (
                                      <span className="text-muted">None</span>
                                    )}
                                  </td>
                                  <td>
                                    <div className="d-flex gap-1">
                                      <Button 
                                        variant="primary" 
                                        size="sm"
                                        onClick={() => handleEditClick(item, 'announcement')}
                                      >
                                        <i className="fas fa-edit"></i>
                                      </Button>
                                      <Button 
                                        variant="danger" 
                                        size="sm"
                                        onClick={() => handleDeleteClick(item, 'announcement')}
                                      >
                                        <i className="fas fa-trash"></i>
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        ) : (
                          <p className="text-muted">No announcements published yet.</p>
                        )}
                      </>
                    )}
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Delete Confirmation Modal for Content */}
      <Modal show={showDeleteModal} onHide={() => {
        setShowDeleteModal(false);
        setItemToDelete(null);
      }} centered>
        <Modal.Header closeButton style={{ backgroundColor: '#dc3545', color: '#ffffff' }}>
          <Modal.Title>
            <i className="fas fa-exclamation-triangle me-2"></i>
            Confirm Delete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this {deleteType}?</p>
          <p><strong>Title:</strong> {itemToDelete?.title}</p>
          <p className="text-danger"><small>This action cannot be undone.</small></p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setShowDeleteModal(false);
            setItemToDelete(null);
          }} disabled={deleting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete} disabled={deleting}>
            {deleting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Deleting...
              </>
            ) : (
              <>
                <i className="fas fa-trash me-2"></i>
                Delete
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal for Gallery */}
      <Modal show={showDeleteGalleryModal} onHide={() => {
        setShowDeleteGalleryModal(false);
        setGalleryImageToDelete(null);
      }} centered>
        <Modal.Header closeButton style={{ backgroundColor: '#dc3545', color: '#ffffff' }}>
          <Modal.Title>
            <i className="fas fa-exclamation-triangle me-2"></i>
            Confirm Delete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this gallery image?</p>
          <p><strong>Title:</strong> {galleryImageToDelete?.title || 'Untitled'}</p>
          <p className="text-danger"><small>This action cannot be undone.</small></p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setShowDeleteGalleryModal(false);
            setGalleryImageToDelete(null);
          }} disabled={deletingGallery}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmGalleryDelete} disabled={deletingGallery}>
            {deletingGallery ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Deleting...
              </>
            ) : (
              <>
                <i className="fas fa-trash me-2"></i>
                Delete
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal for Office */}
      <Modal show={showDeleteOfficeModal} onHide={() => {
        setShowDeleteOfficeModal(false);
        setOfficeToDelete(null);
      }} centered>
        <Modal.Header closeButton style={{ backgroundColor: '#dc3545', color: '#ffffff' }}>
          <Modal.Title>
            <i className="fas fa-exclamation-triangle me-2"></i>
            Delete Office
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this office?</p>
          <p><strong>Office:</strong> {officeToDelete?.name}</p>
          <p className="text-danger"><small>This will also delete all personnel associated with this office. This action cannot be undone.</small></p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setShowDeleteOfficeModal(false);
            setOfficeToDelete(null);
          }}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteOffice}>
            <i className="fas fa-trash me-2"></i>
            Delete Office
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal for Official */}
      <Modal show={showDeleteOfficialModal} onHide={() => {
        setShowDeleteOfficialModal(false);
        setOfficialToDelete(null);
      }} centered>
        <Modal.Header closeButton style={{ backgroundColor: '#dc3545', color: '#ffffff' }}>
          <Modal.Title>
            <i className="fas fa-exclamation-triangle me-2"></i>
            Delete Official
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this official?</p>
          <p><strong>Name:</strong> {officialToDelete?.name}</p>
          <p><strong>Position:</strong> {officialToDelete?.position}</p>
          <p className="text-danger"><small>This action cannot be undone.</small></p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setShowDeleteOfficialModal(false);
            setOfficialToDelete(null);
          }}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteOfficial}>
            <i className="fas fa-trash me-2"></i>
            Delete Official
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal for Faculty */}
      <Modal show={showDeleteFacultyModal} onHide={() => {
        setShowDeleteFacultyModal(false);
        setFacultyToDelete(null);
      }} centered>
        <Modal.Header closeButton style={{ backgroundColor: '#dc3545', color: '#ffffff' }}>
          <Modal.Title>
            <i className="fas fa-exclamation-triangle me-2"></i>
            Delete Faculty
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this faculty member?</p>
          <p><strong>Name:</strong> {facultyToDelete?.name}</p>
          <p><strong>Program:</strong> {facultyToDelete?.program}</p>
          <p className="text-danger"><small>This action cannot be undone.</small></p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setShowDeleteFacultyModal(false);
            setFacultyToDelete(null);
          }}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteFaculty}>
            <i className="fas fa-trash me-2"></i>
            Delete Faculty
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => {
        setShowEditModal(false);
        setEditingItem(null);
        setEditFormData({
          title: '',
          category: '',
          content: '',
          summary: '',
          sdgTags: [],
          priority: 'normal',
          date: '',
          time: '',
          location: '',
          description: '',
          images: []
        });
        setEditExistingImages([]);
        setEditImagePreviews([]);
        setEditImageFiles([]);
      }} centered size="lg">
        <Modal.Header closeButton style={{ backgroundColor: '#00482D', color: '#FFD326' }}>
          <Modal.Title>
            <i className="fas fa-edit me-2"></i>
            Edit {editType.charAt(0).toUpperCase() + editType.slice(1)}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loadingEdit ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="success" />
              <p className="mt-2">Loading content...</p>
            </div>
          ) : (
            <Form onSubmit={handleEditSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Enter title"
                  value={editFormData.title}
                  onChange={handleEditChange}
                  required
                />
              </Form.Group>

              {editType === 'news' && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      name="category"
                      value={editFormData.category}
                      onChange={handleEditChange}
                      required
                    >
                      <option value="">Select category</option>
                      <option value="academic">Academic</option>
                      <option value="campus">Campus News</option>
                      <option value="research">Research</option>
                      <option value="student">Student Affairs</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Summary/Excerpt</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="summary"
                      placeholder="Brief summary"
                      value={editFormData.summary}
                      onChange={handleEditChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>SDG Tags</Form.Label>
                    <Select
                      isMulti
                      options={sdgOptions}
                      value={sdgOptions.filter(option => editFormData.sdgTags.includes(option.value))}
                      onChange={handleEditSDGChange}
                      styles={customSelectStyles}
                      placeholder="Select SDG tags..."
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={8}
                      name="content"
                      placeholder="Write your news article here..."
                      value={editFormData.content}
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>
                </>
              )}

              {editType === 'announcement' && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Priority</Form.Label>
                    <Form.Select
                      name="priority"
                      value={editFormData.priority}
                      onChange={handleEditChange}
                      required
                    >
                      <option value="normal">Normal</option>
                      <option value="high">High Priority</option>
                      <option value="urgent">Urgent</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="content"
                      placeholder="Write your announcement here..."
                      value={editFormData.content}
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>
                </>
              )}

              {editType === 'event' && (
                <>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="date"
                          value={editFormData.date}
                          onChange={handleEditChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Time</Form.Label>
                        <Form.Control
                          type="time"
                          name="time"
                          value={editFormData.time}
                          onChange={handleEditChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      placeholder="Enter event location"
                      value={editFormData.location}
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>SDG Tags</Form.Label>
                    <Select
                      isMulti
                      options={sdgOptions}
                      value={sdgOptions.filter(option => editFormData.sdgTags.includes(option.value))}
                      onChange={handleEditSDGChange}
                      styles={customSelectStyles}
                      placeholder="Select SDG tags..."
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="description"
                      placeholder="Describe the event..."
                      value={editFormData.description}
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>
                </>
              )}

              {/* Images Section */}
              <Form.Group className="mb-3">
                <Form.Label>Images</Form.Label>
                
                {editExistingImages.length > 0 && (
                  <div className="mb-3">
                    <p className="mb-2"><strong>Current Images ({editExistingImages.length})</strong></p>
                    <div className="d-flex flex-wrap gap-2">
                      {editExistingImages.map((img, index) => (
                        <div key={index} style={{ position: 'relative', display: 'inline-block' }}>
                          <img 
                            src={img} 
                            alt={`Existing ${index + 1}`}
                            style={{ 
                              width: '100px', 
                              height: '100px', 
                              objectFit: 'cover',
                              borderRadius: '8px',
                              border: '2px solid #28a745'
                            }}
                          />
                          <Button
                            variant="danger"
                            size="sm"
                            style={{
                              position: 'absolute',
                              top: '-8px',
                              right: '-8px',
                              borderRadius: '50%',
                              width: '24px',
                              height: '24px',
                              padding: '0',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px'
                            }}
                            onClick={() => removeExistingImage(index)}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Form.Control
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleEditImageChange}
                />
                <Form.Text className="text-muted">
                  Add new images (JPG, PNG, GIF, WebP - Max 5MB each)
                </Form.Text>

                {editImagePreviews.length > 0 && (
                  <div className="mt-3">
                    <p className="mb-2"><strong>New Images ({editImagePreviews.length})</strong></p>
                    <div className="d-flex flex-wrap gap-2">
                      {editImagePreviews.map((preview, index) => (
                        <div key={index} style={{ position: 'relative', display: 'inline-block' }}>
                          <img 
                            src={preview} 
                            alt={`New ${index + 1}`}
                            style={{ 
                              width: '100px', 
                              height: '100px', 
                              objectFit: 'cover',
                              borderRadius: '8px',
                              border: '2px solid #007bff'
                            }}
                          />
                          <Button
                            variant="danger"
                            size="sm"
                            style={{
                              position: 'absolute',
                              top: '-8px',
                              right: '-8px',
                              borderRadius: '50%',
                              width: '24px',
                              height: '24px',
                              padding: '0',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px'
                            }}
                            onClick={() => removeNewImage(index)}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Form.Group>

              <div className="d-flex justify-content-end gap-2 mt-3">
                <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  style={{ backgroundColor: '#00482D', color: '#FFD326', border: 'none' }}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save me-2"></i>
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>

      {/* Add/Edit Official Modal */}
      <Modal show={showOfficialModal} onHide={() => {
        setShowOfficialModal(false);
        setEditingOfficial(null);
        setOfficialFormData({
          name: '',
          position: '',
          email: '',
          phone: '',
          bio: '',
          level: 0,
          category: 'administration',
          display_order: 0,
          is_active: true
        });
        setOfficialImageFile(null);
        setOfficialImagePreview(null);
      }} centered size="lg">
        <Modal.Header closeButton style={{ backgroundColor: '#00482D', color: '#FFD326' }}>
          <Modal.Title>
            <i className="fas fa-user-tie me-2"></i>
            {editingOfficial ? 'Edit Official' : 'Add New Official'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Name <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter full name"
                    value={officialFormData.name}
                    onChange={(e) => setOfficialFormData({ ...officialFormData, name: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Position <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter position/title"
                    value={officialFormData.position}
                    onChange={(e) => setOfficialFormData({ ...officialFormData, position: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email address"
                    value={officialFormData.email}
                    onChange={(e) => setOfficialFormData({ ...officialFormData, email: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    value={officialFormData.phone}
                    onChange={(e) => setOfficialFormData({ ...officialFormData, phone: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={officialFormData.category}
                    onChange={(e) => setOfficialFormData({ ...officialFormData, category: e.target.value })}
                  >
                    <option value="administration">Administration</option>
                    <option value="directors">Directors</option>
                    <option value="deans">Deans</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Level (Hierarchy)</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    max="10"
                    placeholder="Enter level (1-10)"
                    value={officialFormData.level}
                    onChange={(e) => setOfficialFormData({ ...officialFormData, level: parseInt(e.target.value) || 0 })}
                  />
                  <Form.Text className="text-muted">
                    Lower numbers appear higher in the hierarchy
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Bio/Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter bio or description"
                value={officialFormData.bio}
                onChange={(e) => setOfficialFormData({ ...officialFormData, bio: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleOfficialImageChange}
              />
              <Form.Text className="text-muted">
                Supported formats: JPG, PNG, GIF, WebP (Max 5MB)
              </Form.Text>
              
              {officialImagePreview && (
                <div className="mt-2">
                  <img 
                    src={officialImagePreview} 
                    alt="Official preview"
                    style={{ 
                      width: '100px', 
                      height: '100px', 
                      objectFit: 'cover',
                      borderRadius: '50%',
                      border: '2px solid #00482D'
                    }}
                  />
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Active"
                checked={officialFormData.is_active}
                onChange={(e) => setOfficialFormData({ ...officialFormData, is_active: e.target.checked })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setShowOfficialModal(false);
            setEditingOfficial(null);
            setOfficialFormData({
              name: '',
              position: '',
              email: '',
              phone: '',
              bio: '',
              level: 0,
              category: 'administration',
              display_order: 0,
              is_active: true
            });
            setOfficialImageFile(null);
            setOfficialImagePreview(null);
          }}>
            Cancel
          </Button>
          <Button 
            variant="success" 
            onClick={handleOfficialSubmit}
            disabled={savingOfficial}
            style={{ backgroundColor: '#00482D', borderColor: '#00482D' }}
          >
            {savingOfficial ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Saving...
              </>
            ) : (
              <>{editingOfficial ? 'Update' : 'Add'} Official</>
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add/Edit Faculty Modal */}
      <Modal show={showFacultyModal} onHide={() => {
        setShowFacultyModal(false);
        setEditingFaculty(null);
        setFacultyFormData({
          name: '',
          designation: '',
          program: '',
          college: '',
          designations: [],
          is_active: true,
          is_allied: false,
          is_program_head: false,
          is_dean: false,
          is_department_head: false,
          display_order: 0
        });
        setFacultyImageFile(null);
        setFacultyImagePreview(null);
      }} centered size="lg">
        <Modal.Header closeButton style={{ backgroundColor: '#00482D', color: '#FFD326' }}>
          <Modal.Title>
            <i className="fas fa-chalkboard-teacher me-2"></i>
            {editingFaculty ? 'Edit Faculty' : 'Add New Faculty'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Name <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter full name"
                    value={facultyFormData.name}
                    onChange={(e) => setFacultyFormData({ ...facultyFormData, name: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Designation</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter designation (e.g., Professor, Associate Professor)"
                    value={facultyFormData.designation}
                    onChange={(e) => setFacultyFormData({ ...facultyFormData, designation: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>College <span className="text-danger">*</span></Form.Label>
                  <Form.Select
                    value={facultyFormData.college}
                    onChange={(e) => {
                      setFacultyFormData({ 
                        ...facultyFormData, 
                        college: e.target.value,
                        program: ''
                      });
                    }}
                    required
                  >
                    <option value="">Select College</option>
                    {collegeOptions.map(college => (
                      <option key={college.value} value={college.value}>{college.label}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Program <span className="text-danger">*</span></Form.Label>
                  <Form.Select
                    value={facultyFormData.program}
                    onChange={(e) => setFacultyFormData({ ...facultyFormData, program: e.target.value })}
                    required
                    disabled={!facultyFormData.college}
                  >
                    <option value="">Select Program</option>
                    {facultyFormData.college && programOptions[facultyFormData.college]?.map(program => (
                      <option key={program} value={program}>{program}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Designations (comma separated)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter designations separated by commas"
                value={facultyFormData.designations.join(', ')}
                onChange={(e) => setFacultyFormData({ 
                  ...facultyFormData, 
                  designations: e.target.value.split(',').map(d => d.trim()).filter(d => d)
                })}
              />
              <Form.Text className="text-muted">
                Separate multiple designations with commas
              </Form.Text>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Profile Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleFacultyImageChange}
                  />
                  <Form.Text className="text-muted">
                    Supported formats: JPG, PNG, GIF, WebP (Max 5MB)
                  </Form.Text>
                  
                  {facultyImagePreview && (
                    <div className="mt-2">
                      <img 
                        src={facultyImagePreview} 
                        alt="Faculty preview"
                        style={{ 
                          width: '100px', 
                          height: '100px', 
                          objectFit: 'cover',
                          borderRadius: '50%',
                          border: '2px solid #00482D'
                        }}
                      />
                    </div>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Display Order</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    placeholder="0"
                    value={facultyFormData.display_order}
                    onChange={(e) => setFacultyFormData({ ...facultyFormData, display_order: parseInt(e.target.value) || 0 })}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Dean"
                    checked={facultyFormData.is_dean}
                    onChange={(e) => setFacultyFormData({ ...facultyFormData, is_dean: e.target.checked })}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Department Head"
                    checked={facultyFormData.is_department_head}
                    onChange={(e) => setFacultyFormData({ ...facultyFormData, is_department_head: e.target.checked })}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Program Head"
                    checked={facultyFormData.is_program_head}
                    onChange={(e) => setFacultyFormData({ ...facultyFormData, is_program_head: e.target.checked })}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Allied Faculty"
                    checked={facultyFormData.is_allied}
                    onChange={(e) => setFacultyFormData({ ...facultyFormData, is_allied: e.target.checked })}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Active"
                checked={facultyFormData.is_active}
                onChange={(e) => setFacultyFormData({ ...facultyFormData, is_active: e.target.checked })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setShowFacultyModal(false);
            setEditingFaculty(null);
            setFacultyFormData({
              name: '',
              designation: '',
              program: '',
              college: '',
              designations: [],
              is_active: true,
              is_allied: false,
              is_program_head: false,
              is_dean: false,
              is_department_head: false,
              display_order: 0
            });
            setFacultyImageFile(null);
            setFacultyImagePreview(null);
          }}>
            Cancel
          </Button>
          <Button 
            variant="success" 
            onClick={handleFacultySubmit}
            disabled={savingFaculty}
            style={{ backgroundColor: '#00482D', borderColor: '#00482D' }}
          >
            {savingFaculty ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Saving...
              </>
            ) : (
              <>{editingFaculty ? 'Update' : 'Add'} Faculty</>
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add/Edit Staff Modal */}
      <Modal show={showStaffModal} onHide={() => {
        setShowStaffModal(false);
        setEditingStaff(null);
        setStaffFormData({ name: '', position: '', imageFile: null, imagePreview: null });
      }} centered>
        <Modal.Header closeButton style={{ backgroundColor: '#00482D', color: '#FFD326' }}>
          <Modal.Title>
            <i className="fas fa-user-plus me-2"></i>
            {editingStaff ? 'Edit Personnel' : 'Add Personnel'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                value={staffFormData.name}
                onChange={(e) => setStaffFormData({ ...staffFormData, name: e.target.value })}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter position/title"
                value={staffFormData.position}
                onChange={(e) => setStaffFormData({ ...staffFormData, position: e.target.value })}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Staff Photo</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleStaffImageChange}
              />
              <Form.Text className="text-muted">
                Supported formats: JPG, PNG, GIF, WebP (Max 5MB)
              </Form.Text>
              
              {staffFormData.imagePreview && (
                <div className="mt-2">
                  <img 
                    src={staffFormData.imagePreview} 
                    alt="Staff preview"
                    style={{ 
                      width: '100px', 
                      height: '100px', 
                      objectFit: 'cover',
                      borderRadius: '50%',
                      border: '2px solid #00482D'
                    }}
                  />
                </div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setShowStaffModal(false);
            setEditingStaff(null);
            setStaffFormData({ name: '', position: '', imageFile: null, imagePreview: null });
          }}>
            Cancel
          </Button>
          <Button 
            variant="success" 
            onClick={handleAddStaff}
            disabled={uploadingStaffImage}
            style={{ backgroundColor: '#00482D', borderColor: '#00482D' }}
          >
            {uploadingStaffImage ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Uploading...
              </>
            ) : (
              <>{editingStaff ? 'Update' : 'Add'} Personnel</>
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add/Edit Office Modal */}
      <Modal show={showOfficeModal} onHide={() => {
        setShowOfficeModal(false);
        setEditingOffice(null);
        setOfficeFormData({
          name: '',
          description: '',
          contact: '',
          email: '',
          hours: '',
          location: '',
          icon: 'bi-building'
        });
      }} centered size="lg">
        <Modal.Header closeButton style={{ backgroundColor: '#00482D', color: '#FFD326' }}>
          <Modal.Title>
            <i className="fas fa-building me-2"></i>
            {editingOffice ? 'Edit Office' : 'Add New Office'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Office Name <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter office name"
                    value={officeFormData.name}
                    onChange={(e) => setOfficeFormData({ ...officeFormData, name: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Icon</Form.Label>
                  <Form.Select
                    value={officeFormData.icon}
                    onChange={(e) => setOfficeFormData({ ...officeFormData, icon: e.target.value })}
                  >
                    {iconOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Text className="text-muted">
                    <i className={`bi ${officeFormData.icon} me-1`}></i>
                    Selected icon preview
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Enter office description"
                value={officeFormData.description}
                onChange={(e) => setOfficeFormData({ ...officeFormData, description: e.target.value })}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter contact number"
                    value={officeFormData.contact}
                    onChange={(e) => setOfficeFormData({ ...officeFormData, contact: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email address"
                    value={officeFormData.email}
                    onChange={(e) => setOfficeFormData({ ...officeFormData, email: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Office Hours</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., Monday-Friday, 8:00 AM - 5:00 PM"
                    value={officeFormData.hours}
                    onChange={(e) => setOfficeFormData({ ...officeFormData, hours: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter office location"
                    value={officeFormData.location}
                    onChange={(e) => setOfficeFormData({ ...officeFormData, location: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setShowOfficeModal(false);
            setEditingOffice(null);
            setOfficeFormData({
              name: '',
              description: '',
              contact: '',
              email: '',
              hours: '',
              location: '',
              icon: 'bi-building'
            });
          }}>
            Cancel
          </Button>
          <Button 
            variant="success" 
            onClick={handleOfficeSubmit}
            disabled={savingOffice}
            style={{ backgroundColor: '#00482D', borderColor: '#00482D' }}
          >
            {savingOffice ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Saving...
              </>
            ) : (
              <>{editingOffice ? 'Update' : 'Add'} Office</>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Admin;