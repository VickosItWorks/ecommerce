import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import deleteCartItem from './DeleteCarHelper';
import updateCartItem from './updateCartHelper';
import { CartContext, UserContext } from '../../App';
import { useSndFetch } from '../../hooks/sndFetch';

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
  const navigate = useNavigate();
  let userId;
  
  console.log(userContext.user);
  userId = userContext.user.id;
  console.log(userId);
  const url = `/cart?userId=${userContext.user?.id}`;
  console.log(url);
  
  //const { data, error } = useFetch(url);
  const {data, isError, isPending} = useSndFetch(url);

  const [cartItems, setCartItems] = useState({});
  const cartContext = useContext(CartContext);

  useEffect(() => {
    if (!userId) return;
    if (data) {
      setCartItems(data);
      cartContext.setCart(cartItems);
    }

  }, [data, userId, cartItems, cartContext])

  const removeItemFromCart = async ({ productId, userId }) => {
    //_embed
    const updateBody = {
      userId
    }

    const products = cartItems.products.filter(prod => prod.productId != productId);

    updateBody.products = products;

    const newCartItem = await updateCartItem({ pathUrl: `cart?userId=${userId}`, updateBody });
    setCartItems(newCartItem);
  }

  const updateCartQty = async ({ productId, prodQty, operation, userId }) => {
    const xarray = [];
    const updateBody = {
      userId
    }

    const products = [];

    for (const item of cartItems[0].products) {
      if (item.productId != productId) {
        products.push(item);
      } else {
        item.quantity = operation === 'plus' ? (prodQty + 1) : (prodQty - 1);
        products.push(item);
      }
    }

    updateBody.products = products;
    xarray.push(updateBody);
    const newCart = await updateCartItem({ pathUrl: `cart?userId=${userId}`, updateBody: xarray });
    setCartItems(newCart);
  }

  const calcSubtotal = (allProds) => {
    let total = 0;

    allProds.forEach(el => {
      total += el.quantity * el.product.price;
    });

    return total;
  }

  const products = cartItems[0]?.products ?? cartItems.products;


  return (
    <div>
      {isError && <p>Error</p>}
      <Container>
        <Title>Shopping Cart</Title>
        <CartWrapper>
          {products && products.map((shopitem) => (
            <Item key={shopitem.productId}>
              <ItemImage src={shopitem.product.images[0].url} alt={shopitem.product.description} />
              <ItemDetails>
                <ItemTitle>{shopitem.product.name}</ItemTitle>
                <ItemPrice>${shopitem.product.price}</ItemPrice>
                <QuantitySelectorWrapper>
                  <QuantityButton onClick={() => updateCartQty({ productId: shopitem.productId, prodQty: shopitem.quantity, operation: 'minus', userId })}>-</QuantityButton>
                  <QuantityInput type="input" value={shopitem.quantity} />
                  <QuantityButton onClick={() => updateCartQty({ productId: shopitem.productId, prodQty: shopitem.quantity, operation: 'plus', userId })}>+</QuantityButton>
                </QuantitySelectorWrapper>
                <RemoveButton onClick={() => removeItemFromCart({ productId: shopitem.productId, userId })}>Remove</RemoveButton>
              </ItemDetails>
            </Item>
          ))}
        </CartWrapper>
        <CartWrapper>
          {products && (
            <PreCheckout>
              <div>Subtotal {products.length} productos: ${calcSubtotal(products)}</div>
              <CheckoutButton onClick={() => { navigate('/checkout') }}>Proceed to Checkout</CheckoutButton>
            </PreCheckout>
          )}
        </CartWrapper>
      </Container>
    </div>
  );
};

export default ShoppingCart;