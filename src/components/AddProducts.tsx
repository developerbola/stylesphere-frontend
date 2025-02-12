import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { useProducts } from "../context/ProductsProvider";
import { useCategories } from "../context/CategoriesProvider";
import { handleAddProduct } from "../handlers/handleAddProduct";
import { X } from "lucide-react";
const AddProducts: React.FC<{
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
}> = ({ toggle, setToggle }) => {
  const { addProduct, fetchProducts } = useProducts();
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
    <div
      className={`absolute z-20 top-0 left-0 h-dvh px-5 w-dvw bg-white grid place-items-center transition-opacity ${
        toggle ? "" : "opacity-0 invisible"
      }`}
    >
      <div>
        <button
          className="absolute top-5 right-7"
          onClick={() => setToggle(false)}
        >
          <X size={35} />
        </button>
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
            onClick={() => {
              handleAddProduct(newProduct, addProduct, fetchProducts);
              setToggle(false);
            }}
            className="p-2 bg-gray-950 text-white rounded-md w-full"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
