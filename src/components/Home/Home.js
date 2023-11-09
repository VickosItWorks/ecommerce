import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0.5em;
  margin: 0 auto;
  align-items: center;
`;

const Home = () => {
  return (
    <>
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default Home;