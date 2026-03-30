import type { ContentInfo, ContentInsertInfo, ContentUpdateInfo, ContentAreaInfo } from '../types';
import { api } from './api';

export class ContentService {
  static listPublic(pageSlug: string, params: { websiteSlug?: string; domain?: string }): Promise<ContentInfo[]> {
    const query = new URLSearchParams();
    if (params.websiteSlug) query.set('websiteSlug', params.websiteSlug);
    if (params.domain) query.set('domain', params.domain);
    return api.getSafe<ContentInfo[]>(`/content/${pageSlug}?${query.toString()}`).then(r => r ?? []);
  }

  static listByPage(websiteId: number, pageId: number): Promise<ContentInfo[]> {
    return api.get(`/website/${websiteId}/page/${pageId}/content`);
  }

  static getById(websiteId: number, pageId: number, contentId: number): Promise<ContentInfo> {
    return api.get(`/website/${websiteId}/page/${pageId}/content/${contentId}`);
  }

  static saveArea(websiteId: number, pageId: number, data: Omit<ContentAreaInfo, 'websiteId' | 'pageId'>): Promise<ContentInfo[]> {
    return api.put(`/website/${websiteId}/page/${pageId}/content/area`, { ...data, websiteId, pageId });
  }

  static create(websiteId: number, pageId: number, data: Omit<ContentInsertInfo, 'websiteId' | 'pageId'>): Promise<ContentInfo> {
    return api.post(`/website/${websiteId}/page/${pageId}/content`, { ...data, websiteId, pageId });
  }

  static update(websiteId: number, pageId: number, contentId: number, data: Omit<ContentUpdateInfo, 'contentId'>): Promise<ContentInfo> {
    return api.put(`/website/${websiteId}/page/${pageId}/content/${contentId}`, { ...data, contentId });
  }

  static delete(websiteId: number, pageId: number, contentId: number): Promise<void> {
    return api.delete(`/website/${websiteId}/page/${pageId}/content/${contentId}`);
  }
}
