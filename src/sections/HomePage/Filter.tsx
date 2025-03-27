import { useNavigate } from "react-router-dom";
import { useCategories } from "../../context/CategoriesProvider";

const Filter = () => {
  const { categories, isLoading } = useCategories();
  const navigate = useNavigate();
  return (
    <div className="min-h-[300px] p-4 mb-[100px] md:px-10 flex flex-col">
      <h1 className="text-2xl md:text-[3rem] text-start mb-[20px]">
        Product Categories
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading
          ? [0, 1, 2].map(() => {
              return (
                <div className="flex flex-col gap-2 w-full h-full rounded-lg">
                  <div className="h-[200px] md:h-[350px] w-full skeleton" />
                  <span className="h-[50px] w-full skeleton" />
                </div>
              );
            })
          : categories?.map((category: Category) => (
              <a
                key={category.name}
                onClick={() => navigate(`/products?category=${category.name}`)}
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
