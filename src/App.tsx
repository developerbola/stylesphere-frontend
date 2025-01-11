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
  CheckOut,
  Edit,
} from "./pages/pages";
import { Navbar, CartSheet, Footer } from "./components/components";
import { useEffect, useState } from "react";
import { UserProvider } from "./context/UserProvider";
import { Toaster } from "react-hot-toast";
import { isServerRunning } from "./api/api";
import { ProductsProvider } from "./context/ProductsProvider";
import { CategoriesProvider } from "./context/CategoriesProvider";

const App = () => {
  const [cartToggle, setCartToggle] = useState<boolean>(false);

  useEffect(() => {
    if (cartToggle) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [cartToggle]);
  const [serverError, setServerError] = useState<boolean>(false);

  useEffect(() => {
    const checkServerStatus = async () => {
      const running = await isServerRunning();
      if (!running) {
        setServerError(true);
      }
    };
    checkServerStatus();
  }, []);

  if (serverError) {
    return (
      <div className="flex items-center justify-center h-screen">
        Internal server error | 500
      </div>
    );
  }

  return (
    <UserProvider>
      <ProductsProvider>
        <CategoriesProvider>
          <Navbar setCartToggle={setCartToggle} />
          <CartSheet cartToggle={cartToggle} setCartToggle={setCartToggle} />
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
          <Footer />
        </CategoriesProvider>
      </ProductsProvider>
    </UserProvider>
  );
};

export default App;
