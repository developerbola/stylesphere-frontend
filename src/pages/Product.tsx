import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/api";
import { Loader } from "../components/components";
import { useUser } from "../context/UserProvider";
import toast from "react-hot-toast";
import { useProducts } from "../context/ProductsProvider";

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const { deleteProduct } = useProducts();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>({
    name: "",
    image: "",
    price: 0,
    _id: "",
    category: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user, setUser, isAdmin } = useUser();

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
      toast.promise(api.addProductToCart(product, user?._id), {
        loading: "Adding product...",
        success: "Product added",
        error: "Error adding product",
      });
      const refreshedUserData = await api.fetchUser();
      setUser(refreshedUserData);
    } catch (error: any) {
      console.error("Error adding product:", error);
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
          <div className="flex gap-2 justify-end">
            {user ? (
              isAdmin ? (
                <>
                  <button
                    className="flex gap-2 items-center transition-opacity bg-gray-800 text-white backdrop-blur-md p-2 px-3 rounded-lg z-10"
                    onClick={() => navigate(`/edit/${product._id}`)}
                  >
                    Edit Product
                  </button>
                  <button
                    className="flex gap-2 items-center transition-opacity bg-red-500 text-white backdrop-blur-md p-2 px-3 rounded-lg z-10"
                    onClick={() => {
                      deleteProduct(product._id);
                      toast(() => (
                        <span className="flex gap-2 items-center">
                          Go to the Products page
                          <button
                            onClick={() => navigate("/products")}
                            className="p-2 px-3 rounded-md bg-gray-950 text-white"
                          >
                            Go
                          </button>
                        </span>
                      ));
                    }}
                  >
                    Delete Product
                  </button>
                </>
              ) : (
                <button
                  className="flex gap-2 items-center transition-opacity bg-[#000] text-white backdrop-blur-md p-2 px-3 rounded-lg z-10"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <h1>Product not found</h1>
      )}
    </div>
  );
};

export default Product;
