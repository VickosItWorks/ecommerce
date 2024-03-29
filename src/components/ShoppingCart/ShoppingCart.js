import React, { useEffect, useState } from 'react';
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
    //const { id } = useParams();
    const id = '1';
    const { data, error } = useFetch(`/cart/${id}`);
    const [cartItems, setCartItems] = useState({});
     
    useEffect(()=> {
        if(data){
            console.log('ESTO ENVIO', data);
            setCartItems(data);
        }
    }, [data])

    console.log('ASI QUEDA CART ITEMS', cartItems);

    const removeItemFromCart = async (productId) => {
        //_embed
        const updateBody = {
            "userId": 1
        }

       const products = [];
       for (const item of cartItems.products){
        if (item.productId != productId){
            products.push(item);
        }
       }

       updateBody.products = products;

       const newCartItem =  await updateCartItem({ pathUrl: `cart/${id}`, updateBody });
       setCartItems(newCartItem); 

    }


    return (
        <div>
            {error && <p>Error</p>}
            <Container>
                <Title>Shopping Cart</Title>
                <CartWrapper>
                    {cartItems.products && cartItems.products.map((shopitem) => (
                        <Item key={shopitem.productId}>
                            <ItemImage src={shopitem.product.images[0].url} alt={shopitem.product.description} />
                            <ItemDetails>
                                <ItemTitle>{shopitem.product.name}</ItemTitle>
                                <ItemPrice>${shopitem.product.price}</ItemPrice>
                                <RemoveButton onClick={() => removeItemFromCart(shopitem.productId)}>Remove</RemoveButton>
                            </ItemDetails>
                        </Item>
                    ))}
                </CartWrapper>
            </Container>
        </div>
    );
};

export default ShoppingCart;