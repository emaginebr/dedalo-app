import { useState } from 'react';

interface VideoData {
  url: string;
  title?: string;
  type?: 'youtube' | 'vimeo' | 'direct';
}

interface VideoEditorProps {
  value: string;
  onSave: (value: string) => void;
  onCancel: () => void;
}

export function VideoEditor({ value, onSave, onCancel }: VideoEditorProps) {
  const [data, setData] = useState<VideoData>(() => {
    try { return JSON.parse(value || '{}'); } catch { return { url: '' }; }
  });

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Titulo</label>
        <input type="text" value={data.title || ''} onChange={e => setData({ ...data, title: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
        <select value={data.type || 'youtube'} onChange={e => setData({ ...data, type: e.target.value as VideoData['type'] })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="youtube">YouTube</option>
          <option value="vimeo">Vimeo</option>
          <option value="direct">Video Direto</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">URL do Video</label>
        <input type="text" value={data.url || ''} onChange={e => setData({ ...data, url: e.target.value })} placeholder="https://youtube.com/watch?v=..." className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t">
        <button onClick={onCancel} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancelar</button>
        <button onClick={() => onSave(JSON.stringify(data))} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Salvar</button>
      </div>
    </div>
  );
}
