const requestPost = async ({ pathUrl, payload }) => {
  const data = await fetch(`http://localhost:5500/${pathUrl}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then(response => response.json());
  console.log('DATA INSIDE THE USERPOSTHELPER', data);
  return data;
}

export default requestPost;
