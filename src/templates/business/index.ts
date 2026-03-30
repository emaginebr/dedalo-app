import type { TemplateDefinition } from '../types';
import { BusinessLayout } from './BusinessLayout';
import { ServiceCard } from './components/ServiceCard';
import { TeamSection } from './components/TeamSection';

export const businessTemplate: TemplateDefinition = {
  slug: 'business',
  name: 'Business',
  description: 'Template corporativo com secoes de servicos e equipe',
  pages: [
    {
      slug: 'home',
      label: 'Pagina Inicial',
      areas: [
        { slug: 'hero-area', label: 'Hero' },
        { slug: 'main-content', label: 'Conteudo Principal' },
        { slug: 'left-column', label: 'Coluna Esquerda' },
        { slug: 'center-content', label: 'Conteudo Central' },
        { slug: 'right-column', label: 'Coluna Direita' },
        { slug: 'footer-content', label: 'Rodape' },
      ],
    },
    {
      slug: 'about-page',
      label: 'Sobre',
      areas: [
        { slug: 'hero-area', label: 'Hero' },
        { slug: 'main-content', label: 'Conteudo Principal' },
        { slug: 'footer-content', label: 'Rodape' },
      ],
    },
    {
      slug: 'services-page',
      label: 'Servicos',
      areas: [
        { slug: 'hero-area', label: 'Hero' },
        { slug: 'main-content', label: 'Conteudo Principal' },
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
    'service-card': {
      component: ServiceCard,
      label: 'Card de Servico',
      icon: 'briefcase',
      defaultValue: JSON.stringify({ title: 'Nossos Servicos', services: [] }),
    },
    'team-section': {
      component: TeamSection,
      label: 'Secao de Equipe',
      icon: 'users',
      defaultValue: JSON.stringify({ title: 'Nossa Equipe', members: [] }),
    },
  },
  editors: {},
  Layout: BusinessLayout,
};
