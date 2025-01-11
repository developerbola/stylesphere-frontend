import toast from "react-hot-toast";
import { useCategories } from "../context/CategoriesProvider";

export const handleDeleteCategory = async (categoryId: string) => {
  const { deleteCategory } = useCategories();
  toast.promise(
    async () => {
      deleteCategory(categoryId);
    },
    {
      loading: "Deleting category...",
      success: "Category deleted successfully",
      error: "Failed to delete category",
    }
  );
};
