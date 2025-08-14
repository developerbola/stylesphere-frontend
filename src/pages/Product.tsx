import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/api";
import { useUser } from "../context/UserProvider";
import toast from "react-hot-toast";
import { useProducts } from "../context/ProductsProvider";
import { Loader2 } from "lucide-react";

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
  const { user, isAdmin } = useUser();
  const [selectedSize, setSelectedSize] = useState<string>("XS");
  const [quantity, setQuantity] = useState<number>(1);

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
    } catch (error: any) {
      console.error("Error adding product:", error);
    }
  };

  if (error) {
    return <h1>{error}</h1>;
  }
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {isLoading ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Loader2 className="animate-spin text-gray-500" size={32} />
        </div>
      ) : product ? (
        <div className="flex flex-col md:flex-row gap-5 items-center w-full max-w-5xl">
          <img
            key={product._id}
            src={product.image}
            alt={`Image of ${product.name}`}
            className="w-full md:w-[450px] h-[450px] object-cover rounded-md"
          />
          <div className="flex flex-col justify-between h-full w-full md:w-1/2">
            <div className="flex flex-col gap-5">
              <h1 className="text-3xl capitalize">{product.name}</h1>
              <h1 className="text-xl capitalize opacity-50">
                {product.category}
              </h1>
              <p className="text-2xl">${product.price}</p>
              <p className="text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
                velit dolorem ullam repellendus temporibus eveniet saepe? Et,
                possimus ducimus? Error!
              </p>
              <div>
                <p className="text-base mb-1">Select Size</p>
                <div className="grid grid-cols-4 gap-2">
                  {sizes.map((size) => {
                    const isActive = size === selectedSize;
                    return (
                      <div
                        key={size}
                        className={`h-12 min-w-14 cursor-pointer p-3 rounded-md flex items-center justify-center ${
                          isActive ? "text-white bg-gray-950" : "bg-slate-100"
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        <p>{size}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-4">
              {user ? (
                isAdmin ? (
                  <div className="flex flex-col gap-2">
                    <button
                      className="bg-gray-800 text-white p-2 rounded-lg cursor-pointer"
                      onClick={() => navigate(`/edit/${product._id}`)}
                    >
                      Edit Product
                    </button>
                    <button
                      className="bg-red-500 text-white p-2 rounded-lg cursor-pointer"
                      onClick={() => {
                        deleteProduct(product._id);
                        toast(() => (
                          <span className="flex gap-2 items-center">
                            Go to the Products page
                            <button
                              onClick={() => navigate("/products")}
                              className="p-2 px-3 rounded-md bg-gray-950 text-white cursor-pointer"
                            >
                              Go
                            </button>
                          </span>
                        ));
                      }}
                    >
                      Delete Product
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-4 items-center">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setQuantity((prev) => Math.max(1, prev - 1))
                        }
                        className="px-3 py-2 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-xl w-[15px] text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity((prev) => prev + 1)}
                        className="px-3 py-2 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="bg-black text-white w-1/2 p-2 rounded-lg cursor-pointer"
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </button>
                  </div>
                )
              ) : (
                <button
                  className="bg-black text-white p-2 rounded-lg w-full cursor-pointer"
                  onClick={() => (window.location.href = "/login")}
                >
                  Login to purchase
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <h1>Product not found</h1>
      )}
    </div>
  );
};

export default Product;
