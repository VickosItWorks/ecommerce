const requestPost = async ({ pathUrl, payload }) => {
  const data = await fetch(`http://localhost:5500/${pathUrl}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then(response => response.json());
  return data;
}

export default requestPost;
