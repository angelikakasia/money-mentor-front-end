import { Link } from "react-router";

const TransactionList = ({ transactions, categories }) => {
  const categoryNameById = (categoryId) => {
    // If categoryId is populated (object):
    if (categoryId && typeof categoryId === "object") return categoryId.name;

    // If categoryId is a string id:
    const found = categories.find((c) => c._id === categoryId);
    return found ? found.name : "Uncategorized";
  };

  return (
    <main>
      <h1>Transactions</h1>

      {!transactions.length && <p>No transactions yet.</p>}

      {transactions.map((t) => (
        <Link key={t._id} to={`/transactions/${t._id}`}>
          <article>
            <header>
              <h2>
                {t.type === "Income" ? "+" : "-"}${Number(t.amount).toFixed(2)}
              </h2>
              <p>
                {categoryNameById(t.categoryId)} •{" "}
                {new Date(t.date).toLocaleDateString()}
              </p>
            </header>

            <p>{t.description || "No description"}</p>
          </article>
        </Link>
      ))}
    </main>
  );
};

export default TransactionList;
