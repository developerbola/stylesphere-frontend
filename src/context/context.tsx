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
  addProduct: (product: Object) => void;
  deleteProduct: (id: string) => void;
  isLoading: boolean;
  isError: any;
}
interface CategoriesContextType {
  categories: Product[] | null | undefined;
  fetchCategories: () => void;
  addCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
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
  addProduct: () => {},
  deleteProduct: () => {},
  isLoading: false,
  isError: "",
};
const CategoriesContextType: CategoriesContextType = {
  categories: null,
  fetchCategories: () => {},
  addCategory: () => {},
  deleteCategory: () => {},
  isLoading: false,
  isError: "",
};

export const UserContext = createContext(initialUserContext);
export const ProductsContext = createContext(initialProductsContext);
export const CategoriesContext = createContext(CategoriesContextType);
