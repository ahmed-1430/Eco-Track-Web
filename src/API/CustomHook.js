import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

export const fetchChallenges = (params) => api.get('/api/challenges', { params });
export const fetchChallenge = (id) => api.get(`/api/challenges/${id}`);
export const createChallenge = (data) => api.post('/api/challenges', data);
export const updateChallenge = (id, data) => api.put(`/api/challenges/${id}`, data);
export const deleteChallenge = (id) => api.delete(`/api/challenges/${id}`);

export const joinChallenge = (id, user) => {
};

export const fetchUserChallenges = (userId) => api.get(`/api/user-challenges/user/${userId}`);
export const updateUserChallenge = (id, data) => api.patch(`/api/user-challenges/${id}`, data);

export const fetchTips = (params) => api.get('/api/tips', { params });

export const fetchEvents = (params) => api.get('/api/events', { params });

export const fetchStats = () => api.get('/api/statistics');

export default api;
