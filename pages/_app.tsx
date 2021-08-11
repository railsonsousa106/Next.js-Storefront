import React from "react";
// @ts-ignore
import { CartProvider } from "use-shopping-cart";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";

import "tailwindcss/tailwind.css";
import gqlClient from "@utils/gqlClient";
import config from "config";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider
      mode="payment"
      cartMode="checkout-session"
      stripe={config.STRIPE_SECRET_KEY}
      currency="USD"
      billingAddressCollection={true}
    >
      <ApolloProvider client={gqlClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </CartProvider>
  );
}
export default MyApp;
