import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useFetch } from "../../hooks/useFetch";

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
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      <h1>Products</h1>
      {error && <p>Error</p>}
      <CardContainer>
        {data &&
          data.map((product) => (
            <Card key={product.id} onClick={() => handleClick(product.id)}>
              <DetailsCard>
                <h3>{product.name}</h3>
                <img src={product.images[0].url} alt="" />
                <p>Description: {product.description}</p>
                <p>$ {product.price}</p>
              </DetailsCard>
            </Card>
          ))}
      </CardContainer>
    </>
  );
};

export default Product;
