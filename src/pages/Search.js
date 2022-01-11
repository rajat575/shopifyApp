import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { shopContext } from "../context";
import './search.css'

const Search = () => {
    const {filterProduct}=useContext(shopContext)

  return <div>
      <h1 className="searchheader">Search Results</h1>
      <hr />
      <div className='card'>
            {filterProduct.map(product=>(<div className='cards' key={product.title}> <Link to={`/ProductDescription/${product.handle}`}>
                <img className='imageset' src={product.images[0].src} alt="" />
                 <p >{product.title}</p>
            </Link> </div>))}
            </div>
  </div>;
};

export default Search;
