import axios from "axios";

const API = axios.create({
  baseURL: "https://user-management-backend-9ezf.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const fetchUsers = (page = 1) =>
  API.get(`/admin/users?page=${page}`);

export const activateUser = (id) =>
  API.patch(`/admin/users/${id}/activate`);

export const deactivateUser = (id) =>
  API.patch(`/admin/users/${id}/deactivate`);

