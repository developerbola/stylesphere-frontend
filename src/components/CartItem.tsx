import { Trash } from "lucide-react";
import React from "react";

interface CartItem {
  name: string;
  image: string;
  category: string;
  price: number;
  quantity?: number;
  _id: string;
}

export const CartItem: React.FC<{
  item: CartItem;
  handleDeleteProduct: (productId: string) => Promise<void>;
}> = ({ item, handleDeleteProduct }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex">
        <img
          src={item.image}
          alt={item.name}
          className="mr-4 w-[70px] h-[70px] object-cover rounded-lg"
        />
        <div>
          <h3 className="text-lg capitalize">{item.name}</h3>
          <h4 className="font-medium">{item.category}</h4>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="font-bold">${item.price}</span>
        <div className="flex gap-2">
          <div className="flex items-center">
            <button
              // onClick={() => updateQuantity(item.id, -1)}
              className="px-2"
            >
              -
            </button>
            <span className="mx-2">{item.quantity}</span>
            <button
              // onClick={() => updateQuantity(item.id, 1)}
              className="px-2"
            >
              +
            </button>
          </div>
          <button
            onClick={() => handleDeleteProduct(item?._id || "")}
            className="text-red-500"
          >
            <Trash size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
