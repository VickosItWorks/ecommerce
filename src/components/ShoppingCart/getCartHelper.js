const getCartHelper = async (cartId) => {
  //  buscar el carrito en la base de datos

  const cart = await fetch(`http://localhost:5500/cart/${cartId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
    },
  }).then(response => response.json());
  console.log('DATA INSIDE THE carhelper', cart);
  return cart;
};

export default getCartHelper;