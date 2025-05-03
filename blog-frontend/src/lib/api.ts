import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const login = async (username: string, password: string) => {
  const response = await api.post('/token/', { username, password });
  return response.data;
};

export const fetchBlogs = async (page: number = 1) => {
  const response = await api.get(`/blogs/?page=${page}`);
  return response.data;
};

export const createBlog = async (blogData: any, token: string) => {
  const response = await api.post('/blogs/', blogData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default api;