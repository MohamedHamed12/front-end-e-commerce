import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";

const CartIcon = () => {
  const cartItems = useSelector((state) => state.cart.items.length);

  return (
    <div className="relative cursor-pointer">
      <ShoppingCart size={24} />
      {cartItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
          {cartItems}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
