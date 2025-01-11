import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "../context/UserProvider";
import { useProducts } from "../context/ProductsProvider";
import { useCategories } from "../context/CategoriesProvider";
import {
  handleAddCategory,
  handleDeleteCategory,
  handleAddProduct,
  handleDeleteProduct,
} from "../handlers/handlers";

const Dashboard = () => {
  // Importing stuff from context
  const { user } = useUser();
  const { products, addProduct, fetchProducts, deleteProduct } = useProducts();
  const { categories, deleteCategory, addCategory } = useCategories();

  // States
  const [newCategory, setNewCategory] = useState<{
    name: string;
    image: string;
  }>({
    name: "",
    image: "",
  });

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

  const handleCategoryChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewCategory((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Redirect non-admin users
  useEffect(() => {
    if (user?._id !== import.meta.env.VITE_ADMIN_ID) {
      toast.error("You are not admin bro");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
  }, [user]);

  return (
    <div className="px-4 my-[100px] sm:px-6 lg:px-8">
      <section className="w-full max-w-4xl mb-8 mx-auto">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="mb-4 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newCategory.name}
            onChange={handleCategoryChange}
            name="name"
            placeholder="New category name"
            className="border border-gray-300 p-2 rounded-md flex-1"
          />
          <input
            type="text"
            value={newCategory.image}
            onChange={handleCategoryChange}
            name="image"
            placeholder="New category image"
            className="border border-gray-300 p-2 rounded-md flex-1"
          />
          <button
            onClick={() => handleAddCategory(newCategory, addCategory)}
            className="p-2 bg-blue-500 text-white rounded-md"
          >
            Add Category
          </button>
        </div>
        <ul>
          {categories?.map((category) => (
            <li
              key={category._id}
              className="flex justify-between items-center w-full sm:w-1/2 lg:w-1/3 my-2"
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-[40px] w-[40px] rounded-md"
              />
              <p>{category.name}</p>
              <button
                onClick={() =>
                  handleDeleteCategory(category._id, deleteCategory)
                }
                className="text-red-500"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>

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
    </div>
  );
};

export default Dashboard;
