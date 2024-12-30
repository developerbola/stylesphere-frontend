import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/api";
import { Loader } from "../components/components";
import { toast } from "react-toastify";

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product>({
    name: "",
    image: "",
    price: 0,
    _id: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null | undefined>();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError("Invalid product ID");
        setIsLoading(false);
        return;
      }

      try {
        const res = await api.getProduct(id);
        setProduct(res?.data);
      } catch (error: any) {
        setError("Error fetching product: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await api.addProductToCart(product, user?._id);
      toast.success("Product added!");
    } catch (error: any) {
      console.error("Error adding product to cart:", error);
      toast.error("Error adding product to cart: " + error.message);
    }
  };

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      {isLoading ? (
        <Loader />
      ) : product ? (
        <div className="flex flex-col gap-5">
          <img
            key={product._id}
            src={product.image}
            alt={`Image of ${product.name}`}
            className="max-w-[375px] max-h-[375px] object-cover"
          />
          <div className="flex justify-between">
            <h1 className="text-2xl">{product.name}</h1>
            <p className="text-2xl">${product.price}</p>
          </div>
          <div className="flex gap-5 justify-end">
            <button
              className="flex gap-2 items-center transition-opacity bg-[#000] text-white backdrop-blur-md p-3 rounded-xl z-10"
              onClick={handleAddToCart}
            >
              Order
              <img
                src="/cart.svg"
                alt="cart icon"
                height={15}
                width={15}
                style={{ filter: "invert(1)" }}
              />
            </button>
          </div>
        </div>
      ) : (
        <h1>Product not found</h1>
      )}
    </div>
  );
};

export default Product;
