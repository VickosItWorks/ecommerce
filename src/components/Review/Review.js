import React from "react";
import styled from "styled-components";
import { useFetch } from "../../hooks/useFetch";

const Comments = styled.div`
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

const Review = ({productId}) => {
  const { data: reviews } = useFetch(`/reviews?productId=${productId}`);

  return (
    <div>
      <h3>comentarios</h3>
      <Comments>
        {reviews && reviews.map(reviewData => (
          <div key= {reviewData.id}>
            <p>{reviewData.comment}</p>
            <p>{reviewData.rate}</p>
          </div>
        ))}
      </Comments>
    </div>
  );
};

export default Review;