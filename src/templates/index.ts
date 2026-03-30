import type { TemplateDefinition } from './types';
import { starterBlogTemplate } from './starter-blog';
import { businessTemplate } from './business';

const templates: Record<string, TemplateDefinition> = {
  'starter-blog': starterBlogTemplate,
  'business': businessTemplate,
};

export function getTemplate(slug: string): TemplateDefinition | undefined {
  return templates[slug];
}

export function getAllTemplates(): TemplateDefinition[] {
  return Object.values(templates);
}

export { templates };
export type { TemplateDefinition } from './types';
