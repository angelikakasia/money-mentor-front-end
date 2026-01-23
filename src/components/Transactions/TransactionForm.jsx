import { useParams } from "react-router";
import { useEffect, useState } from "react";
import * as transactionService from "../../services/transactionService";

const TransactionForm = ({
  categories,
  handleAddTransaction,
  handleUpdateTransaction,
}) => {
  const { transactionId } = useParams();

  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    date: "",
    type: "Expense",
    categoryId: "",
    note: "",
  });

  useEffect(() => {
    const fetchTransaction = async () => {
      const transactionData = await transactionService.show(transactionId);

      // Prefill form data from the transaction returned by the API
      setFormData({
        amount: transactionData.amount ?? "",
        description: transactionData.description ?? "",
        // Convert ISO date to YYYY-MM-DD for <input type="date" />
        date: transactionData.date ? transactionData.date.slice(0, 10) : "",
        type: transactionData.type ?? "Expense",
        // categoryId might come populated (object) or as a string id
        categoryId:
          typeof transactionData.categoryId === "object"
            ? transactionData.categoryId._id
            : transactionData.categoryId ?? "",
        note: transactionData.note ?? "",
      });
    };

    if (transactionId) fetchTransaction();

    // Cleanup/reset (same idea as the lab)
    return () =>
      setFormData({
        amount: "",
        description: "",
        date: "",
        type: "Expense",
        categoryId: "",
        note: "",
      });
  }, [transactionId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (transactionId) {
      handleUpdateTransaction(transactionId, formData);
    } else {
      handleAddTransaction(formData);
    }
  };

  const setType = (nextType) => {
    // When switching type, reset categoryId to avoid mismatched categories
    setFormData((prev) => ({ ...prev, type: nextType, categoryId: "" }));
  };

  const filteredCategories = categories.filter((c) => c.type === formData.type);
  return (
    <main>
      <h1>{transactionId ? "Edit Transaction" : "New Transaction"}</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="amount-input">Amount</label>
        <input
          required
          id="amount-input"
          name="amount"
          type="number"
          value={formData.amount}
          onChange={handleChange}
          step="0.01"
        />

        <label htmlFor="description-input">Description</label>
        <input
          id="description-input"
          name="description"
          type="text"
          value={formData.description}
          onChange={handleChange}
        />

        <label htmlFor="date-input">Date</label>
        <input
          required
          id="date-input"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
        />

        <label>Type</label>
        <div>
          <button
            type="button"
            onClick={() => setType("Income")}
            aria-pressed={formData.type === "Income"}
            disabled={formData.type === "Income"}
          >
            Income
          </button>

          <button
            type="button"
            onClick={() => setType("Expense")}
            aria-pressed={formData.type === "Expense"}
            disabled={formData.type === "Expense"}
          >
            Expense
          </button>
        </div>

        <label htmlFor="categoryId-input">Category</label>
        <select
          required
          id="categoryId-input"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
        >
          <option value="">Select a category</option>

          {filteredCategories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <label htmlFor="note-input">Note</label>
        <input
          id="note-input"
          name="note"
          type="text"
          value={formData.note}
          onChange={handleChange}
        />
        <button type="submit">Save</button>
      </form>
    </main>
  );
};

export default TransactionForm;
