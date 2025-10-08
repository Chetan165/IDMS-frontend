const auth = async () => {
  try {
    const result = await fetch("http://localhost:3000/api/protected", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return result.json();
  } catch (err) {
    console.error("Auth error:", err);
  }
};

export default auth;
