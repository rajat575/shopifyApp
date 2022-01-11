import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { shopContext } from "../context";
import "./shipping.css";

const Shipping = () => {
  // const letsGo = useNavigate();
  const { cart, res, getShippingMethod, updateShippingLine } =
    useContext(shopContext);

  useEffect(() => {
    getShippingMethod(localStorage.cart_id);
    return () => {};
  }, [getShippingMethod]);

  // const nextpage = async () => {
  //   letsGo("/paymentpage");
  //   <a href="/paymentpage"></a>
  // };

  return (
    <div>
      <h1 className="storeName">Shipping Page</h1>
      {console.log(res)}
      {console.log(res)}

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
            {cart?.shippingAddress?.city}, ZIP : {cart?.shippingAddress?.zip}
            <Link className="linkaddress" to="/shippingAddress">
              Change Address
            </Link>
          </p>
        </div>
      </div>
      <div className="container">
        <h2 className="shippingHeader">Shipping Methods</h2>
        <hr className="shippingHR" />

        {console.log(cart)}

        <div>
          {res?.data?.node?.availableShippingRates?.shippingRates?.map(
            (method) => (
              <div className="shippingMethod">
                <table className="setmargin">
                  <tr>
                    <td className="shippingradio">
                      <input
                        type="radio"
                        // value={method?.priceV2.amount}
                        // value={changeValue}
                        onClick={() => updateShippingLine(method?.handle)}
                        // onChange={updateShippingLine(method.handle)}
                        // onChange={beta}
                        name="radioValues"
                      />
                    </td>

                    <span className="spansize">
                      <td className="shippingTable">{method?.title} </td>
                      <td className="shippingTablemid">
                        <span className="rightalign">
                          {" "}
                          {cart?.currencyCode} :{" "}
                        </span>{" "}
                        <span>{method?.priceV2?.amount}</span>{" "}
                      </td>
                    </span>

                    {/* <hr className="shippingHR" /> */}
                  </tr>
                </table>
                <hr className="shippingHR" />
              </div>
            )
          )}
          {/* <p>Cart Sub Total : {cart.subtotalPrice}</p>
      <p>Shipping Rate : {cart.currencyCode} : <b> {cart?.shippingLine?.price}</b></p>
      <p>Total : {cart.currencyCode} : <b> {cart.totalPrice}</b></p>
      <hr className="shippingHR"/> */}
          {/* <p>Total Amount : {cart.currencyCode} : {parseFloat(res.totalPrice)+parseFloat(shippingPrice)}</p> */}
          <button  type="submit" className="payment-btn">
            <a className="shippingtag" href="/paymentpage">
            Continue to payment
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
