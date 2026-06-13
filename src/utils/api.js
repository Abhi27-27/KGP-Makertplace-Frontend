export function getAuthHeaders() {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const headers = { 'Content-Type': 'application/json' };

  if (user?.token) {
    headers.Authorization = `Bearer ${user.token}`;
  }

  return headers;
}

export function getUserInfo() {
  try {
    return JSON.parse(localStorage.getItem('userInfo'));
  } catch {
    return null;
  }
}

export const API_URL = import.meta.env.VITE_API_URL || '';

export async function apiFetch(url, options = {}) {
  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  });
  return response;
}
