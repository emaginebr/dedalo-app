import { useContext } from 'react';
import { EditModeContext } from '../contexts';

export function useEditMode() {
  return useContext(EditModeContext);
}
