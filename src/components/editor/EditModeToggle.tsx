import { useEditMode } from '../../hooks';

export function EditModeToggle() {
  const { isEditMode, toggleEditMode } = useEditMode();

  return (
    <button
      onClick={toggleEditMode}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
        isEditMode
          ? 'bg-orange-500 text-white hover:bg-orange-600'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
      {isEditMode ? 'Sair do Edit Mode' : 'Edit Mode'}
    </button>
  );
}
