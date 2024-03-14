const updateCartItem = async ({ pathUrl, updateBody}) => {
    const data = await fetch(`http://localhost:5500/${pathUrl}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
    },
    body: JSON.stringify(updateBody)
    }).then(response => response.json());
    console.log('DATA INSIDE THE carhelper', data);
    return data;
  }
  
  export default updateCartItem;
  