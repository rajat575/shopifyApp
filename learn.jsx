import React, { Component } from 'react'
import Client from 'shopify-buy';

const client = Client.buildClient({
    domain: 'your-shop-name.myshopify.com',
    storefrontAccessToken: 'your-storefront-access-token'
  });

const shopcontext=React.createContext();

export class learn extends Component {

    fetchdata=async()=>{
        const products
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default learn
