import { useEffect, useState } from "react";
import { api } from "../../api/api";

const Filter = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await api.getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getCategories();
  }, []);

  return (
    <div className="min-h-[300px] px-10 flex flex-col gap-4">
      <h1 className="text-[3rem] text-start">Product Categories</h1>
      <div className="flex justify-between min-h-[90vh]">
        {categories.map((category: Category) => (
          <a
            key={category.name}
            href={`/products?category=${category.name}`}
            className="w-[32%] h-[300px] group"
          >
            <div className="flex flex-col gap-2 w-full h-full bg-slate-100 rounded-lg">
              <img
                src={category.image}
                alt={`Image of ${category.name}`}
                className="h-[350px] w-full object-cover"
              />
              <h1 className="text-2xl group-hover:underline capitalize">
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
