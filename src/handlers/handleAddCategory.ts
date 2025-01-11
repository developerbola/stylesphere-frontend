import toast from "react-hot-toast";
import { useCategories } from "../context/CategoriesProvider";

export const handleAddCategory = async (newCategory: {
  name: string;
  image: string;
}) => {
  const { addCategory } = useCategories();
  toast.promise(
    (async () => {
      addCategory({
        name: newCategory.name,
        image: newCategory.image,
      });
    })(),
    {
      loading: "Adding category...",
      success: "Category added successfully",
      error: "Failed to add category",
    }
  );
};
