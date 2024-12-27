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
import { api } from "./api/api";
const App = () => {
  const [cartToggle, setCartToggle] = useState<boolean>(false);
  const [user, setUser] = useState<User | null | Promise<void>>(null);
  // Fetch user data if status is idle
  useEffect(() => {
    setUser(api.fetchUser());
  }, []);

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
