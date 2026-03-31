import type { MenuInfo } from '../../types';
import { LinkTypeEnum } from '../../types';
import { useNavigate } from 'react-router-dom';
import { usePage } from '../../hooks';

interface NavigationProps {
  menus: MenuInfo[];
  websiteSlug?: string;
}

export function Navigation({ menus, websiteSlug }: NavigationProps) {
  const navigate = useNavigate();
  const { pages } = usePage();
  const rootMenus = menus.filter(m => m.parentId === null);

  const getChildren = (parentId: number) => menus.filter(m => m.parentId === parentId);

  const handleClick = (menu: MenuInfo) => {
    if (menu.linkType === LinkTypeEnum.External && menu.externalLink) {
      window.open(menu.externalLink, '_blank');
    } else if (menu.linkType === LinkTypeEnum.InternalPage && menu.pageId) {
      const page = pages.find(p => p.pageId === menu.pageId);
      if (page) {
        const base = websiteSlug ? `/${websiteSlug}` : '';
        navigate(`${base}/${page.pageSlug}`);
      }
    }
  };

  return (
    <nav className="flex items-center gap-1">
      {rootMenus.map(menu => {
        const children = getChildren(menu.menuId);
        return (
          <div key={menu.menuId} className="relative group">
            <button
              onClick={() => handleClick(menu)}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-lg hover:bg-gray-100 transition"
            >
              {menu.name}
            </button>
            {children.length > 0 && (
              <div className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                {children.map(child => (
                  <button
                    key={child.menuId}
                    onClick={() => handleClick(child)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {child.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
