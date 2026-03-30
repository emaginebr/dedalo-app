import type { LinkTypeEnum } from './website';

export interface MenuInfo {
  menuId: number;
  websiteId: number;
  parentId: number | null;
  name: string;
  linkType: LinkTypeEnum;
  externalLink: string | null;
  pageId: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface MenuInsertInfo {
  websiteId: number;
  parentId: number | null;
  name: string;
  linkType: LinkTypeEnum;
  externalLink: string | null;
  pageId: number | null;
}

export interface MenuUpdateInfo {
  menuId: number;
  parentId: number | null;
  name: string;
  linkType: LinkTypeEnum;
  externalLink: string | null;
  pageId: number | null;
}
