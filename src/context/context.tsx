import { createContext, Dispatch, SetStateAction } from "react";

interface UserContextType {
  user: User | null | undefined;
  setUser: Dispatch<SetStateAction<User | null | undefined>>;
  isAdmin: boolean;
}
interface ProductsContextType {
  products: Product[] | null | undefined;
  setProducts: Dispatch<SetStateAction<Product[] | null | undefined>>;
}

const initialUserContext: UserContextType = {
  user: null,
  setUser: () => {},
  isAdmin: false,
};
const initialProductsContext: ProductsContextType = {
  products: null,
  setProducts: () => {},
};

export const UserContext = createContext(initialUserContext);
export const ProductsContext = createContext(initialProductsContext);
