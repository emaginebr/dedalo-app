import type { WebsiteInfo, WebsiteInsertInfo, WebsiteUpdateInfo } from '../types';
import { api } from './api';

export class WebsiteService {
  static list(): Promise<WebsiteInfo[]> {
    return api.get('/website');
  }

  static getById(websiteId: number): Promise<WebsiteInfo> {
    return api.get(`/website/${websiteId}`);
  }

  static getBySlug(slug: string): Promise<WebsiteInfo | null> {
    return api.getSafe(`/website/slug/${slug}`);
  }

  static getByDomain(domain: string): Promise<WebsiteInfo | null> {
    return api.getSafe(`/website/domain/${domain}`);
  }

  static create(data: WebsiteInsertInfo): Promise<WebsiteInfo> {
    return api.post('/website', data);
  }

  static update(websiteId: number, data: Omit<WebsiteUpdateInfo, 'websiteId'>): Promise<WebsiteInfo> {
    return api.put(`/website/${websiteId}`, { ...data, websiteId });
  }
}
