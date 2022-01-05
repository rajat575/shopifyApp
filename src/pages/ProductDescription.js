import React, { useContext, useEffect, useState } from "react";
import { shopContext } from "../context";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./productdescription.css";

const ProductDescription = () => {
  const LetsGo = useNavigate();
  const [quantity, setquantity] = useState(0);
  const { handle } = useParams();
  const { productdesc, productdescri, additem } = useContext(shopContext);
  useEffect(() => {
    productdesc(handle);
  }, [productdesc, handle]);

  const plus = () => {
    let value = quantity + 1;
    setquantity(value);
  };
  const minus = () => {
    let value = quantity - 1;
    setquantity(value);
  };
  const buynow = () => {
    LetsGo("/billingAddress");
  };
  return (
    <div className="desc">
    
      <h1>Product Description</h1>
      <hr />
      <div className="prodDesc">
        <h2>{productdescri.title}</h2>
        <h3>{productdescri.description}</h3>
        {productdescri.images?.map((image) => (
          <img key={image.id} className="setheight" src={image.src} alt="" />
        ))}{" "}
        <br />
        <div>
          <button onClick={minus}>-</button>

          <input
            value={quantity}
            type="number"
            onChange={(e) => setquantity(e.target.value)}
          />
          <button onClick={plus}>+</button>
        </div>
        <button onClick={() => additem(productdescri.variants[0].id, quantity)}>
          <Link className="desclink" to="/cart">
            Add to cart
          </Link>
        </button>
        <div>
          <button onClick={buynow}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
