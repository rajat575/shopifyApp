import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { shopContext } from "../context";
import "./cart.css";

const Cart = () => {
  const letsGo = useNavigate();
  const {
    fetchCart,
    cart,
    removeproduct,
    updatequantity,
    adddiscount,
    removediscount,
  } = useContext(shopContext);
  const [code, setdiscount] = useState("");
  const handleCouponChange = (e) => setdiscount(e.target.value);
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const removeFromCart = async (cartId, lineItems) => {
    await removeproduct(cartId, lineItems);
  };

  const plus = async (lineItemId) => {
    let lineItem = cart.lineItems.filter((x) => x.id === lineItemId)[0];
    await updatequantity(cart.id, lineItem.id, lineItem.quantity + 1);
  };
  const minus = async (lineItemId) => {
    let lineItem = cart.lineItems.filter((x) => x.id === lineItemId)[0];
    if (lineItem.quantity && lineItem.quantity > 0) {
      await updatequantity(cart.id, lineItem.id, lineItem.quantity - 1);
    }
  };
  console.log(cart);
  const billaddress = () => {
    letsGo("/shippingAddress");
  };

  const addingDiscount = async () => {
    await adddiscount(cart.id, code);
    setdiscount("");
  };
  const removedisc = async () => {
    await removediscount(cart.id);
  };

  return (
    <div>
      <h1 className="align">Cart Items.</h1>
      <hr />
      <div className="cart">
        <div className="productalign">
          <table className="toptable">
            <tr>
              <th>Product image</th>
              <th>Title</th>
              <th>Quantity</th>
              <th>Price per unit</th>
              <th>Quantity inc. or dec.</th>
            </tr>
          </table>
          <table>
            <tr>
              {cart?.lineItems?.map((product) => (
                <div className="center">
                  <td>
                    <img
                      className="cartimg"
                      src={product?.variant?.image.src}
                      alt=""
                    />
                  </td>
                  <td>
                    <h4>{product.title}</h4>
                  </td>
                  <td>
                    <h2>{product.quantity}</h2>
                  </td>
                  <td>
                    <h2>USD : {product?.variant?.price}</h2>
                  </td>
                  <td>
                    <div>
                      <button
                        className="btninc"
                        onClick={() => minus(product.id)}
                      >
                        -
                      </button>
                      <input
                        className="inp"
                        value={product.quantity}
                        type="text"
                      />
                      <button
                        className="btninc"
                        onClick={() => plus(product.id)}
                      >
                        +
                      </button>

                      <button
                        onClick={() => removeFromCart(cart.id, [product.id])}
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                  {console.log(product)}
                </div>
              ))}
            </tr>
          </table>
        </div>

        {
          <div className="TotalPrice">
            <h1>Sub Total:</h1>
            <h2>
              {cart?.currencyCode} : {cart?.subtotalPrice}
            </h2>
            {/* <a href={cart?.webUrl}>emergency link</a> */}
            <button className="checkout" onClick={billaddress}>
              Checkout
            </button>
            <br />
            <input
              type="text"
              placeholder="Coupon Code"
              value={code}
              onChange={handleCouponChange}
            />
            <button onClick={addingDiscount}>Apply</button>
            {cart?.discountApplications?.map((couponCode) => (
              <div>
                {couponCode.code}{" "}
                <button className="rmdis" onClick={removedisc}>
                  X
                </button>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default Cart;
