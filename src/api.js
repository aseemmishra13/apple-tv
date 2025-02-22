import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add JWT to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default {
  // Auth
  login: credentials => api.post('/auth/login', credentials),
  register: userData => api.post('/auth/register', userData),

  // Content
  getContent: () => api.get('/content'),
  getContentDetails: id => api.get(`/content/${id}`),
  streamVideo: id => `${process.env.REACT_APP_API_BASE_URL}/stream/${id}`,
  
  // User
  getProfile: () => api.get('/users/me')
};