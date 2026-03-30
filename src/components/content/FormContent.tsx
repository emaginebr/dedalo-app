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

interface FormContentProps {
  contentValue: string;
}

export function FormContent({ contentValue }: FormContentProps) {
  const data: FormData = JSON.parse(contentValue || '{"fields":[]}');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="py-8 text-center">
        <p className="text-lg text-green-600 font-medium">{data.successMessage || 'Enviado com sucesso!'}</p>
      </div>
    );
  }

  return (
    <div className="py-6">
      {data.title && <h3 className="text-2xl font-bold mb-2">{data.title}</h3>}
      {data.description && <p className="text-gray-600 mb-6">{data.description}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {data.fields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea
                name={field.name}
                required={field.required}
                placeholder={field.placeholder}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
              />
            ) : field.type === 'select' ? (
              <select
                name={field.name}
                required={field.required}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">{field.placeholder || 'Selecione...'}</option>
                {field.options?.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                required={field.required}
                placeholder={field.placeholder}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          {data.submitText || 'Enviar'}
        </button>
      </form>
    </div>
  );
}
