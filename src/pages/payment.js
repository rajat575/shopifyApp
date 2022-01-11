import React, { useContext } from "react";
import "./payment.css";
import { shopContext } from "../context";
import { Link} from "react-router-dom";

const Payment = () => {
  const { cart } = useContext(shopContext);
  return (
    <div>
      {console.log(cart)}
      <div className="middle">
        <h2 className="headership">Ship To:</h2>
        <div className="paracenter">
          <p className="para">
            <table className="paymentTable">
              <tr>
                <td>
                  Name : {cart?.shippingAddress?.firstName}{" "}
                  {cart?.shippingAddress?.lastName}, Phone No :{" "}
                  {cart?.shippingAddress?.phone}
                </td>
              </tr>{" "}
              <br />
              <tr>
                {" "}
                <td>
                  {" "}
                  Address1 : {cart?.shippingAddress?.address1}, Address2 :{" "}
                  {cart?.shippingAddress?.address2}
                </td>
              </tr>{" "}
              <br />
              <tr>
                <td>
                  Country : {cart?.shippingAddress?.country}(
                  {cart?.shippingAddress?.countryCode}), Province :{" "}
                  {cart?.shippingAddress?.province}(
                  {cart?.shippingAddress?.provinceCode}), City :{" "}
                  {cart?.shippingAddress?.city}, ZIP :{" "}
                  {cart?.shippingAddress?.zip}
                </td>
                <td className="chngaddress">
                  {" "}
                  <Link className="linkcolor" to="/shippingAddress">
                    Change Address
                  </Link>
                </td>
              </tr>
              <br />
              <hr className="shippingHR" />
              <tr>
                <td>Method : {cart?.shippingLine?.title}</td>{" "}
                <td className="chngaddress">
                  {" "}
                  <Link className="linkcolor" to="/shippingMethod">
                    Change Method
                  </Link>
                </td>
              </tr>
              <hr className="shippingHR"/>
              <tr>
                <td>Cart SubTotal : {cart?.currencyCode} {cart?.subtotalPrice}</td>
              </tr>
              <tr>
                <td>Shipping Rate : {cart?.currencyCode} {cart?.shippingLine?.price}</td>
              </tr>
              <tr>
              
                <td>Total Amount :  {cart?.currencyCode} {cart?.totalPrice}</td>
                
              </tr>
            </table>
          </p>
        </div>
      </div>
      <div>
        <h2 className="headerpayment">Payment</h2>
        <div className="paymentcred">
                    <h2>Credit Card</h2>
                    <hr className="shippingHR" />
                    <input type="number" className="cardnumber" placeholder="Card Number"/><br />
                    <input type="text" className="cardnumber" placeholder="Name on card" /><br />
                    <input type="month" className="carddate1" min='2022-01' value='2022-01' />
                    <input type="tel" className="carddate2" placeholder="Security Code" maxLength="4"  /><br />
                    <button className="paybutton">Pay {cart?.currencyCode} {cart?.totalPrice}</button>
                    <a href={cart.webUrl}>Emergency Link</a>
        </div>
      </div>
    </div>
  );
};

export default Payment;
