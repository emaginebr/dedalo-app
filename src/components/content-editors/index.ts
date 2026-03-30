import type { ComponentType } from 'react';
import { HeroEditor } from './HeroEditor';
import { TextEditor } from './TextEditor';
import { ImageEditor } from './ImageEditor';
import { FormEditor } from './FormEditor';
import { GalleryEditor } from './GalleryEditor';
import { VideoEditor } from './VideoEditor';

export interface ContentEditorProps {
  value: string;
  onSave: (value: string) => void;
  onCancel: () => void;
}

export const contentEditors: Record<string, ComponentType<ContentEditorProps>> = {
  hero: HeroEditor,
  text: TextEditor,
  image: ImageEditor,
  form: FormEditor,
  gallery: GalleryEditor,
  video: VideoEditor,
};

export function getContentEditor(contentType: string, templateEditors?: Record<string, ComponentType<ContentEditorProps>>): ComponentType<ContentEditorProps> | undefined {
  return templateEditors?.[contentType] || contentEditors[contentType];
}

export { HeroEditor, TextEditor, ImageEditor, FormEditor, GalleryEditor, VideoEditor };
