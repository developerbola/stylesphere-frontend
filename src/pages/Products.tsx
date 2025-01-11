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
    <div className="min-h-[calc(100vh-85px)] w-full px-4 sm:px-6 lg:px-10 flex flex-col gap-4 mt-[85px]">
      <div className="flex flex-col lg:flex-row w-full">
        <div className="w-full lg:w-1/5 pl-[1rem] sm:pl-4 pt-4">
          <ul className="space-y-2 flex lg:flex-col flex-row lg:gap-0 gap-3">
            {[{ name: "All", image: "" }, ...(categories || [])]?.map(
              (category: Category, index: number) => {
                const categoryName = category.name;
                const active = currentCategory == categoryName;

                return (
                  <li
                    className={`relative text-lg cursor-pointer font-bold ${
                      active ? "opacity-100" : "opacity-25"
                    } ${index === 0 ? "mt-2" : ""}`}
                    onClick={() => setCurrentCategory(categoryName)}
                    key={categoryName}
                  >
                    {categoryName}
                  </li>
                );
              }
            )}
          </ul>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {products && products.length > 0 ? (
            (currentCategory !== "All"
              ? products.filter(
                  (product) => product.category == currentCategory
                )
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
                    className="h-[230px] w-full object-cover"
                  />
                  <div className="flex justify-between items-end">
                    <h2 className="text-lg sm:text-xl font-bold">
                      {product.name}
                    </h2>
                    <h2 className="text-base sm:text-lg font-medium">
                      ${product.price}
                    </h2>
                  </div>
                </div>
              </a>
            ))
          ) : (
            <div className="absolute top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
