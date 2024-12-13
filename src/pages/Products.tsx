import { useEffect, useState } from "react";
import { api } from "../api/api";
import { Loader } from "../components/components";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await api.getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);
  return (
    <div className="min-h-[calc(100vh-85px)] w-full px-10 flex flex-col gap-4 mt-[85px]">
      <h1 className="text-4xl font-bold">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full min-h-full">
        {products.length > 0 ? (
          products.map((product) => (
            <a
              href={`/products/${product.id}`}
              key={product.id}
              className="hover:underline"
            >
              <div className="p-4 flex flex-col gap-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-[250px] w-full object-cover"
                />
                <div className="flex justify-between items-end">
                  <h2 className="text-2xl font-bold">{product.name}</h2>
                  <h2 className="text-xl font-medium">${product.price}</h2>
                </div>
              </div>
            </a>
          ))
        ) : (
          <div className="absolute top-1/2 left-1/2 flex items-center justify-center">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
