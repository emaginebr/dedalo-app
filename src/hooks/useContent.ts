import { useContext } from 'react';
import { ContentContext } from '../contexts';

export function useContent() {
  return useContext(ContentContext);
}
