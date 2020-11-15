import React, { useState, useEffect } from "react";

export const AppContext = React.createContext([{}, () => {}]);

export const AppProvider = (props) => {
  const [cart, setCart] = useState(null);

  const [country, setCountry] = React.useState(false);

  useEffect(() => {
    if (process.browser) {
      let cartData = localStorage.getItem("woo-next-cart");
      cartData = null !== cartData ? JSON.parse(cartData) : "";
      setCart(cartData);
    }
  }, []);

  const [error, setError] = React.useState(null);

  useEffect(() => {
    if(window.fetch) {
      fetch("http://ip-api.com/json/?fields=country,city,timezone,currency")
      .then(res => res.json())
      .then(
        (result) => {
          setCountry(result);
        },
        // Remarque : il faut gérer les erreurs ici plutôt que dans
        // un bloc catch() afin que nous n’avalions pas les exceptions
        // dues à de véritables bugs dans les composants.
        (error) => {
          setError(error);
          /*/# console.log(error);*/
        }
      );
    }
  }, [])

  return (
    <AppContext.Provider value={{
      'cart': cart,
      'setCart': setCart,
      'country': country,
    }}>
      {props.children}
    </AppContext.Provider>
  );
};
