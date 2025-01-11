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
  const deleteProduct = async (id: string) => {
    try {
      const data = await api.deleteProduct(id);
      fetchProducts();
      return data;
    } catch (error) {
      return error;
    }
  };
  const addProduct = async (newProduct: Object) => {
    try {
      const data = await api.createProduct(newProduct);
      fetchProducts();
      return data;
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    if (!cachedProducts) {
      fetchProducts();
    }
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        fetchProducts,
        isLoading,
        isError,
        addProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductsContext);
};
