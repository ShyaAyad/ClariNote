import axios from "axios";

const url = "http://localhost:8000/api/v1/";

export const register = async (
  name,
  email,
  password,
  password_confirmation,
) => {
  const res = axios.post(url + `register`, {
    name,
    email,
    password,
    password_confirmation,
  });
  return res;
};

export const login = async (email, password) => {
  const res = axios.post(url + `login`, { email, password });
  return res;
};

export const logout = async() => {
    const res = axios.post(url + `logout`, {});
    return res;
}