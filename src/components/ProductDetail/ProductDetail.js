import React, { useEffect, useState, useContext } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { CartContext } from "../../App";
import addCartHelper from "../ShoppingCart/addCartHelper";
import getCartHelper from "../ShoppingCart/getCartHelper";

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
  flex-grow: 1;
  flex-basis: 0;
  h3 {
    font-size: 2em;
    margin: 0.5em 0;
  }
  p {
    font-size: 1em;
    font-weight: bold;
    margin: 0.5em 0;
  }
`;

const SidePanel = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  margin: 1em auto;
  flex-grow: 0.1;
  h3 {
    font-size: 1.2em;
    margin: 0.5em 0;
  }
`;

const ButtonOrange = styled.button`
  padding: 0.5em;
  margin: 1em 0;
  background-color: orange;
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
      cursor: pointer;
    }
  }
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

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: justify;
  justify-content: justify;
  text-align: justify;
  width: 90%;
  h3 {
    font-size: 1.2em;
    margin-bottom: 1em;
  }
`;

const ReviewCard = styled.div`
  flex-direction: column;
  align-items: justify;
  justify-content: justify;
  text-align: justify;
  border-top: 1px solid #ccc;
  width: 100%;
  p {
    font-size: 1em;
    margin: 0.5em 0;
  }
`;

const LeaveReview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: justify;
  justify-content: justify;
  text-align: justify;
  border-top: 1px solid #ccc;
  width: 100%;
  textarea {
    width: 99%;
    height: 100px;
    border: 1px solid #ccc;
    border-radius: 0.5em;
  }
`;

const TableSpecifications = styled.table`
  width: 90%;
  border-collapse: collapse;
  th {
    background-color: #f2f2f2;
    border: 1px solid #ccc;
    padding: 0.5em;
    width: 30%;
  }
  td {
    border: 1px solid #ccc;
    padding: 0.5em;
    width: 30%;
  }
`;

const ProductDetail = () => {
  const { id } = useParams();
  const cartContext = useContext(CartContext);

  const { data: products, error } = useFetch(`/products/${id}`);
  const { data: reviews, refetch: refetchReviews } = useFetch(
    `/reviews?productId=${id}`
  );
  
  const [rate, setRate] = useState(1);
  const [image, setImage] = useState("");
  const [cart, setCart] = useState({});

  const user = JSON.parse(localStorage.getItem("userData"));

  const startRating = (rate) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rate) {
        stars.push(<FaStar key={i} color="orange" />);
      } else if (i - rate < 1) {
        stars.push(<FaStarHalfAlt key={i} color="orange" />);
      } else {
        stars.push(<FaRegStar key={i} color="orange" />);
      }
    }
    return stars;
  };

  const submitReview = async (e) => {
    e.preventDefault();
    const elements = e.target.elements;
    const body = {
      userId: user.id,
      productId: +id,
      rate: +elements.rate.value,
      comment: elements.comment.value,
    };

    await fetch(`http://localhost:5500/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());

    refetchReviews();
    e.target.reset();
  };

  const selectImage = (imageUrl) => {
    setImage(imageUrl);
  };

  useEffect(() => {
    if (products && products.images.length > 0) {
      setImage(products.images[0].url);
    }
  }, [products]);

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      calculateAverageRate(reviews);
    }
  }, [reviews]);

  const calculateAverageRate = (reviews) => {
    if (!reviews) return 0;

    let sum = 0;
    reviews.forEach((review) => {
      sum += review.rate;
    });

    let average = sum / reviews.length;
    return average;
  };

  const AddToWishlist = async (e) => {
    e.preventDefault();
    const data = await fetch(`http://localhost:5500/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        productId: +id,
      }),
    }).then((response) => response.json());
    toast.success(`Product added in the wishlist`, { autoClose: 500 });
    return data;
  };

  const AddToCart = async (e) => {
    e.preventDefault();
    const cart = {
      userId: user.id,
      products: [
        {
          productId: +id,
          quantity: 1,
        },
      ],
    };
    
    addCartHelper(cart);
    // const cartId = await getCartHelper(cart.id);

    toast.success(`Product added in the cart`, { autoClose: 500 });
  };

  return (
    <div>
      <h1>Product Details</h1>
      {error && <p>{error}</p>}
      <Container>
        <LeftPanel>
          <List>
            {products &&
              products.images.map((image) => (
                <li key={image.id}>
                  <img
                    src={image.url}
                    onMouseEnter={() => selectImage(image.url)}
                    alt=""
                  />
                </li>
              ))}
          </List>
          <DefaultImage src={image} alt="" />
        </LeftPanel>
        <ContainerDetail>
          {products && (
            <div>
              <h3>{products.name}</h3>
              <p>{products.description}</p>
              <h3>$ {products.price}</h3>
              <p>Rate: {startRating(calculateAverageRate(reviews))}</p>
              <p>Discount: {products.discount} %</p>
              <p>
                Final Price: ${" "}
                {products.price - (products.price * products.discount) / 100}
              </p>
              <p>Stock: {products.stock}</p>
            </div>
          )}
        </ContainerDetail>
        <SidePanel>
          <ButtonOrange onClick={AddToCart}>Add to Cart</ButtonOrange>
          <ButtonOrange>Buy Now</ButtonOrange>
          <hr />
          <ButtonOrange onClick={AddToWishlist}>Add to Wishlist</ButtonOrange>
        </SidePanel>
        <TableSpecifications>
          <thead>
            <tr>
              <th>Specification</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.specifications.map((spec) => (
                <tr key={spec.id}>
                  <td>{spec.name}</td>
                  <td>{spec.value}</td>
                </tr>
              ))}
          </tbody>
        </TableSpecifications>

        <ReviewContainer>
          <h3>Reviews</h3>
          {reviews &&
            reviews.map((reviewData) => (
              <ReviewCard key={reviewData.id}>
                <p>Rate: {startRating(reviewData.rate)}</p>
                <p>User: {reviewData.userId}</p>
                <p>{reviewData.comment}</p>
              </ReviewCard>
            ))}
          <LeaveReview>
            <form onSubmit={submitReview}>
              <h3>Leave your own review</h3>
              <p>Rate: {startRating(rate)} </p>
              <input
                type="range"
                min="1"
                max="5"
                name="rate"
                defaultValue={1}
                onChange={(e) => setRate(e.target.value)}
              />
              <textarea placeholder="Leave a comment..." name="comment" required/>
              <ButtonOrange type="submit">Submit Review</ButtonOrange>
            </form>
          </LeaveReview>
        </ReviewContainer>
      </Container>
    </div>
  );
};

export default ProductDetail;
