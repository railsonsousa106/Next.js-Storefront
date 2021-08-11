import React from "react";
import * as Yup from "yup";
import { Formik, FormikProps } from "formik";
import { loadStripe } from "@stripe/stripe-js";
// @ts-ignore
import { useShoppingCart } from "use-shopping-cart";
import { Elements } from "@stripe/react-stripe-js";

import MainLayout from "@layout/Main";
import { CheckoutInnerForm } from "components";

import { CheckoutFormFields } from "types/types";

import config from "config";

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Roboto",
    },
  ],
};

const stripePromise = loadStripe(config.STRIPE_PUBLIC_KEY);

const Checkout = () => {
  const { cartDetails, cartCount, formattedTotalPrice } = useShoppingCart();

  const handleSubmit = (values: CheckoutFormFields) => {
    console.log("Submit: ", values);
  };

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
    <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
      <MainLayout title="My Carts">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        <div className="grid grid-cols-4 gap-16">
          <div className="flex flex-col  col-span-3">
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                address: "",
                zip: "",
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string().required("Required").email(),
                address: Yup.string().required("Required"),
                zip: Yup.string().required("Required"),
              })}
              onSubmit={handleSubmit}
            >
              {(props: FormikProps<CheckoutFormFields>) => (
                <CheckoutInnerForm {...props} />
              )}
            </Formik>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-bold">Summary</h3>
            <p className="text-md">Total Items in Cart: {cartCount}</p>
            <p className="text-md">Price: {formattedTotalPrice}</p>
            <p className="text-md">Dock Shipping: Free</p>
            <p className="text-md">Total Price: {formattedTotalPrice}</p>
            <div className="h-0.5 bg-gray-400 w-full my-2"></div>
            {Object.keys(cartDetails).map((id) => {
              const { name, quantity, variant, value, product, currency } =
                cartDetails[id];
              return (
                <div key={id} className="w-full grid grid-cols-4 gap-4 mb-4">
                  <div>
                    <img
                      src={variant.media[0].url}
                      alt={name}
                      width="100%"
                      className="border border-gray-500"
                    />
                  </div>
                  <div className="flex flex-col col-span-3">
                    <p className="text-sm font-semibold mb-1">{name}</p>
                    <p className="text-xs text-gray-600 mb-1">
                      {product.productType?.name}
                    </p>
                    <p className="text-xs text-gray-600 mb-1">{variant.name}</p>
                    <p className="text-xs text-gray-600 mb-1">
                      Quantity: {quantity}
                    </p>
                    <p className="text-xs text-gray-600">
                      {value / 100} {currency}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </MainLayout>
    </Elements>
  );
};

export default Checkout;
