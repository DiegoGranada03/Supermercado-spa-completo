import axios from "axios";

const API = "http://localhost:8080/api/sales";

export const getSales = () => axios.get(API);
export const createSale = (data) => axios.post(API, data);
export const deleteSale = (id) => axios.delete(`${API}/${id}`);