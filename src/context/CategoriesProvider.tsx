import { useContext, useEffect, useMemo, useState } from "react";
import { CategoriesContext } from "./context";
import { api } from "../api/api";

export const CategoriesProvider = ({ children }: { children: any }) => {
  const [categories, setCategories] = useState<Category[] | null | undefined>([
    { name: "", image: "", _id: "2345" },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>("");

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const categoryData = await api.getCategories();
      setCategories(categoryData);
    } catch (error: any) {
      setIsError(error?.message || error?.response?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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

  const memoData = useMemo(
    () => ({
      categories,
      fetchCategories,
      addCategory,
      deleteCategory,
      isLoading,
      isError,
    }),
    [categories, isLoading, isError]
  );

  return (
    <CategoriesContext.Provider value={memoData}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  return useContext(CategoriesContext);
};
