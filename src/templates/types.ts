import type { ComponentType } from 'react';
import type { ContentComponentDefinition } from '../components/content/index';
import type { ContentEditorProps } from '../components/content-editors/index';

export interface ContentAreaDefinition {
  slug: string;
  label: string;
  description?: string;
}

export interface TemplatePageDefinition {
  slug: string;
  label: string;
  areas: ContentAreaDefinition[];
}

export interface TemplateDefinition {
  slug: string;
  name: string;
  description: string;
  pages: TemplatePageDefinition[];
  components: Record<string, ContentComponentDefinition>;
  editors: Record<string, ComponentType<ContentEditorProps>>;
  Layout: ComponentType<TemplateLayoutProps>;
}

export interface TemplateLayoutProps {
  children: React.ReactNode;
  areas: Record<string, React.ReactNode>;
}
