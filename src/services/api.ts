const API_URL = import.meta.env.VITE_API_URL || 'https://localhost:44374';
const TENANT_ID = import.meta.env.VITE_TENANT_ID || 'default';

function getAuthToken(): string | null {
  const stored = localStorage.getItem('nauth_session');
  if (!stored) return null;
  try {
    const session = JSON.parse(stored);
    return session.token || null;
  } catch {
    return null;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    'X-Tenant-Id': TENANT_ID,
    ...(options.headers as Record<string, string> || {}),
  };

  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 204) return undefined as T;
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `HTTP ${response.status}`);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : undefined as T;
}

async function requestSafe<T>(path: string, options: RequestInit = {}): Promise<T | null> {
  try {
    return await request<T>(path, options);
  } catch {
    return null;
  }
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  getSafe: <T>(path: string) => requestSafe<T>(path),
  post: <T>(path: string, body?: unknown) => request<T>(path, { method: 'POST', body: body instanceof FormData ? body : JSON.stringify(body) }),
  put: <T>(path: string, body?: unknown) => request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
  upload: <T>(path: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return request<T>(path, { method: 'POST', body: formData });
  },
};
