import { useContext } from 'react';
import { PageContext } from '../contexts';

export function usePage() {
  return useContext(PageContext);
}
