import axios from "axios";

export const APIClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

APIClient.interceptors.request.use(
  (config) => {
    let token = null;
    if (typeof window !== "undefined") {
      const item = window.localStorage.getItem("token");
      if (item !== null) {
        const data = JSON.parse(item);
        token = data ? data?.token : null;
      }
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

APIClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  }
);
