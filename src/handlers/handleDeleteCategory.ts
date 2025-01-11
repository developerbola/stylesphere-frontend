import toast from "react-hot-toast";

export const handleDeleteCategory = async (
  categoryId: string,
  deleteCategory: (categoryId: string) => Promise<any>
) => {
  toast.promise(
    async () => {
      await deleteCategory(categoryId);
    },
    {
      loading: "Deleting category...",
      success: "Category deleted",
      error: "Failed to delete category",
    }
  );
};
