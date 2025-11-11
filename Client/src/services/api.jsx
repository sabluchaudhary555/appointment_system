import axios from 'axios';

const API_BASE_URL = 'https://medical-app-7x4y.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (email, password, role) =>
    api.post('/api/auth/login', { email, password, role }),

  register: (userData) =>
    api.post('/api/auth/register', userData),
};


export const appointmentsAPI = {
  getAppointments: () => api.get('/api/appointments'),

 createAppointment: (appointmentData) =>
  api.post('/api/appointments', appointmentData),


updateAppointmentStatus: (id, status) =>
  api.patch(`/api/appointments/${id}/status`, { status }),

};

export const doctorsAPI = {
  getDoctors: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.get(`/api/doctors${queryString ? `?${queryString}` : ''}`);
  },

getDoctorById: (id) =>
  api.get(`/api/doctors/${id}`),

};


export default api;
