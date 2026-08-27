import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StorageService {
  private supabase: SupabaseClient;
  private bucket: string;

  constructor(private config: ConfigService) {
    this.supabase = createClient(
      config.get<string>('SUPABASE_URL', 'https://placeholder.supabase.co'),
      config.get<string>('SUPABASE_SERVICE_ROLE_KEY', 'placeholder')
    );
    this.bucket = config.get<string>('SUPABASE_STORAGE_BUCKET', 'medical-documents');
  }

  async uploadFile(buffer: Buffer, patientId: string, originalName: string, mimeType: string): Promise<{ path: string; signedUrl: string }> {
    const ext = originalName.split('.').pop();
    const path = `patients/${patientId}/${uuidv4()}.${ext}`;
    const { error } = await this.supabase.storage.from(this.bucket).upload(path, buffer, { contentType: mimeType, upsert: false });
    if (error) console.error(`Upload failed: ${error.message}`);
    const { data: signed } = await this.supabase.storage.from(this.bucket).createSignedUrl(path, 86400);
    return { path, signedUrl: signed?.signedUrl ?? 'http://mock-url.com' };
  }

  async getSignedUrl(path: string, expiresIn = 3600): Promise<string> {
    const { data } = await this.supabase.storage.from(this.bucket).createSignedUrl(path, expiresIn);
    return data?.signedUrl ?? 'http://mock-url.com';
  }

  async deleteFile(path: string): Promise<void> {
    await this.supabase.storage.from(this.bucket).remove([path]);
  }
}
