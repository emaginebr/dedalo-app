import type { ContentInfo } from './content';

export interface PageInfo {
  pageId: number;
  websiteId: number;
  pageSlug: string;
  templatePageSlug: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface PageInsertInfo {
  websiteId: number;
  templatePageSlug: string;
  name: string;
}

export interface PageUpdateInfo {
  pageId: number;
  pageSlug: string;
  templatePageSlug: string;
  name: string;
}

export interface PagePublicInfo {
  pageId: number;
  websiteId: number;
  pageSlug: string;
  templatePageSlug: string;
  name: string;
  contents: Record<string, ContentInfo[]>;
  createdAt: string;
  updatedAt: string;
}
