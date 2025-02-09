import { ChangeEvent, useState } from "react";
import { useProducts } from "../../context/ProductsProvider";
import { handleAddProduct, handleDeleteProduct } from "../../handlers/handlers";
import { useCategories } from "../../context/CategoriesProvider";
const DashboardProducts = () => {
  const { products, addProduct, fetchProducts, deleteProduct } = useProducts();
  const { categories } = useCategories();
  const [newProduct, setNewProduct] = useState<{
    name: string | undefined;
    price: number | undefined;
    image: string | undefined;
    category: string | undefined;
  }>({
    name: "",
    price: 0,
    image: "",
    category: "",
  });
  const handleProductChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <section className="w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add Product</h2>
      <div className="mb-4">
        <input
          type="text"
          className="border border-gray-300 p-2 rounded-md w-full mb-2"
          placeholder="Enter product name"
          onChange={handleProductChange}
          name="name"
          value={newProduct.name || ""}
        />
        <input
          type="text"
          className="border border-gray-300 p-2 rounded-md w-full mb-2"
          placeholder="Enter product image URL"
          onChange={handleProductChange}
          name="image"
          value={newProduct.image || ""}
        />
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 mb-2">
          <span className="text-gray-500">$</span>
          <input
            type="number"
            className="flex-1 ml-2 border-none focus:ring-0 focus:outline-none"
            placeholder="Enter price"
            name="price"
            onChange={handleProductChange}
            value={newProduct.price || ""}
          />
        </div>
        <select
          className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 text-gray-700 py-2 px-4 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 mb-4"
          value={newProduct.category || ""}
          onChange={(e) =>
            setNewProduct((prevData) => ({
              ...prevData,
              category: e.target.value,
            }))
          }
        >
          {categories?.map((cat) => (
            <option value={cat.name} key={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button
          onClick={() =>
            handleAddProduct(newProduct, addProduct, fetchProducts)
          }
          className="p-2 bg-blue-500 text-white rounded-md w-full"
        >
          Add Product
        </button>
      </div>
      <h2 className="text-xl font-semibold mb-4">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products?.map((product) => (
          <div key={product._id}>
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
        ))}
      </div>
    </section>
  );
};

export default DashboardProducts;
