export const API_BASE_URL = '/api';

export const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('budget_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Xử lý lỗi token hết hạn hoặc không hợp lệ ở đây (401)
  // Guard: Không redirect nếu đang ở trang auth (tránh vòng lặp vô tận)
  const isAuthPage = window.location.pathname === '/login' || window.location.pathname === '/register';
  if (response.status === 401 && !isAuthPage) {
    localStorage.removeItem('budget_token');
    localStorage.removeItem('budget_user');
    window.location.href = '/login';
  }

  return response;
};
