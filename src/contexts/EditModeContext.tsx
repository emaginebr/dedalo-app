import { createContext, useState, useCallback, type ReactNode } from 'react';

export interface EditModeContextValue {
  isEditMode: boolean;
  toggleEditMode: () => void;
  setEditMode: (value: boolean) => void;
}

export const EditModeContext = createContext<EditModeContextValue>({
  isEditMode: false,
  toggleEditMode: () => {},
  setEditMode: () => {},
});

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = useCallback(() => {
    setIsEditMode(prev => !prev);
  }, []);

  const setEditMode = useCallback((value: boolean) => {
    setIsEditMode(value);
  }, []);

  return (
    <EditModeContext.Provider value={{ isEditMode, toggleEditMode, setEditMode }}>
      {children}
    </EditModeContext.Provider>
  );
}
