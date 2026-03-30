import type { TemplateDefinition } from '../types';
import { StarterBlogLayout } from './StarterBlogLayout';
import { BlogPostList } from './components/BlogPostList';
import { BlogSidebar } from './components/BlogSidebar';

export const starterBlogTemplate: TemplateDefinition = {
  slug: 'starter-blog',
  name: 'Starter Blog',
  description: 'Template para blogs com sidebar e area de posts',
  pages: [
    {
      slug: 'home',
      label: 'Pagina Inicial',
      areas: [
        { slug: 'hero-area', label: 'Hero' },
        { slug: 'main-content', label: 'Conteudo Principal' },
        { slug: 'sidebar', label: 'Sidebar' },
        { slug: 'footer-content', label: 'Rodape' },
      ],
    },
    {
      slug: 'about-page',
      label: 'Sobre',
      areas: [
        { slug: 'main-content', label: 'Conteudo Principal' },
        { slug: 'sidebar', label: 'Sidebar' },
        { slug: 'footer-content', label: 'Rodape' },
      ],
    },
    {
      slug: 'contact-page',
      label: 'Contato',
      areas: [
        { slug: 'main-content', label: 'Conteudo Principal' },
        { slug: 'footer-content', label: 'Rodape' },
      ],
    },
  ],
  components: {
    'blog-post-list': {
      component: BlogPostList,
      label: 'Lista de Posts',
      icon: 'list',
      defaultValue: JSON.stringify({ title: 'Ultimos Posts', posts: [] }),
    },
    'blog-sidebar': {
      component: BlogSidebar,
      label: 'Sidebar do Blog',
      icon: 'sidebar',
      defaultValue: JSON.stringify({ widgets: [{ title: 'Sobre', content: 'Sobre este blog...', type: 'text' }] }),
    },
  },
  editors: {},
  Layout: StarterBlogLayout,
};
