// src/utils/setupStorage.js
import { supabaseAdmin } from '../supabase/supabaseClient';

export const setupStoragePolicies = async () => {
  try {
    console.log('Setting up storage policies...');

    // 1. Create buckets if they don't exist
    const buckets = ['news-images', 'event-images'];
    
    for (const bucketName of buckets) {
      console.log(`Checking bucket: ${bucketName}`);
      
      // Check if bucket exists
      const { data: existingBuckets, error: listError } = await supabaseAdmin
        .storage
        .listBuckets();
      
      if (listError) {
        console.error('Error listing buckets:', listError);
        continue;
      }
      
      const bucketExists = existingBuckets.some(b => b.name === bucketName);
      
      if (!bucketExists) {
        console.log(`Creating bucket: ${bucketName}`);
        const { error: createError } = await supabaseAdmin
          .storage
          .createBucket(bucketName, {
            public: true,
            fileSizeLimit: 5242880,
          });
        
        if (createError) {
          console.error(`Error creating bucket ${bucketName}:`, createError);
          continue;
        }
        console.log(`Bucket ${bucketName} created successfully!`);
      } else {
        console.log(`Bucket ${bucketName} already exists`);
      }
    }

    // 2. Add policies using SQL (this requires service role)
    console.log('Adding policies to storage.objects...');
    
    const sqlQueries = [
      // Enable RLS
      `ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;`,
      
      // Drop existing policies
      `DROP POLICY IF EXISTS "Allow public read for news-images" ON storage.objects;`,
      `DROP POLICY IF EXISTS "Allow uploads for news-images" ON storage.objects;`,
      `DROP POLICY IF EXISTS "Allow public read for event-images" ON storage.objects;`,
      `DROP POLICY IF EXISTS "Allow uploads for event-images" ON storage.objects;`,
      
      // Add policies for news-images
      `CREATE POLICY "Allow public read for news-images" ON storage.objects FOR SELECT USING (bucket_id = 'news-images');`,
      `CREATE POLICY "Allow uploads for news-images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'news-images');`,
      
      // Add policies for event-images
      `CREATE POLICY "Allow public read for event-images" ON storage.objects FOR SELECT USING (bucket_id = 'event-images');`,
      `CREATE POLICY "Allow uploads for event-images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'event-images');`,
    ];

    // Execute each SQL query using the service role
    for (const sql of sqlQueries) {
      console.log('Executing:', sql);
      const { data, error } = await supabaseAdmin.rpc('exec_sql', { query: sql });
      
      if (error) {
        console.error('Error executing SQL:', error);
        console.log('Query was:', sql);
      } else {
        console.log('Success:', sql);
      }
    }

    console.log('Storage setup completed!');
    return { success: true };
    
  } catch (error) {
    console.error('Error setting up storage:', error);
    return { success: false, error: error.message };
  }
};