declare global {
  interface Product {
    name: string;
    image: string;
    price: number;
    _id: string;
  }
  interface Category {
    name: string;
    image: string;
  }
  interface CartSheetProps {
    cartToggle: boolean;
    setCartToggle: React.Dispatch<React.SetStateAction<boolean>>;
  }
  interface NavbarProps {
    setCartToggle: React.Dispatch<React.SetStateAction<boolean>>;
  }
  interface User {
    createdAt: string;
    email: string;
    name: string;
    cart: Product[];
    password: string;
    updatedAt: string;
    __v: number;
    _id: string;
  }
  interface UserState {
    user: User | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  }
}

export {};
