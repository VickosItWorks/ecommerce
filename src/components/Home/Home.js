import React, {useEffect, useContext} from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../App";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0.5em;
  margin: 0 auto;
  align-items: center;
`;



const Home = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('accessToken')) navigate('/login');
    userContext.setUser(JSON.parse(localStorage.getItem('userData')));
  }, [])

  if(!userContext.user) return null;
  return (
    <>
      <Container>
        <Outlet/>
      </Container>
    </>
  );
}

export default Home;