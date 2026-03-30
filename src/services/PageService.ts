import type { PageInfo, PageInsertInfo, PageUpdateInfo, PagePublicInfo } from '../types';
import { api } from './api';

export class PageService {
  static listPublic(params: { websiteSlug?: string; domain?: string }): Promise<PageInfo[]> {
    const query = new URLSearchParams();
    if (params.websiteSlug) query.set('websiteSlug', params.websiteSlug);
    if (params.domain) query.set('domain', params.domain);
    return api.getSafe<PageInfo[]>(`/page?${query.toString()}`).then(r => r ?? []);
  }

  static getBySlug(pageSlug: string, params: { websiteSlug?: string; domain?: string }): Promise<PagePublicInfo | null> {
    const query = new URLSearchParams();
    if (params.websiteSlug) query.set('websiteSlug', params.websiteSlug);
    if (params.domain) query.set('domain', params.domain);
    return api.getSafe(`/page/${pageSlug}?${query.toString()}`);
  }

  static listByWebsite(websiteId: number): Promise<PageInfo[]> {
    return api.get(`/website/${websiteId}/page`);
  }

  static getById(websiteId: number, pageId: number): Promise<PageInfo> {
    return api.get(`/website/${websiteId}/page/${pageId}`);
  }

  static create(websiteId: number, data: Omit<PageInsertInfo, 'websiteId'>): Promise<PageInfo> {
    return api.post(`/website/${websiteId}/page`, { ...data, websiteId });
  }

  static update(websiteId: number, pageId: number, data: Omit<PageUpdateInfo, 'pageId'>): Promise<PageInfo> {
    return api.put(`/website/${websiteId}/page/${pageId}`, { ...data, pageId });
  }

  static delete(websiteId: number, pageId: number): Promise<void> {
    return api.delete(`/website/${websiteId}/page/${pageId}`);
  }
}
