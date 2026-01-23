import { useParams, Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import * as transactionService from "../../services/transactionService";

const TransactionDetails = ({ categories, handleDeleteTransaction }) => {
  const navigate = useNavigate();
  const { transactionId } = useParams();
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      const transactionData = await transactionService.show(transactionId);
      setTransaction(transactionData);
    };

    fetchTransaction();
  }, [transactionId]);

  const categoryNameById = (categoryId) => {
    // If categoryId is populated (object):
    if (categoryId && typeof categoryId === "object") return categoryId.name;

    // If categoryId is a string id:
    const found = categories.find((c) => c._id === categoryId);
    return found ? found.name : "Uncategorized";
  };

  if (!transaction) return <main>Loading...</main>;

  return (
    <main>
      <h1>Transaction Details</h1>

      <h2>
        {transaction.type} • {transaction.type === "Income" ? "+" : "-"}$
        {Number(transaction.amount).toFixed(2)}
      </h2>

      <p>Category: {categoryNameById(transaction.categoryId)}</p>
      <p>Date: {new Date(transaction.date).toLocaleDateString()}</p>
      <p>Description: {transaction.description || "No description"}</p>
      <p>Note: {transaction.note || "No note"}</p>

      <section>
        <Link to={`/transactions/${transactionId}/edit`}>Edit</Link>{" "}
        <button
          onClick={() => {
            if (window.confirm("Delete this transaction?")) {
              handleDeleteTransaction(transactionId);
            }
          }}
        >
          Delete
        </button>
        <button onClick={() => navigate(-1)}>Back</button>
      </section>
    </main>
  );
};

export default TransactionDetails;
