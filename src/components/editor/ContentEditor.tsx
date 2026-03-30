import { Modal } from '../ui/Modal';
import { getContentEditor } from '../content-editors';
import { getTemplate } from '../../templates';

interface ContentEditorProps {
  isOpen: boolean;
  onClose: () => void;
  contentType: string;
  contentValue: string;
  templateSlug: string;
  onSave: (value: string) => void;
}

export function ContentEditor({ isOpen, onClose, contentType, contentValue, templateSlug, onSave }: ContentEditorProps) {
  const template = getTemplate(templateSlug);
  const Editor = getContentEditor(contentType, template?.editors);

  if (!Editor) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title={`Editar ${contentType}`}>
        <div className="space-y-4">
          <p className="text-gray-500">Editor nao disponivel para o tipo: {contentType}</p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valor (JSON)</label>
            <textarea
              defaultValue={contentValue}
              rows={10}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 font-mono text-sm"
              id="raw-editor"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancelar</button>
            <button
              onClick={() => {
                const el = document.getElementById('raw-editor') as HTMLTextAreaElement;
                onSave(el.value);
                onClose();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Salvar
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Editar ${contentType}`} size="lg">
      <Editor
        value={contentValue}
        onSave={(value) => { onSave(value); onClose(); }}
        onCancel={onClose}
      />
    </Modal>
  );
}
