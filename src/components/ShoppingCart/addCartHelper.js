const addCartHelper = async (cart) => {
  const data = await fetch(`http://localhost:5500/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
    },
    body: JSON.stringify(cart),
  });

  const responseData = await data.json();
  return responseData;
};

export default addCartHelper;