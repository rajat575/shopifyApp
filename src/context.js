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
    discode: {},
    shippingmethod: {},
    shippingPrice: {},
    res: {},
    filterProduct: {},
    meta: {},
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
    const cart = await client.checkout.updateShippingAddress(
      cartId,
      shippingAddress
    );
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

  getShippingMethod = async () => {
    const query = gql`
      query checkout($checkoutid: ID!) {
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
    `;

    const res = await apolloClient.query({
      query: query,
      variables: {
        checkoutid: localStorage.cart_id,
      },
    });

    console.log("*******checkoutid*******");

    this.setState({ res: res });

    console.log("*******************");
  };

  adddiscount = async (cartId, discountCode) => {
    const cart = await client.checkout.addDiscount(cartId, discountCode);
    this.setState({ cart: cart });
  };

  removediscount = async (cartId) => {
    const cart = await client.checkout.removeDiscount(cartId);
    this.setState({ cart: cart });
  };

  setPriceShipping = (shippingPrice) => {
    this.setState({ shippingPrice: shippingPrice });
  };

  getmeta = async () => {
    const query = gql`
      query metafieldStorefrontVisibility {
          productByHandle(handle: "") {
            metafield(namespace: "my_fields", key: "part_number") {
              value
              type
            }
          }
        }
      }
    `;
    const meta = await apolloClient.query({
      query: query,
      variables: {},
    });
    this.setState({ meta: meta });
  };

  metafield = async () => {
    const mutation = gql`
      mutation ($input: MetafieldStorefrontVisibilityInput!) {
        metafieldStorefrontVisibilityCreate(input: $input) {
          metafieldStorefrontVisibility {
            id
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const meta = await apolloClient.mutate({
      mutation: mutation,
      variables: {
        input: {
          namespace: "myfields",
          key: "part_number",
        },
      },
    });
    console.log(meta);
  };

  updateShippingLine = async (shippingHandle) => {
    const mut = gql`
      mutation checkoutShippingLineUpdate(
        $checkoutId: ID!
        $shippingRateHandle: String!
      ) {
        checkoutShippingLineUpdate(
          checkoutId: $checkoutId
          shippingRateHandle: $shippingRateHandle
        ) {
          checkout {
            id
          }
          checkoutUserErrors {
            code
            field
            message
          }
        }
      }
    `;

    const res = await apolloClient.mutate({
      mutation: mut,
      variables: {
        checkoutId: localStorage.cart_id,
        shippingRateHandle: shippingHandle,
      },
    });

    console.log(res);
  };

  searchProduct = (searchString) => {
    const filterProduct = this.state.products.filter((name) =>
      name.title.toLowerCase().includes(searchString.toLowerCase())
    );
    this.setState({ filterProduct: filterProduct });
  };

  // creditCard=async(card)=>{
  //   const mutation=gql`
  //   mutation checkoutCompleteWithCreditCardV2($checkoutId: ID!, $payment: CreditCardPaymentInputV2!) {
  //     checkoutCompleteWithCreditCardV2(checkoutId: $checkoutId, payment: $payment) {
  //       checkout {
  //         id
  //       }
  //       checkoutUserErrors {
  //         code
  //         field
  //         message
  //       }
  //       payment {
  //         id
  //       }
  //     }
  //   }
  //   `
  //   const res= await apolloClient.mutate({
  //     mutation:mutation,variables:{
  //       checkoutId:localStorage.cart_id,
  //       payment:card
  //     }
  //   });
  //   console.log(res)
  // }

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
          adddiscount: this.adddiscount,
          removediscount: this.removediscount,
          getShippingMethod: this.getShippingMethod,
          setPriceShipping: this.setPriceShipping,
          updateShippingLine: this.updateShippingLine,
          searchProduct: this.searchProduct,
          metafield: this.metafield,
          getmeta: this.getmeta,
          // creditCard:this.creditCard
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
