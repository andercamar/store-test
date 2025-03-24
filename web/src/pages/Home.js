import React from "react";
import ProductList from "../components/ProductList";
import { useCart } from "../context/CartContext";

const Home = () =>{
  const { addToCart } = useCart();

  return(
    <div>
      <h1>Loja Online</h1>
      <ProductList addToCart={addToCart} />
    </div>
  );
};

export default Home;
