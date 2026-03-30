import type { ImageUploadResponse } from '../types';
import { api } from './api';

export class ImageService {
  static upload(file: File): Promise<ImageUploadResponse> {
    return api.upload('/image/upload', file);
  }

  static uploadLogo(websiteId: number, file: File): Promise<ImageUploadResponse> {
    return api.upload(`/image/upload/logo/${websiteId}`, file);
  }
}
