import { createContext, useState, useCallback, type ReactNode } from 'react';
import type { MenuInfo } from '../types';
import { MenuService } from '../services';

export interface MenuContextValue {
  menus: MenuInfo[];
  isLoading: boolean;
  loadMenus: (params: { websiteSlug?: string; domain?: string }) => Promise<void>;
  loadMenusByWebsite: (websiteId: number) => Promise<void>;
  addMenu: (menu: MenuInfo) => void;
  updateMenuInList: (menu: MenuInfo) => void;
  removeMenuFromList: (menuId: number) => void;
}

export const MenuContext = createContext<MenuContextValue>({
  menus: [],
  isLoading: false,
  loadMenus: async () => {},
  loadMenusByWebsite: async () => {},
  addMenu: () => {},
  updateMenuInList: () => {},
  removeMenuFromList: () => {},
});

export function MenuProvider({ children }: { children: ReactNode }) {
  const [menus, setMenus] = useState<MenuInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadMenus = useCallback(async (params: { websiteSlug?: string; domain?: string }) => {
    setIsLoading(true);
    try {
      const result = await MenuService.listPublic(params);
      setMenus(result);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadMenusByWebsite = useCallback(async (websiteId: number) => {
    setIsLoading(true);
    try {
      const result = await MenuService.listByWebsite(websiteId);
      setMenus(result);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addMenu = useCallback((menu: MenuInfo) => {
    setMenus(prev => [...prev, menu]);
  }, []);

  const updateMenuInList = useCallback((menu: MenuInfo) => {
    setMenus(prev => prev.map(m => m.menuId === menu.menuId ? menu : m));
  }, []);

  const removeMenuFromList = useCallback((menuId: number) => {
    setMenus(prev => prev.filter(m => m.menuId !== menuId));
  }, []);

  return (
    <MenuContext.Provider value={{ menus, isLoading, loadMenus, loadMenusByWebsite, addMenu, updateMenuInList, removeMenuFromList }}>
      {children}
    </MenuContext.Provider>
  );
}
