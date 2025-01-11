import Cookies from "js-cookie";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const isServerRunning = async () => {
  try {
    // It's better to use a lightweight health check endpoint if available
    const response = await axios.get(`${BACKEND_URL}/products`);
    return response.status === 200;
  } catch (error: any) {
    return false;
  }
};

export const api = {
  // PRODUCTS ACTIONS
  getProducts: async () => {
    if (!(await isServerRunning())) return;
    try {
      const { data } = await axios.get(`${BACKEND_URL}/products`);
      return data;
    } catch (error: any) {
      console.log("Error fetching products: " + error.message);
    }
  },
  getProduct: async (id: string) => {
    if (!(await isServerRunning())) return;
    try {
      const res = await axios.get(`${BACKEND_URL}/products/${id}`);
      return res;
    } catch (error: any) {
      console.log("Error fetching product: " + error.message);
    }
  },
  createProduct: async (prdct: Object) => {
    if (!(await isServerRunning())) return;
    try {
      await axios.post(`${BACKEND_URL}/products`, prdct);
    } catch (error: any) {
      console.log("Error creating product: " + error.message);
    }
  },
  deleteProduct: async (id: string) => {
    if (!(await isServerRunning())) return;
    try {
      await axios.delete(`${BACKEND_URL}/products/${id}`);
    } catch (error: any) {
      console.log("Error deleting product: " + error.message);
    }
  },
  updateProduct: async (id: string | undefined, prdc: Object) => {
    if (!(await isServerRunning())) return;
    try {
      await axios.put(`${BACKEND_URL}/products/${id}`, prdc);
    } catch (error: any) {
      console.log("Error updating product: " + error.message);
    }
  },
  // CATEGORIES ACTIONS
  getCategories: async () => {
    if (!(await isServerRunning())) return;
    try {
      const { data } = await axios.get(`${BACKEND_URL}/categories`);
      return data;
    } catch (error: any) {
      console.log("Error fetching categories: " + error.message);
    }
  },
  addCategory: async (category: object) => {
    if (!(await isServerRunning())) return;
    try {
      await axios.post(`${BACKEND_URL}/categories`, category);
    } catch (error: any) {
      console.log("Error adding category: " + error.message);
    }
  },
  deleteCategory: async (id: string) => {
    if (!(await isServerRunning())) return;
    try {
      await axios.delete(`${BACKEND_URL}/categories/${id}`);
    } catch (error: any) {
      console.log("Error deleting category: " + error.message);
    }
  },
  // USERS ACTIONS
  registerUser: async (user: Object) => {
    if (!(await isServerRunning())) return;
    try {
      return await axios.post(`${BACKEND_URL}/users/register`, user);
    } catch (error: any) {
      console.log("Error registering user: " + error.message);
    }
  },
  loginUser: async (user: Object) => {
    if (!(await isServerRunning())) return;
    try {
      const { data } = await axios.post(`${BACKEND_URL}/users/login`, user);
      Cookies.set("token", data.token, { expires: 7 });
      return data;
    } catch (error: any) {
      console.log("Error logging in user: " + error.message);
    }
  },
  fetchUser: async (): Promise<User | null | undefined> => {
    if (!(await isServerRunning())) return null;
    const token = Cookies.get("token");
    if (!token) return null;
    try {
      const res = await axios.get(`${BACKEND_URL}/users/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error: any) {
      console.log("Error fetching user: " + error.message);
      return null;
    }
  },
  // CART ACTIONS
  addProductToCart: async (product: Product, userId: string | undefined) => {
    if (!(await isServerRunning())) return;
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
    if (!(await isServerRunning())) return;
    try {
      await axios.delete(`${BACKEND_URL}/users/${userId}/cart/${productId}`);
    } catch (error: any) {
      console.log("Error deleting product from cart: " + error.message);
    }
  },
};
