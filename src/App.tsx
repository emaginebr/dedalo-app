import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NAuthProvider } from 'nauth-react';
// @ts-ignore - CSS import from nauth-react
import 'nauth-react/styles';
import { Toaster } from 'sonner';
import { WebsiteProvider } from './contexts/WebsiteContext';
import { PageProvider } from './contexts/PageContext';
import { MenuProvider } from './contexts/MenuContext';
import { ContentProvider } from './contexts/ContentContext';
import { EditModeProvider } from './contexts/EditModeContext';
import { Header } from './components/layout/Header';
import { AuthPanel } from './components/auth/AuthPanel';
import { PageRenderer } from './components/PageRenderer';
import { CreateWebsite } from './components/CreateWebsite';
import { WebsiteLoader } from './components/WebsiteLoader';

const TENANT_ID = import.meta.env.VITE_TENANT_ID || 'default';

const nauthConfig = {
  apiUrl: import.meta.env.VITE_NAUTH_API_URL || 'https://localhost:44374',
  storageKey: 'nauth_session',
  storageType: 'localStorage' as const,
  defaultTheme: 'light' as const,
  headers: {
    'X-Tenant-Id': TENANT_ID,
  },
};

function AppContent() {
  return (
    <Routes>
      <Route path="/_/new" element={
        <>
          <CreateWebsite />
          <AuthPanel />
          <Toaster position="top-right" richColors />
        </>
      } />
      <Route path="*" element={
        <WebsiteLoader>
          <div className="min-h-screen bg-white">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<PageRenderer />} />
                <Route path="/:siteSlug" element={<PageRenderer />} />
                <Route path="/:siteSlug/:pageSlug" element={<PageRenderer />} />
                <Route path="/p/:pageSlug" element={<PageRenderer />} />
              </Routes>
            </main>
            <AuthPanel />
            <Toaster position="top-right" richColors />
          </div>
        </WebsiteLoader>
      } />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <NAuthProvider config={nauthConfig}>
        <WebsiteProvider>
          <PageProvider>
            <MenuProvider>
              <ContentProvider>
                <EditModeProvider>
                  <AppContent />
                </EditModeProvider>
              </ContentProvider>
            </MenuProvider>
          </PageProvider>
        </WebsiteProvider>
      </NAuthProvider>
    </BrowserRouter>
  );
}

export default App;
