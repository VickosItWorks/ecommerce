import React from "react";
import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const ContainerDetail = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  margin: 1em auto;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-grow: 1;
  flex-basis: 0;
  h3 {
    font-size: 1.2em;
    margin: 0.5em 0;
  }
`;

const ProductDetail = () => {
  const { id } = useParams();
  const { data, error } = useFetch(`/products/${id}`);

  return (
    <div>
      <h1>Product Detail</h1>
      {error && <p>{error}</p>}
      <ContainerDetail>
        {data && (
          <div>
            <h2>{data.name}</h2>
            <p>{data.description}</p>
            <p>{data.price}</p>
            <img src={data.image} alt="" />
          </div>
        )}
      </ContainerDetail>
    </div>
  );
};

export default ProductDetail;
