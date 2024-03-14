import React from 'react';
import styled from 'styled-components';
import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import deleteCartItem from './DeleteCarHelper';
import updateCartItem from './updateCartHelper';

export const Container = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 0 20px;
`;

export const Title = styled.h1`
  text-align: center;
`;

export const CartWrapper = styled.div`
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

export const Item = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
`;

export const ItemDetails = styled.div`
  margin-left: 20px;
`;

export const ItemTitle = styled.h2`
  margin: 0;
`;

export const ItemPrice = styled.p`
  margin: 5px 0;
`;

export const RemoveButton = styled.button`
  background-color: #ff6347;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #ff483f;
  }
`;

const ShoppingCart = () => {
  const { id } = useParams();
  //const { data, error } = useFetch(`/cart/?userid=1`);
  const { data, error } = useFetch(`/cart/1`);

  //_embed

  //const userProducts = [...data.products];


  const handleRemoveClick = (id) => {
    //deleteCartItem({pathUrl: `cart/${id}?productId=2`});
    //hacer el put, tomar el response y usar el useState para modificar el
    const updateBody = {
        "userId": 1,
      "products": [
        {
          "productId": 1,
          "quantity": 1
        },
        {
          "productId": 4,
          "quantity": 2
        }
      ]
    }
    updateCartItem({pathUrl: `cart/${id}`, updateBody});
  }
    return (
        <div>
            {error && <p>Error</p>}
            <Container>
        <Title>Shopping Cart</Title>
        <CartWrapper>
          <Item>
            <ItemImage src="https://via.placeholder.com/100" alt="Product 1" />
            <ItemDetails>
              <ItemTitle>Product 1</ItemTitle>
              <ItemPrice>$7.99</ItemPrice>
              <RemoveButton onClick={() => handleRemoveClick('1')}>Remove</RemoveButton>
            </ItemDetails>
          </Item>
          <Item>
            <ItemImage src="https://via.placeholder.com/100" alt="Product 2" />
            <ItemDetails>
              <ItemTitle>Product 2</ItemTitle>
              <ItemPrice>$12.03</ItemPrice>
              <RemoveButton>Remove</RemoveButton>
            </ItemDetails>
          </Item>
        </CartWrapper>
      </Container>
        </div>
    );
  };
  
  export default ShoppingCart;