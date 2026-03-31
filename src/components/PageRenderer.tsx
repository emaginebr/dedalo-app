import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useWebsite, usePage, useContent, useEditMode } from '../hooks';
import { getTemplate } from '../templates';
import { ContentArea } from './editor/ContentArea';
import { ComponentPicker } from './editor/ComponentPicker';
import { ContentEditor } from './editor/ContentEditor';
import { PageEditModal } from './editor/PageEditModal';
import { Modal } from './ui/Modal';
import { getContentComponent } from './content';
import { ContentService } from '../services';
import type { ContentInfo } from '../types';

function NotFoundContent() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <p className="text-8xl font-bold text-gray-200 mb-4">404</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Pagina nao encontrada</h1>
        <p className="text-gray-500 mb-8">
          A pagina que voce esta procurando nao existe ou foi removida.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a href="/" className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
            Voltar ao inicio
          </a>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-auth-panel', { detail: 'login' }))}
            className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}

export function PageRenderer() {
  const { pageSlug } = useParams<{ pageSlug?: string }>();
  const { website, queryParams } = useWebsite();
  const { currentPage, isLoading: isPageLoading, loadPageBySlug } = usePage();
  const { contents, setContents, saveArea, addContent, updateContent, removeContent } = useContent();

  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerArea, setPickerArea] = useState('');
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<ContentInfo | null>(null);
  const [pageEditOpen, setPageEditOpen] = useState(false);
  const { isEditMode } = useEditMode();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    if (!website) return;
    const slug = pageSlug || 'home';
    loadPageBySlug(slug, queryParams);
  }, [website, pageSlug, queryParams, loadPageBySlug]);

  useEffect(() => {
    if (currentPage?.contents) {
      setContents(currentPage.contents);
    }
  }, [currentPage, setContents]);

  const template = website ? getTemplate(website.templateSlug) : undefined;
  const Layout = template?.Layout;

  const templatePageSlug = currentPage?.templatePageSlug || 'main-page';
  const templatePageDef = template?.pages.find(
    p => p.slug === templatePageSlug
  ) || template?.pages.find(p => p.slug === 'main-page') || template?.pages[0];

  const areas = templatePageDef?.areas || [
    { slug: 'main-content', label: 'Conteudo Principal' },
    { slug: 'footer-content', label: 'Rodape' },
  ];

  const handleAddContent = useCallback((areaSlug: string) => {
    setPickerArea(areaSlug);
    setPickerOpen(true);
  }, []);

  const handleSelectComponent = useCallback(async (contentType: string) => {
    if (!website || !currentPage) return;
    const compDef = getContentComponent(contentType, template?.components);
    const defaultValue = compDef?.defaultValue || '{}';
    const areaItems = contents[pickerArea] || [];

    try {
      const newContent = await ContentService.create(
        website.websiteId,
        currentPage.pageId,
        {
          contentType,
          index: areaItems.length,
          contentSlug: pickerArea,
          contentValue: defaultValue,
        }
      );
      addContent(newContent);
    } catch (err) {
      console.error('Error creating content:', err);
    }
    setPickerOpen(false);
  }, [website, currentPage, pickerArea, contents, template, addContent]);

  const handleEdit = useCallback((content: ContentInfo) => {
    setEditingContent(content);
    setEditorOpen(true);
  }, []);

  const handleDelete = useCallback(async (content: ContentInfo) => {
    if (!website || !currentPage) return;
    if (!confirm('Excluir este componente?')) return;
    try {
      await ContentService.delete(website.websiteId, currentPage.pageId, content.contentId);
      removeContent(content.contentSlug, content.contentId);
    } catch (err) {
      console.error('Error deleting content:', err);
    }
  }, [website, currentPage, removeContent]);

  const handleSaveContent = useCallback(async (value: string) => {
    if (!editingContent || !website || !currentPage) return;
    try {
      await ContentService.update(
        website.websiteId,
        currentPage.pageId,
        editingContent.contentId,
        {
          contentType: editingContent.contentType,
          index: editingContent.index,
          contentSlug: editingContent.contentSlug,
          contentValue: value,
        }
      );
      updateContent({ ...editingContent, contentValue: value });
    } catch (err) {
      console.error('Error updating content:', err);
    }
  }, [editingContent, website, currentPage, updateContent]);

  const handleDragEnd = useCallback(async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active || !over || !website || !currentPage) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    if (activeId === overId) return;

    const activeContentId = Number(activeId.replace('content-', ''));
    let sourceSlug = '';
    let sourceItem: ContentInfo | undefined;

    for (const [slug, items] of Object.entries(contents)) {
      const found = items.find(c => c.contentId === activeContentId);
      if (found) {
        sourceSlug = slug;
        sourceItem = found;
        break;
      }
    }

    if (!sourceItem) return;

    let targetSlug = sourceSlug;
    if (overId.startsWith('area-')) {
      targetSlug = overId.replace('area-', '');
    } else {
      const overContentId = Number(overId.replace('content-', ''));
      for (const [slug, items] of Object.entries(contents)) {
        if (items.find(c => c.contentId === overContentId)) {
          targetSlug = slug;
          break;
        }
      }
    }

    if (sourceSlug === targetSlug) {
      const items = [...(contents[sourceSlug] || [])];
      const oldIndex = items.findIndex(c => c.contentId === activeContentId);
      const overContentId = Number(overId.replace('content-', ''));
      const newIndex = items.findIndex(c => c.contentId === overContentId);

      if (oldIndex !== -1 && newIndex !== -1) {
        const [moved] = items.splice(oldIndex, 1);
        items.splice(newIndex, 0, moved);
        await saveArea(website.websiteId, currentPage.pageId, sourceSlug, items);
      }
    } else {
      const sourceItems = (contents[sourceSlug] || []).filter(
        c => c.contentId !== activeContentId
      );
      const targetItems = [...(contents[targetSlug] || [])];
      const movedItem = { ...sourceItem, contentSlug: targetSlug };
      targetItems.push(movedItem);

      await saveArea(website.websiteId, currentPage.pageId, sourceSlug, sourceItems);
      await saveArea(website.websiteId, currentPage.pageId, targetSlug, targetItems);
    }
  }, [contents, website, currentPage, saveArea]);

  if (!website || isPageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!currentPage) {
    const notFoundContent = Layout ? (
      <Layout areas={{ 'main-content': <NotFoundContent />, 'hero-area': null, 'sidebar': null, 'footer-content': null, 'left-column': null, 'right-column': null, 'center-content': null }}>{null}</Layout>
    ) : (
      <NotFoundContent />
    );
    return notFoundContent;
  }

  const areaNodes: Record<string, React.ReactNode> = {};
  for (const area of areas) {
    const areaItems = contents[area.slug] || [];
    areaNodes[area.slug] = (
      <ContentArea
        key={area.slug}
        areaSlug={area.slug}
        areaLabel={area.label}
        items={areaItems}
        websiteId={website.websiteId}
        pageId={currentPage.pageId}
        templateSlug={website.templateSlug}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddContent={handleAddContent}
      />
    );
  }

  const pageContent = Layout ? (
    <Layout areas={areaNodes}>{null}</Layout>
  ) : (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {Object.values(areaNodes)}
    </div>
  );

  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      {pageContent}

      <Modal isOpen={pickerOpen} onClose={() => setPickerOpen(false)} title="Adicionar Componente" size="lg">
        <ComponentPicker
          templateSlug={website.templateSlug}
          onSelect={handleSelectComponent}
          onCancel={() => setPickerOpen(false)}
        />
      </Modal>

      {editingContent && (
        <ContentEditor
          isOpen={editorOpen}
          onClose={() => { setEditorOpen(false); setEditingContent(null); }}
          contentType={editingContent.contentType}
          contentValue={editingContent.contentValue}
          templateSlug={website.templateSlug}
          onSave={handleSaveContent}
        />
      )}

      {isEditMode && currentPage && (
        <>
          <button
            onClick={() => setPageEditOpen(true)}
            title="Editar Pagina"
            className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition flex items-center justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>

          <PageEditModal
            isOpen={pageEditOpen}
            onClose={() => setPageEditOpen(false)}
            page={currentPage}
            websiteId={website.websiteId}
            templateSlug={website.templateSlug}
          />
        </>
      )}
    </DndContext>
  );
}
