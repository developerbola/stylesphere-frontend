import React, { useContext, useState } from "react";
import { Context } from "../context/context";
const Navbar: React.FC<NavbarProps> = ({ setCartToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [logout, setLogout] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const { user } = useContext(Context);
  return (
    <nav className="fixed w-full z-999 top-0 start-0 bg-[#ffffffcc] backdrop-blur-[10px]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-10 py-6">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/logo.svg" className="h-8 w-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            StyleSphere
          </span>
        </a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div className="flex gap-4">
            {user ? (
              <a href="/profile">
                <button
                  className="cursor-pointer uppercase font-semibold text-xl text-white bg-gray-950 rounded-full h-[40px] w-[40px] flex items-center justify-center"
                  onClick={() => setLogout(!logout)}
                >
                  {user.name[0]}
                </button>
              </a>
            ) : (
              <a href="/login" className="sm:flex vxs:hidden">
                <button
                  type="button"
                  className="text-gray-900 bg-transparent hover:bg-gray-900 hover:text-white hover:outline-none outline font-medium rounded-lg text-sm px-6 py-2 text-center"
                >
                  Login
                </button>
              </a>
            )}
            <button className="text-black outline-none" onClick={() => setCartToggle(true)}>
              <img src="/cart.svg" alt="cart icon" height={25} width={25} />
            </button>
          </div>
          <button
            onClick={handleToggle}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between ${
            isOpen ? "lg:block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li>
              <a
                href="/about"
                className="block py-2 px-3 text-gray-900 rounded md:hover:bg-transparent md:p-0"
              >
                About US
              </a>
            </li>
            <li>
              <a
                href="/products"
                className="block py-2 px-3 text-gray-900 rounded md:bg-transparent md:p-0"
              >
                Products
              </a>
            </li>
            <li>
              <a
                href="/customer-service"
                className="block py-2 px-3 text-gray-900 rounded md:hover:bg-transparent md:p-0"
              >
                Customer Sevice
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
