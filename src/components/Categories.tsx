import { Dispatch, SetStateAction } from "react";

interface CategoriesType {
  setCurrentCategory: Dispatch<SetStateAction<string>>;
  categories: null | undefined | Category[];
  currentCategory: string;
}

const Categories = ({
  setCurrentCategory,
  categories,
  currentCategory,
}: CategoriesType) => {
  const categoriesList = [
    { name: "All", image: "/category_svg/all.svg" },
    ...(categories || []),
  ];
  const matchIcon = (category_name: string): string => {
    switch (category_name) {
      case "All":
        return "/category_svg/all.svg";
        break;
      case "Shoes":
        return "/category_svg/shoe.svg";
        break;
      case "Clothes":
        return "/category_svg/clothe.svg";
        break;
      case "Watches":
        return "/category_svg/watch.svg";
        break;
      default:
        return "";
        break;
    }
  };
  return (
    <div className="w-full lg:w-1/5 rounded-lg p-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 hidden lg:block">
        Categories
      </h3>
      <ul className="grid grid-cols-3 lg:grid-cols-1 gap-3">
        {categoriesList.map((category: Category, idx) => {
          const categoryName = category.name;
          const active = currentCategory === categoryName;

          return (
            <li
              key={idx}
              className={`
                group 
                relative 
                cursor-pointer 
                py-2 
                px-3 
                rounded-md 
                transition-all 
                duration-300 
                ease-in-out
                ${
                  active
                    ? "bg-blue-100 font-bold"
                    : "hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                }
                flex 
                items-center
                space-x-2
              `}
              onClick={() => setCurrentCategory(categoryName)}
            >
              {category.image && (
                <img
                  src={matchIcon(category.name)}
                  alt={categoryName}
                  className={`
                    w-6 
                    h-6 
                    transition-opacity 
                    duration-300
                    ${
                      active
                        ? "opacity-100"
                        : "opacity-50 group-hover:opacity-75"
                    }
                  `}
                />
              )}

              {/* Category Name */}
              <span className="truncate exs:flex vxs:hidden">{categoryName}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
