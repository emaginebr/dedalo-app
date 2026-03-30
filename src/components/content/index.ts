import type { ComponentType } from 'react';
import { HeroContent } from './HeroContent';
import { TextContent } from './TextContent';
import { ImageContent } from './ImageContent';
import { FormContent } from './FormContent';
import { GalleryContent } from './GalleryContent';
import { VideoContent } from './VideoContent';

export interface ContentComponentProps {
  contentValue: string;
}

export interface ContentComponentDefinition {
  component: ComponentType<ContentComponentProps>;
  label: string;
  icon: string;
  defaultValue: string;
}

export const generalComponents: Record<string, ContentComponentDefinition> = {
  hero: {
    component: HeroContent,
    label: 'Hero Banner',
    icon: 'layout',
    defaultValue: JSON.stringify({ title: 'Novo Hero', subtitle: 'Subtitulo aqui', alignment: 'center' }),
  },
  text: {
    component: TextContent,
    label: 'Texto',
    icon: 'type',
    defaultValue: JSON.stringify({ text: 'Seu texto aqui...', format: 'plain' }),
  },
  image: {
    component: ImageContent,
    label: 'Imagem',
    icon: 'image',
    defaultValue: JSON.stringify({ src: '', alt: '' }),
  },
  form: {
    component: FormContent,
    label: 'Formulario',
    icon: 'file-text',
    defaultValue: JSON.stringify({ title: 'Contato', fields: [{ name: 'name', label: 'Nome', type: 'text', required: true }, { name: 'email', label: 'Email', type: 'email', required: true }, { name: 'message', label: 'Mensagem', type: 'textarea', required: true }], submitText: 'Enviar' }),
  },
  gallery: {
    component: GalleryContent,
    label: 'Galeria',
    icon: 'grid',
    defaultValue: JSON.stringify({ title: 'Galeria', columns: 3, images: [] }),
  },
  video: {
    component: VideoContent,
    label: 'Video',
    icon: 'play-circle',
    defaultValue: JSON.stringify({ url: '', title: '' }),
  },
};

export function getContentComponent(contentType: string, templateComponents?: Record<string, ContentComponentDefinition>): ContentComponentDefinition | undefined {
  return templateComponents?.[contentType] || generalComponents[contentType];
}

export { HeroContent, TextContent, ImageContent, FormContent, GalleryContent, VideoContent };
