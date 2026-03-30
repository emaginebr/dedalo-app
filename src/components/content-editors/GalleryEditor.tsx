import { useState } from 'react';
import { ImageService } from '../../services';

interface GalleryImage {
  src: string;
  alt?: string;
  caption?: string;
}

interface GalleryData {
  title?: string;
  columns?: number;
  images: GalleryImage[];
}

interface GalleryEditorProps {
  value: string;
  onSave: (value: string) => void;
  onCancel: () => void;
}

export function GalleryEditor({ value, onSave, onCancel }: GalleryEditorProps) {
  const [data, setData] = useState<GalleryData>(() => {
    try { return JSON.parse(value || '{}'); } catch { return { images: [] }; }
  });

  const addImage = () => {
    setData({ ...data, images: [...data.images, { src: '', alt: '' }] });
  };

  const updateImage = (index: number, img: GalleryImage) => {
    const images = [...data.images];
    images[index] = img;
    setData({ ...data, images });
  };

  const removeImage = (index: number) => {
    setData({ ...data, images: data.images.filter((_, i) => i !== index) });
  };

  const handleUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const result = await ImageService.upload(file);
      updateImage(index, { ...data.images[index], src: result.url });
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Titulo</label>
        <input type="text" value={data.title || ''} onChange={e => setData({ ...data, title: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Colunas</label>
        <select value={data.columns || 3} onChange={e => setData({ ...data, columns: Number(e.target.value) })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
      </div>
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">Imagens</label>
          <button onClick={addImage} className="text-sm text-blue-600 hover:text-blue-800">+ Adicionar Imagem</button>
        </div>
        <div className="space-y-3">
          {data.images.map((img, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-3 flex gap-3">
              {img.src && <img src={img.src} alt="" className="w-16 h-16 object-cover rounded" />}
              <div className="flex-1 space-y-1">
                <div className="flex gap-2">
                  <input type="text" value={img.src} onChange={e => updateImage(i, { ...img, src: e.target.value })} placeholder="URL" className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm" />
                  <label className="px-2 py-1 bg-green-600 text-white rounded cursor-pointer text-sm">
                    Upload
                    <input type="file" accept="image/*" onChange={e => handleUpload(i, e)} className="hidden" />
                  </label>
                </div>
                <input type="text" value={img.alt || ''} onChange={e => updateImage(i, { ...img, alt: e.target.value })} placeholder="Alt text" className="w-full border border-gray-300 rounded px-2 py-1 text-sm" />
              </div>
              <button onClick={() => removeImage(i)} className="text-red-500 hover:text-red-700 self-start">X</button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t">
        <button onClick={onCancel} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancelar</button>
        <button onClick={() => onSave(JSON.stringify(data))} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Salvar</button>
      </div>
    </div>
  );
}
