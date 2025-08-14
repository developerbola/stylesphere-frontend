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
  DashboardUsers,
  DashboardProducts,
  MakeStyle,
} from "./pages/pages";
import { Navbar, CartSheet, Footer } from "./components/components";
import { useEffect, useState } from "react";
import { UserProvider } from "./context/UserProvider";
import { Toaster } from "react-hot-toast";
import { isServerRunning } from "./api/api";
import { ProductsProvider } from "./context/ProductsProvider";
import { CategoriesProvider } from "./context/CategoriesProvider";
import { UsersProvider } from "./context/UsersProvider";
import DashboardCategoories from "./pages/Dashboard/DashboardCategoories";

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

  const location = useLocation();

  useEffect(() => {
    setCartToggle(false);
  }, [location]);

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
          <UsersProvider>
            <Navbar setCartToggle={setCartToggle} />
            <CartSheet cartToggle={cartToggle} setCartToggle={setCartToggle} />
            <div
              className={`absolute h-screen w-screen backdrop-blur-xs ${
                cartToggle ? "z-6" : "-z-10 opacity-0"
              } transition-all `}
              onClick={() => setCartToggle(false)}
            />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<Product />} />
                <Route path="/make-style" element={<MakeStyle />} />
                <Route path="/customer-service" element={<CustomerService />} />
                <Route path="/dashboard" element={<Dashboard />}>
                  <Route index element={<DashboardUsers />} />
                  <Route
                    path="/dashboard/products"
                    element={<DashboardProducts />}
                  />
                  <Route
                    path="/dashboard/categories"
                    element={<DashboardCategoories />}
                  />
                </Route>
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
          </UsersProvider>
        </CategoriesProvider>
      </ProductsProvider>
    </UserProvider>
  );
};

export default App;
