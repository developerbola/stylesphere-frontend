import { memo, useState } from "react";
import Cookies from "js-cookie";
import { useUser } from "../context/UserProvider";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { doesPathMatch } from "../utils/doesPathMatch";
const Navbar: React.FC<NavbarProps> = memo(({ setCartToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [logout, setLogout] = useState(false);
  const { user, isAdmin } = useUser();

  const token = Cookies.get("token");
  const navigate = useNavigate();
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const links = ["About", "Products", "Customer Service"];
  const adminLinks = [...links.slice(0, 2), "Dashboard"];

  if (!doesPathMatch()) return;
  return (
    <nav className="fixed w-full z-[5] top-0 start-0 bg-[#ffffffcc] backdrop-blur-[10px]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto xs:px-10 vxs:px-1 py-6">
        <a
          onClick={() => navigate("/")}
          className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer xs:w-auto vxs:w-1/3 justify-center"
        >
          <img
            src="/logo.svg"
            className="xs:h-8 vxs:h-10 xs:w-8 vxs:w-10 sm:flex xs:hidden vxs:flex"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap xs:flex vxs:hidden">
            StyleSphere
          </span>
        </a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div className="flex gap-4">
            {(user as User) ? (
              <div className="flex gap-3">
                <a onClick={() => navigate("/profile")}>
                  <button
                    className={`cursor-pointer uppercase font-semibold text-xl text-white bg-gray-950 rounded-full h-[40px] w-[40px] flex items-center justify-center`}
                    onClick={() => setLogout(!logout)}
                  >
                    {(user as User)?.name
                      ? (user as User).name[0].toUpperCase()
                      : ""}
                  </button>
                </a>
                {!isAdmin && (
                  <button
                    className="text-black outline-none"
                    onClick={() => setCartToggle(true)}
                  >
                    <img
                      src="/cart.svg"
                      alt="cart icon"
                      className="h-[32px] w-[32px]"
                    />
                  </button>
                )}
              </div>
            ) : token ? (
              <div className="flex gap-3">
                <button className="bg-gray-950 rounded-full h-[40px] w-[40px] flex items-center justify-center">
                  <Loader fill="white" className="scale-[40%]" />
                </button>
                <button
                  className="text-black outline-none"
                  onClick={() => setCartToggle(true)}
                >
                  <img
                    src="/cart.svg"
                    alt="cart icon"
                    className="h-[32px] w-[32px]"
                  />
                </button>
              </div>
            ) : (
              <a onClick={() => navigate("/login")}>
                <button
                  type="button"
                  className="text-gray-900 bg-transparent hover:bg-gray-900 hover:text-white hover:border-none border-black border-[1.5px] font-medium rounded-lg text-sm px-6 py-2 text-center"
                >
                  Login
                </button>
              </a>
            )}
          </div>
          <button
            onClick={handleToggle}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black rounded-lg md:hidden hover:bg-gray-100 focus:outline-none"
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
            {(isAdmin ? adminLinks : links).map((link) => (
              <li key={link} onClick={handleToggle}>
                <a
                  onClick={() =>
                    navigate(link.split(" ").join("-").toLowerCase())
                  }
                  className="cursor-pointer block py-2 px-3 text-gray-900 rounded md:hover:bg-transparent md:p-0"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
});

export default Navbar;
