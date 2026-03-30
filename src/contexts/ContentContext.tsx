import { createContext, useState, useCallback, type ReactNode } from 'react';
import type { ContentInfo } from '../types';
import { ContentService } from '../services';

export interface ContentContextValue {
  contents: Record<string, ContentInfo[]>;
  isLoading: boolean;
  loadContents: (pageSlug: string, params: { websiteSlug?: string; domain?: string }) => Promise<void>;
  loadContentsByPage: (websiteId: number, pageId: number) => Promise<void>;
  saveArea: (websiteId: number, pageId: number, contentSlug: string, items: ContentInfo[]) => Promise<void>;
  setContents: (contents: Record<string, ContentInfo[]>) => void;
  addContent: (content: ContentInfo) => void;
  updateContent: (content: ContentInfo) => void;
  removeContent: (contentSlug: string, contentId: number) => void;
}

export const ContentContext = createContext<ContentContextValue>({
  contents: {},
  isLoading: false,
  loadContents: async () => {},
  loadContentsByPage: async () => {},
  saveArea: async () => {},
  setContents: () => {},
  addContent: () => {},
  updateContent: () => {},
  removeContent: () => {},
});

function groupBySlug(items: ContentInfo[]): Record<string, ContentInfo[]> {
  return items.reduce((acc, item) => {
    if (!acc[item.contentSlug]) acc[item.contentSlug] = [];
    acc[item.contentSlug].push(item);
    acc[item.contentSlug].sort((a, b) => a.index - b.index);
    return acc;
  }, {} as Record<string, ContentInfo[]>);
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [contents, setContents] = useState<Record<string, ContentInfo[]>>({});
  const [isLoading, setIsLoading] = useState(false);

  const loadContents = useCallback(async (pageSlug: string, params: { websiteSlug?: string; domain?: string }) => {
    setIsLoading(true);
    try {
      const result = await ContentService.listPublic(pageSlug, params);
      setContents(groupBySlug(result));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadContentsByPage = useCallback(async (websiteId: number, pageId: number) => {
    setIsLoading(true);
    try {
      const result = await ContentService.listByPage(websiteId, pageId);
      setContents(groupBySlug(result));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveArea = useCallback(async (websiteId: number, pageId: number, contentSlug: string, items: ContentInfo[]) => {
    const areaItems = items.map((item, idx) => ({
      contentId: item.contentId,
      contentType: item.contentType,
      index: idx,
      contentValue: item.contentValue,
    }));
    const result = await ContentService.saveArea(websiteId, pageId, { contentSlug, items: areaItems });
    setContents(prev => ({ ...prev, [contentSlug]: result.sort((a, b) => a.index - b.index) }));
  }, []);

  const addContent = useCallback((content: ContentInfo) => {
    setContents(prev => {
      const slug = content.contentSlug;
      const existing = prev[slug] || [];
      return { ...prev, [slug]: [...existing, content].sort((a, b) => a.index - b.index) };
    });
  }, []);

  const updateContent = useCallback((content: ContentInfo) => {
    setContents(prev => {
      const slug = content.contentSlug;
      const existing = prev[slug] || [];
      return { ...prev, [slug]: existing.map(c => c.contentId === content.contentId ? content : c) };
    });
  }, []);

  const removeContent = useCallback((contentSlug: string, contentId: number) => {
    setContents(prev => {
      const existing = prev[contentSlug] || [];
      return { ...prev, [contentSlug]: existing.filter(c => c.contentId !== contentId) };
    });
  }, []);

  return (
    <ContentContext.Provider value={{ contents, isLoading, loadContents, loadContentsByPage, saveArea, setContents, addContent, updateContent, removeContent }}>
      {children}
    </ContentContext.Provider>
  );
}
