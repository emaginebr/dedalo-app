import { createContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { WebsiteInfo } from '../types';
import { WebsiteService } from '../services';

interface WebsiteQueryParams {
  websiteSlug?: string;
  domain?: string;
}

export interface WebsiteContextValue {
  website: WebsiteInfo | null;
  isLoading: boolean;
  error: string | null;
  queryParams: WebsiteQueryParams;
  resolveWebsite: () => Promise<void>;
  setWebsite: (website: WebsiteInfo) => void;
}

export const WebsiteContext = createContext<WebsiteContextValue>({
  website: null,
  isLoading: true,
  error: null,
  queryParams: {},
  resolveWebsite: async () => {},
  setWebsite: () => {},
});

const BASE_DOMAIN = import.meta.env.VITE_BASE_DOMAIN || 'emagine.com.br';

function getSubdomain(hostname: string): string | null {
  if (!hostname.endsWith(`.${BASE_DOMAIN}`)) return null;
  const subdomain = hostname.replace(`.${BASE_DOMAIN}`, '');
  if (!subdomain || subdomain === 'www') return null;
  return subdomain;
}

function getSlugFromPath(): string | null {
  const segments = window.location.pathname.split('/').filter(Boolean);
  return segments.length > 0 ? segments[0] : null;
}

export function WebsiteProvider({ children }: { children: ReactNode }) {
  const [website, setWebsite] = useState<WebsiteInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [queryParams, setQueryParams] = useState<WebsiteQueryParams>({});

  const resolveWebsite = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const hostname = window.location.hostname;
      let ws: WebsiteInfo | null = null;

      // 1. Tentar por dominio customizado
      ws = await WebsiteService.getByDomain(hostname);
      if (ws) {
        setQueryParams({ domain: hostname });
        setWebsite(ws);
        setIsLoading(false);
        return;
      }

      // 2. Tentar por subdominio (ex: meu-site.emagine.com.br)
      const subdomain = getSubdomain(hostname);
      if (subdomain) {
        ws = await WebsiteService.getBySlug(subdomain);
        if (ws) {
          setQueryParams({ websiteSlug: subdomain });
          setWebsite(ws);
          setIsLoading(false);
          return;
        }
      }

      // 3. Tentar pela pasta (ex: /meu-site)
      const slug = getSlugFromPath();
      if (slug) {
        ws = await WebsiteService.getBySlug(slug);
        if (ws) {
          setQueryParams({ websiteSlug: slug });
          setWebsite(ws);
          setIsLoading(false);
          return;
        }
      }

      setError('Nenhum site encontrado para esta URL');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resolve website');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    resolveWebsite();
  }, [resolveWebsite]);

  return (
    <WebsiteContext.Provider value={{ website, isLoading, error, queryParams, resolveWebsite, setWebsite }}>
      {children}
    </WebsiteContext.Provider>
  );
}
