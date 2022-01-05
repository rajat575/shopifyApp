import React, { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { shopContext } from "../context";
import "./shipping.css";

const Shipping = () => {
  const letsGo = useNavigate();

  const { cart,shippingmethod,getShippingMethod} = useContext(shopContext);

  useEffect(() => {
    getShippingMethod(localStorage.cart_id);
    return () => {
    }
  }, [])
  

  const nextpage = async () => {
    letsGo("/paymentpage");
  };


  return (
    <div>
      <h1 className="storeName">Shipping Page</h1>
      {console.log(shippingmethod)}
      
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
      <hr className="shippingHR" />
      
      {console.log(cart)}
      
      <div>
      {shippingmethod?.data?.node?.availableShippingRates?.shippingRates?.map(method=>( <form className="shippingMethod">
        <div>
          <input
            type="checkbox"
            name="shipping method"
          />
          <span className="spansize" >{method?.title} <span className="rightalign"> {cart?.currencyCode} : </span> <span>{method?.priceV2?.amount}</span> </span>

          <hr className="shippingHR" />
        </div>
        
        
        
      </form>))  }
     
      <button onClick={nextpage} type="submit" className="payment-btn">
          Continue to payment
        </button>
      </div>
      </div>
    </div>
  );
};

export default Shipping;
