import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaReact, FaShoppingCart } from "react-icons/fa";
import Search from "../Search/Search";

const ContainerHeader = styled.div`
  display: flex;
  background-color: #164863;
  color: #fff;
  padding: 1em;
  flex-direction: column;
  flex-wrap: wrap;
`;

const Logo = styled.div`
  font-size: 1.5em;
  margin-left: 0.2em;
  font-weight: bold;
  justify-content: center;
`;

const Navigator = styled.nav`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 1em;
  align-items: center;
`;

const Item = styled.li`
  list-style: none;
  padding: 0.5em;
`;

const StyledLink = styled(Link)`
  & {
    color: #fff;
    text-decoration: none;
  }
`;

const MenuItem = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0.5em;
`;

const MenuUser = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0.5em;
`;

const Navbar = () => {
  return (
    <ContainerHeader>
      <Search />
      <Navigator>
        <Logo>
          {" "}
          <FaReact></FaReact>
        </Logo>
        <MenuItem>
          <Item>
            <StyledLink to="/">Home</StyledLink>
          </Item>
          <Item>
            <StyledLink to="/product">Products</StyledLink>
          </Item>
          <Item>
            <StyledLink to="/category">Categories</StyledLink>
          </Item>
        </MenuItem>
        <MenuUser>
          <Item>
            <StyledLink to="/login">Login</StyledLink>
          </Item>
          <Item>
            <StyledLink to="/register">Register</StyledLink>
          </Item>
          <Item>
            <StyledLink to="/cart">
              <FaShoppingCart></FaShoppingCart>
            </StyledLink>
          </Item>
        </MenuUser>
      </Navigator>
    </ContainerHeader>
  );
};

export default Navbar;
