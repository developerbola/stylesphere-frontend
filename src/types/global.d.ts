declare global {
  interface Product {
    name: string;
    image: string;
    price: number;
    id: string;
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
}

export {};
