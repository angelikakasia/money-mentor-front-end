const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/transactions`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// GET summary/recent transactions
const getRecent = async () => {
  // debugging
  console.log("FETCHING FROM:", `${BASE_URL}/recent`);
  try {
    const res = await fetch(`${BASE_URL}/recent`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    // debugging
    if (!res.ok) {
      const text = await res.text(); // Get the response as text, not JSON
      console.error("Server sent back:", text);
      throw new Error("Check your console to see the HTML the server sent!");
    }
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export { index, getRecent };
