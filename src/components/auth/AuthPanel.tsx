import { useState, useEffect } from 'react';
import { useAuth, LoginForm, RegisterForm, ForgotPasswordForm, ChangePasswordForm, UserEditForm } from 'nauth-react';
import { Modal } from '../ui/Modal';

type AuthView = 'login' | 'register' | 'forgot-password' | 'profile' | 'change-password';

export function AuthPanel() {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<AuthView>('login');

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail === 'profile') setView('profile');
      else if (detail === 'change-password') setView('change-password');
      else setView(isAuthenticated ? 'profile' : 'login');
      setIsOpen(true);
    };
    window.addEventListener('open-auth-panel', handleOpen);
    return () => window.removeEventListener('open-auth-panel', handleOpen);
  }, [isAuthenticated]);

  const titles: Record<AuthView, string> = {
    login: 'Entrar',
    register: 'Criar Conta',
    'forgot-password': 'Recuperar Senha',
    profile: 'Meu Perfil',
    'change-password': 'Alterar Senha',
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={titles[view]} size="md">
      {view === 'login' && (
        <div>
          <LoginForm onSuccess={() => setIsOpen(false)} />
          <div className="mt-4 text-center space-y-2">
            <button onClick={() => setView('forgot-password')} className="text-sm text-blue-600 hover:underline">
              Esqueci minha senha
            </button>
            <div>
              <span className="text-sm text-gray-500">Nao tem conta? </span>
              <button onClick={() => setView('register')} className="text-sm text-blue-600 hover:underline">
                Criar conta
              </button>
            </div>
          </div>
        </div>
      )}

      {view === 'register' && (
        <div>
          <RegisterForm onSuccess={() => setView('login')} />
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-500">Ja tem conta? </span>
            <button onClick={() => setView('login')} className="text-sm text-blue-600 hover:underline">
              Entrar
            </button>
          </div>
        </div>
      )}

      {view === 'forgot-password' && (
        <div>
          <ForgotPasswordForm onSuccess={() => setView('login')} />
          <div className="mt-4 text-center">
            <button onClick={() => setView('login')} className="text-sm text-blue-600 hover:underline">
              Voltar para login
            </button>
          </div>
        </div>
      )}

      {view === 'profile' && (
        <UserEditForm onSuccess={() => setIsOpen(false)} />
      )}

      {view === 'change-password' && (
        <ChangePasswordForm onSuccess={() => setIsOpen(false)} />
      )}
    </Modal>
  );
}
