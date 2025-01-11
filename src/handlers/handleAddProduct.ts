import toast from "react-hot-toast";
import { useProducts } from "../context/ProductsProvider";

export const handleAddProduct = async (newProduct: object) => {
  const { addProduct, fetchProducts } = useProducts();
  toast.promise(
    async () => {
      addProduct(newProduct);
    },
    {
      loading: "Adding product...",
      success: "Product added successfully",
      error: "Failed to add product",
    }
  );
  fetchProducts();
};
