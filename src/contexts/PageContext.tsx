import { createContext, useState, useCallback, type ReactNode } from 'react';
import type { PageInfo, PagePublicInfo } from '../types';
import { PageService } from '../services';

export interface PageContextValue {
  pages: PageInfo[];
  currentPage: PagePublicInfo | null;
  isLoading: boolean;
  loadPages: (params: { websiteSlug?: string; domain?: string }) => Promise<void>;
  loadPageBySlug: (pageSlug: string, params: { websiteSlug?: string; domain?: string }) => Promise<void>;
  loadPagesByWebsite: (websiteId: number) => Promise<void>;
  setCurrentPage: (page: PagePublicInfo | null) => void;
  addPage: (page: PageInfo) => void;
  updatePageInList: (page: PageInfo) => void;
  removePageFromList: (pageId: number) => void;
}

export const PageContext = createContext<PageContextValue>({
  pages: [],
  currentPage: null,
  isLoading: false,
  loadPages: async () => {},
  loadPageBySlug: async () => {},
  loadPagesByWebsite: async () => {},
  setCurrentPage: () => {},
  addPage: () => {},
  updatePageInList: () => {},
  removePageFromList: () => {},
});

export function PageProvider({ children }: { children: ReactNode }) {
  const [pages, setPages] = useState<PageInfo[]>([]);
  const [currentPage, setCurrentPage] = useState<PagePublicInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadPages = useCallback(async (params: { websiteSlug?: string; domain?: string }) => {
    setIsLoading(true);
    try {
      const result = await PageService.listPublic(params);
      setPages(result);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadPageBySlug = useCallback(async (pageSlug: string, params: { websiteSlug?: string; domain?: string }) => {
    setIsLoading(true);
    try {
      const result = await PageService.getBySlug(pageSlug, params);
      setCurrentPage(result ?? null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadPagesByWebsite = useCallback(async (websiteId: number) => {
    setIsLoading(true);
    try {
      const result = await PageService.listByWebsite(websiteId);
      setPages(result);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addPage = useCallback((page: PageInfo) => {
    setPages(prev => [...prev, page]);
  }, []);

  const updatePageInList = useCallback((page: PageInfo) => {
    setPages(prev => prev.map(p => p.pageId === page.pageId ? page : p));
  }, []);

  const removePageFromList = useCallback((pageId: number) => {
    setPages(prev => prev.filter(p => p.pageId !== pageId));
  }, []);

  return (
    <PageContext.Provider value={{ pages, currentPage, isLoading, loadPages, loadPageBySlug, loadPagesByWebsite, setCurrentPage, addPage, updatePageInList, removePageFromList }}>
      {children}
    </PageContext.Provider>
  );
}
