import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "./context";
import { api } from "../api/api";

export const UserProvider = ({ children }: { children: any }) => {
  const [products, setProducts] = useState<Product[] | null | undefined>(null);
  useEffect(() => {
    const fetchProducts = async () => {
      const userData = await api.getProducts();
      setProducts(userData);
    };
    fetchProducts();
  }, []);
  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductsContext);
};
