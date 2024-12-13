import { Route, Routes } from "react-router-dom";
import {
  Home,
  About,
  Products,
  CustomerService,
  Login,
  SignUp,
  Product,
} from "./pages/pages";
import { match } from "path-to-regexp";
import { Navbar, CartSheet, Footer } from "./components/components";
import { useState } from "react";
const App = () => {
  const [cartToggle, setCartToggle] = useState<boolean>(false);
  const path = window.location.pathname;

  const layoutPaths = [
    "/",
    "/about",
    "/products",
    "/products/:id",
    "/customer-service",
  ];

  const doesPathMatch = (path: string, routes: string[]) => {
    return routes.some((route) => {
      const matcher = match(route, { decode: decodeURIComponent });
      return matcher(path);
    });
  };
  return (
    <>
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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </main>
      {doesPathMatch(path, layoutPaths) && (
        <>
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
