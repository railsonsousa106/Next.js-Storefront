// layouts/Header.tsx
import React from "react";
import Image from "next/image";
// @ts-ignore
import { useShoppingCart } from "use-shopping-cart";
import { Link } from "components";

import cartIcon from "assets/cart.svg";

const Header = () => {
  const { cartCount } = useShoppingCart();

  return (
    <div className="bg-white shadow">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">
        <p>Header</p>
        <Link href="/carts" className="relative cursor-pointer">
          <Image src={cartIcon} alt="Cart" />
          {cartCount ? (
            <p className="absolute -right-3 -top-1 px-1 bg-black text-white rounded-full text-xs">
              {cartCount}
            </p>
          ) : (
            <></>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Header;
