import React from "react";
import { useFetch } from "../../hooks/useFetch";

const Category = () => {
  const { data, loading, error } = useFetch("/categories");
  return (
    <>
      <h1>Category</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error</p>}
      <ul>
        {data && data.map((category) => (
          <li key={category.id}><h3>{category.name}</h3></li>
        ))}
      </ul>
    </>
  );
}

export default Category;