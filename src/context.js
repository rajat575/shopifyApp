import React, { Component } from "react";
import Client from "shopify-buy";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "apollo-link-context";
import gql from "graphql-tag";

const client = Client.buildClient({
  domain: "s3bg.myshopify.com",
  storefrontAccessToken: "7b036ffd844a4ddefa4e99c653c27bf3",
});

const httpLink = createHttpLink({
  uri: "http://s3bg.myshopify.com/api/graphql",
});

const middlewareLink = setContext(() => ({
  headers: {
    "X-Shopify-Storefront-Access-Token": "7b036ffd844a4ddefa4e99c653c27bf3",
  },
}));

const apolloClient = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const shopContext = React.createContext();

export class ShopifyProvider extends Component {
  state = {
    products: [],
    coll: [],
    productdescri: {},
    cart: {},
    collhandle: [],
    query: {},
    discode:{},
    shippingmethod:{}

  };

  componentDidMount() {
    if (localStorage.cart_id) {
      console.log("Dont Create");

      this.fetchCart(localStorage.cart_id);
    } else {
      console.log(" Create");

      this.createCart();
    }
    // this.testGraphQL()
    // this.testApollo();
    // this.getShippingMethod()
    // this.testShippingRates()
  }

  additem = async (variantId, quantity) => {
    const lineItemsToAdd = [
      {
        variantId,
        quantity: quantity,
      },
    ];
    //   console.log(this.state.cart)
    //   console.log(lineItemsToAdd)
    const cart = await client.checkout.addLineItems(
      this.state.cart.id,
      lineItemsToAdd
    );
    // console.log(cart)
    this.setState({ cart: cart });
  };

  createCart = async () => {
    const cart = await client.checkout.create();
    localStorage.setItem("cart_id", cart.id);
    this.setState({ cart: cart });
  };

  fetchCart = async (cartId) => {
    client.checkout.fetch(cartId).then((cart) => {
      this.setState({ cart: cart });
    });
  };

  fetchProducts = async () => {
    const products = await client.product.fetchAll();
    this.setState({ products: products });
    products.map((pro) => console.log(pro.title));
  };

  fetchcollection = async () => {
    const coll = await client.collection.fetchAll();
    this.setState({ coll: coll });
    // coll.map(col=>console.log(col.title))
  };

  productdescription = async (handle) => {
    const productdescri = await client.product.fetchByHandle(handle);
    this.setState({ productdescri: productdescri });
  };

  collectionhandle = async (handle) => {
    const collhandle = await client.collection.fetchByHandle(handle);
    this.setState({ collhandle: collhandle });
  };

  removeProduct = async (checkoutId, lineitemsIds) => {
    const cart = await client.checkout.removeLineItems(
      checkoutId,
      lineitemsIds
    );
    this.setState({ cart: cart });
  };
  updatequantity = async (checkoutId, id, quantity) => {
    const cart = await client.checkout.updateLineItems(checkoutId, [
      { id: id, quantity: quantity },
    ]);
    this.setState({ cart: cart });
  };

  updateaddress = async (cartId, shippingAddress) => {
    const cart = await client.checkout.updateShippingAddress(cartId, shippingAddress);
    this.setState({ cart: cart });
  };

  testGraphQL = async () => {
    const productsQuery = client.graphQLClient.query((root) => {
      root.addConnection("products", { args: { first: 10 } }, (product) => {
        product.add("title");
      });
    });
    const { data } = await client.graphQLClient.send(productsQuery);
    console.log("*******************");
    console.log(data);
    console.log("*******************");

    const collectionQuery = client.graphQLClient.query((root) => {
      root.addConnection("collections", { args: { first: 10 } }, (product) => {
        product.add("id");
      });
    });
    const res = await client.graphQLClient.send(collectionQuery);
    console.log("*******************");
    console.log(res);
    console.log("*******************");
  };

  testApollo = async () => {
    const query = gql`
      query {
        shop {
          name
          description
          products(first: 20) {
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
            edges {
              node {
                id
                title
                options {
                  name
                  values
                }
                variants(first: 250) {
                  pageInfo {
                    hasNextPage
                    hasPreviousPage
                  }
                  edges {
                    node {
                      title
                      selectedOptions {
                        name
                        value
                      }
                      image {
                        src
                      }
                      price
                    }
                  }
                }
                images(first: 250) {
                  pageInfo {
                    hasNextPage
                    hasPreviousPage
                  }
                  edges {
                    node {
                      src
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;
    const res = await apolloClient.query({ query: query });
    this.setState({ query: res });
    console.log("*******************");
    console.log(res);
    console.log("*******************");
  };




  getShippingMethod = async() => {

    const query = gql`

    query checkout($checkoutid: ID!){

        node(id: $checkoutid) {

          ... on Checkout {

              totalTax

              taxesIncluded

              taxExempt

              subtotalPrice

              totalPrice

              email

              createdAt

              requiresShipping

              availableShippingRates {

                ready

                shippingRates {

                  handle

                  priceV2 {

                    amount

                  }

                  title

                }

              }

          }

      }

    }

  `

   const cart=await apolloClient.query({query: query, variables: {

    checkoutid: localStorage.cart_id

  }}) ;

      console.log("*******checkoutid*******");

      this.setState({shippingmethod:cart})

      console.log("*******************");

     

  }

  adddiscount=async(cartId,discountCode)=>{
    const cart= await client.checkout.addDiscount(cartId,discountCode )
    this.setState({cart:cart})
  
  }

  removediscount=async(cartId)=>{
    const cart =await client.checkout.removeDiscount(cartId);
    this.setState({cart:cart})
  }
  render() {
    return (
      <shopContext.Provider
        value={{
          ...this.state,
          fetchAllProducts: this.fetchProducts,
          fetchAllcollection: this.fetchcollection,
          productdesc: this.productdescription,
          additem: this.additem,
          fetchCart: this.fetchCart,
          collections: this.collectionhandle,
          removeproduct: this.removeProduct,
          updatequantity: this.updatequantity,
          updateaddress: this.updateaddress,
          testApollo: this.testApollo,
          adddiscount:this.adddiscount,
          removediscount:this.removediscount,
          getShippingMethod:this.getShippingMethod
        }}
      >
        {this.props.children}
      </shopContext.Provider>
    );
  }
}
const consumer = shopContext.Consumer;
export { consumer, shopContext };

export default ShopifyProvider;
