import React from "react";
import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  `;
  
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

const SidePanel = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  margin: 1em auto;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-grow: 1;
  flex-basis: 0;
  border: 1px solid #ccc;
  h3 {
    font-size: 1.2em;
    margin: 0.5em 0;
  }
`;  

const ButtonAddToCart = styled.button`
  padding: 0.5em 1em;
  margin: 1em 0;
  background-color: #f0c040;
  color: #fff;
  border: none;
  border-radius: 0.5em;
  cursor: pointer;
  font-size: 1em;
  font-weight: bold;
  transition: 0.3s;
  &:hover {
    background-color: #0b2c4d;
  }
`;  

const ButtonBuyNow = styled.button`
  background-color: orange;
  color: #fff;
  border: none;
  border-radius: 0.5em;
  cursor: pointer;
  font-size: 1em;
  font-weight: bold;
  padding: 0.5em 1em;
  margin: 1em 0;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #e0b040;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
  li {
    margin: 0.5em 0;
    img {
      width: 50%;
      height: 50%;
      object-fit: cover;
    }
  }
  cursor: pointer;
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1em;
  margin: 1em auto;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-grow: 1;
  flex-basis: 0;
  `;

  const DefaultImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  `;

const ProductDetail = () => {
  const { id } = useParams();
  const { data, error } = useFetch(`/products/${id}`);
  
  return (
    <div>
      <h1>Product Detail</h1>
      {error && <p>{error}</p>}
      <Container>
        <LeftPanel>
          <List>
            {data && data.images.map((img) => (
              <li key={img.id}>
                <img src={img.url} alt="" />
              </li>
            ))}
          </List>
          <DefaultImage src={data && data.images[0].url} alt="" />
        </LeftPanel>
        
      <ContainerDetail>
        {data && (
          <div>
            <h2>{data.name}</h2>
            <p>{data.description}</p>
            <p>$ {data.price}</p>
            <p> <b> Rate: {data.rate} </b></p>
            <p> {data.about}</p>
            <a href={data.reviews}>Reviews</a>
            <a href={data.specifications}>Specifications </a>
          </div>
        )}
      </ContainerDetail>
      <SidePanel>
        <ButtonAddToCart>Add to Cart</ButtonAddToCart>
        <ButtonBuyNow>Buy Now</ButtonBuyNow>
        <hr />
        <ButtonAddToCart>Add to Wishlist</ButtonAddToCart>
      </SidePanel>
      </Container>
    </div>
  );
};

export default ProductDetail;
