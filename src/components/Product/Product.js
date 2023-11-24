import React from "react";
import { useFetch } from "../../hooks/useFetch";
import styled from "styled-components";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0.5em;
  margin: 0 auto;
  align-items: center;
`;

const Product = () => {
  const { data, error } = useFetch("/products");

  return (
    <>
      <h1>Products</h1>
      {data && data.map((product) => (
        <Card key={product.id}>
          <h2>{product.name}</h2>
          <p>Description: {product.description}</p>
          <p>$ {product.price}</p>
        </Card>
      ))}
    </>
  );
}

export default Product;