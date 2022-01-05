import React,{useEffect,useContext} from 'react'
import './Header.css'
import { shopContext } from '../context';
import { Link } from 'react-router-dom'
import Cartimg from '../images/cart.png'
const Header = () => {
    const {fetchAllcollection, coll}= useContext(shopContext);
    useEffect(() => {
        fetchAllcollection()
        return () => {

            
        }
    }, [fetchAllcollection])
    return (
        <div>
            <div className='navbar'>
                <ul>
                    <li className='navlink'><h3><Link className='brandlink' to='/'>Store X</Link></h3></li>
                    <li className='navlink'><Link className='navlinks' to='/'> Home</Link></li>
                    <li className='navlink' id='catalog'><Link className='navlinks' to=''> Catalog</Link>
                    <div className='dropdown'>
                    {coll.map(product=>(<div className='hovercolor' key={product.title}><Link className='collLink' to={`/catalog/${product.handle}`}>< p className='pading'>{product.title}</p></Link>  </div>))}
                    </div>
                    </li>
                    <li className='navlink'><Link className='navlinks' to='/contact'> Contact Us</Link></li>
                    <li className='navlink'><Link className='navlinks' to='/about'> About</Link></li>
                    <li className='navlink'><input className='inputheader' placeholder='Search any product here...' type="text" /></li>
                    <li className='navlink'><button className='btnpad'>Search</button></li>
                    <li className='navlink'><a href="/cart"><img className='imgsize' src={Cartimg} alt="" /></a></li>
                </ul>

            </div>
        </div>
    )
}

export default Header
