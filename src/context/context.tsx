import { createContext, Dispatch, SetStateAction } from "react";

interface UserContextType {
  user: User | null | undefined;
  setUser: Dispatch<SetStateAction<User | null | undefined>>;
  isAdmin: boolean;
  error: string | null;
}
interface ProductsContextType {
  products: Product[] | null | undefined;
  fetchProducts: () => void;
  addProduct: (product: Object) => Promise<Product>;
  deleteProduct: (id: string) => Promise<any>;
  isLoading: boolean;
  isError: any;
}
interface CategoriesContextType {
  categories: Product[] | null | undefined;
  fetchCategories: () => void;
  addCategory: (category: Category) => Promise<any>;
  deleteCategory: (id: string) => Promise<any>;
  isLoading: boolean;
  isError: any;
}

const initialUserContext: UserContextType = {
  user: null,
  setUser: () => {},
  isAdmin: false,
  error: null,
};
const initialProductsContext: ProductsContextType = {
  products: null,
  fetchProducts: () => {},
  addProduct: async (product: Object) => {
    return new Promise<Product>((resolve) => {
      resolve({} as Product);
    });
  },
  deleteProduct: async (id: string) => {
    return new Promise<any>((resolve) => {
      resolve({} as Product);
    });
  },
  isLoading: false,
  isError: "",
};
const CategoriesContextType: CategoriesContextType = {
  categories: null,
  fetchCategories: () => {},
  addCategory: async (category: Category) => {
    return new Promise<any>((resolve) => {
      resolve({});
    });
  },
  deleteCategory: async (id: string) => {
    return new Promise<any>((resolve) => {
      resolve({});
    });
  },
  isLoading: false,
  isError: "",
};

export const UserContext = createContext(initialUserContext);
export const ProductsContext = createContext(initialProductsContext);
export const CategoriesContext = createContext(CategoriesContextType);
