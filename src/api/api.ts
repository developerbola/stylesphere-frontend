import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const api = {
  getProducts: async () => {
    const { data } = await axios.get(`${BACKEND_URL}/products`);
    return data;
  },
  getProduct: async (id: string) => {
    const res = await axios.get(`${BACKEND_URL}/products/${id}`);
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
    await axios.post(`${BACKEND_URL}/products`, prdct);
  },
  deleteProduct: async (id: string) => {
    await axios.delete(`${BACKEND_URL}/products/${id}`);
  },
  // User ACTIONS
  registerUser: async (user: Object) => {
    return await axios.post(`${BACKEND_URL}/users/register`, user);
  },
  loginUser: async (user: Object) => {
    return await axios.post(`${BACKEND_URL}/users/login`, user);
  },
  addProductToCart: async (product: Product, userId: string | undefined) => {
    return await axios.put(`${BACKEND_URL}/users/${userId}/cart`, product);
  },
  deleteProductFromCart: async (
    productId: string,
    userId: string | undefined
  ) => {
    return await axios.delete(
      `${BACKEND_URL}/users/${userId}/cart/${productId}`
    );
  },
};
