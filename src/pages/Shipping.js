import React, { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { shopContext } from "../context";
import "./shipping.css";

const Shipping = () => {
  const letsGo = useNavigate();
  const [shippingPrice,setShippingPrice]=useState()
  const changingValue=(e)=>setShippingPrice(e.target.value)
  const { cart,shippingmethod,getShippingMethod} = useContext(shopContext);

  useEffect(() => {
    getShippingMethod(localStorage.cart_id);
    return () => {
    }
  },[getShippingMethod])
  

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
      {shippingmethod?.data?.node?.availableShippingRates?.shippingRates?.map(method=>(
        <div className="shippingMethod">
          <input
            type="radio"
            
            value={method?.priceV2.amount}
            onChange={changingValue}
            name="radioValues"
          />
          <span className="spansize" >{method?.title} <span className="rightalign"> {cart?.currencyCode} : </span> <span>{method?.priceV2?.amount}</span> </span>

          <hr className="shippingHR" />
        </div>
        
        
        
      ))  }
      <p>Shipping Rate : {cart.currencyCode} : <b> {shippingPrice}</b></p>
      <p>Sub Total : {cart.currencyCode} : <b> {cart.subtotalPrice}</b></p>
      <hr className="shippingHR"/>
      {/* <p>Total Amount : {cart.currencyCode} : {parseFloat(shippingmethod.totalPrice)+parseFloat(shippingPrice)}</p> */}
      <button onClick={nextpage} type="submit" className="payment-btn">
          Continue to payment
        </button>
      </div>
      </div>
    </div>
  );
};

export default Shipping;
