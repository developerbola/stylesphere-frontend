import { useEffect, useState } from "react";
import { api } from "../../api/api";

const Filter = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await api.getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getCategories();
  }, []);

  return (
    <div className="min-h-[300px] px-4 md:px-10 flex flex-col gap-4 mb-48">
      <h1 className="text-2xl md:text-[3rem] text-start">Product Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[90vh]">
        {categories.map((category: Category) => (
          <a
            key={category.name}
            href={`/products?category=${category.name}`}
            className="group"
          >
            <div className="flex flex-col gap-2 w-full h-full rounded-lg">
              <img
                src={category.image}
                alt={`Image of ${category.name}`}
                className="h-[200px] md:h-[350px] w-full object-cover"
              />
              <h1 className="text-xl md:text-2xl group-hover:underline capitalize">
                {category.name}
              </h1>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Filter;
