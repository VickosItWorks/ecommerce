import React from "react";
import { useFetch } from "../../hooks/useFetch";

const Product = () => {
  const { data, error } = useFetch("/products");

  return (
    <>
      <h1>Product</h1>
      {data && data.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>{product.price}</p>
        </div>
      ))}
    </>
  );
}

export default Product;