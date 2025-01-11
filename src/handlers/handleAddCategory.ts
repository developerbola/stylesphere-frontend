import toast from "react-hot-toast";

export const handleAddCategory = async (
  newCategory: {
    name: string;
    image: string;
  },
  addCategory: (category: Category) => Promise<any>
) => {
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
