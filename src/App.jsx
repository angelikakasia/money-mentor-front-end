// App.jsx
import { useContext, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router";

import NavBar from "./components/NavBar/Navbar.jsx";
import SignUpForm from "./components/SignUpForm/SignUpForm.jsx";
import SignInForm from "./components/SignInForm/SignInForm.jsx";
import Landing from "./components/Landing/Landing.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";

import TransactionList from "./components/Transactions/TransactionList.jsx";
import TransactionDetails from "./components/Transactions/TransactionDetails.jsx";
import TransactionForm from "./components/Transactions/TransactionForm.jsx";

import * as categoryService from "./services/categoryService.js";
import * as transactionService from "./services/transactionService.js";

import { UserContext } from "./contexts/UserContext.jsx";
import MonthlySummary from "./components/MonthSummary/MonthSummary.jsx";

const App = () => {
  const { user } = useContext(UserContext);
  console.log(user)
  // Needed for TransactionList
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);

  const handleAddTransaction = async (transactionFormData) => {
    const newTransaction = await transactionService.create(transactionFormData);

    setTransactions((prev) => [newTransaction, ...prev]);
    // setUser(newTransaction.user);
    navigate("/transactions");
  };

  const handleUpdateTransaction = async (
    transactionId,
    transactionFormData
  ) => {
    const updatedTransaction = await transactionService.update(
      transactionId,
      transactionFormData
    );

    setTransactions(
      transactions.map((t) =>
        t._id === transactionId ? updatedTransaction : t
      )
    );

    navigate(`/transactions/${transactionId}`);
  };

  const handleDeleteTransaction = async (transactionId) => {
    const deletedTransaction = await transactionService.deleteTransaction(
      transactionId
    );

    // Remove deleted transaction from state
    setTransactions((prev) =>
      prev.filter((t) => t._id !== deletedTransaction._id)
    );

    navigate("/transactions");
  };

  useEffect(() => {
    const fetchAllCategories = async () => {
      const categoriesData = await categoryService.index();
      setCategories(categoriesData);
    };

    const fetchAllTransactions = async () => {
      const transactionsData = await transactionService.index();
      setTransactions(transactionsData);
    };

    if (user) {
      fetchAllCategories();
      fetchAllTransactions();
    }
  }, [user]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />

        {user ? (
          <>
            {/* Protected routes available only to signed-in users */}
            <Route
              path="/transactions"
              element={
                <TransactionList
                  transactions={transactions}
                  categories={categories}
                />
              }
            />
            <Route path="/summary" element={<MonthlySummary />} />
            <Route
              path="/transactions/:transactionId"
              element={
                <TransactionDetails
                  categories={categories}
                  handleDeleteTransaction={handleDeleteTransaction}
                />
              }
            />
            <Route
              path="/transactions/new"
              element={
                <TransactionForm
                  categories={categories}
                  handleAddTransaction={handleAddTransaction}
                  handleUpdateTransaction={handleUpdateTransaction}
                />
              }
            />
            <Route
              path="/transactions/:transactionId/edit"
              element={
                <TransactionForm
                  categories={categories}
                  handleUpdateTransaction={handleUpdateTransaction}
                />
              }
            />
          </>
        ) : (
          <>
            {/* Non-user routes for guests */}
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
