export interface ContentInfo {
  contentId: number;
  websiteId: number;
  pageId: number;
  contentType: string;
  index: number;
  contentSlug: string;
  contentValue: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContentInsertInfo {
  websiteId: number;
  pageId: number;
  contentType: string;
  index: number;
  contentSlug: string;
  contentValue: string;
}

export interface ContentUpdateInfo {
  contentId: number;
  contentType: string;
  index: number;
  contentSlug: string;
  contentValue: string;
}

export interface ContentAreaInfo {
  websiteId: number;
  pageId: number;
  contentSlug: string;
  items: ContentAreaItemInfo[];
}

export interface ContentAreaItemInfo {
  contentId: number;
  contentType: string;
  index: number;
  contentValue: string;
}
