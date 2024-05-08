import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import deleteCartItem from './DeleteCarHelper';
import updateCartItem from './updateCartHelper';
import { CartContext, UserContext } from '../../App';

const Container = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 0 20px;
`;

const Title = styled.h1`
  text-align: center;
`;

const CartWrapper = styled.div`
  background-color: #fff;
  border-radius: 5px;
  margin: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const Item = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
`;

const ItemDetails = styled.div`
  margin-left: 20px;
`;

const ItemTitle = styled.h2`
  margin: 0;
`;

const ItemPrice = styled.p`
  margin: 5px 0;
`;

const RemoveButton = styled.button`
  background-color: #ff6347;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
  margin: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ff483f;
  }
`;

const CheckoutButton = styled.button`
  background-color: #164863;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px 15px;
  margin: 5px;
  cursor: pointer;

  &:hover {
    background-color: #2a7ca8;
  }
`;

//ISSUE HERE
const PreCheckout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const QuantitySelectorWrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 150px;
`;

const QuantityInput = styled.input`
  width: 40px;
  text-align: center;
`;

const QuantityButton = styled.div`
  width: 15px;
  height: 15px;
  margin: 5px;
  cursor: pointer;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-color: #f5f5f5;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const ShoppingCart = () => {
    const userContext = useContext(UserContext);
    let userId;
    const user = JSON.parse(localStorage.getItem("userData"));
    console.log('USER',user);
    // if(user){
    //     userId = user.id;
    //     userContext.setUser(user);
    // }
    userId = '1';
    const { data, error } = useFetch(`/cart/${userId}`);
    const [cartItems, setCartItems] = useState({});
    const cartContext = useContext(CartContext);

    useEffect(() => {
        console.log('USERID',userId);
        if(!userId) return;
        if (data) {
            setCartItems(data);
            cartContext.setCart(cartItems);
            console.log(cartContext);
        }

        //NOTE: CALLBACK READ 

        // return ()=> {
        //     console.log('unmounting'); 
        // };

    }, [data])

    const removeItemFromCart = async ({productId, userId}) => {
        //_embed
        const updateBody = {
            userId
        }

        const products = cartItems.products.filter(prod => prod.productId != productId);

        updateBody.products = products;

        const newCartItem = await updateCartItem({ pathUrl: `cart/${userId}`, updateBody });
        setCartItems(newCartItem);
    }

    const updateCartQty = async ({productId, prodQty, operation, userId}) => {
        const updateBody = {
            userId
        }

        const products = [];

        for (const item of cartItems.products) {
            if (item.productId != productId) {
                products.push(item);
            } else {
                item.quantity = operation === 'plus' ? (prodQty + 1) : (prodQty - 1);
                products.push(item);
            }
        }

        updateBody.products = products;
        const newCart = await updateCartItem({ pathUrl: `cart/${userId}`, updateBody });
        setCartItems(newCart);
    }

    const calcSubtotal = (allProds) => {
        let total = 0;

        allProds.forEach(el => {
            total += el.quantity * el.product.price;
        });

        return total;
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
                                <QuantitySelectorWrapper>
                                    <QuantityButton onClick={() => updateCartQty({productId: shopitem.productId, prodQty: shopitem.quantity, operation:'minus', userId})}>-</QuantityButton>
                                    <QuantityInput type="number" value={shopitem.quantity} />
                                    <QuantityButton onClick={() => updateCartQty({productId: shopitem.productId, prodQty: shopitem.quantity, operation: 'plus', userId})}>+</QuantityButton>
                                </QuantitySelectorWrapper>
                                <RemoveButton onClick={() => removeItemFromCart({productId: shopitem.productId, userId})}>Remove</RemoveButton>
                            </ItemDetails>
                        </Item>
                    ))}
                </CartWrapper>
                <CartWrapper>
                    {cartItems.products && (
                        <PreCheckout>
                            <div>Subtotal {cartItems.products.length} productos: ${calcSubtotal(cartItems.products)}</div>
                            <CheckoutButton>Proceed to Checkout</CheckoutButton>
                        </PreCheckout>
                    )}
                </CartWrapper>
            </Container>
        </div>
    );
};

export default ShoppingCart;