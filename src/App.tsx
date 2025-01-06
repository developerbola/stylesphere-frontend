import { Route, Routes, useLocation } from "react-router-dom";
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
  CheckOut,
  Edit,
} from "./pages/pages";
import { match } from "path-to-regexp";
import { Navbar, CartSheet, Footer } from "./components/components";
import { useEffect, useState } from "react";
import { UserProvider } from "./context/UserProvider";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [cartToggle, setCartToggle] = useState<boolean>(false);
  const location = useLocation();
  const [path, setPath] = useState<string>(location.pathname);
  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  const layoutPaths = [
    "/",
    "/about",
    "/products",
    "/products/:id",
    "/customer-service",
    "/profile",
    "/dashboard",
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
      {doesPathMatch(path, layoutPaths) && (
        <Navbar setCartToggle={setCartToggle} />
      )}
      {doesPathMatch(path, layoutPaths) && (
        <CartSheet cartToggle={cartToggle} setCartToggle={setCartToggle} />
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
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>
      <Toaster />
      {doesPathMatch(path, ["/"]) && !cartToggle && <Footer />}
    </UserProvider>
  );
};

export default App;
