import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductsProvider";
import { useCategories } from "../context/CategoriesProvider";
import { Loader2 } from "lucide-react";
import { BlurImage } from "./Dashboard/DashboardProducts";
import Categories from "../components/Categories";

const Products = () => {
  const { products = [] } = useProducts();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const [currentCategory, setCurrentCategory] = useState<string>(
    category ? category : "All"
  );
  const { categories } = useCategories();

  return (
    <div className="min-h-[calc(100vh-85px)] w-full px-4 sm:px-6 lg:px-10 flex flex-col gap-4 mt-[85px]">
      <div className="flex flex-col lg:flex-row w-full">
        <Categories
          setCurrentCategory={setCurrentCategory}
          categories={categories}
          currentCategory={currentCategory}
        />
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full place-items-center">
          {products && products.length > 0 ? (
            (currentCategory !== "All"
              ? products.filter(
                  (product) => product.category == currentCategory
                )
              : products
            ).map((product: Product) => (
              <a
                onClick={() => navigate(`/products/${product._id}`)}
                key={product._id}
                className="hover:underline xs:w-auto vxs:w-full"
              >
                <div
                  key={product._id}
                  className="xs:w-[270px] vxs:w-full overflow-hidden bg-white p-4"
                >
                  {/* Product Image */}
                  <div className="relative xs:h-[200px] vxs:h-auto w-full overflow-hidden rounded-md bg-gray-100">
                    <BlurImage src={product.image} alt={product.name} />
                  </div>

                  {/* Product Info */}
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold mt-2">
                      {product.name}
                    </h3>
                    <h3 className="text-lg font-semibold mt-2">
                      ${product.price}
                    </h3>
                  </div>
                </div>
              </a>
            ))
          ) : (
            <div className="absolute top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Loader2 className="animate-spin text-gray-500" size={32} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
