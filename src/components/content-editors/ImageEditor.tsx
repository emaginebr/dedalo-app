import { useState } from 'react';
import { ImageService } from '../../services';

interface ImageData {
  src: string;
  alt?: string;
  caption?: string;
  width?: string;
  link?: string;
}

interface ImageEditorProps {
  value: string;
  onSave: (value: string) => void;
  onCancel: () => void;
}

export function ImageEditor({ value, onSave, onCancel }: ImageEditorProps) {
  const [data, setData] = useState<ImageData>(() => {
    try { return JSON.parse(value || '{}'); } catch { return { src: '' }; }
  });
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const result = await ImageService.upload(file);
      setData({ ...data, src: result.url });
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = () => {
    onSave(JSON.stringify(data));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Imagem</label>
        <div className="flex gap-2">
          <input type="text" value={data.src || ''} onChange={e => setData({ ...data, src: e.target.value })} placeholder="URL da imagem" className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          <label className={`px-4 py-2 rounded-lg cursor-pointer ${uploading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} text-white`}>
            {uploading ? '...' : 'Upload'}
            <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} />
          </label>
        </div>
        {data.src && <img src={data.src} alt="Preview" className="mt-2 max-h-40 rounded-lg" />}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Texto alternativo</label>
        <input type="text" value={data.alt || ''} onChange={e => setData({ ...data, alt: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Legenda</label>
        <input type="text" value={data.caption || ''} onChange={e => setData({ ...data, caption: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Largura</label>
          <input type="text" value={data.width || ''} onChange={e => setData({ ...data, width: e.target.value })} placeholder="ex: 500px, 100%" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
          <input type="text" value={data.link || ''} onChange={e => setData({ ...data, link: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t">
        <button onClick={onCancel} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancelar</button>
        <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Salvar</button>
      </div>
    </div>
  );
}
