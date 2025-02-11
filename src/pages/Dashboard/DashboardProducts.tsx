import { useState } from "react";
import AddProducts from "../../components/AddProducts";
import { useProducts } from "../../context/ProductsProvider";
import { handleDeleteProduct } from "../../handlers/handlers";
import { Loader2, Plus } from "lucide-react";
const DashboardProducts = () => {
  const { products, deleteProduct } = useProducts();
  const [toggle, setToggle] = useState<boolean>(false);
  return (
    <section className="relative overflow-x-hidden">
      <AddProducts toggle={toggle} setToggle={setToggle} />
      <h2 className="text-xl font-semibold mb-4">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products ? (
          products?.map((product) => (
            <div key={product._id} className="max-w-[300px]">
              <img
                src={product.image}
                alt={product.name}
                className="h-[200px] w-full object-cover rounded-md mb-2"
              />
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
          <div className="h-full w-full bg-red-400 grid place-items-center">
            <Loader2 size={30} className="spin" />
          </div>
        )}
      </div>
      {/* <button
        className="absolute top-[80%] left-[95%] bg-gray-950 p-3 outline-none border-none rounded-full"
        onClick={() => setToggle(true)}
      >
        <Plus color="white" />
      </button> */}
    </section>
  );
};

export default DashboardProducts;
