import React, { useState } from "react";
import { Field, FormikProps, Form } from "formik";
import { StripeCardElementChangeEvent } from "@stripe/stripe-js";
// import { useElements, useStripe } from "@stripe/react-stripe-js";

import { CardField } from "components";
import { CheckoutFormFields } from "types/types";

export const CheckoutInnerForm = (props: FormikProps<CheckoutFormFields>) => {
  // const { values, handleChange } = props;
  // const stripe = useStripe();
  const [cardComplete, setCardComplete] = useState(false);
  // const [paymentMethod, setPaymentMethod] = useState(null);

  return (
    <Form noValidate>
      <div className="flex flex-col border border-black">
        <p className="text-lg bg-black text-white px-4 py-2">
          Shipping Address
        </p>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-2 mb-1">
            <Field
              name="firstName"
              placeholder="First Name"
              className="w-full px-2 py-1"
            />
            <Field
              name="lastName"
              placeholder="Last Name"
              className="w-full px-2 py-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 mb-1">
            <Field
              name="address"
              placeholder="Address"
              className="w-full px-2 py-1"
            />
            <Field
              name="zip"
              placeholder="Postal Code"
              className="w-full px-2 py-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 mb-1">
            <Field
              name="email"
              type="email"
              placeholder="Email"
              className="w-full px-2 py-1"
            />
          </div>
        </div>
        <p className="text-lg bg-black text-white px-4 py-2">
          Card Information
        </p>
        <div className="p-4">
          <CardField
            onChange={(e: StripeCardElementChangeEvent) => {
              // setError(e.error);
              setCardComplete(e.complete);
            }}
          />
          <button
            type="submit"
            className="text-white bg-blue-700 my-3 w-full py-2 rounded-lg"
            disabled={!cardComplete}
          >
            Pay Now
          </button>
        </div>
      </div>
    </Form>
  );
};
