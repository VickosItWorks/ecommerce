const updateWishList = async ({ pathUrl, updateBody}) => {
    console.log(localStorage.getItem('accessToken'));
    const data = await fetch(`http://localhost:5500/${pathUrl}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
    },
    body: JSON.stringify(updateBody)
    });

    const responseData = await data.json();
    return responseData;
  }
  
  export default updateWishList;
  