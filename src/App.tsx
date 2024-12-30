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
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/UserProvider";
const App = () => {
  const [cartToggle, setCartToggle] = useState<boolean>(false);
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
    <UserProvider>
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
    </UserProvider>
  );
};

export default App;
