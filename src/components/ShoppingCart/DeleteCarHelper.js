const deleteCartItem = async ({ pathUrl}) => {
    const data = await fetch(`http://localhost:5500/${pathUrl}`, {
      method: "DELETE",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
    }
    }).then(response => response.json());
    return data;
  }
  
  export default deleteCartItem;
  