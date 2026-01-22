import { useParams } from "react-router";

const TransactionForm = () => {
  const { transactionId } = useParams();

  return (
    <main>
      <h1>{transactionId ? "Edit Transaction" : "New Transaction"}</h1>

      {transactionId && <p>Editing transaction: {transactionId}</p>}

      <p>Form coming soon...</p>
    </main>
  );
};

export default TransactionForm;
