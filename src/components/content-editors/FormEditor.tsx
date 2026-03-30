import { useState } from 'react';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'textarea' | 'select' | 'tel';
  required?: boolean;
  options?: string[];
  placeholder?: string;
}

interface FormData {
  title?: string;
  description?: string;
  fields: FormField[];
  submitText?: string;
  successMessage?: string;
}

interface FormEditorProps {
  value: string;
  onSave: (value: string) => void;
  onCancel: () => void;
}

export function FormEditor({ value, onSave, onCancel }: FormEditorProps) {
  const [data, setData] = useState<FormData>(() => {
    try { return JSON.parse(value || '{}'); } catch { return { fields: [] }; }
  });

  const addField = () => {
    setData({ ...data, fields: [...data.fields, { name: `field_${Date.now()}`, label: 'Novo Campo', type: 'text' }] });
  };

  const updateField = (index: number, field: FormField) => {
    const fields = [...data.fields];
    fields[index] = field;
    setData({ ...data, fields });
  };

  const removeField = (index: number) => {
    setData({ ...data, fields: data.fields.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Titulo do Formulario</label>
        <input type="text" value={data.title || ''} onChange={e => setData({ ...data, title: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Descricao</label>
        <textarea value={data.description || ''} onChange={e => setData({ ...data, description: e.target.value })} rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
      </div>
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">Campos</label>
          <button onClick={addField} className="text-sm text-blue-600 hover:text-blue-800">+ Adicionar Campo</button>
        </div>
        <div className="space-y-3">
          {data.fields.map((field, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-3 space-y-2">
              <div className="flex gap-2">
                <input type="text" value={field.label} onChange={e => updateField(i, { ...field, label: e.target.value })} placeholder="Label" className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm" />
                <input type="text" value={field.name} onChange={e => updateField(i, { ...field, name: e.target.value })} placeholder="Nome" className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm" />
                <select value={field.type} onChange={e => updateField(i, { ...field, type: e.target.value as FormField['type'] })} className="border border-gray-300 rounded px-2 py-1 text-sm">
                  <option value="text">Texto</option>
                  <option value="email">Email</option>
                  <option value="tel">Telefone</option>
                  <option value="textarea">Textarea</option>
                  <option value="select">Select</option>
                </select>
                <label className="flex items-center text-sm gap-1">
                  <input type="checkbox" checked={field.required || false} onChange={e => updateField(i, { ...field, required: e.target.checked })} />
                  Req.
                </label>
                <button onClick={() => removeField(i)} className="text-red-500 hover:text-red-700 text-sm px-2">X</button>
              </div>
              {field.type === 'select' && (
                <input type="text" value={field.options?.join(', ') || ''} onChange={e => updateField(i, { ...field, options: e.target.value.split(',').map(s => s.trim()) })} placeholder="Opcoes separadas por virgula" className="w-full border border-gray-300 rounded px-2 py-1 text-sm" />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Texto do Botao</label>
          <input type="text" value={data.submitText || ''} onChange={e => setData({ ...data, submitText: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem de Sucesso</label>
          <input type="text" value={data.successMessage || ''} onChange={e => setData({ ...data, successMessage: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t">
        <button onClick={onCancel} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancelar</button>
        <button onClick={() => onSave(JSON.stringify(data))} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Salvar</button>
      </div>
    </div>
  );
}
