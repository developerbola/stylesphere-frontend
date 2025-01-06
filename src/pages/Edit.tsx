import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/api";
import toast from "react-hot-toast";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<string[] | undefined>([""]);

  const [formData, setFormData] = useState<{
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
  useEffect(() => {
    setFormData({
      name: product?.name,
      price: product?.price,
      image: product?.image,
      category: product?.category.toLowerCase(),
    });
  }, [product]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!id) {
          toast.error("Invalid product ID");
          return;
        }
        const res = await api.getProduct(id);

        if (res) {
          setProduct(res.data);
        } else {
          toast.error("Failed to fetch product");
        }

        const categoriesRes = await api.getCategories();
        setCategories(
          categoriesRes?.data.map((category: { name: string }) => category.name)
        );
      } catch (error) {
        toast.error("Failed to fetch product");
      }
    };

    fetch();
  }, [id]);
  const handleEdit = async () => {
    try {
      await api.updateProduct(product?._id, formData);
      toast.success("Edited successfully");
      toast(() => (
        <span className="flex gap-2 items-center">
          Go to the Products page
          <button
            onClick={() => navigate("/products")}
            className="p-2 px-3 rounded-md bg-gray-950 text-white"
          >
            Go
          </button>
        </span>
      ));
    } catch (error) {
      toast.error("An error occured on editing product");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/4 flex flex-col gap-3">
        <img
          src={product?.image}
          alt={product?.name}
          className="h-[350px] w-[400px]"
        />
        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleEdit();
          }}
        >
          <input
            type="text"
            className="border border-gray-300 p-2 rounded-md w-full"
            placeholder="Enter product name"
            onChange={handleChange}
            name="name"
            value={formData.name}
          />
          <input
            type="text"
            className="border border-gray-300 p-2 rounded-md w-full"
            placeholder="Enter product name"
            onChange={handleChange}
            name="image"
            value={formData.image}
          />
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <span className="text-gray-500">$</span>
            <input
              type="number"
              className="flex-1 ml-2 border-none focus:ring-0 focus:outline-none"
              placeholder="Enter price"
              name="price"
              onChange={handleChange}
              value={formData.price}
            />
          </div>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 text-gray-700 py-2 px-4 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
              value={formData.category}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  category: e.target.value,
                }))
              }
            >
              {categories?.map((cat) => {
                return (
                  <option value={cat} key={cat}>
                    {cat}
                  </option>
                );
              })}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>

          <button className="w-full rounded-lg bg-gray-950 text-white p-2 font-semibold focus:outline-none">
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
