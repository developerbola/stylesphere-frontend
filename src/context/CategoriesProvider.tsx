import { useContext, useEffect, useState } from "react";
import { CategoriesContext } from "./context";
import { api } from "../api/api";

let cachedCategories: Product[] | null = null;

export const CategoriesProvider = ({ children }: { children: any }) => {
  const [categories, setCategories] = useState<Product[] | null | undefined>(
    cachedCategories
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>("");

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const categoryData = await api.getCategories();
      cachedCategories = categoryData;
      setCategories(categoryData);
      setIsLoading(false);
    } catch (error: any) {
      setIsError(error?.message || error?.response?.message);
    }
  };

  const addCategory = async ({
    name,
    image,
  }: {
    name: string;
    image: string;
  }) => {
    try {
      const data = await api.addCategory({ name: name, image: image });
      fetchCategories();
      return data;
    } catch (error) {
      return error;
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const data = await api.deleteCategory(id);
      fetchCategories();
      return data;
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    if (!cachedCategories) {
      fetchCategories();
    }
  }, []);

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        fetchCategories,
        addCategory,
        deleteCategory,
        isLoading,
        isError,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  return useContext(CategoriesContext);
};
