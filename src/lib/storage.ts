import { supabase } from './supabase';

export interface UploadResult {
  url: string;
  path: string;
  error?: string;
}

/**
 * Upload an image to Supabase storage
 * @param file - The file to upload
 * @param bucket - The storage bucket name (default: 'blog-images')
 * @param folder - Optional folder path within the bucket
 * @returns Promise with upload result
 */
export async function uploadImage(
  file: File,
  bucket: string = 'blog-images',
  folder?: string
): Promise<UploadResult> {
  try {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      return { url: '', path: '', error: 'File must be an image' };
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return { url: '', path: '', error: 'File size must be less than 5MB' };
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    // Upload file to Supabase storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      return { url: '', path: '', error: error.message };
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return {
      url: urlData.publicUrl,
      path: data.path,
    };
  } catch (error) {
    console.error('Upload error:', error);
    return { 
      url: '', 
      path: '', 
      error: error instanceof Error ? error.message : 'Upload failed' 
    };
  }
}

/**
 * Delete an image from Supabase storage
 * @param path - The file path in storage
 * @param bucket - The storage bucket name (default: 'blog-images')
 * @returns Promise with success status
 */
export async function deleteImage(
  path: string,
  bucket: string = 'blog-images'
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) {
      console.error('Delete error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Delete error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Delete failed' 
    };
  }
}

/**
 * Get a signed URL for private files (if needed)
 * @param path - The file path in storage
 * @param bucket - The storage bucket name
 * @param expiresIn - Expiration time in seconds (default: 3600)
 * @returns Promise with signed URL
 */
export async function getSignedUrl(
  path: string,
  bucket: string = 'blog-images',
  expiresIn: number = 3600
): Promise<{ url: string; error?: string }> {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn);

    if (error) {
      console.error('Signed URL error:', error);
      return { url: '', error: error.message };
    }

    return { url: data.signedUrl };
  } catch (error) {
    console.error('Signed URL error:', error);
    return { 
      url: '', 
      error: error instanceof Error ? error.message : 'Failed to get signed URL' 
    };
  }
}

export function getStoragePathFromPublicUrl(publicUrl: string, bucket: string = 'blog-images'): string | null {
  try {
    const url = new URL(publicUrl);
    const pattern = new RegExp(`/storage/v1/object/public/${bucket}/(.+)`);
    const match = url.pathname.match(pattern);
    return match && match[1] ? decodeURIComponent(match[1]) : null;
  } catch {
    return null;
  }
}

export async function safeDeleteImageFromUrl(publicUrl: string, bucket: string = 'blog-images'): Promise<{ success: boolean; error?: string }> {
  const path = getStoragePathFromPublicUrl(publicUrl, bucket);
  if (!path) {
    return { success: false, error: 'Invalid public URL' };
  }
  return deleteImage(path, bucket);
}