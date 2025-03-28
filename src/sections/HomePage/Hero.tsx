import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [products, setProducts] = useState<Product[] | null | undefined>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchdata = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/products`,
          {
            cache: "force-cache",
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
        setIsLoading(false);
      } catch (error: any) {
        console.log("Error fetching products: " + error.message);
      }
    };
    fetchdata();
  }, []);

  return (
    <div className="h-screen flex items-center sm:px-16 vxs:px-0">
      <div className="h-full lg:w-1/2 vxs:w-full flex flex-col gap-3 justify-center">
        <h1 className="font-extrabold w-full text-[2.2rem] xs:text-[2.8rem] sm:text-[3.6rem] lg:text-[4rem]">
          Choose{" "}
          <span className="bg-black text-white px-3 rounded-2xl">Your</span>{" "}
          Trendy Collection
        </h1>
        <div className="flex items-center gap-4 w-full lg:w-3/5 pl-3">
          <div className="h-[80%] w-[10px] sm:w-[18px] rounded-lg bg-gray-900"></div>
          <p className="font-semibold text-sm vxs:text-sm sm:text-base lg:text-lg">
            Explore a bold new style that reflects your unique personality.
          </p>
        </div>
        <div className="py-4 flex gap-4">
          <button
            onClick={() => navigate("/products")}
            className="cursor-pointer active:scale-95 transition-all flex gap-2 text-white bg-black font-medium rounded-lg text-md px-6 py-2 text-center whitespace-nowrap"
          >
            Shop Now 
            <img src="/cart.svg" className="invert" height={15} width={15} />
          </button>
        </div>
      </div>
      <div
        className="h-full w-1/2 lg:flex vxs:hidden items-center justify-around"
        id="image_container"
      >
        {isLoading ? (
          <>
            <div
              className={`skeleton w-[280px] h-[400px] rounded-3xl group bg-gray-200 flex items-center justify-center overflow-hidden mt-16`}
            />
            <div
              className={`skeleton w-[280px] h-[400px] rounded-3xl group bg-gray-200 flex items-center justify-center overflow-hidden -mt-16`}
            />
          </>
        ) : (
          products?.slice(0, 2).map((product: Product, index: number) => {
            return (
              <div
                className={`w-[280px] h-[400px] rounded-3xl group flex items-end justify-center overflow-hidden ${
                  index % 2 ? "-mt-16" : "mt-16"
                } pb-4`}
                style={{
                  background: `url(${product.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                key={index}
              >
                <a
                  onClick={() => navigate(`/products/${product._id}`)}
                  className="w-2/3"
                >
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#00000030] backdrop-blur-md p-3 px-4 w-full rounded-xl text-white z-10">
                    Discover
                  </button>
                </a>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Hero;
