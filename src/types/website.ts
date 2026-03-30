export const DomainTypeEnum = {
  Subdomain: 1,
  Folder: 2,
  CustomDomain: 3,
} as const;
export type DomainTypeEnum = (typeof DomainTypeEnum)[keyof typeof DomainTypeEnum];

export const WebsiteStatusEnum = {
  Active: 1,
  Blocked: 2,
  Inactive: 3,
} as const;
export type WebsiteStatusEnum = (typeof WebsiteStatusEnum)[keyof typeof WebsiteStatusEnum];

export const LinkTypeEnum = {
  None: 1,
  External: 2,
  InternalPage: 3,
} as const;
export type LinkTypeEnum = (typeof LinkTypeEnum)[keyof typeof LinkTypeEnum];

export interface WebsiteInfo {
  websiteId: number;
  userId: number;
  websiteSlug: string;
  templateSlug: string;
  name: string;
  domainType: DomainTypeEnum;
  customDomain: string | null;
  logoUrl: string | null;
  css: string | null;
  status: WebsiteStatusEnum;
  createdAt: string;
  updatedAt: string;
}

export interface WebsiteInsertInfo {
  templateSlug: string;
  name: string;
  domainType: DomainTypeEnum;
  customDomain?: string | null;
  css?: string | null;
}

export interface WebsiteUpdateInfo {
  websiteId: number;
  websiteSlug: string;
  templateSlug: string;
  name: string;
  domainType: DomainTypeEnum;
  customDomain?: string | null;
  css?: string | null;
  status: WebsiteStatusEnum;
}
