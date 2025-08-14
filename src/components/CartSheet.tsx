import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useUser } from "../context/UserProvider";
import toast from "react-hot-toast";
import { doesPathMatch } from "../utils/doesPathMatch";
import { useNavigate } from "react-router-dom";
import { CartItem } from "./CartItem";

const CartSheet: React.FC<CartSheetProps> = ({ cartToggle, setCartToggle }) => {
  const { user, setUserData } = useUser();
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (user && "cart" in user && user.cart.length) {
      setProducts(user.cart);
    }
  }, [user, cartToggle]);
  const totalPrice = products.reduce(
    (total, product) => total + product.price,
    0
  );
  const handleDeleteProduct = async (productId: string) => {
    toast
      .promise(api.deleteProductFromCart(productId, (user as User)?._id), {
        loading: "Deleting product...",
        success: "Product deleted from cart",
        error: (err) => `Error: ${err.response?.data?.message}`,
      })
      .then(async () => {
        const refreshedUserData = await api.fetchUser();
        setUserData(refreshedUserData);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
      })
      .catch((error) => {
        console.error(
          `Error deleting product from cart: ${error.response?.data?.message}`
        );
      });
  };

  if (!doesPathMatch()) return;
  return (
    <div
      className={`border-l fixed top-0 min-h-screen lg:w-[30%] md:w-[50%] sm:w-[50%] xs:w-[80%] vxs:w-[95%] p-[20px]  z-10 bg-[#ffffffcc] backdrop-blur-[15px] ${
        cartToggle ? "right-0" : "-right-full"
      } transition-right duration-500`}
    >
      {!user ? (
        <div className="h-full w-full flex flex-col items-center justify-center">
          <h1 className="text-center font-bold text-lg">Unautharized</h1>
          <p className="text-center text-sm">
            Please{" "}
            <a
              onClick={() => navigate("/login")}
              className="text-primary-600 underline"
            >
              login
            </a>{" "}
            to see your cart.
          </p>
        </div>
      ) : (
        <div className="h-screen flex flex-col justify-between pb-10">
          <div>
            <div className="flex justify-between items-center">
              <h1 className="flex gap-2 items-center text-[1.5rem] font-semibold">
                My Cart{" "}
                <img src="/cart.svg" alt="cart icon" height={20} width={20} />
              </h1>
              <div
                className="h-[28px] w-[28px] cursor-pointer"
                onClick={() => setCartToggle(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  height={28}
                  width={28}
                >
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </div>
            </div>
            <div
              className="flex flex-col gap-3 mt-5 h-full overflow-y-scroll"
              style={{ maxHeight: "calc(100vh - 200px)" }}
            >
              {products.length ? (
                products.map((item: Product, index: number) => {
                  return <CartItem item={item} handleDeleteProduct={handleDeleteProduct} key={index} />;
                })
              ) : (
                <h1>No Product in your cart</h1>
              )}
            </div>
          </div>
          <button
            className={`w-full h-[50px] bg-gray-900 text-white font-semibold rounded-md mt-5 ${
              totalPrice ? "" : "cursor-not-allowed"
            }`}
            onClick={() => {
              totalPrice ? navigate("/checkout") : "";
            }}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartSheet;
