import React,{useContext,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { shopContext } from '../context'
import homeimg from '../images/Capture.jpg'
import './home.css'
const Home = () => {
    
    const {fetchAllProducts, products,query}= useContext(shopContext);
    useEffect(() => {
        fetchAllProducts()
        return () => {
        
            
        }
    }, [fetchAllProducts])
    console.log(query)

    return (
        <div>
            <img className='banner' src={homeimg} alt="" />
            <div className='homeheader'>
            <hr />
            <h1>Products</h1>
            <hr />
            </div>
            {/* {console.log(products)} */}
            <div className='card'>
            {products.map(product=>(<div className='cards' key={product.title}> <Link to={`/ProductDescription/${product.handle}`}>
                <img className='imageset' src={product.images[0].src} alt="" />
                 <p >{product.title}</p>
            </Link> </div>))}
            </div>
        </div>
    )
}

export default Home
