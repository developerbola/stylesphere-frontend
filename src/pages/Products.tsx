import { useEffect, useState } from "react";
import { api } from "../api/api";
import { Loader } from "../components/components";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await api.getProducts();
      setProducts(res);
    };
    fetchProducts();
  }, []);
  return (
    <div className="min-h-[calc(100vh-85px)] w-full px-10 flex flex-col gap-4 mt-[85px]">
      <h1 className="text-4xl font-bold">Products</h1>
      <div className="flex w-full">
        <div className="w-[20%] bg-red-600">
          <h2>Categories</h2>
          <ul>
            <li>Shoes</li>
            <li>Clothes</li>
            <li>Watches</li>
          </ul>
        </div>
        <div className="flex w-[80%] min-h-full">
          {products?.length > 0 ? (
            products.map((product) => (
              <a
                href={`/products/${product._id}`}
                key={product._id}
                className="hover:underline w-33%"
              >
                <div className="p-4 flex flex-col gap-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-[250px] w-[250px] object-cover"
                  />
                  <div className="flex justify-between items-end">
                    <h2 className="text-2xl font-bold">{product.name}</h2>
                    <h2 className="text-xl font-medium">${product.price}</h2>
                  </div>
                </div>
              </a>
            ))
          ) : (
            <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
