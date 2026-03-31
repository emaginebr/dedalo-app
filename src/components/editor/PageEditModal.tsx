import { useState, useEffect } from 'react';
import type { PagePublicInfo } from '../../types';
import { PageService } from '../../services';
import { usePage } from '../../hooks';
import { getTemplate } from '../../templates';
import { Modal } from '../ui/Modal';

interface PageEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  page: PagePublicInfo;
  websiteId: number;
  templateSlug: string;
}

export function PageEditModal({ isOpen, onClose, page, websiteId, templateSlug }: PageEditModalProps) {
  const { updatePageInList, setCurrentPage } = usePage();
  const [name, setName] = useState('');
  const [pageSlug, setPageSlug] = useState('');
  const [templatePageSlug, setTemplatePageSlug] = useState('');
  const [saving, setSaving] = useState(false);

  const template = getTemplate(templateSlug);
  const templatePages = template?.pages || [];

  useEffect(() => {
    if (isOpen && page) {
      setName(page.name);
      setPageSlug(page.pageSlug);
      setTemplatePageSlug(page.templatePageSlug || 'main-page');
    }
  }, [isOpen, page]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await PageService.update(websiteId, page.pageId, {
        pageSlug,
        templatePageSlug,
        name,
      });
      updatePageInList(updated);
      setCurrentPage({ ...page, name: updated.name, pageSlug: updated.pageSlug, templatePageSlug: updated.templatePageSlug });
      onClose();
    } catch (err) {
      console.error('Erro ao atualizar pagina:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar Pagina">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug da Pagina</label>
          <input
            type="text"
            value={pageSlug}
            onChange={e => setPageSlug(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">Identificador na URL (ex: sobre, contato)</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Template da Pagina</label>
          <select
            value={templatePageSlug}
            onChange={e => setTemplatePageSlug(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {templatePages.map(tp => (
              <option key={tp.slug} value={tp.slug}>{tp.label}</option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">Define o layout e as areas de conteudo da pagina</p>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-800">
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
