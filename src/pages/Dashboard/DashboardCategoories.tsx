import { ChangeEvent, useState } from "react";
import { useCategories } from "../../context/CategoriesProvider";
import {
  handleAddCategory,
  handleDeleteCategory,
} from "../../handlers/handlers";

const DashboardCategories = () => {
  const { categories, deleteCategory, addCategory } = useCategories();

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

  return (
    <div>
      <section className="w-full max-w-4xl bg-white rounded-lg p-4 md:p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Manage Categories
        </h2>

        {/* Add Category Form */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Add New Category
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1 md:col-span-1">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category Name
              </label>
              <input
                type="text"
                id="name"
                value={newCategory.name}
                onChange={handleCategoryChange}
                name="name"
                placeholder="Clothes"
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="col-span-1 md:col-span-1">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Image URL
              </label>
              <input
                type="text"
                id="image"
                value={newCategory.image}
                onChange={handleCategoryChange}
                name="image"
                placeholder="https://example.com/image.jpg"
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="col-span-1 md:col-span-1 flex items-end">
              <button
                onClick={() => {
                  handleAddCategory(newCategory, addCategory);
                  setNewCategory({ name: "", image: "" });
                }}
                disabled={!newCategory.name || !newCategory.image}
                className="w-full py-2 px-4 bg-gray-950 hover:bg-gray-900 text-white font-medium rounded-md transition duration-200 disabled:cursor-not-allowed"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>

        {/* Categories List */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Existing Categories
          </h3>
          {categories?.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No categories found. Add your first category above.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categories?.map((category) => (
                    <tr key={category._id} className="hover:bg-gray-50">
                      <td className="px-6 py-3 whitespace-nowrap">
                        <div className="shrink-0 h-10 w-10">
                          <img
                            src={category.image}
                            alt={category.name}
                            className="h-10 w-10 rounded-md object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://via.placeholder.com/40";
                            }}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-base font-medium text-gray-900">
                          {category.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() =>
                            handleDeleteCategory(
                              category._id ?? "",
                              deleteCategory
                            )
                          }
                          className="text-red-600 hover:text-red-900 transition duration-200"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DashboardCategories;
