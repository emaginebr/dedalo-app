interface AddContentButtonProps {
  onClick: () => void;
}

export function AddContentButton({ onClick }: AddContentButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full py-2 mt-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 hover:text-blue-500 hover:border-blue-400 transition-colors flex items-center justify-center gap-2 text-sm"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
      Adicionar Componente
    </button>
  );
}
