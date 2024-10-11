import React, {useContext} from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useState, useEffect } from "react";
import { ProductContext } from "../../App";
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
  const productContext = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  const baseUrl = "http://localhost:5500";
  
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await fetch(baseUrl +'/products?q='+ debouncedSearchTerm, {headers: { "Authorization": `Bearer ${localStorage.getItem('accessToken')}`}});
        const json = await res.json();
        productContext.setProducts(json);
      };
      fetchData();
    }

    catch (error) {
      console.error(error);
    }
  }, [debouncedSearchTerm]);

 return (
  <SearchContainer>
  <SeachBox
    type="text"
    placeholder="Search a product..."
    value={searchTerm}
    onChange={handleChange}
  />
  </SearchContainer>
 )
 
};

export default Search;
