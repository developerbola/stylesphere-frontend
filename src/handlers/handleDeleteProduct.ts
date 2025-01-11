import toast from "react-hot-toast";

export const handleDeleteProduct = async (
  productId: string,
  deleteProduct: (productId: string) => Promise<any>
) => {
  toast.promise(
    async () => {
      deleteProduct(productId);
    },
    {
      loading: "Deleting product...",
      success: "Product deleted",
      error: "Failed to delete product",
    }
  );
};
