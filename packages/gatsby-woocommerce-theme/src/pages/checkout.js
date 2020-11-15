import React, { useContext } from "react";
import CheckoutForm from "../components/checkout/checkout-form";
import { AppContext } from "../components/context/AppContext";

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(`${process.env.STRIPE_PUBLIC}`);

const Checkout = () => {

  return (
    <>
      <main className="main-container">
        <div className="container my-5">
          <h1 className="mt-5 mb-4">Checkout Page.</h1>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </main>
    </>
  );
};

export default Checkout;
