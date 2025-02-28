import { useState } from "react";
import AddProducts from "../../components/AddProducts";
import { useProducts } from "../../context/ProductsProvider";
import { handleDeleteProduct } from "../../handlers/handlers";
import { Loader2, Plus } from "lucide-react";

const DashboardProducts = () => {
  const { products, deleteProduct, isError, isLoading } = useProducts();
  const [toggle, setToggle] = useState(false);

  return (
    <section className="min-h-[50dvh] flex w-full justify-center px-4">
      <div className="w-full max-w-7xl">
        <AddProducts toggle={toggle} setToggle={setToggle} />

        <h2 className="text-xl font-semibold mb-4">Products</h2>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="animate-spin text-gray-500" size={32} />
          </div>
        )}

        {/* Error State */}
        {isError && (
          <p className="text-red-500 text-center">Failed to load products.</p>
        )}

        {/* Products Grid */}
        {!isLoading &&
        !isError &&
        Array.isArray(products) &&
        products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="max-w-[270px] overflow-hidden bg-white p-4"
              >
                {/* Product Image */}
                <div className="relative h-[200px] w-full overflow-hidden rounded-md bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-all duration-500 ease-in-out scale-105 blur-sm"
                    onLoad={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.classList.remove("blur-sm");
                      img.classList.add("scale-100");
                    }}
                  />
                </div>

                {/* Product Info */}
                <h3 className="text-lg font-semibold mt-2">{product.name}</h3>

                <div className="flex justify-between items-center mt-2">
                  <h3 className="text-lg font-semibold text-gray-700">
                    ${product.price}
                  </h3>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        (window.location.href = `/edit/${product._id}`)
                      }
                      className="text-blue-500 hover:text-blue-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteProduct(product._id, deleteProduct)
                      }
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !isLoading &&
          !isError && (
            <p className="text-center text-gray-500">No products found.</p>
          )
        )}

        {/* Floating Add Button */}
        <button
          className="fixed bottom-6 right-6 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-900 transition"
          onClick={() => setToggle(true)}
        >
          <Plus size={24} />
        </button>
      </div>
    </section>
  );
};

export default DashboardProducts;
