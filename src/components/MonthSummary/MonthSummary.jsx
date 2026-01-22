import { useState, useEffect } from "react";
import { getMonthlySummary } from "../../services/transactionService";
import { Link } from 'react-router-dom';

const MonthlySummary = () => {
    const [allTransactions, setAllTransactions] = useState([]);
    // filter for all, income or expense
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchSummary = async () => {
            const data = await getMonthlySummary();
            setAllTransactions(data);
        };
        fetchSummary();
    }, []);

    // handle edge case of no data/transactions
    if (allTransactions.length === 0) {
    return (
      <main>
        <h1>Monthly Summary</h1>
        <p>No transactions found for this month yet!</p>
        <Link to="/">
            <button>Return to Dashboard</button>
        </Link>
      </main>
    );
  }

    // filter transactions by type
    const filteredTransactions = allTransactions.filter(transaction => {
        if (filter === 'all') return true;
            return transaction.categoryId?.type === filter;
    });

    const incomeTotal = allTransactions.filter(transaction => transaction.categoryId?.type === 'Income').reduce((acc, transaction) => acc + transaction.amount, 0);

    const expenseTotal = allTransactions.filter(transaction => transaction.categoryId?.type === 'Expense').reduce((acc, transaction) => acc + transaction.amount, 0);

    const netSavings = incomeTotal - expenseTotal;

    const total = filteredTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);

    return (
        <>
            <main>
                <h1>Monthly Summary</h1>
                <section>
                    {/* <div>
                        <h4>Total Income:</h4>
                        <p>${incomeTotal.toFixed(2)}</p>
                    </div>
                    <div>
                    <h4>Total Expenses:</h4>
                        <p>${expenseTotal.toFixed(2)}</p>
                    </div>
                    <div>
                    <h4>Net Savings:</h4>
                        <p>${netSavings.toFixed(2)}</p>
                    </div> */}
                
                    <div className="filter-btns">
                        <button onClick={() => setFilter('all')}>All Transactions</button>
                        <button onClick={() => setFilter('Income')}>Income</button>
                        <button onClick={() => setFilter('Expense')}>Expenses</button>
                    </div>
                </section>
                <h3>Total: ${total.toFixed(2)}</h3>

                <ul>
                    {filteredTransactions.map(transaction => {
                        const isIncome = transaction.categoryId?.type === 'Income';
                        const symbol = isIncome ? '+' : '-';

                        return (
                      <li key={transaction._id}>
                        {/* date */}
                        {new Date(transaction.date).toLocaleDateString()} |
                        {/* description & type */}
                        {" "}{transaction.description} ({transaction.categoryId?.type}) |
                        {/* category name */}
                        {" "}{transaction.categoryId?.name}
                        {/* amount */} 
                        {" "}{symbol}${transaction.amount}
                      </li>  
                    );
                })}
                </ul>
            </main>
        </>
    );
};

export default MonthlySummary;