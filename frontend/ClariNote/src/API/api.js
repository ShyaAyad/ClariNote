import axios from "axios";
import { useUserStore } from "../store/User.store.js";

// attach token to every request
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});

axiosInstance.interceptors.request.use((config) => {
  const token = useUserStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const register = (name, email, password, password_confirmation) => {
  const res = axiosInstance.post(`register`, {
    name,
    email,
    password,
    password_confirmation,
  });
  return res;
};

export const login = (email, password) => {
  const res = axiosInstance.post(`login`, { email, password });
  return res;
};

export const logout = () => {
  const res = axiosInstance.post(`logout`, {});
  return res;
};
