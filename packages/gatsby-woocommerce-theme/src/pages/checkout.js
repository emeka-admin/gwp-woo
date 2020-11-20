import React, { useContext } from "react";
import CheckoutForm from "../components/checkout/checkout-form";
import { graphql, useStaticQuery } from 'gatsby';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import "../components/checkout.css";

const stripePromise = loadStripe(`${process.env.STRIPE_PUBLIC}`);

const Checkout = () => {

  const img = useStaticQuery(graphql`
    {
      verified: file(relativePath: { eq: "verified.png"}) {
        childImageSharp {
          fluid {
            srcWebp
            srcSetWebp
          }
        }
      }
    }
  `);

  return (
    <>
      <main className="checkout main-container">
        <div className="container">
          <div className="head">
            <h1>
              Checkout Page
            </h1>
            {/* <div className="verified" style={{backgroundImage: "url(" + img.verified.childImageSharp.fluid.srcWebp + ")"}}></div> */}
            <img className="verified" src={img.verified.childImageSharp.fluid.srcWebp}/>
          </div>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </main>
    </>
  );
};

export default Checkout;
