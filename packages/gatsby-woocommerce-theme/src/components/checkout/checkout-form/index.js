import React, { useState, useContext, useEffect } from "react";
import { graphql, useStaticQuery } from 'gatsby';
import Billing from "../billing";
import YourOrder from "../your-order";
import PaymentModes from "../payment-mode";
import { AppContext } from "../../context/AppContext";
import validateAndSanitizeCheckoutForm from "../../../validator/checkout";
import { useMutation, useQuery } from "@apollo/client";
import { getFormattedCart, createCheckoutData, getLocalPrice } from "../../../utils/functions";
import OrderSuccess from "../order-success";
import GET_CART from "../../../queries/get-cart";
import CHECKOUT_MUTATION from "../../../mutations/checkout";
import CheckoutError from "../checkout-error";

import axios from "axios";
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import { sendWoocommerce } from "../../../utils/sendWoocommerce";
import countryList from "../country-list";

import './style.css';

const CheckoutForm = () => {

	const icons = useStaticQuery(graphql`
		{
			lock: file(relativePath : { eq: "lock.svg"}) {
				publicURL
      }
      stripe: file(relativePath : { eq: "stripe/Stripe wordmark - blurple.svg"}) {
        publicURL
      }
		}
	`);

  const stripe = useStripe();
  const elements = useElements();

  const initialState = {
    // TODO Transfer all cart in local storage
    // TODO icon secured
    // TODO icon visa /mastercard
    // TODO button submit opacity 0.6  && disabled until valid
    // TODO one item by cart
    // TODO other address gestion (woocommerce man)
    // BILLING ADDRESS
  	firstName: '',
  	lastName: '',
  	company: '',
  	country: '',
  	address1: '',
  	address2: '',
  	city: '',
  	state: '',
  	postcode: '',
  	phone: '',
    email: '',
    // OTHER SHIPPING ADDRESS
    otherAddress: false,
    otherEmail: '',
    otherFirstName: '',
    otherLastName: '',
    otherCompany: '',
    otherAddress1: '',
    otherAddress2: '',
    otherPostcode: '',
    otherCity: '',
    otherCountry: '',
    
  	createAccount: false,
  	username: '',
  	password: '',
  	customerNote: '',
  	paymentMethod: 'stripe',
  	errors: null
  };

  // Use this for testing purposes, so you dont have to fill the checkout form over an over again.
  // const initialState = {
  //   firstName: "Imran",
  //   lastName: "Sayed",
  //   address1: "109 Hills Road Valley",
  //   address2: "Station Road",
  //   city: "Pune",
  //   state: "Maharastra",
  //   country: "IN",
  //   postcode: "400298",
  //   phone: "9959338989",
  //   email: "codeytek.academy@gmail.com",
  //   company: "Tech",
  //   createAccount: false,
	// username: '',
	// password: '',
	// customerNote: "My Order notes",
  //   paymentMethod: "cod",
  //   errors: null,
  // };

  const {cart, setCart, country} = useContext(AppContext);
  const [input, setInput] = useState(initialState);
  const [orderData, setOrderData] = useState(null);
  const [requestError, setRequestError] = useState(null);

  /*/# console.log(cart);*/

  // const [stripeUsed, setStripeUsed] = useState(false);
  const [stripeUsed, setStripeUsed] = useState(true);

  // Get Cart Data.
  const { data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      // console.warn( 'completed GET_CART' );

      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);
      localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart);
    },
  });

  // Checkout or CreateOrder Mutation.
  const [
    checkout,
    { data: checkoutResponse, loading: checkoutLoading },
  ] = useMutation(CHECKOUT_MUTATION, {
    variables: {
      input: orderData,
    },
    onCompleted: () => {
      // console.warn( 'completed CHECKOUT_MUTATION' );
      refetch();
    },
    onError: (error) => {
      /*/# console.log(error);*/
      /*/# console.log(error.graphQLErrors);*/
      if (error) {
        setRequestError(error.graphQLErrors[0].message);
      }
    },
  });

  /*
   * Handle form submit.
   *
   * @param {Object} event Event Object.
   *
   * @return {void}
   */
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const result = validateAndSanitizeCheckoutForm(input);
    console.log(result);
    if (!result.isValid) {
      setInput({ ...input, errors: result.errors });
      return;
    }
    if(!stripeUsed) {
      const checkOutData = createCheckoutData(input);
      setOrderData(checkOutData);
      setRequestError(null);
    }
    else {

      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }

      const billingDetails = {
        name: [result.sanitizedData.firstName, result.sanitizedData.lastName].join(' '),
        email: result.sanitizedData.email,
        address: {
          city: result.sanitizedData.city,
          line1: result.sanitizedData.address1,
          state: countryList.map(country => country.countryCode == result.sanitizedData.country ? country.countryCode : null).filter(elem => elem),
          postal_code: result.sanitizedData.postcode,
        }
      };

      console.log(billingDetails);

      const cardElement = elements.getElement(CardElement);

      try {

        // TODO send an array or 2 payment requests
        const { data: clientSecret } = await axios({
          method: 'post',
          url: "https://idriss-stripe.emeka.fr/secret/",
          data: {
            amount: parseFloat(cart.totalProductsPrice.replace(/[^0-9,.]/g, '')) * 100,
            // currency: country.currency
            currency: country.currency
          }
        });

        /*/# console.log(clientSecret);*/

        const paymentMethodReq = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          // billing_details: billingDetails
        });

        if (paymentMethodReq.error) {
          /*/# console.log(paymentMethodReq.error.message);*/
          return;
        }

        const response = await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethodReq.paymentMethod.id
        });

        ///// if (result.error) {
          // Show error to your customer (e.g., insufficient funds)
          /////console.log(result.error.message);
        ///// } else {
          // The payment has been processed!
          ///// if (result.paymentIntent.status === 'succeeded') {
            // Show a success message to your customer
            // There's a risk of the customer closing the window before callback
            // execution. Set up a webhook or plugin to listen for the
            // payment_intent.succeeded event that handles any business critical
            // post-payment actions.
          ///// }
        ///// }
        if (response.error) {
          /*/# console.log(response.error);*/
          return;
        }
        else if(response.paymentIntent.status === 'succeeded') {
          const checkOutData = createCheckoutData(input);
          // console.log(response);
          /*/# console.log(cart);*/
          setRequestError(null);
          // TODO create clean function to process cart exportable datas
          sendWoocommerce(
            cart.products.map((elem) => {
              let temp = {
                'productId': elem.productId,
                'qty': elem.qty,
                'price': elem.price
              };
              if(window.localStorage.getItem('variationIds')) {
                if(JSON.parse(window.localStorage.getItem('variationIds'))[elem.productId]) {
                  temp['variation'] = parseInt(JSON.parse(window.localStorage.getItem('variationIds'))[elem.productId], 10);
                }
              }
              return temp;
            }),
            cart.totalProductsCount,
            checkOutData.paymentMethod,
            response.paymentIntent.status,
            checkOutData.shipping,
            checkOutData.billing
          );
          window.localStorage.removeItem('variationId');
        }
        else {
          return;
        }
      } catch (err) {
        /*/# console.log(err);*/
      }
    }
  };

  /*
   * Handle onchange input.
   *
   * @param {Object} event Event Object.
   *
   * @return {void}
   */
  const handleOnChange = (event) => {
    if ("createAccount" === event.target.name) {
      const newState = { ...input, [event.target.name]: !input.createAccount };
      setInput(newState);
    }
    else if ("otherAddress" === event.target.name) {
      const newState = {...input, [event.target.name]: !input.otherAddress};
      setInput(newState);
    }
    else if("stripe" === event.target.value) {
      setStripeUsed(true);
    }
    else {
      const newState = {...input, [event.target.name]: event.target.value};
      setInput(newState);
    }
  };

  useEffect(() => {
    if (null !== orderData) {
      // Call the checkout mutation when the value for orderData changes/updates.
      /* eslint-disable */
      checkout();
    }
  }, [orderData]);

  return (
    <>
      {cart ? (
        <form onSubmit={handleFormSubmit} className="woo-next-checkout-form">
          <div className="row">
            {/*Billing Details*/}
            <div className="col-lg-6 mb-lg-0 mb-5">
              <h2 className="mb-4">Billing Details</h2>
              <Billing input={input} handleOnChange={handleOnChange} />
            </div>
            {/* Order & Payments*/}
            <div className="col-lg-6">
              {/*	Order*/}
              <h2 className="mb-4">Your Order</h2>
              <YourOrder cart={cart} />
              <div className="secured">
                <img id="verify" src={icons.lock.publicURL} />
                <span>Transaction secured over SSL</span>
              </div>
              <div className="powered">
                <span>Powered by </span>
                <img id="secure" src={icons.stripe.publicURL} />
              </div>
              {/* Checkout Loading*/}
              {checkoutLoading && <p>Processing Order...</p>}
              {requestError && <CheckoutError requestError={ requestError }/> }
            </div>
          </div>
        </form>
      ) : (
        ""
      )}

      {/*Show message if Order Success*/}
      <OrderSuccess response={checkoutResponse} />
    </>
  );
};

export default CheckoutForm;
