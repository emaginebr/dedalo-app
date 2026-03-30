import { useContext } from 'react';
import { WebsiteContext } from '../contexts';

export function useWebsite() {
  return useContext(WebsiteContext);
}
