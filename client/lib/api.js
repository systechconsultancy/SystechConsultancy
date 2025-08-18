import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If the error is 401 and we haven't already retried the request
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark it as retried

      try {
        // Attempt to get a new access token from the refresh endpoint
        await api.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/refresh`);
        
        // If successful, retry the original request with the new token
        return api(originalRequest);

      } catch (refreshError) {
        // If the refresh token is also invalid, redirect to login
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;