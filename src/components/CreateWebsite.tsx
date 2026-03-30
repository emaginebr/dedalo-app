import { useState } from 'react';
import { useAuth } from 'nauth-react';
import { useNavigate } from 'react-router-dom';
import { WebsiteService } from '../services';
import { DomainTypeEnum } from '../types';
import { getAllTemplates } from '../templates';

export function CreateWebsite() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const templates = getAllTemplates();

  const [name, setName] = useState('');
  const [templateSlug, setTemplateSlug] = useState(templates[0]?.slug || 'starter-blog');
  const [domainType, setDomainType] = useState<DomainTypeEnum>(DomainTypeEnum.Folder);
  const [customDomain, setCustomDomain] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-md w-full text-center">
          <p className="text-6xl mb-4">&#960;</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Criar Website</h1>
          <p className="text-gray-500 mb-6">Voce precisa estar logado para criar um website.</p>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-auth-panel', { detail: 'login' }))}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    setError('');
    try {
      const website = await WebsiteService.create({
        name,
        templateSlug,
        domainType,
        customDomain: domainType === DomainTypeEnum.CustomDomain ? customDomain : null,
      });
      navigate(`/${website.websiteSlug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar website');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Criar Website</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Website</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              placeholder="Meu Site"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Template</label>
            <select
              value={templateSlug}
              onChange={e => setTemplateSlug(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {templates.map(t => (
                <option key={t.slug} value={t.slug}>{t.name} - {t.description}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Dominio</label>
            <select
              value={domainType}
              onChange={e => setDomainType(Number(e.target.value) as DomainTypeEnum)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={DomainTypeEnum.Folder}>Pasta (ex: emagine.com.br/meu-site)</option>
              <option value={DomainTypeEnum.Subdomain}>Subdominio (ex: meu-site.emagine.com.br)</option>
              <option value={DomainTypeEnum.CustomDomain}>Dominio Proprio</option>
            </select>
          </div>

          {domainType === DomainTypeEnum.CustomDomain && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dominio Customizado</label>
              <input
                type="text"
                value={customDomain}
                onChange={e => setCustomDomain(e.target.value)}
                placeholder="www.meusite.com.br"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {saving ? 'Criando...' : 'Criar Website'}
          </button>
        </form>
      </div>
    </div>
  );
}
