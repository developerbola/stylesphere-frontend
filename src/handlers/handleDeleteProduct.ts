import toast from "react-hot-toast";
import { useProducts } from "../context/ProductsProvider";

export const handleDeleteProduct = async (productId: string) => {
  const { deleteProduct } = useProducts();
  toast.promise(
    async () => {
      deleteProduct(productId);
    },
    {
      loading: "Deleting product...",
      success: "Product deleted successfully",
      error: "Failed to delete product",
    }
  );
};
