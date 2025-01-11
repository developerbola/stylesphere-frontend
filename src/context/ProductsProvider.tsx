import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "./context";
import { api } from "../api/api";

let cachedProducts: Product[] | null = null;

export const ProductsProvider = ({ children }: { children: any }) => {
  const [products, setProducts] = useState<Product[] | null | undefined>(
    cachedProducts
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>("");
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const productData = await api.getProducts();
      cachedProducts = productData;
      setProducts(productData);
      setIsLoading(false);
    } catch (error: any) {
      setIsError(error?.message || error?.response?.message);
    }
  };
  useEffect(() => {
    if (!cachedProducts) {
      fetchProducts();
    }
  }, []);

  return (
    <ProductsContext.Provider
      value={{ products, fetchProducts, isLoading, isError }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductsContext);
};
