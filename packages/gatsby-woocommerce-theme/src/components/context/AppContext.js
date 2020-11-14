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

  const [isLoaded, setIsLoaded] = React.useState(false);
  const [items, setItems] = React.useState(null);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    fetch("https://api.example.com/items")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.items);
          console.log(items);
        },
        // Remarque : il faut gérer les erreurs ici plutôt que dans
        // un bloc catch() afin que nous n’avalions pas les exceptions
        // dues à de véritables bugs dans les composants.
        (error) => {
          setIsLoaded(true);
          setError(error);
          console.log(error);
        }
      )
  }, [])
  
  const getCountry = () => {
      let req = typeof XMLHttpRequest === undefined ? null : new XMLHttpRequest();
  
      if(req) {
        req.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                setCountry(JSON.parse(this.responseText));
            }
        }
    
        req.open("GET", "http://ip-api.com/json/?fields=country,city,timezone,currency", true);
    
        req.send();

      }
  
      return {};
  }
  
  !country && getCountry();

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
