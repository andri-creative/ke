const apiUrl = import.meta.env.VITE_API_URL as string;

export const api = {
  login: `${apiUrl}/auth/login`,
  logout: `${apiUrl}/auth/logout`,
  user: `${apiUrl}/auth/me`,
  categories: `${apiUrl}/categories`
};
