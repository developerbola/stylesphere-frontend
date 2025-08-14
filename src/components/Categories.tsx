import React, {
  Dispatch,
  SetStateAction,
  useMemo,
  useCallback,
  useEffect,
} from "react";

interface Category {
  name: string;
  image?: string;
}

interface CategoriesType {
  setCurrentCategory: Dispatch<SetStateAction<string>>;
  categories: null | undefined | Category[];
  currentCategory: string;
}

// Single memoized list item
const CategoryItem = React.memo(
  ({
    category,
    active,
    matchIcon,
    setCurrentCategory,
  }: {
    category: Category;
    active: boolean;
    matchIcon: (name: string) => string;
    setCurrentCategory: Dispatch<SetStateAction<string>>;
  }) => {
    const categoryName = category.name;

    return (
      <li
        key={categoryName}
        className={`group relative cursor-pointer py-2 px-3 rounded-md transition-all duration-300 ease-in-out ${
          active
            ? "bg-gray-950 text-white font-medium"
            : "hover:bg-gray-100 text-gray-700 hover:text-gray-900"
        } flex items-center space-x-2 exs:w-[90%] vxs:w-[45px] h-auto`}
        onClick={() => setCurrentCategory(categoryName)}
      >
        {category.image && (
          <img
            src={matchIcon(categoryName)}
            alt={categoryName}
            className={`w-6 h-6 transition-all duration-300
              ${
                active
                  ? "mix-blend-difference brightness-200 invert"
                  : "opacity-50 group-hover:opacity-75"
              }`}
          />
        )}
        <span className="truncate exs:flex vxs:hidden">{categoryName}</span>
      </li>
    );
  }
);

const Categories = ({
  setCurrentCategory,
  categories,
  currentCategory,
}: CategoriesType) => {
  // Preload icons for smoother rendering
  useEffect(() => {
    const icons = [
      "/category_svg/all.svg",
      "/category_svg/shoe.svg",
      "/category_svg/clothe.svg",
      "/category_svg/watch.svg",
    ];
    icons.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Memoize category list
  const categoriesList = useMemo(
    () => [
      { name: "All", image: "/category_svg/all.svg" },
      ...(categories || []),
    ],
    [categories]
  );

  // Memoize icon matcher
  const matchIcon = useCallback((category_name: string): string => {
    switch (category_name) {
      case "All":
        return "/category_svg/all.svg";
      case "Shoes":
        return "/category_svg/shoe.svg";
      case "Clothes":
        return "/category_svg/clothe.svg";
      case "Watches":
        return "/category_svg/watch.svg";
      default:
        return "";
    }
  }, []);

  return (
    <div className="w-full lg:w-1/5 rounded-lg p-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 hidden lg:block">
        Categories
      </h3>
      <ul className="grid vxs:grid-cols-4 exs:grid-cols-3 lg:grid-cols-1 gap-3 exs:place-items-start vxs:place-items-center">
        {categoriesList.map((category) => (
          <CategoryItem
            key={category.name}
            category={category}
            active={currentCategory === category.name}
            matchIcon={matchIcon}
            setCurrentCategory={setCurrentCategory}
          />
        ))}
      </ul>
    </div>
  );
};

export default Categories;
