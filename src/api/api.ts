import Cookies from "js-cookie";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const api = {
  getProducts: async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/products`);
      return data;
    } catch (error: any) {
      console.log("Error fetching products: " + error.message);
    }
  },
  getProduct: async (id: string) => {
    try {
      const res = await axios.get(`${BACKEND_URL}/products/${id}`);
      return res;
    } catch (error: any) {
      console.log("Error fetching product: " + error.message);
    }
  },
  getCategories: async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/categories`);
      return data;
    } catch (error: any) {
      console.log("Error fetching categories: " + error.message);
    }
  },
  addCategory: async (category: object) => {
    try {
      await axios.post(`${BACKEND_URL}/categories`, category);
    } catch (error: any) {
      console.log("Error adding category: " + error.message);
    }
  },
  deleteCategory: async (id: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/categories/${id}`);
    } catch (error: any) {
      console.log("Error adding category: " + error.message);
    }
  },
  createProduct: async (prdct: Object) => {
    try {
      await axios.post(`${BACKEND_URL}/products`, prdct);
    } catch (error: any) {
      console.log("Error creating product: " + error.message);
    }
  },
  deleteProduct: async (id: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/products/${id}`);
    } catch (error: any) {
      console.log("Error deleting product: " + error.message);
    }
  },
  updateProduct: async (id: string | undefined, prdc: Object) => {
    await axios.put(`${BACKEND_URL}/products/${id}`, prdc);
  },
  // User ACTIONS
  registerUser: async (user: Object) => {
    try {
      return await axios.post(`${BACKEND_URL}/users/register`, user);
    } catch (error: any) {
      console.log("Error registering user: " + error.message);
    }
  },
  loginUser: async (user: Object) => {
    const { data } = await axios.post(`${BACKEND_URL}/users/login`, user);
    Cookies.set("token", data.token, { expires: 7 });
    return data;
  },
  addProductToCart: async (product: Product, userId: string | undefined) => {
    try {
      return await axios.put(`${BACKEND_URL}/users/${userId}/cart`, product);
    } catch (error: any) {
      console.log("Error adding product to cart: " + error.message);
    }
  },
  deleteProductFromCart: async (
    productId: string,
    userId: string | undefined
  ): Promise<void> => {
    try {
      await axios.delete(`${BACKEND_URL}/users/${userId}/cart/${productId}`);
    } catch (error: any) {
      console.log("Error deleting product from cart: " + error.message);
    }
  },
  fetchUser: async (): Promise<User | null | undefined> => {
    const token = Cookies.get("token");
    if (!token) return null; // Explicitly return null if no token
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users/user`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data; // Return the fetched user data
    } catch (error: any) {
      console.log(error);
      return null;
      // Return null in case of error
    }
  },
};
