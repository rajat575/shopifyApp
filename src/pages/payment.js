import React, { useContext } from "react";
import "./payment.css";
import { shopContext } from "../context";

const Payment = () => {
  const { cart} = useContext(shopContext);

  return (
    <div>
      <div className="middle">
        <h2 className="headership">Ship To:</h2>
        <div className="paracenter">
          <p className="para">
            Name : {cart?.shippingAddress?.firstName}{" "}
            {cart?.shippingAddress?.lastName}, Phone No :{" "}
            {cart?.shippingAddress?.phone} <br /> Address1 :{" "}
            {cart?.shippingAddress?.address1}, Address2 :{" "}
            {cart?.shippingAddress?.address2} <br />
            Country : {cart?.shippingAddress?.country}(
            {cart?.shippingAddress?.countryCode}), Province :{" "}
            {cart?.shippingAddress?.province}(
            {cart?.shippingAddress?.provinceCode}), City :{" "}
            {cart?.shippingAddress?.city}, ZIP : {cart?.shippingAddress?.zip} <br />
          </p>
        </div>
      </div>
      <div>
          <h1>Payment Type.</h1>
      </div>
    </div>
  );
};

export default Payment;
