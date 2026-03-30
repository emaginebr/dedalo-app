import type { MenuInfo, MenuInsertInfo, MenuUpdateInfo } from '../types';
import { api } from './api';

export class MenuService {
  static listPublic(params: { websiteSlug?: string; domain?: string }): Promise<MenuInfo[]> {
    const query = new URLSearchParams();
    if (params.websiteSlug) query.set('websiteSlug', params.websiteSlug);
    if (params.domain) query.set('domain', params.domain);
    return api.getSafe<MenuInfo[]>(`/menu?${query.toString()}`).then(r => r ?? []);
  }

  static listByWebsite(websiteId: number): Promise<MenuInfo[]> {
    return api.get(`/website/${websiteId}/menu`);
  }

  static getById(websiteId: number, menuId: number): Promise<MenuInfo> {
    return api.get(`/website/${websiteId}/menu/${menuId}`);
  }

  static create(websiteId: number, data: Omit<MenuInsertInfo, 'websiteId'>): Promise<MenuInfo> {
    return api.post(`/website/${websiteId}/menu`, { ...data, websiteId });
  }

  static update(websiteId: number, menuId: number, data: Omit<MenuUpdateInfo, 'menuId'>): Promise<MenuInfo> {
    return api.put(`/website/${websiteId}/menu/${menuId}`, { ...data, menuId });
  }

  static delete(websiteId: number, menuId: number): Promise<void> {
    return api.delete(`/website/${websiteId}/menu/${menuId}`);
  }
}
