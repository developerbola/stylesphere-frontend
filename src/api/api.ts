import axios from "axios";
const url = "https://a6d31eff8e037611.mokky.dev/products";
export const api = {
  getProducts: async () => {
    const res = await axios.get(url);
    return res;
  },
  getProduct: async (id: string) => {
    const res = await axios.get(`${url}?id=${id}`);
    return res;
  },
  getCategories: async () => {
    return {
      data: [
        { name: "clothes", image: "/category/clothe.jpg" },
        { name: "shoes", image: "/category/shoe.jpg" },
        { name: "watches", image: "/category/watch.jpg" },
      ],
    };
  },
  createProduct: async (prdct: Object) => {
    await axios.post(url, prdct);
  },
  deleteProduct: async (id: string) => {
    await axios.delete(`${url}/${id}`);
  },
};
