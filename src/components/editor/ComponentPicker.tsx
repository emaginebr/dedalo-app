import { generalComponents, type ContentComponentDefinition } from '../content';
import { getTemplate } from '../../templates';

interface ComponentPickerProps {
  templateSlug: string;
  onSelect: (contentType: string) => void;
  onCancel: () => void;
}

export function ComponentPicker({ templateSlug, onSelect, onCancel }: ComponentPickerProps) {
  const template = getTemplate(templateSlug);
  const templateComponents = template?.components || {};

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Componentes Gerais</h3>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(generalComponents).map(([type, def]) => (
            <ComponentCard key={type} type={type} definition={def} onSelect={onSelect} />
          ))}
        </div>
      </div>

      {Object.keys(templateComponents).length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Componentes do Template: {template?.name}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(templateComponents).map(([type, def]) => (
              <ComponentCard key={type} type={type} definition={def} onSelect={onSelect} />
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end pt-4 border-t">
        <button onClick={onCancel} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancelar</button>
      </div>
    </div>
  );
}

function ComponentCard({ type, definition, onSelect }: { type: string; definition: ContentComponentDefinition; onSelect: (type: string) => void }) {
  return (
    <button
      onClick={() => onSelect(type)}
      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition text-left"
    >
      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      </div>
      <div>
        <div className="font-medium text-sm">{definition.label}</div>
        <div className="text-xs text-gray-400">{type}</div>
      </div>
    </button>
  );
}
