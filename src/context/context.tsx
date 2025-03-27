import { createContext, Dispatch, SetStateAction } from "react";

interface UserContextType {
  user: User | null | undefined;
  setUserData: Dispatch<SetStateAction<User | null | undefined>>;
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
  categories: Category[] | null | undefined;
  fetchCategories: () => void;
  addCategory: (category: Category) => Promise<any>;
  deleteCategory: (id: string) => Promise<any>;
  isLoading: boolean;
  isError: any;
}
interface UsersContextType {
  users: User[] | null | undefined;
  isLoading: boolean;
  isError: string | null;
}

const initialUserContext: UserContextType = {
  user: null,
  setUserData: () => {},
  isAdmin: false,
  error: null,
};
const initialProductsContext: ProductsContextType = {
  products: null,
  fetchProducts: () => {},
  addProduct: async () => {
    return new Promise<Product>((resolve) => {
      resolve({} as Product);
    });
  },
  deleteProduct: async () => {
    return new Promise<any>((resolve) => {
      resolve({} as Product);
    });
  },
  isLoading: false,
  isError: "",
};

const initialUsersContext: UsersContextType = {
  users: [],
  isError: "",
  isLoading: false,
};

const initialCategoriesContextType: CategoriesContextType = {
  categories: null,
  fetchCategories: () => {},
  addCategory: async () => {
    return new Promise<any>((resolve) => {
      resolve({});
    });
  },
  deleteCategory: async () => {
    return new Promise<any>((resolve) => {
      resolve({});
    });
  },
  isLoading: false,
  isError: "",
};

export const UserContext = createContext(initialUserContext);
export const ProductsContext = createContext(initialProductsContext);
export const CategoriesContext = createContext(initialCategoriesContextType);
export const UsersContext = createContext(initialUsersContext);
