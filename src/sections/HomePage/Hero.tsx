import { Loader } from "../../components/components";
import { useProducts } from "../../context/ProductsProvider";

const Hero = () => {
  const { products, isLoading } = useProducts();
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
          <a href="/products">
            <button className="active:scale-95 transition-all flex gap-2 text-white bg-black font-medium rounded-lg text-md px-6 py-2 text-center whitespace-nowrap">
              Shop Now
            </button>
          </a>
          <button className="active:scale-95 transition-all flex gap-2 text-white bg-black font-medium rounded-lg text-md px-6 py-2 text-center whitespace-nowrap">
            Make Style
          </button>
        </div>
      </div>
      <div
        className="h-full w-1/2 lg:flex vxs:hidden items-center justify-around"
        id="image_container"
      >
        {isLoading ? (
          <Loader />
        ) : (
          products?.slice(0, 2).map((product: Product, index: number) => {
            return (
              <div
                className={`w-[280px] h-[400px] rounded-3xl group flex items-end gap-2 justify-center overflow-hidden ${
                  index % 2 ? "-mt-16" : "mt-16"
                } pb-4`}
                style={{
                  background: `url(${product.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                key={index}
              >
                <a href={`/products/${product._id}`} className="w-2/3">
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
