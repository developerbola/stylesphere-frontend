import Cookies from "js-cookie";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const isServerRunning = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/products`);
    return response.status === 200;
  } catch (error: any) {
    return false;
  }
};

export const api = {
  // ====== PRODUCTS ACTIONS ======
  getProducts: async () => {
    if (!(await isServerRunning())) return;
    try {
      const response = await fetch(`${BACKEND_URL}/products`, {
        cache: "force-cache",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
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
  getHeroProducts: async () => {
    if (!(await isServerRunning())) return;
    try {
      const data = await fetch(`${BACKEND_URL}/products/hero`);
      return data.json();
    } catch (error: any) {
      console.log("Error fetching hero products: " + error.message);
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
  // ====== CATEGORIES ACTIONS ======
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
  // ====== USERS ACTIONS ======
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
    const { data } = await axios.post(`${BACKEND_URL}/users/login`, user);
    Cookies.set("token", data.token, { expires: 7 });
    return data;
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
  updateUser: async (id: string, body: object): Promise<void> => {
    if (!(await isServerRunning())) return;
    await axios.put(`${BACKEND_URL}/users/${id}`, body);
  },
  deleteUser: async (id: string): Promise<void> => {
    if (!(await isServerRunning())) return;
    await axios.delete(`${BACKEND_URL}/users/${id}`);
  },
  getUsers: async (): Promise<null | User[]> => {
    if (!(await isServerRunning())) return null;

    try {
      const response = await fetch(`${BACKEND_URL}/users`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data: User[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching users:", error);
      return null;
    }
  },

  // ====== CART ACTIONS ======
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
