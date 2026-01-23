import { Link } from "react-router-dom";
import "./TransactionList.css";

const TransactionList = ({ transactions, categories }) => {
  const categoryNameById = (categoryId) => {
    if (categoryId && typeof categoryId === "object") return categoryId.name;
    const found = categories.find((c) => c._id === categoryId);
    return found ? found.name : "Uncategorized";
  };

  return (
    <main className="transactions-page">
      <h1>Transactions</h1>

      <div className="transactions-actions">
        <Link to="/transactions/new">
          <button type="button">+ Add Transaction</button>
        </Link>
      </div>

      {!transactions.length && <p>No transactions yet.</p>}

      <div className="transactions-list">
        {transactions.map((t) => (
          <Link
            key={t._id}
            to={`/transactions/${t._id}`}
            className="transaction-link"
          >
            <article className="transaction-card">
              <header>
                <h2 className="transaction-amount">
                  {t.type === "Income" ? "+" : "-"}$
                  {Number(t.amount).toFixed(2)}
                </h2>
                <p className="transaction-meta">
                  {categoryNameById(t.categoryId)} •{" "}
                  {new Date(t.date).toLocaleDateString()}
                </p>
              </header>

              <p className="transaction-desc">
                {t.description || "No description"}
              </p>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default TransactionList;
