// App.jsx
import "./App.css";
import { useContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router";

import NavBar from "./components/NavBar/Navbar.jsx";
import SignUpForm from "./components/SignUpForm/SignUpForm.jsx";
import SignInForm from "./components/SignInForm/SignInForm.jsx";
import Landing from "./components/Landing/Landing.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";

import TransactionList from "./components/Transactions/TransactionList.jsx";
import TransactionDetails from "./components/Transactions/TransactionDetails.jsx";

import * as categoryService from "./services/categoryService.js";
import * as transactionService from "./services/transactionService.js";

import { UserContext } from "./contexts/UserContext.jsx";

const App = () => {
  const { user } = useContext(UserContext);

  // Needed for TransactionList
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);

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
    } else {
      // Clear state on sign out (prevents showing stale private data)
      setCategories([]);
      setTransactions([]);
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
            <Route
              path="/transactions/:transactionId"
              element={<TransactionDetails />}
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
