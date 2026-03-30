import { useState } from 'react';
import type { MenuInfo } from '../../types';
import { useEditMode, useMenu, useWebsite } from '../../hooks';
import { MenuService } from '../../services';
import { MenuItemModal } from './MenuItemModal';
import { Navigation } from './Navigation';

export function MenuBuilder() {
  const { isEditMode } = useEditMode();
  const { menus, addMenu, updateMenuInList, removeMenuFromList } = useMenu();
  const { website } = useWebsite();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState<MenuInfo | null>(null);
  const [parentId, setParentId] = useState<number | null>(null);

  if (!website) return null;

  if (!isEditMode) {
    return <Navigation menus={menus} websiteSlug={website.websiteSlug} />;
  }

  const rootMenus = menus.filter(m => m.parentId === null);
  const getChildren = (pid: number) => menus.filter(m => m.parentId === pid);

  const openAddModal = (pid: number | null) => {
    setEditingMenu(null);
    setParentId(pid);
    setModalOpen(true);
  };

  const openEditModal = (menu: MenuInfo) => {
    setEditingMenu(menu);
    setParentId(menu.parentId);
    setModalOpen(true);
  };

  const handleDelete = async (menu: MenuInfo) => {
    if (!confirm(`Excluir menu "${menu.name}"?`)) return;
    await MenuService.delete(website.websiteId, menu.menuId);
    removeMenuFromList(menu.menuId);
  };

  const handleSave = (menu: MenuInfo) => {
    if (editingMenu) {
      updateMenuInList(menu);
    } else {
      addMenu(menu);
    }
    setModalOpen(false);
  };

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {rootMenus.map(menu => {
        const children = getChildren(menu.menuId);
        return (
          <div key={menu.menuId} className="relative group">
            <div className="flex items-center gap-1 border border-dashed border-gray-300 rounded-lg px-2 py-1">
              <button
                onClick={() => openEditModal(menu)}
                className="text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                {menu.name}
              </button>
              <button
                onClick={() => handleDelete(menu)}
                className="text-red-400 hover:text-red-600 text-xs"
              >
                x
              </button>
            </div>
            {(children.length > 0 || isEditMode) && (
              <div className="absolute left-0 mt-1 w-52 bg-white rounded-lg shadow-lg border border-gray-200 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                {children.map(child => (
                  <div key={child.menuId} className="flex items-center justify-between px-3 py-1.5 hover:bg-gray-50">
                    <button
                      onClick={() => openEditModal(child)}
                      className="text-sm text-gray-700 hover:text-blue-600"
                    >
                      {child.name}
                    </button>
                    <button
                      onClick={() => handleDelete(child)}
                      className="text-red-400 hover:text-red-600 text-xs"
                    >
                      x
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => openAddModal(menu.menuId)}
                  className="w-full text-left px-3 py-1.5 text-sm text-blue-500 hover:bg-blue-50 border-t border-gray-100"
                >
                  + Novo Subitem
                </button>
              </div>
            )}
          </div>
        );
      })}
      <button
        onClick={() => openAddModal(null)}
        className="px-3 py-1.5 text-sm text-blue-500 border border-dashed border-blue-300 rounded-lg hover:bg-blue-50 transition"
      >
        + Novo Item
      </button>

      <MenuItemModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        websiteId={website.websiteId}
        parentId={parentId}
        editingMenu={editingMenu}
        onSave={handleSave}
      />
    </div>
  );
}
