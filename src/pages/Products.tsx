import { useState } from "react";
import { Loader } from "../components/components";
import { useLocation } from "react-router-dom";
import { useProducts } from "../context/ProductsProvider";
import { useCategories } from "../context/CategoriesProvider";

const Products = () => {
  const { products = [] } = useProducts();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const [currentCategory, setCurrentCategory] = useState<string>(
    category ? category : "All"
  );
  const { categories } = useCategories();

  return (
    <div className="min-h-[calc(100vh-85px)] w-full px-10 flex flex-col gap-4 mt-[85px]">
      <div className="flex w-full">
        <div className="w-[15%] pl-4 pt-4">
          <ul>
            {["All", ...(categories || [])]?.map((category) => {
              const categoryName =
                typeof category === "string" ? category : category.name;
              const active = currentCategory == categoryName;

              return (
                <li
                  className={`relative text-lg cursor-pointer font-bold ${
                    active ? "opacity-100" : "opacity-25"
                  }`}
                  onClick={() => setCurrentCategory(categoryName)}
                  key={categoryName}
                >
                  {categoryName}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-full">
          {products && products.length > 0 ? (
            (currentCategory !== "All"
              ? products?.filter((produc) => produc.category == currentCategory)
              : products
            ).map((product: Product) => (
              <a
                href={`/products/${product._id}`}
                key={product._id}
                className="hover:underline"
              >
                <div className="p-4 flex flex-col gap-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-[230px] min-w-[250px] max-w-full object-cover"
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
