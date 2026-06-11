import axios from "axios";

const LOCAL_API = process.env.NEXT_PUBLIC_LOCAL_API_URL || "http://localhost:5000";
const PROD_API = process.env.NEXT_PUBLIC_API_URL;

// Create instance with production first
const api = axios.create({
  baseURL: PROD_API,
});

// Request interceptor (token attach)
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor → fallback logic
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If backend is down or network error → fallback once
    if (!originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.warn("Prod API failed. Switching to local API...");

        const fallbackApi = axios.create({
          baseURL: LOCAL_API,
        });

        // attach token again
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("token");
          if (token) {
            fallbackApi.defaults.headers.Authorization = `Bearer ${token}`;
          }
        }

        return fallbackApi(originalRequest);
      } catch (fallbackError) {
        return Promise.reject(fallbackError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;