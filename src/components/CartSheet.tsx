import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useUser } from "../context/UserProvider";
import toast from "react-hot-toast";

const CartSheet: React.FC<CartSheetProps> = ({ cartToggle, setCartToggle }) => {
  const { user, setUser } = useUser();
  const [products, setProducts] = useState<Product[]>([]);
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
    try {
      await api.deleteProductFromCart(productId, (user as User)?._id);

      const refreshedUserData = await api.fetchUser();
      setUser(refreshedUserData);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );

      toast.success(`Product deleted from cart`);
    } catch (error: any) {
      console.error(
        `Error deleting product from cart: ${error.response?.data?.message}`
      );
    }
  };

  return (
    <div
      className={`border-l fixed top-0 min-h-screen md:w-[30%] xs:w-[50%] vxs:w-[80%] p-[30px] z-[99999999] bg-[#ffffffcc] backdrop-blur-[15px] ${
        cartToggle ? "right-0" : "-right-[100%]"
      } transition-right duration-500`}
      onMouseOver={() => setCartToggle(true)}
      onMouseOut={() => setCartToggle(false)}
    >
      {!user ? (
        <div className="h-full w-full flex flex-col items-center justify-center">
          <h1 className="text-center font-bold text-lg">Unautharized</h1>
          <p className="text-center text-sm">
            Please{" "}
            <a href="/login" className="text-primary-600 underline">
              login
            </a>{" "}
            to see your cart.
          </p>
        </div>
      ) : (
        <div className="h-screen">
          <div className="flex justify-between items-center">
            <h1 className="flex gap-2 items-center text-[1.5rem] font-[600]">
              My Cart{" "}
              <img src="/cart.svg" alt="cart icon" height={20} width={20} />
            </h1>
            <h1 className="text-[1.5rem]">${totalPrice}</h1>
          </div>
          <div
            className="flex flex-col gap-2 mt-5 h-full overflow-y-scroll"
            style={{ maxHeight: "calc(100vh - 200px)" }}
          >
            {products.length ? (
              products.map((item: Product, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-[40px] h-[40px] object-cover rounded-md"
                      />
                      <h1 className="text-[1.3rem]">{item.name}</h1>
                    </div>
                    <div className="flex gap-5">
                      <h1 className="text-[1.3rem]">${item.price}</h1>
                      <button
                        className="h-[30px] w-[30px] bg-red-600 rounded-md flex items-center justify-center"
                        onClick={() => handleDeleteProduct(item._id)}
                      >
                        <img
                          src="/trash.svg"
                          alt="trash icon"
                          className="h-[16px] w-[16px]"
                        />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1>No Product in your cart</h1>
            )}
          </div>
          <div>
            <button
              className="w-full h-[50px] bg-gray-900 text-white font-semibold rounded-md mt-5"
              onClick={() => {
                window.location.href = "/checkout";
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSheet;
