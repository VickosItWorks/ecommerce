import React from "react";
import { useFetch } from "../../hooks/useFetch";
import styled from "styled-components";

const CardP = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0.5em;
  margin: 10px auto;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s;
  box-shadow: 0 0 10px #ccc;
  border-radius: 2px;
  max-width: 600px;
`;

const Product = () => {
  const { data, error } = useFetch("/products");

  return (
    <>
      <h1>Products</h1>
      {data &&
        data.map((product) => (
          <CardP key={product.id}>
            <h2>{product.name}</h2>
            <img src={product.image} alt=""/>
            <p>Description: {product.description}</p>
            <p>$ {product.price}</p>
          </CardP>
        ))}
    </>
  );
};

export default Product;
