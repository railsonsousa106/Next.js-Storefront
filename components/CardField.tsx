import React from "react";
import { StripeCardElementOptions } from "@stripe/stripe-js";
import { CardElement } from "@stripe/react-stripe-js";

type Props = {
  onChange?: any;
};

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "#87bbfd",
      },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
} as StripeCardElementOptions;

export const CardField: React.FunctionComponent<Props> = ({ onChange }) => (
  <div className="bg-indigo-400 shadow-lg rounded-md p-2">
    <CardElement options={CARD_OPTIONS} onChange={onChange} />
  </div>
);
