import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/api";
import { Loader } from "../components/components";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.getProduct(id as string);
        setProduct(data);
        setIsLoading(false);
      } catch (error: any) {
        setError("Error fetching product:" + error.message);
      }
    };
    fetchProduct();
  }, []);
  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      {isLoading ? (
        <Loader />
      ) : (
        product.map((product) => (
          <div>
            <img
              key={product.id}
              src={product.image}
              alt={`Image of ${product.name}`}
              className="max-w-[500px] max-h-[500px] w-full h-full object-contain"
            />
            <div className="flex justify-between">
              <h1 className="text-2xl">{product.name}</h1>
              <p className="text-2xl">${product.price}</p>
            </div>
            <div>
              <button className="flex gap-2 items-center transition-opacity bg-[#000] text-white backdrop-blur-md p-3 rounded-xl z-10">
                Add
                <img
                  src="/cart.svg"
                  alt="cart icon"
                  height={15}
                  width={15}
                  style={{ filter: "invert(1)" }}
                />
              </button>
              <button></button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Product;
