import { useState, useEffect } from "react";
const baseUrl = "http://localhost:5500";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await fetch(baseUrl + url, {headers: { "Authorization": `Bearer ${localStorage.getItem('accessToken')}`}});
        const json = await res.json();
        setData(json);
        console.log(json);
      };
      fetchData();
    }

    catch (error) {
      setError(error);
    }
  }, [url]);

  return { data, error };
};