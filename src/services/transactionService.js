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

// POST /transactions - create a transaction for the current user
const create = async (transactionFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transactionFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// GET /recent -- summary/recent transactions
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

// GET /monthly-summary -- monthly transactions
const getMonthlySummary = async () => {
  try {
    const res = await fetch(`${BASE_URL}/monthly-summary`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

// GET /transactions/:id - fetch a single transaction
const show = async (transactionId) => {
  try {
    const res = await fetch(`${BASE_URL}/${transactionId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// PUT /transactions/:id -- update one transaction
const update = async (transactionId, transactionFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${transactionId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transactionFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export { index, create, getRecent, getMonthlySummary, show, update };
