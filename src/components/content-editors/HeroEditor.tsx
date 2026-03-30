import { useState } from 'react';

interface HeroData {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  buttonText?: string;
  buttonLink?: string;
  alignment?: 'left' | 'center' | 'right';
}

interface HeroEditorProps {
  value: string;
  onSave: (value: string) => void;
  onCancel: () => void;
}

export function HeroEditor({ value, onSave, onCancel }: HeroEditorProps) {
  const [data, setData] = useState<HeroData>(() => {
    try { return JSON.parse(value || '{}'); } catch { return { title: '' }; }
  });

  const handleSave = () => {
    onSave(JSON.stringify(data));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Titulo</label>
        <input type="text" value={data.title || ''} onChange={e => setData({ ...data, title: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Subtitulo</label>
        <input type="text" value={data.subtitle || ''} onChange={e => setData({ ...data, subtitle: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Imagem de Fundo (URL)</label>
        <input type="text" value={data.backgroundImage || ''} onChange={e => setData({ ...data, backgroundImage: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Texto do Botao</label>
          <input type="text" value={data.buttonText || ''} onChange={e => setData({ ...data, buttonText: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Link do Botao</label>
          <input type="text" value={data.buttonLink || ''} onChange={e => setData({ ...data, buttonLink: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Alinhamento</label>
        <select value={data.alignment || 'center'} onChange={e => setData({ ...data, alignment: e.target.value as 'left' | 'center' | 'right' })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="left">Esquerda</option>
          <option value="center">Centro</option>
          <option value="right">Direita</option>
        </select>
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t">
        <button onClick={onCancel} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancelar</button>
        <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Salvar</button>
      </div>
    </div>
  );
}
