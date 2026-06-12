export function getAuthHeaders() {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const headers = { 'Content-Type': 'application/json' };

  if (user?.token) {
    headers.Authorization = `Bearer ${user.token}`;
  }

  return headers;
}
