import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useFetch } from "../../hooks/useFetch";
import { Star, Heart } from 'lucide-react';
import { useState, useEffect } from "react";
import updateWishList from "./updateWishListHelper";


const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #f5f5f5;
  flex-wrap: nowrap;
   overflow-x: auto;
   -webkit-overflow-scrolling: touch;
   -ms-overflow-style: -ms-autohiding-scrollbar;
    &::-webkit-scrollbar {
    display: none;
  }
  padding: 1em;
  margin: 1em auto;
`;

const Card = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 1em;
  margin: 0.5em 0.5em;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s;
  box-shadow: 0 0 10px #ccc;
  border-radius: 0.5em;
  max-width: 150px;
  background-color: #fff;
  &:hover {
    transform: scale(1.1);
  }
  img {
    width: 100%;
    height: auto;
  }
`;


const DetailsCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1em;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-grow: 1;
  flex-basis: 0;
  h3 {
    font-size: 1.2em;
    margin: 0.5em 0;
  } 
  p {
    font-size: 0.8em;
    margin: 0.5em 0;
  } 
  img {
    width: 50%;
    height: 50%;
    object-fit: cover;
  }
`;

const Product = () => {
  const { data, error } = useFetch("/products");
  const wish = useFetch("/wishlist?userId:1");
  const navigate = useNavigate();
  const [favs, setFavs] = useState([]);
  const [test, setTest] = useState(false);

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };


  useEffect(() => {
    if (wish.data && !test) {
      //newDat = wish.data[0].products.map(eachProd => eachProd.productId);
      const newDat = wish.data[0].products;
      setFavs(newDat);
      setTest(true);
    }
    console.log('ESTAN PASANDO COSASSSSSS');
  }, [wish])

  const wishItem = async (e, itemId, favs, isLiked) => {
    e.stopPropagation();
    const newWishList = isLiked ?
      favs.filter(favItem => favItem.productId != itemId) : [...favs, { productId: itemId }];

    const updateBody = {
      "userId": wish.data[0].userId,
      "id": wish.data[0].userId,
      products: newWishList
    };

    //updateWishList({pathUrl: `wishlist/${userId}` , updateBody})
    const anotherWishList = await updateWishList({ pathUrl: 'wishlist/1', updateBody })
    setFavs(anotherWishList.products);


  }
  console.log('FAVS', favs);
  return (
    <>
      <h1>Products</h1>
      {error && <p>Error</p>}
      <CardContainer>
        {data &&
          data.map((product) => {
            const liked = favs.find(el => el.productId === product.id);
            return (
              <Card key={product.id} onClick={() => handleClick(product.id)}>
                <DetailsCard>
                  <h3>{product.name}</h3>
                  <img src={product.images[0].url} alt="" />
                  <p>Description: {product.description}</p>
                  <p>$ {product.price}</p>
                </DetailsCard>
                <button onClick={(e) => wishItem(e, product.id, favs, liked)}>{liked ? <Heart /> : <Star />}</button>
              </Card>
            )
          })}
      </CardContainer>
    </>
  );
};

export default Product;
