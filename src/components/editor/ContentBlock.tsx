import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { ContentInfo } from '../../types';
import { useEditMode } from '../../hooks';
import { getContentComponent } from '../content';
import { getTemplate } from '../../templates';

interface ContentBlockProps {
  content: ContentInfo;
  templateSlug: string;
  onEdit: () => void;
  onDelete: () => void;
}

export function ContentBlock({ content, templateSlug, onEdit, onDelete }: ContentBlockProps) {
  const { isEditMode } = useEditMode();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `content-${content.contentId}`, disabled: !isEditMode });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const template = getTemplate(templateSlug);
  const componentDef = getContentComponent(content.contentType, template?.components);
  const Component = componentDef?.component;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group ${
        isEditMode ? 'border border-dashed border-gray-300 rounded-lg my-2 hover:border-blue-400' : ''
      }`}
    >
      {isEditMode && (
        <div className="absolute top-1 right-1 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            {...attributes}
            {...listeners}
            className="p-1.5 bg-gray-600 text-white rounded hover:bg-gray-700 cursor-grab"
            title="Arrastar"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            </svg>
          </button>
          <button
            onClick={onEdit}
            className="p-1.5 bg-blue-600 text-white rounded hover:bg-blue-700"
            title="Editar"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 bg-red-600 text-white rounded hover:bg-red-700"
            title="Excluir"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      )}
      {Component ? (
        <Component contentValue={content.contentValue} />
      ) : (
        <div className="p-4 bg-yellow-50 text-yellow-700 rounded">
          Componente desconhecido: {content.contentType}
        </div>
      )}
    </div>
  );
}
