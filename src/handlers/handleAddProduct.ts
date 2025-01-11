import toast from "react-hot-toast";

export const handleAddProduct = async (
  newProduct: object,
  addProduct: (product: object) => Promise<Product | any>,
  fetchProducts: () => void
) => {
  toast.promise(
    async () => {
      return await addProduct(newProduct);
    },
    {
      loading: "Adding product...",
      success: "Product added",
      error: "Failed to add product",
    }
  );
  fetchProducts();
};
