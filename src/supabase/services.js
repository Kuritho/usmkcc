// src/supabase/services.js
import { supabase } from './supabaseClient';

// Simple check - tries to access the bucket directly
const checkBucketExists = async (bucketName) => {
  try {
    console.log(`🔍 Checking if bucket "${bucketName}" exists...`);
    
    const { data, error } = await supabase.storage
      .from(bucketName)
      .list('', { limit: 1 });
    
    if (!error) {
      console.log(`✅ Bucket "${bucketName}" exists and is accessible.`);
      return { exists: true, data };
    }
    
    if (error.message && 
        (error.message.includes('not found') || 
         error.message.includes('Bucket not found') ||
         error.statusCode === 404)) {
      console.log(`❌ Bucket "${bucketName}" not found.`);
      return { exists: false, error: 'Bucket not found' };
    }
    
    console.log(`⚠️ Bucket "${bucketName}" error:`, error);
    return { exists: true, error: error.message };
  } catch (error) {
    console.error('Error checking bucket:', error);
    return { exists: false, error: error.message };
  }
};

// ==================== NEWS SERVICES ====================

export const createNews = async (newsData, imageFile) => {
  try {
    let imageUrl = null;
    
    if (imageFile) {
      const bucketCheck = await checkBucketExists('news-images');
      if (!bucketCheck.exists) {
        throw new Error(`Bucket "news-images" not found. Please create it in Supabase Dashboard.`);
      }
      
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('news-images')
        .upload(fileName, imageFile, {
          cacheControl: '3600',
          upsert: false,
          contentType: imageFile.type || 'image/jpeg'
        });
      
      if (uploadError) {
        console.error('❌ Upload error:', uploadError);
        if (uploadError.message.includes('row-level security')) {
          throw new Error('Storage policy error: Please add INSERT policy for news-images in Supabase Dashboard → Storage → Policies');
        }
        throw new Error(`Upload failed: ${uploadError.message}`);
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from('news-images')
        .getPublicUrl(fileName);
      
      imageUrl = publicUrl;
    }
    
    const { data, error } = await supabase
      .from('news')
      .insert([
        {
          title: newsData.title,
          category: newsData.category,
          content: newsData.content,
          summary: newsData.summary,
          sdg_tags: newsData.sdgTags || [],
          image_url: imageUrl,
          date: newsData.date || new Date().toISOString().split('T')[0],
          type: 'news'
        }
      ])
      .select();
    
    if (error) {
      console.error('❌ Database insert error:', error);
      throw new Error(`Database error: ${error.message}`);
    }
    
    return { success: true, data: data[0] };
  } catch (error) {
    console.error('❌ Error creating news:', error);
    return { success: false, error: error.message || 'Failed to create news' };
  }
};

// ==================== EVENT SERVICES ====================

export const createEvent = async (eventData, imageFile) => {
  try {
    let imageUrl = null;
    
    if (imageFile) {
      const bucketCheck = await checkBucketExists('event-images');
      if (!bucketCheck.exists) {
        throw new Error(`Bucket "event-images" not found. Please create it in Supabase Dashboard.`);
      }
      
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('event-images')
        .upload(fileName, imageFile, {
          cacheControl: '3600',
          upsert: false,
          contentType: imageFile.type || 'image/jpeg'
        });
      
      if (uploadError) {
        console.error('❌ Upload error:', uploadError);
        if (uploadError.message.includes('row-level security')) {
          throw new Error('Storage policy error: Please add INSERT policy for event-images in Supabase Dashboard → Storage → Policies');
        }
        throw new Error(`Upload failed: ${uploadError.message}`);
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from('event-images')
        .getPublicUrl(fileName);
      
      imageUrl = publicUrl;
    }
    
    const { data, error } = await supabase
      .from('events')
      .insert([
        {
          title: eventData.title,
          date: eventData.date,
          time: eventData.time,
          location: eventData.location,
          description: eventData.description,
          sdg_tags: eventData.sdgTags || [],
          image_url: imageUrl,
          type: 'event'
        }
      ])
      .select();
    
    if (error) {
      console.error('❌ Database insert error:', error);
      throw new Error(`Database error: ${error.message}`);
    }
    
    return { success: true, data: data[0] };
  } catch (error) {
    console.error('❌ Error creating event:', error);
    return { success: false, error: error.message || 'Failed to create event' };
  }
};

// ==================== ANNOUNCEMENT SERVICES ====================

export const createAnnouncement = async (announcementData, imageFile) => {
  try {
    let imageUrl = null;
    let imagePath = null;
    
    if (imageFile) {
      const bucketCheck = await checkBucketExists('announcement-images');
      if (!bucketCheck.exists) {
        try {
          const { data: newBucket, error: createError } = await supabase.storage
            .createBucket('announcement-images', {
              public: true,
              fileSizeLimit: 5242880,
            });
          
          if (createError) {
            console.warn('Could not create announcement-images bucket:', createError);
            throw new Error(`Bucket "announcement-images" not found and could not be created.`);
          }
          console.log('✅ Created announcement-images bucket');
        } catch (bucketError) {
          throw new Error(`Bucket "announcement-images" not found. Please create it in Supabase Dashboard.`);
        }
      }
      
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `announcement-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('announcement-images')
        .upload(fileName, imageFile, {
          cacheControl: '3600',
          upsert: false,
          contentType: imageFile.type || 'image/jpeg'
        });
      
      if (uploadError) {
        console.error('❌ Upload error:', uploadError);
        if (uploadError.message.includes('row-level security')) {
          throw new Error('Storage policy error: Please add INSERT policy for announcement-images in Supabase Dashboard → Storage → Policies');
        }
        throw new Error(`Upload failed: ${uploadError.message}`);
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from('announcement-images')
        .getPublicUrl(fileName);
      
      imageUrl = publicUrl;
      imagePath = fileName;
    }
    
    const { data, error } = await supabase
      .from('announcements')
      .insert([
        {
          title: announcementData.title,
          priority: announcementData.priority || 'normal',
          content: announcementData.content,
          date: announcementData.date || new Date().toISOString().split('T')[0],
          image_url: imageUrl,
          image_path: imagePath,
          type: 'announcement'
        }
      ])
      .select();
    
    if (error) {
      console.error('❌ Database insert error:', error);
      throw new Error(`Database error: ${error.message}`);
    }
    
    return { success: true, data: data[0] };
  } catch (error) {
    console.error('❌ Error creating announcement:', error);
    return { success: false, error: error.message || 'Failed to create announcement' };
  }
};

// ==================== GET SERVICES ====================

export const getNews = async () => {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching news:', error);
    return { success: false, error: error.message, data: [] };
  }
};

export const getNewsById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching news by ID:', error);
    return { success: false, error: error.message };
  }
};

export const getEvents = async () => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching events:', error);
    return { success: false, error: error.message, data: [] };
  }
};

export const getEventById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching event:', error);
    return { success: false, error: error.message };
  }
};

export const getAnnouncements = async () => {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    const processedData = data.map(item => ({
      ...item,
      image_url: item.image_url || null
    }));
    
    return { success: true, data: processedData };
  } catch (error) {
    console.error('Error fetching announcements:', error);
    return { success: false, error: error.message, data: [] };
  }
};

export const getAnnouncementById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching announcement:', error);
    return { success: false, error: error.message };
  }
};

// ==================== DELETE SERVICES ====================

export const deleteNews = async (id) => {
  try {
    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting news:', error);
    return { success: false, error: error.message };
  }
};

export const deleteEvent = async (id) => {
  try {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting event:', error);
    return { success: false, error: error.message };
  }
};

export const deleteAnnouncement = async (id) => {
  try {
    const { data: announcement, error: fetchError } = await supabase
      .from('announcements')
      .select('image_path')
      .eq('id', id)
      .single();
    
    if (fetchError) {
      console.warn('Could not fetch announcement for image cleanup:', fetchError);
    } else if (announcement && announcement.image_path) {
      const { error: storageError } = await supabase.storage
        .from('announcement-images')
        .remove([announcement.image_path]);
      
      if (storageError) {
        console.warn('Could not delete image from storage:', storageError);
      }
    }
    
    const { error } = await supabase
      .from('announcements')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting announcement:', error);
    return { success: false, error: error.message };
  }
};

// ==================== UPDATE SERVICES ====================

export const updateNews = async (id, newsData, imageFile) => {
  try {
    let imageUrl = newsData.image_url;
    
    if (imageFile) {
      const bucketCheck = await checkBucketExists('news-images');
      if (!bucketCheck.exists) {
        throw new Error(`Bucket "news-images" not found.`);
      }
      
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('news-images')
        .upload(fileName, imageFile, {
          cacheControl: '3600',
          upsert: false,
          contentType: imageFile.type || 'image/jpeg'
        });
      
      if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);
      
      const { data: { publicUrl } } = supabase.storage
        .from('news-images')
        .getPublicUrl(fileName);
      
      imageUrl = publicUrl;
    }
    
    const { data, error } = await supabase
      .from('news')
      .update({
        title: newsData.title,
        category: newsData.category,
        content: newsData.content,
        summary: newsData.summary,
        sdg_tags: newsData.sdgTags || [],
        image_url: imageUrl,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return { success: true, data: data[0] };
  } catch (error) {
    console.error('Error updating news:', error);
    return { success: false, error: error.message || 'Failed to update news' };
  }
};

export const updateEvent = async (id, eventData, imageFile) => {
  try {
    let imageUrl = eventData.image_url;
    
    if (imageFile) {
      const bucketCheck = await checkBucketExists('event-images');
      if (!bucketCheck.exists) {
        throw new Error(`Bucket "event-images" not found.`);
      }
      
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('event-images')
        .upload(fileName, imageFile, {
          cacheControl: '3600',
          upsert: false,
          contentType: imageFile.type || 'image/jpeg'
        });
      
      if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);
      
      const { data: { publicUrl } } = supabase.storage
        .from('event-images')
        .getPublicUrl(fileName);
      
      imageUrl = publicUrl;
    }
    
    const { data, error } = await supabase
      .from('events')
      .update({
        title: eventData.title,
        date: eventData.date,
        time: eventData.time,
        location: eventData.location,
        description: eventData.description,
        sdg_tags: eventData.sdgTags || [],
        image_url: imageUrl,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return { success: true, data: data[0] };
  } catch (error) {
    console.error('Error updating event:', error);
    return { success: false, error: error.message || 'Failed to update event' };
  }
};

export const updateAnnouncement = async (id, announcementData, imageFile) => {
  try {
    let imageUrl = announcementData.image_url;
    let imagePath = announcementData.image_path;
    
    if (imageFile) {
      const bucketCheck = await checkBucketExists('announcement-images');
      if (!bucketCheck.exists) {
        throw new Error(`Bucket "announcement-images" not found.`);
      }
      
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `announcement-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('announcement-images')
        .upload(fileName, imageFile, {
          cacheControl: '3600',
          upsert: false,
          contentType: imageFile.type || 'image/jpeg'
        });
      
      if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);
      
      const { data: { publicUrl } } = supabase.storage
        .from('announcement-images')
        .getPublicUrl(fileName);
      
      imageUrl = publicUrl;
      imagePath = fileName;
    }
    
    const { data, error } = await supabase
      .from('announcements')
      .update({
        title: announcementData.title,
        priority: announcementData.priority,
        content: announcementData.content,
        image_url: imageUrl,
        image_path: imagePath,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return { success: true, data: data[0] };
  } catch (error) {
    console.error('Error updating announcement:', error);
    return { success: false, error: error.message || 'Failed to update announcement' };
  }
};

// ==================== GALLERY SERVICES ====================

export const getGalleryImages = async () => {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return { success: false, error: error.message, data: [] };
  }
};

export const uploadGalleryImage = async (imageFile, title, description) => {
  try {
    let imageUrl = null;
    let imagePath = null;
    
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `gallery-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('gallery-images')
        .upload(fileName, imageFile, {
          cacheControl: '3600',
          upsert: false,
          contentType: imageFile.type || 'image/jpeg'
        });
      
      if (uploadError) {
        console.error('Upload error:', uploadError);
        if (uploadError.message && 
            (uploadError.message.includes('not found') || 
             uploadError.message.includes('Bucket not found') ||
             uploadError.statusCode === 404)) {
          throw new Error('Gallery bucket "gallery-images" not found. Please create it in Supabase Dashboard → Storage → Buckets.');
        }
        if (uploadError.message.includes('row-level security')) {
          throw new Error('Storage policy error: Please add INSERT policy for gallery-images in Supabase Dashboard → Storage → Policies');
        }
        throw new Error(`Upload failed: ${uploadError.message}`);
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from('gallery-images')
        .getPublicUrl(fileName);
      
      imageUrl = publicUrl;
      imagePath = fileName;
    }
    
    const { data, error } = await supabase
      .from('gallery')
      .insert([
        {
          title: title || '',
          description: description || '',
          image_url: imageUrl,
          image_path: imagePath,
          display_order: 0
        }
      ])
      .select();
    
    if (error) {
      console.error('Database insert error:', error);
      throw new Error(`Database error: ${error.message}`);
    }
    
    return { success: true, data: data[0] };
  } catch (error) {
    console.error('Error uploading gallery image:', error);
    return { success: false, error: error.message || 'Failed to upload gallery image' };
  }
};

export const deleteGalleryImage = async (id, imagePath) => {
  try {
    if (imagePath) {
      const { error: storageError } = await supabase.storage
        .from('gallery-images')
        .remove([imagePath]);
      
      if (storageError) {
        console.error('Storage delete error:', storageError);
      }
    }
    
    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    return { success: false, error: error.message };
  }
};

export const updateGalleryImage = async (id, updates) => {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .update({
        title: updates.title,
        description: updates.description,
        display_order: updates.display_order,
        is_active: updates.is_active,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return { success: true, data: data[0] };
  } catch (error) {
    console.error('Error updating gallery image:', error);
    return { success: false, error: error.message };
  }
};

// ==================== OFFICE SERVICES ====================

export const getOffices = async () => {
  try {
    const { data, error } = await supabase
      .from('offices')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching offices:', error);
    return { success: false, error: error.message, data: [] };
  }
};

export const getOfficeById = async (id) => {
  try {
    const { data: office, error: officeError } = await supabase
      .from('offices')
      .select('*')
      .eq('id', id)
      .single();
    
    if (officeError) throw officeError;
    
    const { data: staff, error: staffError } = await supabase
      .from('office_staff')
      .select('*')
      .eq('office_id', id)
      .eq('is_active', true)
      .order('display_order', { ascending: true });
    
    if (staffError) throw staffError;
    
    const { data: services, error: servicesError } = await supabase
      .from('office_services')
      .select('*')
      .eq('office_id', id)
      .order('display_order', { ascending: true });
    
    if (servicesError) throw servicesError;
    
    const { data: requirements, error: requirementsError } = await supabase
      .from('office_requirements')
      .select('*')
      .eq('office_id', id)
      .order('display_order', { ascending: true });
    
    if (requirementsError) throw requirementsError;
    
    return {
      success: true,
      data: {
        ...office,
        staff: staff || [],
        services: services.map(s => s.service_name),
        requirements: requirements.map(r => r.requirement_name)
      }
    };
  } catch (error) {
    console.error('Error fetching office:', error);
    return { success: false, error: error.message };
  }
};

export const uploadStaffImage = async (imageFile) => {
  try {
    if (!imageFile) return { success: false, error: 'No image file provided' };
    
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `staff-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('staff-images')
      .upload(fileName, imageFile, {
        cacheControl: '3600',
        upsert: false,
        contentType: imageFile.type || 'image/jpeg'
      });
    
    if (uploadError) {
      console.error('Upload error:', uploadError);
      if (uploadError.message && 
          (uploadError.message.includes('not found') || 
           uploadError.message.includes('Bucket not found') ||
           uploadError.statusCode === 404)) {
        throw new Error('Staff images bucket "staff-images" not found. Please create it in Supabase Dashboard → Storage → Buckets.');
      }
      if (uploadError.message.includes('row-level security')) {
        throw new Error('Storage policy error: Please add INSERT policy for staff-images in Supabase Dashboard → Storage → Policies');
      }
      throw new Error(`Upload failed: ${uploadError.message}`);
    }
    
    const { data: { publicUrl } } = supabase.storage
      .from('staff-images')
      .getPublicUrl(fileName);
    
    return { success: true, data: { url: publicUrl, path: fileName } };
  } catch (error) {
    console.error('Error uploading staff image:', error);
    return { success: false, error: error.message };
  }
};

export const deleteStaffImage = async (imagePath) => {
  try {
    if (!imagePath) return { success: true };
    
    const { error } = await supabase.storage
      .from('staff-images')
      .remove([imagePath]);
    
    if (error) {
      console.error('Storage delete error:', error);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (error) {
    console.error('Error deleting staff image:', error);
    return { success: false, error: error.message };
  }
};

export const addOfficeStaff = async (officeId, staffData, imageFile) => {
  try {
    let imageUrl = null;
    let imagePath = null;
    
    if (imageFile) {
      const uploadResult = await uploadStaffImage(imageFile);
      if (uploadResult.success) {
        imageUrl = uploadResult.data.url;
        imagePath = uploadResult.data.path;
      } else {
        throw new Error(`Image upload failed: ${uploadResult.error}`);
      }
    }
    
    const staffObj = {
      office_id: officeId,
      name: staffData.name,
      position: staffData.position,
      image_url: imageUrl,
      display_order: staffData.display_order || 0
    };
    
    if (imagePath) {
      staffObj.image_path = imagePath;
    }
    
    const { data, error } = await supabase
      .from('office_staff')
      .insert([staffObj])
      .select();
    
    if (error) throw error;
    return { success: true, data: data[0] };
  } catch (error) {
    console.error('Error adding staff:', error);
    return { success: false, error: error.message };
  }
};

export const removeOfficeStaff = async (staffId, imagePath) => {
  try {
    if (imagePath) {
      await deleteStaffImage(imagePath);
    }
    
    const { error } = await supabase
      .from('office_staff')
      .delete()
      .eq('id', staffId);
    
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error removing staff:', error);
    return { success: false, error: error.message };
  }
};

export const updateOfficeStaff = async (staffId, staffData) => {
  try {
    const { data, error } = await supabase
      .from('office_staff')
      .update({
        name: staffData.name,
        position: staffData.position,
        image_url: staffData.image_url,
        display_order: staffData.display_order,
        is_active: staffData.is_active,
        updated_at: new Date().toISOString()
      })
      .eq('id', staffId)
      .select();
    
    if (error) throw error;
    return { success: true, data: data[0] };
  } catch (error) {
    console.error('Error updating staff:', error);
    return { success: false, error: error.message };
  }
};

export const addOfficeService = async (officeId, serviceName) => {
  try {
    const { data, error } = await supabase
      .from('office_services')
      .insert([
        {
          office_id: officeId,
          service_name: serviceName
        }
      ])
      .select();
    
    if (error) throw error;
    return { success: true, data: data[0] };
  } catch (error) {
    console.error('Error adding service:', error);
    return { success: false, error: error.message };
  }
};

export const removeOfficeService = async (serviceId) => {
  try {
    const { error } = await supabase
      .from('office_services')
      .delete()
      .eq('id', serviceId);
    
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error removing service:', error);
    return { success: false, error: error.message };
  }
};

export const addOfficeRequirement = async (officeId, requirementName) => {
  try {
    const { data, error } = await supabase
      .from('office_requirements')
      .insert([
        {
          office_id: officeId,
          requirement_name: requirementName
        }
      ])
      .select();
    
    if (error) throw error;
    return { success: true, data: data[0] };
  } catch (error) {
    console.error('Error adding requirement:', error);
    return { success: false, error: error.message };
  }
};

export const removeOfficeRequirement = async (requirementId) => {
  try {
    const { error } = await supabase
      .from('office_requirements')
      .delete()
      .eq('id', requirementId);
    
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error removing requirement:', error);
    return { success: false, error: error.message };
  }
};

// ==================== OFFICE CRUD FUNCTIONS ====================

export const addOffice = async (officeData) => {
  try {
    const { data, error } = await supabase
      .from('offices')
      .insert([
        {
          name: officeData.name,
          description: officeData.description || '',
          contact: officeData.contact || '',
          email: officeData.email || '',
          hours: officeData.hours || '',
          location: officeData.location || '',
          icon: officeData.icon || 'bi-building',
          display_order: 0
        }
      ])
      .select();
    
    if (error) throw error;
    return { success: true, data: data[0] };
  } catch (error) {
    console.error('Error adding office:', error);
    return { success: false, error: error.message };
  }
};

export const updateOffice = async (id, officeData) => {
  try {
    const { data, error } = await supabase
      .from('offices')
      .update({
        name: officeData.name,
        description: officeData.description || '',
        contact: officeData.contact || '',
        email: officeData.email || '',
        hours: officeData.hours || '',
        location: officeData.location || '',
        icon: officeData.icon || 'bi-building',
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return { success: true, data: data[0] };
  } catch (error) {
    console.error('Error updating office:', error);
    return { success: false, error: error.message };
  }
};

export const deleteOffice = async (id) => {
  try {
    const { error: staffError } = await supabase
      .from('office_staff')
      .delete()
      .eq('office_id', id);
    
    if (staffError) throw staffError;
    
    const { error } = await supabase
      .from('offices')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting office:', error);
    return { success: false, error: error.message };
  }
};

// ==================== KEY OFFICIALS SERVICES ====================

export const getKeyOfficials = async () => {
  try {
    const { data, error } = await supabase
      .from('key_officials')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching key officials:', error);
    return { success: false, error: error.message, data: [] };
  }
};

export const getKeyOfficialsByCategory = async (category) => {
  try {
    const { data, error } = await supabase
      .from('key_officials')
      .select('*')
      .eq('category', category)
      .order('level', { ascending: true })
      .order('display_order', { ascending: true });
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching key officials by category:', error);
    return { success: false, error: error.message, data: [] };
  }
};

export const getKeyOfficialById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('key_officials')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching key official:', error);
    return { success: false, error: error.message };
  }
};

export const createKeyOfficial = async (officialData, imageFile) => {
  try {
    let imageUrl = null;
    let imagePath = null;
    
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `official-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('staff-images')
        .upload(fileName, imageFile, {
          cacheControl: '3600',
          upsert: false,
          contentType: imageFile.type || 'image/jpeg'
        });
      
      if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);
      
      const { data: { publicUrl } } = supabase.storage
        .from('staff-images')
        .getPublicUrl(fileName);
      
      imageUrl = publicUrl;
      imagePath = fileName;
    }
    
    const { data, error } = await supabase
      .from('key_officials')
      .insert([{
        name: officialData.name,
        position: officialData.position,
        email: officialData.email || '',
        phone: officialData.phone || '',
        bio: officialData.bio || '',
        image_url: imageUrl,
        image_path: imagePath,
        level: officialData.level || 0,
        category: officialData.category || 'administration',
        display_order: officialData.display_order || 0,
        is_active: officialData.is_active !== undefined ? officialData.is_active : true
      }])
      .select();
    
    if (error) throw error;
    return { success: true, data: data[0] };
  } catch (error) {
    console.error('Error creating key official:', error);
    return { success: false, error: error.message };
  }
};

export const updateKeyOfficial = async (id, officialData, imageFile) => {
  try {
    let imageUrl = officialData.image_url;
    let imagePath = officialData.image_path;
    
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `official-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('staff-images')
        .upload(fileName, imageFile, {
          cacheControl: '3600',
          upsert: false,
          contentType: imageFile.type || 'image/jpeg'
        });
      
      if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);
      
      const { data: { publicUrl } } = supabase.storage
        .from('staff-images')
        .getPublicUrl(fileName);
      
      imageUrl = publicUrl;
      imagePath = fileName;
    }
    
    const { data, error } = await supabase
      .from('key_officials')
      .update({
        name: officialData.name,
        position: officialData.position,
        email: officialData.email || '',
        phone: officialData.phone || '',
        bio: officialData.bio || '',
        image_url: imageUrl,
        image_path: imagePath,
        level: officialData.level || 0,
        category: officialData.category || 'administration',
        display_order: officialData.display_order || 0,
        is_active: officialData.is_active !== undefined ? officialData.is_active : true,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return { success: true, data: data[0] };
  } catch (error) {
    console.error('Error updating key official:', error);
    return { success: false, error: error.message };
  }
};

export const deleteKeyOfficial = async (id, imagePath) => {
  try {
    if (imagePath) {
      const { error: storageError } = await supabase.storage
        .from('staff-images')
        .remove([imagePath]);
      
      if (storageError) {
        console.warn('Could not delete image from storage:', storageError);
      }
    }
    
    const { error } = await supabase
      .from('key_officials')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting key official:', error);
    return { success: false, error: error.message };
  }
};

export const reorderKeyOfficials = async (orderedIds) => {
  try {
    const updates = orderedIds.map((id, index) => ({
      id,
      display_order: index
    }));
    
    const { error } = await supabase
      .from('key_officials')
      .upsert(updates);
    
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error reordering key officials:', error);
    return { success: false, error: error.message };
  }
};

// ==================== FACULTY SERVICES ====================

export const getFaculty = async () => {
  try {
    const { data, error } = await supabase
      .from('faculty')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching faculty:', error);
    return { success: false, error: error.message, data: [] };
  }
};

export const getFacultyByCollege = async (college) => {
  try {
    const { data, error } = await supabase
      .from('faculty')
      .select('*')
      .eq('college', college)
      .eq('is_active', true)
      .order('display_order', { ascending: true });
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching faculty by college:', error);
    return { success: false, error: error.message, data: [] };
  }
};

export const getFacultyByProgram = async (program) => {
  try {
    const { data, error } = await supabase
      .from('faculty')
      .select('*')
      .eq('program', program)
      .eq('is_active', true)
      .order('display_order', { ascending: true });
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching faculty by program:', error);
    return { success: false, error: error.message, data: [] };
  }
};

export const getFacultyById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('faculty')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching faculty:', error);
    return { success: false, error: error.message };
  }
};

export const createFaculty = async (facultyData, imageFile) => {
  try {
    let imageUrl = null;
    let imagePath = null;
    
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `faculty-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('staff-images')
        .upload(fileName, imageFile, {
          cacheControl: '3600',
          upsert: false,
          contentType: imageFile.type || 'image/jpeg'
        });
      
      if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);
      
      const { data: { publicUrl } } = supabase.storage
        .from('staff-images')
        .getPublicUrl(fileName);
      
      imageUrl = publicUrl;
      imagePath = fileName;
    }
    
    const { data, error } = await supabase
      .from('faculty')
      .insert([{
        name: facultyData.name,
        designation: facultyData.designation || '',
        image_url: imageUrl,
        image_path: imagePath,
        program: facultyData.program,
        college: facultyData.college,
        designations: facultyData.designations || [],
        display_order: facultyData.display_order || 0,
        is_active: facultyData.is_active !== undefined ? facultyData.is_active : true,
        is_allied: facultyData.is_allied || false,
        is_program_head: facultyData.is_program_head || false,
        is_dean: facultyData.is_dean || false,
        is_department_head: facultyData.is_department_head || false
      }])
      .select();
    
    if (error) throw error;
    return { success: true, data: data[0] };
  } catch (error) {
    console.error('Error creating faculty:', error);
    return { success: false, error: error.message };
  }
};

export const updateFaculty = async (id, facultyData, imageFile) => {
  try {
    let imageUrl = facultyData.image_url;
    let imagePath = facultyData.image_path;
    
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `faculty-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('staff-images')
        .upload(fileName, imageFile, {
          cacheControl: '3600',
          upsert: false,
          contentType: imageFile.type || 'image/jpeg'
        });
      
      if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);
      
      const { data: { publicUrl } } = supabase.storage
        .from('staff-images')
        .getPublicUrl(fileName);
      
      imageUrl = publicUrl;
      imagePath = fileName;
    }
    
    const { data, error } = await supabase
      .from('faculty')
      .update({
        name: facultyData.name,
        designation: facultyData.designation || '',
        image_url: imageUrl,
        image_path: imagePath,
        program: facultyData.program,
        college: facultyData.college,
        designations: facultyData.designations || [],
        display_order: facultyData.display_order || 0,
        is_active: facultyData.is_active !== undefined ? facultyData.is_active : true,
        is_allied: facultyData.is_allied || false,
        is_program_head: facultyData.is_program_head || false,
        is_dean: facultyData.is_dean || false,
        is_department_head: facultyData.is_department_head || false,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return { success: true, data: data[0] };
  } catch (error) {
    console.error('Error updating faculty:', error);
    return { success: false, error: error.message };
  }
};

export const deleteFaculty = async (id, imagePath) => {
  try {
    if (imagePath) {
      const { error: storageError } = await supabase.storage
        .from('staff-images')
        .remove([imagePath]);
      
      if (storageError) {
        console.warn('Could not delete image from storage:', storageError);
      }
    }
    
    const { error } = await supabase
      .from('faculty')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting faculty:', error);
    return { success: false, error: error.message };
  }
};

export const getDeansByCollege = async (college) => {
  try {
    const { data, error } = await supabase
      .from('faculty')
      .select('*')
      .eq('college', college)
      .eq('is_dean', true)
      .eq('is_active', true)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return { success: true, data: data || null };
  } catch (error) {
    console.error('Error fetching dean:', error);
    return { success: false, error: error.message, data: null };
  }
};

export const getProgramHeads = async (college) => {
  try {
    const { data, error } = await supabase
      .from('faculty')
      .select('*')
      .eq('college', college)
      .eq('is_program_head', true)
      .eq('is_active', true)
      .order('display_order', { ascending: true });
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching program heads:', error);
    return { success: false, error: error.message, data: [] };
  }
};

export const getDepartmentHeads = async (college) => {
  try {
    const { data, error } = await supabase
      .from('faculty')
      .select('*')
      .eq('college', college)
      .eq('is_department_head', true)
      .eq('is_active', true)
      .order('display_order', { ascending: true });
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching department heads:', error);
    return { success: false, error: error.message, data: [] };
  }
};

// ==================== MULTIPLE IMAGE SERVICES ====================

export const uploadArticleImages = async (files, articleId, folder = 'news-images') => {
  try {
    const uploadedUrls = [];
    const uploadedPaths = [];
    
    const bucketCheck = await checkBucketExists(folder);
    if (!bucketCheck.exists) {
      throw new Error(`Bucket "${folder}" not found. Please create it in Supabase Dashboard.`);
    }
    
    for (const file of files) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${articleId}/${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from(folder)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type || 'image/jpeg'
        });
      
      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        continue;
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from(folder)
        .getPublicUrl(fileName);
      
      uploadedUrls.push(publicUrl);
      uploadedPaths.push(fileName);
    }
    
    return { success: true, urls: uploadedUrls, paths: uploadedPaths };
  } catch (error) {
    console.error('Error uploading images:', error);
    return { success: false, error: error.message };
  }
};

export const createNewsWithImages = async (newsData, imageFiles = []) => {
  try {
    const { data: news, error: newsError } = await supabase
      .from('news')
      .insert([{
        title: newsData.title,
        category: newsData.category,
        content: newsData.content,
        summary: newsData.summary,
        sdg_tags: newsData.sdgTags || [],
        date: newsData.date || new Date().toISOString().split('T')[0],
        type: 'news'
      }])
      .select()
      .single();
    
    if (newsError) throw newsError;
    
    let imageUrls = [];
    if (imageFiles && imageFiles.length > 0) {
      const uploadResult = await uploadArticleImages(imageFiles, news.id, 'news-images');
      if (uploadResult.success) {
        imageUrls = uploadResult.urls;
      }
    }
    
    if (imageUrls.length > 0) {
      const { error: updateError } = await supabase
        .from('news')
        .update({ 
          image_url: imageUrls[0],
          images: imageUrls
        })
        .eq('id', news.id);
      
      if (updateError) throw updateError;
    }
    
    return { success: true, data: { ...news, images: imageUrls } };
  } catch (error) {
    console.error('Error creating news with images:', error);
    return { success: false, error: error.message };
  }
};

export const createAnnouncementWithImages = async (announcementData, imageFiles = []) => {
  try {
    const { data: announcement, error: announcementError } = await supabase
      .from('announcements')
      .insert([{
        title: announcementData.title,
        priority: announcementData.priority || 'normal',
        content: announcementData.content,
        date: announcementData.date || new Date().toISOString().split('T')[0],
        type: 'announcement'
      }])
      .select()
      .single();
    
    if (announcementError) throw announcementError;
    
    let imageUrls = [];
    if (imageFiles && imageFiles.length > 0) {
      const uploadResult = await uploadArticleImages(imageFiles, announcement.id, 'announcement-images');
      if (uploadResult.success) {
        imageUrls = uploadResult.urls;
      }
    }
    
    if (imageUrls.length > 0) {
      const { error: updateError } = await supabase
        .from('announcements')
        .update({ 
          image_url: imageUrls[0],
          images: imageUrls
        })
        .eq('id', announcement.id);
      
      if (updateError) throw updateError;
    }
    
    return { success: true, data: { ...announcement, images: imageUrls } };
  } catch (error) {
    console.error('Error creating announcement with images:', error);
    return { success: false, error: error.message };
  }
};

export const createEventWithImages = async (eventData, imageFiles = []) => {
  try {
    const { data: event, error: eventError } = await supabase
      .from('events')
      .insert([{
        title: eventData.title,
        date: eventData.date,
        time: eventData.time,
        location: eventData.location,
        description: eventData.description,
        sdg_tags: eventData.sdgTags || [],
        type: 'event'
      }])
      .select()
      .single();
    
    if (eventError) throw eventError;
    
    let imageUrls = [];
    if (imageFiles && imageFiles.length > 0) {
      const uploadResult = await uploadArticleImages(imageFiles, event.id, 'event-images');
      if (uploadResult.success) {
        imageUrls = uploadResult.urls;
      }
    }
    
    if (imageUrls.length > 0) {
      const { error: updateError } = await supabase
        .from('events')
        .update({ 
          image_url: imageUrls[0],
          images: imageUrls
        })
        .eq('id', event.id);
      
      if (updateError) throw updateError;
    }
    
    return { success: true, data: { ...event, images: imageUrls } };
  } catch (error) {
    console.error('Error creating event with images:', error);
    return { success: false, error: error.message };
  }
};

export const getArticleImages = async (articleId, table) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .select('images')
      .eq('id', articleId)
      .single();
    
    if (error) throw error;
    return { success: true, images: data?.images || [] };
  } catch (error) {
    console.error('Error getting images:', error);
    return { success: false, error: error.message };
  }
};

export const updateNewsWithImages = async (newsId, newsData, imageFiles = []) => {
  try {
    const { error: updateError } = await supabase
      .from('news')
      .update({
        title: newsData.title,
        category: newsData.category,
        content: newsData.content,
        summary: newsData.summary,
        sdg_tags: newsData.sdgTags || [],
        updated_at: new Date().toISOString()
      })
      .eq('id', newsId);
    
    if (updateError) throw updateError;
    
    let imageUrls = [];
    if (imageFiles && imageFiles.length > 0) {
      const uploadResult = await uploadArticleImages(imageFiles, newsId, 'news-images');
      if (uploadResult.success) {
        imageUrls = uploadResult.urls;
      }
    }
    
    const { data: existingData, error: fetchError } = await supabase
      .from('news')
      .select('images')
      .eq('id', newsId)
      .single();
    
    if (fetchError) throw fetchError;
    
    const allImages = [...(existingData?.images || []), ...imageUrls];
    
    const { error: finalUpdateError } = await supabase
      .from('news')
      .update({
        image_url: allImages[0] || null,
        images: allImages
      })
      .eq('id', newsId);
    
    if (finalUpdateError) throw finalUpdateError;
    
    return { success: true };
  } catch (error) {
    console.error('Error updating news with images:', error);
    return { success: false, error: error.message };
  }
};

export const updateAnnouncementWithImages = async (announcementId, announcementData, imageFiles = []) => {
  try {
    const { error: updateError } = await supabase
      .from('announcements')
      .update({
        title: announcementData.title,
        priority: announcementData.priority || 'normal',
        content: announcementData.content,
        updated_at: new Date().toISOString()
      })
      .eq('id', announcementId);
    
    if (updateError) throw updateError;
    
    let imageUrls = [];
    if (imageFiles && imageFiles.length > 0) {
      const uploadResult = await uploadArticleImages(imageFiles, announcementId, 'announcement-images');
      if (uploadResult.success) {
        imageUrls = uploadResult.urls;
      }
    }
    
    const { data: existingData, error: fetchError } = await supabase
      .from('announcements')
      .select('images')
      .eq('id', announcementId)
      .single();
    
    if (fetchError) throw fetchError;
    
    const allImages = [...(existingData?.images || []), ...imageUrls];
    
    const { error: finalUpdateError } = await supabase
      .from('announcements')
      .update({
        image_url: allImages[0] || null,
        images: allImages
      })
      .eq('id', announcementId);
    
    if (finalUpdateError) throw finalUpdateError;
    
    return { success: true };
  } catch (error) {
    console.error('Error updating announcement with images:', error);
    return { success: false, error: error.message };
  }
};

export const updateEventWithImages = async (eventId, eventData, imageFiles = []) => {
  try {
    const { error: updateError } = await supabase
      .from('events')
      .update({
        title: eventData.title,
        date: eventData.date,
        time: eventData.time,
        location: eventData.location,
        description: eventData.description,
        sdg_tags: eventData.sdgTags || [],
        updated_at: new Date().toISOString()
      })
      .eq('id', eventId);
    
    if (updateError) throw updateError;
    
    let imageUrls = [];
    if (imageFiles && imageFiles.length > 0) {
      const uploadResult = await uploadArticleImages(imageFiles, eventId, 'event-images');
      if (uploadResult.success) {
        imageUrls = uploadResult.urls;
      }
    }
    
    const { data: existingData, error: fetchError } = await supabase
      .from('events')
      .select('images')
      .eq('id', eventId)
      .single();
    
    if (fetchError) throw fetchError;
    
    const allImages = [...(existingData?.images || []), ...imageUrls];
    
    const { error: finalUpdateError } = await supabase
      .from('events')
      .update({
        image_url: allImages[0] || null,
        images: allImages
      })
      .eq('id', eventId);
    
    if (finalUpdateError) throw finalUpdateError;
    
    return { success: true };
  } catch (error) {
    console.error('Error updating event with images:', error);
    return { success: false, error: error.message };
  }
};

export const removeArticleImage = async (articleId, table, imageUrl) => {
  try {
    const { data: existingData, error: fetchError } = await supabase
      .from(table)
      .select('images')
      .eq('id', articleId)
      .single();
    
    if (fetchError) throw fetchError;
    
    const images = existingData?.images || [];
    const updatedImages = images.filter(img => img !== imageUrl);
    
    const { error: updateError } = await supabase
      .from(table)
      .update({
        image_url: updatedImages[0] || null,
        images: updatedImages
      })
      .eq('id', articleId);
    
    if (updateError) throw updateError;
    
    return { success: true };
  } catch (error) {
    console.error('Error removing image:', error);
    return { success: false, error: error.message };
  }
};

// ==================== TEMPLATE SERVICES ====================

// Get all templates
export const getTemplates = async () => {
  try {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching templates:', error);
    return { success: false, error: error.message, data: [] };
  }
};

// Get templates by category
export const getTemplatesByCategory = async (category) => {
  try {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('category', category)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching templates by category:', error);
    return { success: false, error: error.message, data: [] };
  }
};

// Get templates by type
export const getTemplatesByType = async (type) => {
  try {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('type', type)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching templates by type:', error);
    return { success: false, error: error.message, data: [] };
  }
};

// Create a template
export const createTemplate = async (templateData, file) => {
  try {
    let fileUrl = '';

    // Upload file if provided
    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `template-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `templates/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('templates')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type || 'application/octet-stream'
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        if (uploadError.message && 
            (uploadError.message.includes('not found') || 
             uploadError.message.includes('Bucket not found') ||
             uploadError.statusCode === 404)) {
          throw new Error('Templates bucket not found. Please create it in Supabase Dashboard → Storage → Buckets.');
        }
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('templates')
        .getPublicUrl(filePath);

      fileUrl = urlData.publicUrl;
    }

    const { data, error } = await supabase
      .from('templates')
      .insert([{
        name: templateData.name,
        description: templateData.description || '',
        category: templateData.category,
        type: templateData.type || 'undergraduate',
        file_url: fileUrl,
        is_active: templateData.is_active !== undefined ? templateData.is_active : true
      }])
      .select();

    if (error) throw error;
    return { success: true, data: data[0] };
  } catch (error) {
    console.error('Error creating template:', error);
    return { success: false, error: error.message };
  }
};

// Update a template
export const updateTemplate = async (id, templateData, file) => {
  try {
    let fileUrl = templateData.file_url || '';

    // Upload new file if provided
    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `template-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `templates/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('templates')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type || 'application/octet-stream'
        });

      if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

      const { data: urlData } = supabase.storage
        .from('templates')
        .getPublicUrl(filePath);

      fileUrl = urlData.publicUrl;
    }

    const { data, error } = await supabase
      .from('templates')
      .update({
        name: templateData.name,
        description: templateData.description || '',
        category: templateData.category,
        type: templateData.type || 'undergraduate',
        file_url: fileUrl,
        is_active: templateData.is_active !== undefined ? templateData.is_active : true,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select();

    if (error) throw error;
    return { success: true, data: data[0] };
  } catch (error) {
    console.error('Error updating template:', error);
    return { success: false, error: error.message };
  }
};

// Delete a template
export const deleteTemplate = async (id) => {
  try {
    // Get the template first to get file URL
    const { data: template, error: fetchError } = await supabase
      .from('templates')
      .select('file_url')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;

    // Delete file from storage if exists
    if (template.file_url) {
      try {
        // Extract file path from URL
        const urlParts = template.file_url.split('/');
        const fileName = urlParts[urlParts.length - 1];
        const filePath = `templates/${fileName}`;
        
        const { error: storageError } = await supabase.storage
          .from('templates')
          .remove([filePath]);
        
        if (storageError) {
          console.warn('Could not delete file from storage:', storageError);
        }
      } catch (storageError) {
        console.warn('Error deleting file from storage:', storageError);
      }
    }

    const { error } = await supabase
      .from('templates')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting template:', error);
    return { success: false, error: error.message };
  }
};

// Get template by ID
export const getTemplateById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching template:', error);
    return { success: false, error: error.message };
  }
};

// ==================== UTILITY FUNCTIONS ====================

export const checkBuckets = async () => {
  try {
    const bucketsToCheck = ['news-images', 'event-images', 'gallery-images', 'staff-images', 'announcement-images', 'templates'];
    const results = {};
    
    for (const bucketName of bucketsToCheck) {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .list('', { limit: 1 });
      
      const exists = !error || 
                    (!error.message.includes('not found') && 
                     !error.message.includes('Bucket not found') &&
                     error.statusCode !== 404);
      
      results[bucketName] = exists;
    }
    
    return {
      success: true,
      newsImagesExists: results['news-images'] || false,
      eventImagesExists: results['event-images'] || false,
      galleryImagesExists: results['gallery-images'] || false,
      staffImagesExists: results['staff-images'] || false,
      announcementImagesExists: results['announcement-images'] || false,
      templatesExists: results['templates'] || false,
      allExist: results['news-images'] && results['event-images'] && results['gallery-images'] && results['staff-images'] && results['announcement-images'] && results['templates']
    };
  } catch (error) {
    console.error('Error checking buckets:', error);
    return { success: false, error: error.message };
  }
};

export const getAllContent = async () => {
  try {
    const [newsResult, eventsResult, announcementsResult, galleryResult, officesResult, officialsResult, facultyResult, templatesResult] = await Promise.all([
      getNews(),
      getEvents(),
      getAnnouncements(),
      getGalleryImages(),
      getOffices(),
      getKeyOfficials(),
      getFaculty(),
      getTemplates()
    ]);
    
    return {
      success: true,
      news: newsResult.success ? newsResult.data : [],
      events: eventsResult.success ? eventsResult.data : [],
      announcements: announcementsResult.success ? announcementsResult.data : [],
      gallery: galleryResult.success ? galleryResult.data : [],
      offices: officesResult.success ? officesResult.data : [],
      officials: officialsResult.success ? officialsResult.data : [],
      faculty: facultyResult.success ? facultyResult.data : [],
      templates: templatesResult.success ? templatesResult.data : [],
      counts: {
        news: newsResult.success ? newsResult.data.length : 0,
        events: eventsResult.success ? eventsResult.data.length : 0,
        announcements: announcementsResult.success ? announcementsResult.data.length : 0,
        gallery: galleryResult.success ? galleryResult.data.length : 0,
        offices: officesResult.success ? officesResult.data.length : 0,
        officials: officialsResult.success ? officialsResult.data.length : 0,
        faculty: facultyResult.success ? facultyResult.data.length : 0,
        templates: templatesResult.success ? templatesResult.data.length : 0
      }
    };
  } catch (error) {
    console.error('Error fetching all content:', error);
    return {
      success: false,
      error: error.message,
      news: [],
      events: [],
      announcements: [],
      gallery: [],
      offices: [],
      officials: [],
      faculty: [],
      templates: [],
      counts: { 
        news: 0, 
        events: 0, 
        announcements: 0, 
        gallery: 0, 
        offices: 0, 
        officials: 0, 
        faculty: 0,
        templates: 0
      }
    };
  }
};