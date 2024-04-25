import { useState, useEffect } from "react";
const baseUrl = "http://localhost:5500";

const fetchData = (url, setData, setError) => {
  try {
    const fetchData = async () => {
      const res = await fetch(baseUrl + url, {headers: { "Authorization": `Bearer ${localStorage.getItem('accessToken')}`}});
      const json = await res.json();
      setData(json);
    };
    fetchData();
  }
  
  catch (error) {
    setError(error);
  }
};

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData(url, setData, setError);
  }, [url]);

  const refetch = () => {
    fetchData(url, setData, setError);
  };

  return { data, error, refetch };
};