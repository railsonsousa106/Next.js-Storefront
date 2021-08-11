import React from "react";
// @ts-ignore
import { useShoppingCart } from "use-shopping-cart";

import MainLayout from "@layout/Main";
import { Link } from "components";

const Carts = () => {
  const {
    cartDetails,
    cartCount,
    formattedTotalPrice,
    clearCart,
    removeItem,
    setItemQuantity,
  } = useShoppingCart();

  if (cartCount === 0) {
    return (
      <MainLayout title="My Carts">
        <div className="h-full flex items-center flex-col justify-center">
          <p className="text-2xl">No items in cart</p>
        </div>
      </MainLayout>
    );
  }
  return (
    <MainLayout title="My Carts">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      <div className="grid grid-cols-4 gap-16">
        <div className="flex flex-col  col-span-3">
          {Object.keys(cartDetails).map((id) => {
            const { name, quantity, variant, value, product, currency } =
              cartDetails[id];
            return (
              <div key={id} className="w-full grid grid-cols-12 gap-4 mb-4">
                <div className="col-span-2 border border-gray-500">
                  <img src={variant.media[0].url} alt={name} width="100%" />
                </div>
                <div className="flex flex-col col-span-9">
                  <p className="text-lg font-semibold mb-1">{name}</p>
                  <p className="text-md text-gray-600 mb-1">
                    {product.productType?.name}
                  </p>
                  <p className="text-md text-gray-600 mb-1">{variant.name}</p>
                  <p className="text-md text-gray-600 mb-1">
                    Quantity:{" "}
                    <input
                      type={"number"}
                      max={99}
                      className="w-6 bg-transparent ml-1 text-md"
                      value={quantity}
                      onChange={(event) => {
                        setItemQuantity(id, event.target.valueAsNumber);
                      }}
                    />
                  </p>
                  <button
                    className="text-gray-600 underline w-6"
                    onClick={() => removeItem(id)}
                  >
                    Remove
                  </button>
                </div>
                <p>
                  {value / 100} {currency}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-bold">Summary</h3>
          <p className="text-md">Total Items in Cart: {cartCount}</p>
          <p className="text-md">Total Price: {formattedTotalPrice}</p>
          <Link
            href="/checkout"
            className="w-full py-2 bg-black text-white rounded-3xl my-2 text-center"
          >
            Go To Checkout
          </Link>

          <button
            className="w-full py-2 bg-black text-white rounded-3xl"
            onClick={() => clearCart()}
          >
            Clear Cart Items
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Carts;
