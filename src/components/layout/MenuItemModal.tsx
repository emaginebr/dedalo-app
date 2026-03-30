import { useState, useEffect } from 'react';
import type { MenuInfo } from '../../types';
import { LinkTypeEnum } from '../../types';
import { MenuService, PageService } from '../../services';
import { usePage } from '../../hooks';
import { Modal } from '../ui/Modal';

interface MenuItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  websiteId: number;
  parentId: number | null;
  editingMenu: MenuInfo | null;
  onSave: (menu: MenuInfo) => void;
}

export function MenuItemModal({ isOpen, onClose, websiteId, parentId, editingMenu, onSave }: MenuItemModalProps) {
  const { pages, addPage } = usePage();
  const [name, setName] = useState('');
  const [linkType, setLinkType] = useState<LinkTypeEnum>(LinkTypeEnum.InternalPage);
  const [externalLink, setExternalLink] = useState('');
  const [pageId, setPageId] = useState<number | null>(null);
  const [createNewPage, setCreateNewPage] = useState(false);
  const [newPageName, setNewPageName] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editingMenu) {
      setName(editingMenu.name);
      setLinkType(editingMenu.linkType);
      setExternalLink(editingMenu.externalLink || '');
      setPageId(editingMenu.pageId);
      setCreateNewPage(false);
    } else {
      setName('');
      setLinkType(LinkTypeEnum.InternalPage);
      setExternalLink('');
      setPageId(null);
      setCreateNewPage(false);
      setNewPageName('');
      setNewPageSlug('');
    }
  }, [editingMenu, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let finalPageId = pageId;

      if (linkType === LinkTypeEnum.InternalPage && createNewPage && newPageName) {
        const slug = newPageSlug || newPageName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        const newPage = await PageService.create(websiteId, {
          pageSlug: slug,
          templatePageSlug: 'home',
          name: newPageName,
        });
        finalPageId = newPage.pageId;
        addPage(newPage);
      }

      const menuData = {
        parentId,
        name,
        linkType,
        externalLink: linkType === LinkTypeEnum.External ? externalLink : null,
        pageId: linkType === LinkTypeEnum.InternalPage ? finalPageId : null,
      };

      let result: MenuInfo;
      if (editingMenu) {
        result = await MenuService.update(websiteId, editingMenu.menuId, menuData);
      } else {
        result = await MenuService.create(websiteId, menuData);
      }

      onSave(result);
    } catch (err) {
      console.error('Error saving menu:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editingMenu ? 'Editar Item de Menu' : 'Novo Item de Menu'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Link</label>
          <select value={linkType} onChange={e => setLinkType(Number(e.target.value) as LinkTypeEnum)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value={LinkTypeEnum.None}>Nenhum</option>
            <option value={LinkTypeEnum.External}>Link Externo</option>
            <option value={LinkTypeEnum.InternalPage}>Pagina Interna</option>
          </select>
        </div>

        {linkType === LinkTypeEnum.External && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL Externa</label>
            <input type="url" value={externalLink} onChange={e => setExternalLink(e.target.value)} placeholder="https://..." className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
        )}

        {linkType === LinkTypeEnum.InternalPage && (
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" checked={!createNewPage} onChange={() => setCreateNewPage(false)} />
                <span className="text-sm">Pagina existente</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" checked={createNewPage} onChange={() => setCreateNewPage(true)} />
                <span className="text-sm">Criar nova pagina</span>
              </label>
            </div>

            {!createNewPage ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Selecionar Pagina</label>
                <select value={pageId || ''} onChange={e => setPageId(Number(e.target.value) || null)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Selecione...</option>
                  {pages.map(p => (
                    <option key={p.pageId} value={p.pageId}>{p.name}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="space-y-3 pl-4 border-l-2 border-blue-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Pagina</label>
                  <input type="text" value={newPageName} onChange={e => { setNewPageName(e.target.value); setNewPageSlug(e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')); }} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                  <input type="text" value={newPageSlug} onChange={e => setNewPageSlug(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4 border-t">
          <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancelar</button>
          <button type="submit" disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
            {saving ? 'Salvando...' : editingMenu ? 'Atualizar' : 'Criar'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
