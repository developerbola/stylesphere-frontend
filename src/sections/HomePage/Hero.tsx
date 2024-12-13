import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { Loader } from "../../components/components";

const Hero = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const getAllProducts = async () => {
      const { data } = await api.getProducts();
      setProducts(data.slice(0, 2));
    };
    getAllProducts();
  }, []);
  return (
    <div className="h-screen flex items-center px-16">
      <div className="h-full w-[50%] flex flex-col gap-3 justify-center">
        <h1 className="text-[4rem] font-extrabold w-[90%]">
          Choose <span className="bg-black text-white px-3 rounded-2xl">Your</span> Trendy Collection
        </h1>
        <div className="flex items-center gap-4 w-[60%] pl-3">
          <div className="h-[80%] w-[18px] rounded-lg bg-gray-900"></div>
          <p className="text-lg font-semibold">
            Explore a bold new style that reflects your unique personality.
          </p>
        </div>
        <div className="py-4 flex gap-4">
          <a href="/products">
            <button className="active:scale-95 transition-all flex gap-2 text-white bg-black font-medium rounded-lg text-md px-6 py-2 text-center">
              Shop Now
            </button>
          </a>
          <button className="active:scale-95 transition-all flex gap-2 text-white bg-black font-medium rounded-lg text-md px-6 py-2 text-center">
            Make Your Style
          </button>
        </div>
      </div>
      <div
        className="h-full w-1/2 flex items-center justify-around"
        id="image_container"
      >
        {products.length === 0 ? (
          <Loader />
        ) : (
          products.map((product: Product, index: number) => {
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
                <a href={`/products/${product.id}`}>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#00000030] backdrop-blur-md p-3 px-4 rounded-xl text-white z-10">
                    Discover
                  </button>
                </a>
                <button className="flex gap-2 items-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#00000030] backdrop-blur-md p-3 rounded-xl text-white z-10">
                  Add
                  <img
                    src="/cart.svg"
                    alt="cart icon"
                    height={15}
                    width={15}
                    style={{ filter: "invert(1)" }}
                  />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Hero;
