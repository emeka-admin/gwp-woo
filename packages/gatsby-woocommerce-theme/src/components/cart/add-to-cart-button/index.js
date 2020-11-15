import React, { useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { AppContext } from "../../context/AppContext";
import { getFormattedCart } from "../../../utils/functions";
import Link from "gatsby-link";
import { v4 } from "uuid";
import GET_CART from "../../../queries/get-cart";
import ADD_TO_CART from "../../../mutations/add-to-cart";
import "./style.scss";

const AddToCart = (props) => {
  const { product } = props;

  const productQtyInput = {
    clientMutationId: v4(), // Generate a unique id.
    // TODO manage for future when base or variation
    // productId: product.productId || product.variationId,
    productId: product.productId,
    variationId: product.variationId || undefined
  };

  /* eslint-disable */
  const {cart, setCart} = useContext(AppContext);
  const [showViewCart, setShowViewCart] = useState(false);
  const [requestError, setRequestError] = useState(null);

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

  // Add to Cart Mutation.
  const [
    addToCart,
    { data: addToCartRes, loading: addToCartLoading, error: addToCartError },
  ] = useMutation(ADD_TO_CART, {
    variables: {
      input: productQtyInput,
    },
    onCompleted: () => {
      // If error.
      if (addToCartError) {
        /*/# console.log(addToCartError);*/
        setRequestError(addToCartError.graphQLErrors[0].message);
      }

      // On Success:
      // 1. Make the GET_CART query to update the cart with new values in React context.
      refetch();
      document.getElementById('add-to-cart').innerHTML = "Checkout...";

      // 2. Show View Cart Button
      // setShowViewCart(true);

      // TODO 1 Laisser comme ça
      // TODO 2 Mettre l'objet en localStorage
      // TODO 3 Mettre le cart en localStorage avec gestion variation
      // TODO 4 Voir Apollo si utile
      if(product.variationId) {
        let temp = JSON.parse(window.localStorage.getItem('variationIds')) || {};
        if(!temp[product.productId]) {
          temp[product.productId] = product.variationId;
          window.localStorage.setItem('variationIds', JSON.stringify(temp));
        }
      }

      window.location.href = "/checkout";

    },
    onError: (error) => {
      if (error) {
        document.getElementById('add-to-cart').innerHTML = "Erreur";
        /*/# console.log(error);*/
        setRequestError(error.graphQLErrors[0].message);
      }
    },
  });

  const handleAddToCartClick = () => {
    document.getElementById('add-to-cart').innerHTML = "Adding to Cart...";
    setRequestError(null);
    addToCart();
  };

  return (
    <div>
      {/*	Check if its an external product then put its external buy link */}
      {"ExternalProduct" === product.nodeType ? (
        <a href={product.externalUrl} target="_blank">
          <button className="btn btn-outline-dark">Buy Now</button>
        </a>
      ) : (
        <button id="add-to-cart" onClick={handleAddToCartClick} className="btn btn-outline-dark">
          Add to cart
        </button>
      )}
      {showViewCart ? (
        <Link to="/cart">
          <button className="woo-next-view-cart-btn btn btn-outline-dark">
            View Cart
          </button>
        </Link>
      ) : (
        ""
      )}
      {/* Add To Cart Loading*/}
      {addToCartLoading ? (
        <p className="mt-2">Adding to Cart...</p>
      ) : (
        <p className="mt-2" style={{ color: "transparent" }}>
          Adding to Cart...
        </p>
      )}
    </div>
  );
};

export default AddToCart;
