import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; // Import Link component

const CartIcon = () => {
  const cartItems = useSelector((state) => state.cart.items.length);

  return (
    <div className="relative cursor-pointer">
      <Link to="/cart"> {/* Wrap the icon with Link to navigate to the cart page */}
        <ShoppingCart size={24} />
      </Link>
      {cartItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
          {cartItems}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
