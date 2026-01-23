import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
// import getRecent for quick summary view of last 5 transactions/current balance
import * as transactionService from '../../services/transactionService';

const Dashboard = () => {
    const { user } = useContext(UserContext);
    const currentMonth = new Date().toISOString().slice(0, 7);
    // state
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [allTransactions, setAllTransactions] = useState([]);
    const [loading, setLoading] = useState(true);    

    // fetch all data on mount
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const transData = await transactionService.index();
                setAllTransactions(transData || []);
                setLoading(false);
                // debugging () in each transaction
                console.log("RECENT DATA ARRIVED:", transData);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }
        if (user) fetchDashboardData()
    }, [user]);

    const monthlyData = allTransactions.filter(transactions => transactions.date && transactions.date.toString().startsWith(selectedMonth));
    const income = monthlyData
        .filter(transactions => transactions.categoryId?.type === 'Income')
        .reduce((acc, transactions) => acc + Number(transactions.amount), 0);
    const expenses = monthlyData
        .filter(transactions => transactions.categoryId?.type === 'Expense')
        .reduce((acc, transactions) => acc + Number(transactions.amount), 0);
    const net = income - expenses;

    const recentMoves = [...allTransactions]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    if (loading) return <main className='main-content-container'><p>Loading your dashboard...</p></main>;

    return (
        <main className='main-content-container'>
            <>
            <h1>Welcome to your dashboard, {user.username}!</h1>
            {/* monthly stats at a glance */}
            <section className='monthly-stats-section'>
                <div className='stats-header'>
                    <select className='month-dropdown' value={selectedMonth} onChange={handleMonthChange}>
                        <option value="2026-01">January 2026</option>
                        <option value="2025-12">December 2025</option>
                    </select>
                </div>
                <div className='stats-grid'>
                    <div className='stat-item'>
                        <span className='label'>Income</span>
                        <span className='value income'>${income.toFixed(2)}</span>
                    </div>
                    <div className='stat-item'>
                        <span className='label'>Expenses</span>
                        <span className='value expense'>${expenses.toFixed(2)}</span>
                    </div>
                    <div className='stat-item'>
                        <span className='label'>Net Savings</span>
                        <span className={`value ${net >= 0 ? 'net-positive' : 'net-negative'}`}>${net.toFixed(2)}</span>
                    </div>
                </div>

            </section>
            {/* recent activity */}
            <section className='recent-activity-section'>
                <h2>Here are your recent money moves.</h2>
                <ul className='transactions-list'>
                    {recentMoves.map((transaction) => {
                        const isIncomeItem = transaction.categoryId?.type === 'Income';
                        const symbol = isIncomeItem ? '+' : '-';

                        return (
                        <Link to={`/transactions/${transaction._id}`} key={transaction._id} className="transaction-link">
                        <li key={transaction._id}>
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
