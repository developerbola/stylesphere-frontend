import axios from "axios";
const url = "http://localhost:3000/api/products";

export const api = {
  getProducts: async () => {
    const { data } = await axios.get(url);
    return data;
  },
  createProduct: async (prdct: Object) => {
    await axios.post(url, prdct);
  },
  deleteProduct: async (id: string) => {
    await axios.delete(`${url}/${id}`);
  },
};
