import "./App.css";
import React from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Catalog from "./pages/Catalog";
import ProductDescription from "./pages/ProductDescription";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import About from "./pages/About";
import BillingAddress from "./pages/billingaddress";
import Payment from "./pages/payment";
import Shipping from "./pages/Shipping";

const App = () => {
  return (
    <Router>
      <div>
        <Header></Header>

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/catalog/:handle" element={<Catalog />}></Route>
          <Route
            path="/ProductDescription/:handle"
            element={<ProductDescription />}
          ></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/shippingAddress" element={<BillingAddress />}></Route>
          <Route path="/paymentpage" element={<Payment />}></Route>
          <Route path="/shippingMethod" element={<Shipping />}></Route>
        </Routes>

        <Footer></Footer>
      </div>
    </Router>
  );
};

export default App;
