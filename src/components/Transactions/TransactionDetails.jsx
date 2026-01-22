import { useParams } from "react-router";

const TransactionDetails = () => {
  const { transactionId } = useParams();

  return (
    <main>
      <h1>Transaction Details</h1>
      <p>Transaction ID: {transactionId}</p>
    </main>
  );
};

export default TransactionDetails;
