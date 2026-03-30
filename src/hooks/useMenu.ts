import { useContext } from 'react';
import { MenuContext } from '../contexts';

export function useMenu() {
  return useContext(MenuContext);
}
