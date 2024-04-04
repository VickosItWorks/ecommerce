import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";

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
  padding: 0.5em 1em;
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

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: justify;
  justify-content: justify;
  text-align: justify;
  width: 90%;
  h3 {
    font-size: 1.2em;
    margin: 0.5em 0;
  }
`;

const ReviewCard = styled.div`
  flex-direction: column;
  padding: 1em;
  margin: 1em;
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
  padding: 1em;
  margin: 1em;
  align-items: justify;
  justify-content: justify;
  text-align: justify;
  border-top: 1px solid #ccc;
  width: 100%;
  textarea {
    width: 100%;
    height: 100px;
    padding: 0.5em;
    margin: 0.5em 0;
    border: 1px solid #ccc;
    border-radius: 0.5em;
  }
`;

const ContainerSpecifications = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  margin: 1em;
  width: 90%;
  p {
    font-size: 1em;
    margin: 0.5em 0;
  }

`;

const ProductDetail = () => {
  const { id } = useParams();
  const { data, error } = useFetch(`/products/${id}`);
  const { data: reviews } = useFetch(`/reviews?productId=${id}`);
  const [review, setReview] = useState("");
  const [rate, setRate] = useState(0);
  const [image, setImage] = useState("");

  const startRating = (rate) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rate) {
        stars.push(<FaStar key={i} color="orange" />);
      } else {
        stars.push(<FaStar key={i} color="grey" />);
      }
    }
    return stars;
  };

  const submitReview = async (e) => {
    e.preventDefault();
    const data = await fetch(`http://localhost:5500/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: 1,
        productId: id,
        rate: rate,
        comment: review,
      }),
    }).then((response) => response.json());
    return data;
  };

  const selectImage = (image) => {
    setImage(image);
  };

  useEffect(() => {
    if (data && data.images.length > 0) {
      setImage(data.images[0].url);
    }
  }, [data]);

  useEffect(() => {
    if (rate) {
      setRate(rate);
    }
  }, [rate]);

  const calculateAverageRate = (reviews) => {
    let sum = 0;
    reviews.forEach((review) => {
      sum += review.rate;
    });
    let average = sum / reviews.length;
    average = Math.round(average);
    console.log("maver", average);
    return average;
  };

  return (
    <div>
      <h1>Product Detail</h1>
      {error && <p>{error}</p>}
      <Container>
        <LeftPanel>
          <List>
            {data &&
              data.images.map((image) => (
                <li key={image.id}>
                  <img
                    src={image.url}
                    onClick={() => selectImage(image.url)}
                    alt=""
                  />
                </li>
              ))}
          </List>
          <DefaultImage src={image} alt="" />
        </LeftPanel>
        <ContainerDetail>
          {data && (
            <div>
              <h3>{data.name}</h3>
              <p>{data.description}</p>
              <p>Price: $ {data.price}</p>
              <p>Rate: {startRating(calculateAverageRate(reviews))}</p>
              <p>Discount: {data.discount} %</p>
              <p>
                Final Price: {data.price - (data.price * data.discount) / 100}
              </p>
              <p>Stock: {data.stock}</p>
            </div>
          )}
        </ContainerDetail>
        <SidePanel>
          <ButtonOrange>Add to Cart</ButtonOrange>
          <ButtonOrange>Buy Now</ButtonOrange>
          <hr />
          <ButtonOrange>Add to Wishlist</ButtonOrange>
        </SidePanel>
        <ContainerSpecifications>
          <h3>Specifications</h3>
            {data &&
              data.specifications.map((spec) => (
                  <p key={spec.id}>
                    {spec.name}: {spec.value}
                  </p>
              ))}
        </ContainerSpecifications>
        <ReviewContainer>
          <h3>Reviews</h3>
          {reviews &&
            reviews.map((reviewData) => (
              <ReviewCard key={reviewData.id}>
                <p>Rate: {startRating(reviewData.rate)}</p>
                <p>{reviewData.comment}</p>
              </ReviewCard>
            ))}
          <LeaveReview>
            <div>
              <h3>Leave a Review</h3>
              <p>Rate: {startRating(rate)} </p>

              <input
                type="range"
                min="1"
                max="5"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
              <textarea
                placeholder="Leave a Review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
              <ButtonOrange onClick={submitReview}>Submit Review</ButtonOrange>
            </div>
          </LeaveReview>
        </ReviewContainer>
      </Container>
    </div>
  );
};

export default ProductDetail;
