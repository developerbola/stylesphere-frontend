import { useState } from "react";
import AddProducts from "../../components/AddProducts";
import { useProducts } from "../../context/ProductsProvider";
import { handleDeleteProduct } from "../../handlers/handlers";
import { Loader2, Plus } from "lucide-react";
const DashboardProducts = () => {
  const { products, deleteProduct } = useProducts();
  const [toggle, setToggle] = useState<boolean>(false);
  return (
    <section className="overflow-x-hidden min-h-[50dvh] md:pr-5 vxs:pr-0 flex w-full justify-center">
      <div>
        <AddProducts toggle={toggle} setToggle={setToggle} />
        <h2
          className="text-xl font-semibold mb-4"
          style={{ minWidth: "calc(100dvw - 224px)" }}
        >
          Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products ? (
            products?.map((product) => (
              <div key={product._id} className="max-w-[270px] overflow-hidden">
                <div className="relative h-[200px] w-full overflow-hidden rounded-md">
                  <img
                    src={product.image}
                    srcSet={product.image}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-all duration-700 ease-in-out grayscale-0 scale-110 blur-sm"
                    onLoad={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.classList.remove("blur-sm");
                      img.classList.add("scale-100");
                    }}
                  />
                </div>

                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <div className="flex justify-between items-center h-[30px]">
                  <h3 className="text-lg font-semibold">${product.price}</h3>
                  <div>
                    <button
                      onClick={() =>
                        (window.location.href = `/edit/${product._id}`)
                      }
                      className="mr-2 text-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteProduct(product._id, deleteProduct)
                      }
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full w-full grid place-items-center">
              <Loader2 size={30} className="spin" />
            </div>
          )}
        </div>
        <button
          className="fixed md:top-[90dvh] vxs:top-[80dvh] lg:left-[95dvw] md:left-[90dvw] vxs:left-[80dvw] bg-black p-3 outline-none border-none rounded-full"
          onClick={() => setToggle(true)}
        >
          <Plus color="white" />
        </button>
      </div>
    </section>
  );
};

export default DashboardProducts;
