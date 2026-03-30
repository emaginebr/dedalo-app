import { useAuth } from 'nauth-react';
import { useWebsite } from '../../hooks';
import { MenuBuilder } from './MenuBuilder';
import { UserMenu } from '../auth/UserMenu';

export function Header() {
  const { website } = useWebsite();
  const { isAuthenticated } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="/" className="flex items-center gap-2">
            {website?.logoUrl ? (
              <img src={website.logoUrl} alt={website.name} className="h-8" />
            ) : (
              <span className="text-xl font-bold text-gray-900">{website?.name || 'Dedalo'}</span>
            )}
          </a>
          <MenuBuilder />
        </div>

        <div className="flex items-center gap-3">
          {!isAuthenticated && (
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-auth-panel', { detail: 'login' }))}
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition"
            >
              Entrar
            </button>
          )}
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
