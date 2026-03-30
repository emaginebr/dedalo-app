import { useState } from 'react';

interface TextData {
  text: string;
  format?: 'plain' | 'html' | 'markdown';
}

interface TextEditorProps {
  value: string;
  onSave: (value: string) => void;
  onCancel: () => void;
}

export function TextEditor({ value, onSave, onCancel }: TextEditorProps) {
  const [data, setData] = useState<TextData>(() => {
    try { return JSON.parse(value || '{}'); } catch { return { text: '', format: 'plain' }; }
  });

  const handleSave = () => {
    onSave(JSON.stringify(data));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Formato</label>
        <select value={data.format || 'plain'} onChange={e => setData({ ...data, format: e.target.value as TextData['format'] })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="plain">Texto Simples</option>
          <option value="html">HTML</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Conteudo</label>
        <textarea value={data.text || ''} onChange={e => setData({ ...data, text: e.target.value })} rows={10} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm" />
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t">
        <button onClick={onCancel} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancelar</button>
        <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Salvar</button>
      </div>
    </div>
  );
}
