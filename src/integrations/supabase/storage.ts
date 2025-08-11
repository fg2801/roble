import { supabase } from './client';

const BUCKET = 'reportes';

export async function uploadFile(file: File) {
  const filePath = `${Date.now()}_${file.name}`;
  const { data, error } = await supabase.storage.from(BUCKET).upload(filePath, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw error;
  return data;
}

export async function listFiles() {
  const { data, error } = await supabase.storage.from(BUCKET).list('', { limit: 100, offset: 0 });
  if (error) throw error;
  return data;
}

export function getPublicUrl(path: string) {
  const { publicUrl } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return publicUrl;
}

export async function deleteFile(path: string) {
  const { data, error } = await supabase.storage.from(BUCKET).remove([path]);
  if (error) throw error;
  return data;
}
