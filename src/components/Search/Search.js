import React from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useState } from "react";
import styled from "styled-components";

const SeachBox = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: #000;
  background: #fff;
  width: 70%;
  height: 2em;
  border: none;
  border-radius: 4px;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0.5em;
  align-items: center;
  justify-content: center;
  width: 80%;
  align-self: center;
`;

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    console.log(debouncedSearchTerm);
  };

 return (
  <SearchContainer>
  <SeachBox
    type="text"
    placeholder="Search..."
    value={searchTerm}
    onChange={handleChange}
  />
  </SearchContainer>
 )
 
};

export default Search;
