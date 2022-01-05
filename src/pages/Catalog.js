import React, { useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import "./catalog.css";
import { shopContext } from "../context";

const Catalog = () => {
  const { handle } = useParams();
  const { collections, collhandle } = useContext(shopContext);

  useEffect(() => {
    collections(handle);
  }, [collections, handle]);
  console.log(collhandle);
  return (
    <div>
      <hr className="catahr1" />
      <h1 className="headercata">{collhandle.title}</h1>
      <hr className="catahr2" />
      <div className="fleximg">
        {collhandle?.products?.map((product) => (
          <div className="borderset" key={product.title}>
            <Link to={`/ProductDescription/${product.handle}`}>
              <img className="imageset" src={product.images[0].src} alt="" />
              <p className="catalogpara">{product.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
