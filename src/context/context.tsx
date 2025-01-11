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
  isLoading: false,
  isError: "",
};

export const UserContext = createContext(initialUserContext);
export const ProductsContext = createContext(initialProductsContext);
