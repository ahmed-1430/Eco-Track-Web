// src/api/index.js
import axios from 'axios';
const API_BASE = 'http://localhost:3000';

const api = axios.create({ baseURL: API_BASE });

export const fetchChallenges = (params) => api.get('/api/challenges', { params });

export const fetchChallenge = (id) => api.get(`/api/challenges/${id}`);

export const createChallenge = (data, headers) => api.post('/api/challenges', data, { headers });

export const updateChallenge = (id, data, headers) => api.patch(`/api/challenges/${id}`, data, { headers });

export const deleteChallenge = (id, headers) => api.delete(`/api/challenges/${id}`, { headers });

export const joinChallenge = (id, data, headers) => api.post(`/api/challenges/join/${id}`, data, { headers });

export const fetchUserChallenges = (userId) => api.get(`/api/user-challenges/user/${userId}`);

export const updateUserChallenge = (id, data, headers) => api.patch(`/api/user-challenges/${id}`, data, { headers });

export const fetchTips = (params) => api.get('/api/tips', { params });

export const fetchEvents = (params) => api.get('/api/events', { params });

export const fetchStats = () => api.get('/api/statistics');

export default api;
