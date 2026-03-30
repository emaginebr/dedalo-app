import { useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWebsite, useMenu, usePage } from '../hooks';

interface WebsiteLoaderProps {
  children: ReactNode;
}

function WebsiteNotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="text-8xl font-bold text-gray-200 mb-4">404</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Site nao encontrado</h1>
          <p className="text-gray-500">Verifique a URL e tente novamente.</p>
        </div>
      </div>
      <div className="p-4 flex justify-end">
        <button
          onClick={() => navigate('/_/new')}
          className="text-gray-300 hover:text-gray-500 transition-colors text-2xl leading-none select-none"
          style={{ cursor: 'default' }}
          title=""
        >
          &#960;
        </button>
      </div>
    </div>
  );
}

export function WebsiteLoader({ children }: WebsiteLoaderProps) {
  const { website, isLoading, error, queryParams } = useWebsite();
  const { loadMenus } = useMenu();
  const { loadPages } = usePage();

  useEffect(() => {
    if (!website) return;
    loadMenus(queryParams);
    loadPages(queryParams);
  }, [website, queryParams, loadMenus, loadPages]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-500">Carregando site...</p>
        </div>
      </div>
    );
  }

  if (error || !website) {
    return <WebsiteNotFound />;
  }

  return <>{children}</>;
}
