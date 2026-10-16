import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const siteDataApi = {
  getAll: () => api.get('/site-data'),
  getSection: (section) => api.get(`/site-data/${section}`),
  updateSection: (section, data) => api.put(`/site-data/${section}`, { data }),
};
