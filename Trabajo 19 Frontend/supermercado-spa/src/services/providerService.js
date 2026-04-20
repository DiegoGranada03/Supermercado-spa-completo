import axios from "axios";

const API_URL = "http://localhost:8080/api/providers";

export const getProviders = () => axios.get(API_URL);

export const createProvider = (data) =>
  axios.post(API_URL, data);

export const updateProvider = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);

export const deleteProvider = (id) =>
  axios.delete(`${API_URL}/${id}`);