import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { ContentInfo } from '../../types';
import { useEditMode } from '../../hooks';
import { ContentBlock } from './ContentBlock';
import { AddContentButton } from './AddContentButton';

interface ContentAreaProps {
  areaSlug: string;
  areaLabel: string;
  items: ContentInfo[];
  websiteId: number;
  pageId: number;
  templateSlug: string;
  onEdit: (content: ContentInfo) => void;
  onDelete: (content: ContentInfo) => void;
  onAddContent: (areaSlug: string) => void;
}

export function ContentArea({ areaSlug, areaLabel, items, templateSlug, onEdit, onDelete, onAddContent }: ContentAreaProps) {
  const { isEditMode } = useEditMode();
  const { setNodeRef, isOver } = useDroppable({ id: `area-${areaSlug}` });

  const sortableIds = items.map(item => `content-${item.contentId}`);

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[40px] transition-all ${
        isEditMode
          ? `border-2 border-dashed rounded-lg p-3 ${
              isOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-gray-50/50'
            }`
          : ''
      }`}
    >
      {isEditMode && (
        <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
          {areaLabel}
        </div>
      )}
      <SortableContext items={sortableIds} strategy={verticalListSortingStrategy}>
        {items.map(item => (
          <ContentBlock
            key={item.contentId}
            content={item}
            templateSlug={templateSlug}
            onEdit={() => onEdit(item)}
            onDelete={() => onDelete(item)}
          />
        ))}
      </SortableContext>
      {isEditMode && (
        <AddContentButton onClick={() => onAddContent(areaSlug)} />
      )}
    </div>
  );
}
