import { useContext, useState } from "react";
import { ProductsContext } from "./context";
import { api } from "../api/api";

export const ProductsProvider = ({ children }: { children: any }) => {
  const [products, setProducts] = useState<Product[] | null | undefined>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>("");
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const productData = await api.getProducts();
      setProducts(productData);
      setIsLoading(false);
    } catch (error: any) {
      setIsError(error?.message || error?.response?.message);
    }
  };
  const deleteProduct = async (id: string): Promise<any> => {
    try {
      const data = await api.deleteProduct(id);
      fetchProducts();
      return data;
    } catch (error) {
      return error;
    }
  };
  const addProduct = async (newProduct: Object): Promise<Product | any> => {
    try {
      const data = await api.createProduct(newProduct);
      fetchProducts();
      return data;
    } catch (error) {
      return error;
    }
  };

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
