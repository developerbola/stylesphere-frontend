import { useState } from "react";

const CartSheet: React.FC<CartSheetProps> = ({ cartToggle, setCartToggle }) => {
  const [count, setCount] = useState(1);
  const cartAdded = [
    {
      id: 1,
      name: "T-Shirt",
      price: 55,
      quantity: 1,
      img: "/category/clothe.jpg",
    },
  ];
  return (
    <div
      className={`transition-all duration-500 ${
        cartToggle ? "right-0" : "-right-[29%]"
      } fixed  bg-[#ffffffcc] backdrop-blur-[15px] h-screen w-[29%] p-[30px] z-[99999]`}
      onMouseEnter={() => setCartToggle(true)}
      onMouseLeave={() => setCartToggle(false)}
    >
      <div className="flex justify-between items-center">
        <h1 className="flex gap-2 items-center text-[1.5rem] font-[600]">
          My Cart <img src="/cart.svg" alt="cart icon" height={20} width={20} />
        </h1>
        <h1 className="text-[1.5rem]">${count * cartAdded[0].price}</h1>
      </div>
      <div className="flex flex-col gap-2 mt-5">
        {cartAdded.map((item) => {
          return (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-[40px] h-[40px] object-cover rounded-md"
                />
                <h1 className="text-[1.3rem]">{item.name}</h1>
              </div>
              <div className="flex gap-5">
                <div className="flex gap-2 text-[1.3rem] select-none">
                  <button
                    onClick={() => {
                      if (count == 1) {
                        confirm("Do you want to delete this item?") &&
                          setCount(count - 1);
                      } else {
                        setCount(count - 1);
                      }
                    }}
                    className="flex items-center bg-gray-100 px-2 rounded-md"
                  >
                    -
                  </button>
                  <h1>{count}</h1>
                  <button
                    onClick={() => setCount(count + 1)}
                    className="flex items-center bg-gray-100 px-2 rounded-md"
                  >
                    +
                  </button>
                </div>
                <h1 className="text-[1.3rem]">${item.price * count}</h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartSheet;
