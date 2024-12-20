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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import { fetchUser } from "./features/user/userSlice";
const App = () => {
  const [cartToggle, setCartToggle] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { user, status } = useSelector((state: RootState) => state.user);

  // Fetch user data if status is idle
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUser());
    }
  }, [dispatch, status]);

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
