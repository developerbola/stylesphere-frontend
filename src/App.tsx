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
  NotFound,
  Dashboard,
} from "./pages/pages";
import { match } from "path-to-regexp";
import { Navbar, CartSheet, Footer } from "./components/components";
import { useEffect, useState } from "react";
import { UserProvider, useUser } from "./context/UserProvider";
import { Toaster } from "react-hot-toast";

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

  useEffect(() => {
    if (cartToggle) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [cartToggle]);

  return (
    <UserProvider>
      {doesPathMatch(path, [...layoutPaths, "/dashboard"]) && (
        <>
          <Navbar setCartToggle={setCartToggle} />
        </>
      )}
      {doesPathMatch(path, layoutPaths) && (
        <>
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>
      <Toaster />
      {doesPathMatch(path, layoutPaths) && !cartToggle && <Footer />}
    </UserProvider>
  );
};

export default App;
