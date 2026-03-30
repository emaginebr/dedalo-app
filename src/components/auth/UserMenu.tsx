import { useState, useRef, useEffect } from 'react';
import { useAuth } from 'nauth-react';
import { useWebsite } from '../../hooks';
import { EditModeToggle } from '../editor/EditModeToggle';

export function UserMenu() {
  const { user, isAuthenticated, logout } = useAuth();
  const { website } = useWebsite();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isOwner = isAuthenticated && user && website && user.userId === website.userId;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  if (!isAuthenticated || !user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <div className="flex items-center gap-3">
        {isOwner && <EditModeToggle />}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium overflow-hidden">
            {user.imageUrl ? (
              <img src={user.imageUrl} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              user.name?.charAt(0)?.toUpperCase() || 'U'
            )}
          </div>
          <span className="text-sm font-medium text-gray-700 hidden md:inline">{user.name}</span>
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
          <button
            onClick={() => { setIsOpen(false); window.dispatchEvent(new CustomEvent('open-auth-panel', { detail: 'profile' })); }}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Meu Perfil
          </button>
          <button
            onClick={() => { setIsOpen(false); window.dispatchEvent(new CustomEvent('open-auth-panel', { detail: 'change-password' })); }}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Alterar Senha
          </button>
          <hr className="my-1" />
          <button
            onClick={() => { setIsOpen(false); logout(); }}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
}
