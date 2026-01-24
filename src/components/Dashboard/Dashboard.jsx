import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
// import getRecent for quick summary view of last 5 transactions/current balance
import * as transactionService from "../../services/transactionService";
import * as userService from "../../services/userService";

const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const currentMonth = new Date().toISOString().slice(0, 7);
  // state
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [allTransactions, setAllTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch all data on mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // const updatedUser = await userService.index(user._id)
        const transData = await transactionService.index();
        setAllTransactions(transData || []);
        setLoading(false);

        // debugging () in each transaction
        console.log("RECENT DATA ARRIVED:", transData);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }};

      
      if (user) fetchDashboardData();
    }, [user]);
    useEffect(() => {
        const fetchUserData = async () => {
            const updatedUser = await userService.index(user._id);
            setUser(updatedUser);
        };
        fetchUserData()
    } ,[]
);


const monthlyData = allTransactions.filter((transactions) =>
    transactions.date.startsWith(selectedMonth),
  );
  console.log(monthlyData)
  const income = monthlyData
    .filter((transactions) => transactions.categoryId?.type === "Income")
    .reduce((acc, transactions) => acc + Number(transactions.amount), 0);
  const expenses = monthlyData
    .filter((transactions) => transactions.categoryId?.type === "Expense")
    .reduce((acc, transactions) => acc + Number(transactions.amount), 0);
  const net = income - expenses;

  console.log(allTransactions[0]?.categoryId);

  const recentMoves = [...allTransactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  if (loading)
    return (
      <main className="main-content-container">
        <p>Loading your dashboard...</p>
      </main>
    );

            </section>
            {/* recent activity */}
            <section className='recent-activity-section'>
                <h2>Here are your recent money moves.</h2>
                <ul className='dashboard-transactions-list'>
                    {recentMoves.map((transaction) => {
                        const isIncomeItem = transaction.categoryId?.type === 'Income';
                        const symbol = isIncomeItem ? '+' : '-';

                        return (
                        <Link to={`/transactions/${transaction._id}`} key={transaction._id} className="transaction-link">
                        <li className='transaction-line'key={transaction._id}>
                            {transaction.description}: {' '}
                            <div className={`transaction-amount ${isIncomeItem ? 'amount-income' : 'amount-expense'}`}>
                                {symbol}{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(transaction.amount)}
                            </div>
                        </li>
                        </Link>
                    );
                    
                })}
                </ul>
                <div className="transactions-actions">
                    <Link to ='/transactions'>
                        <button type='button'>View All Transactions</button>
                    </Link>
                    <Link to="/transactions/new">
                        <button type="button">+ Add Transaction</button>
                    </Link>
                </div>
            </section>
            </>
        </main>
    );
};

export default Dashboard;
