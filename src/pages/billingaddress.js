import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { shopContext } from "../context";
import "./billing.css";

const Billingaddress = () => {
  const letsGo = useNavigate();
  const { updateaddress, fetchCart, cart } = useContext(shopContext);
  useEffect(() => {
    fetchCart(localStorage.cart_id);
  }, [fetchCart]);

  const [firstName, setfname] = useState();
  const [lastName, setlname] = useState();
  const [address1, setaddress1] = useState();
  const [address2, setaddress2] = useState();
  const [phone, setphone] = useState();
  const [zip, setzip] = useState();
  const [city, setcity] = useState();
  const [country, setcountry] = useState();
  const [province, setprovince] = useState();

  const updtaddress = async () => {
    const shippingAddress = {
      firstName,
      lastName,
      address1,
      address2,
      phone,
      zip,
      country,
      province,
      city,
    };
    await updateaddress(cart.id, shippingAddress);
    console.log(cart);
    letsGo("/shippingMethod");
  };

  return (
    <div>
      <h1 className="shipad">Shipping Address</h1>
      <hr className="hrbill" />
      <div className="centerdata">
      <label>First Name</label>
      <br />
      <input
        className="inputlength"
        type="text"
        placeholder="Enter Your First Name"
        value={firstName}
        onChange={(e) => setfname(e.target.value)}
      />
      <br />
      <label>Last Name</label>
      <br />
      <input
        className="inputlength"
        type="text"
        placeholder="Enter Your Last Name"
        value={lastName}
        onChange={(e) => setlname(e.target.value)}
      />
      <br />
      <label>Address1</label>
      <br />
      <input
        className="inputlength"
        type="text"
        placeholder="Enter Your Address"
        value={address1}
        onChange={(e) => setaddress1(e.target.value)}
      />
      <br />
      <label>Address2</label>
      <br />
      <input
        className="inputlength"
        type="text"
        placeholder="Enter Your Address"
        value={address2}
        onChange={(e) => setaddress2(e.target.value)}
      />
      <br />
      <label>Phone</label> <br />
      <input
        className="inputlength"
        type="text"
        placeholder="Enter Your Phone number"
        value={phone}
        onChange={(e) => setphone(e.target.value)}
      />
      <br />
      <label>Zip</label> <br />
      <input
        className="inputlength"
        type="text"
        placeholder="Enter Zip Code"
        value={zip}
        onChange={(e) => setzip(e.target.value)}
      />
      <br />
      <label>Country</label>
      <br />
      <input
        className="inputlength"
        type="text"
        placeholder="Enter your Country Name"
        value={country}
        onChange={(e) => setcountry(e.target.value)}
      />
      <br />
      <label>Province</label> <br />
      <input
        className="inputlength"
        type="text"
        placeholder="Province Name"
        value={province}
        onChange={(e) => setprovince(e.target.value)}
      />
      <br />
      <label>City</label> <br />
      <input
        className="inputlength"
        type="text"
        placeholder="City Name"
        value={city}
        onChange={(e) => setcity(e.target.value)}
      />
      <br />
      <button className="buttonedit" onClick={updtaddress}>
        Add Shipping Address
      </button>
      </div>
    </div>
  );
};

export default Billingaddress;
