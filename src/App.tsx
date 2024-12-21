import { Route, Routes } from "react-router-dom";
import {
  Home,
  About,
  Products,
  CustomerService,
  Login,
  SignUp,
  Product,
  Profile,
} from "./pages/pages";
import { match } from "path-to-regexp";
import { Navbar, CartSheet, Footer } from "./components/components";
import { useEffect, useState } from "react";
import { Context } from "./context/context";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import axios from "axios";
const App = () => {
  const [cartToggle, setCartToggle] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  // Fetch user data if status is idle
  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get("token");
      if (!token) return;
      const savedUser = localStorage.getItem("user");
      if (savedUser) setUser(JSON.parse(savedUser));

      try {
        await axios
          .get(`${import.meta.env.VITE_BACKEND_URL}/users/user`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            setUser(res.data);
            localStorage.setItem("user", JSON.stringify(res.data));
          });
      } catch (error: any) {
        console.log("Error fetching user:", error); // Log the error
        toast.error("Error:", error);
      }
    };
    fetchUser();
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user"); // Clear if user becomes null
    }
  }, [user]);

  const path = window.location.pathname;
  const layoutPaths = [
    "/",
    "/about",
    "/products",
    "/products/:id",
    "/customer-service",
    "/profile",
  ];

  const doesPathMatch = (path: string, routes: string[]) => {
    return routes.some((route) => {
      const matcher = match(route, { decode: decodeURIComponent });
      return matcher(path);
    });
  };
  return (
    <>
      <Context.Provider value={{ user }}>
        {doesPathMatch(path, layoutPaths) && (
          <>
            <Navbar setCartToggle={setCartToggle} />
            <CartSheet cartToggle={cartToggle} setCartToggle={setCartToggle} />
          </>
        )}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/customer-service" element={<CustomerService />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
          <ToastContainer autoClose={1500} position="bottom-right" />
        </main>
        {doesPathMatch(path, layoutPaths) && <Footer />}
      </Context.Provider>
    </>
  );
};

export default App;
