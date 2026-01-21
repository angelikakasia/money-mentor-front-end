const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/transactions`;


// GET summary/recent transactions
const getRecent = async () => {
  try {
    const res = await fetch(`${BASE_URL}/recent`, {
      headers: { 
        Authorization: `Bearer ${localStorage.getItem('token')}` 
      },
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};


export { getRecent };