import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { shopContext } from "../context";
import "./shipping.css";

const Shipping = () => {
  const letsGo = useNavigate();

  const { cart} = useContext(shopContext);

  

  const nextpage = async () => {
    letsGo("/paymentpage");
  };

  return (
    <div>
      <h1 className="storeName">Shipping Page</h1>
      
      <div className="middle">
        <h2 className="headership">Ship To:</h2>
        <div className="paracenter">
      <p className="para">Name : {cart?.shippingAddress?.firstName} {cart?.shippingAddress?.lastName}, Phone No : {cart?.shippingAddress?.phone} <br /> Address1 : {cart?.shippingAddress?.address1}, 
      Address2 : {cart?.shippingAddress?.address2} <br />
      Country : {cart?.shippingAddress?.country}({cart?.shippingAddress?.countryCode}), Province : {cart?.shippingAddress?.province}({cart?.shippingAddress?.provinceCode}), City : {cart?.shippingAddress?.city}, ZIP : {cart?.shippingAddress?.zip}
      
      </p>
      </div>
      </div>
      <div className="container">
      <h2 className="shippingHeader">Shipping Methods</h2>
      {/* <hr className="shippingHR" /> */}
      {console.log(cart)}
      
      
      <form className="shippingMethod">
        <div>
          <input
            type="radio"
            name="shipping method"
            onChange={() => ("DHL Express Worldwide")}
          />
          <span className="spansize" >DHL Express Worldwide</span>
          <hr className="shippingHR" />
        </div>
        <div>
          <input
            type="radio"
            name="shipping method"
            onChange={() => ("USPS")}
          />
          <span className="spansize">USPS First Class Package International</span>
          <hr className="shippingHR" />
        </div>
        <div>
          <input
            type="radio"
            name="shipping method"
            onChange={() => ("USPS")}
          />
          <span className="spansize">USPS Priority Mail International</span>
          <hr className="shippingHR" />
        </div>
        <div>
          <input
            type="radio"
            name="shipping method"
            onChange={() =>("USPS")}
          />
          <span className="spansize">USPS Priority Mail Express International</span>
        </div>
        <button onClick={nextpage} type="submit" className="payment-btn">
          Continue to payment
        </button>
      </form>
      </div>
    </div>
  );
};

export default Shipping;
