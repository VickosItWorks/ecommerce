const getCartHelper = async (userId) => {
  //  buscar el carrito en la base de datos

  const cart = await fetch(`http://localhost:5500/cart?userId=${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
    },
  }).then(response => response.json());
  return cart;
};

export default getCartHelper;