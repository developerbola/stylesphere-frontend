import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "../context/UserProvider";
import { useCategories } from "../context/CategoriesProvider";
import { handleAddCategory, handleDeleteCategory } from "../handlers/handlers";
import { DashboardSidebar } from "../components/components";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const { user } = useUser();
  // const { categories, deleteCategory, addCategory } = useCategories();

  // States
  const [newCategory, setNewCategory] = useState<{
    name: string;
    image: string;
  }>({
    name: "",
    image: "",
  });

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
    <div className="flex h-screen">
      <DashboardSidebar />
      <div className="p-6 mt-6 lg:w-[calc(100dvw - 224px)] vxs:w-full">
        <Outlet />
      </div>
      {/* <section className="w-full max-w-4xl mb-8 mx-auto">
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
      </section> */}
    </div>
  );
};

export default Dashboard;
