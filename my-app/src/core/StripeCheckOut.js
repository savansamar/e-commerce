import React, { useState, useEffect } from "react";
import { isAutheticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";

const StripeCheckout = ({
  products,
  setReload = f => f,
  reload = undefined
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: ""
  });

    const {token}=isAutheticated()
  const userId = isAutheticated() && isAutheticated().user._id;

  const getFinalAmount = () => {
    let amount = 0;
    products.map(p => {
      amount = amount + p.price;
    });
    return amount;
    /*return products.reduce((currentValue,nextValue)=>{
      return currentValue + nextValue.price
  },0)*/
  };

  const makePayment = token => {
    const body={products,token}
    const headers = {
      "Content-Type": "application/json"
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
      
    })
      .then(response => {
        console.log(response);
        //call further methods
      })
      .catch(error => console.log(error));
  };

  const showStripeButton = () => {
    return isAutheticated() ? (
      <StripeCheckoutButton
        stripeKey="pk_test_51IBe1vLYFcN7WZEZ2kbjYbAPCA5pJs6cBGG5T9t4lphqSHSAJ7qPQ5h6pKLTVv9ufiTxblt1t9EYXvLTSmd8Zwuq00wS5T7xLG"
        token={makePayment(token)}
        amount={getFinalAmount() * 100}
        name="Buy Tshirts"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay with stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };

  return (
    <div>
      <h3 className="text-white">Stripe Checkout {getFinalAmount()}</h3>
     


      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
