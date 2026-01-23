import { useState, useEffect } from "react";
import { getMonthlySummary } from "../../services/transactionService";
import { Link } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend 
} from 'recharts';

const MonthlySummary = () => {
    const [allTransactions, setAllTransactions] = useState([]);
    // filter for all, income or expense
    const [filter, setFilter] = useState('all');
    // handle data loading delay
    const [loading, setLoading] = useState(true);
    // handle html loading & the container re: the chart rendering
    const [containerWidth, setContainerWidth] = useState(0);

    // fetch data
    useEffect(() => {
        const fetchSummary = async () => {
            const data = await getMonthlySummary();
            setAllTransactions(data || []);
            setLoading(false);
        };
        fetchSummary();
    }, []);

    // watch container size after loading is done
    useEffect(() => {
        if (loading || allTransactions.length === 0) return;

        const observer = new ResizeObserver((entries) => {
            setContainerWidth(entries[0].contentRect.width);
        });

        const chartContainer = document.querySelector('.transactions-chart');
        if (chartContainer) observer.observe(chartContainer);

        return () => observer.disconnect;
    }, [loading, allTransactions]);

    // handle data loading
    if (loading) return <main><p>Loading your summary...</p></main>;

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
    const total = filteredTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    const netSavings = incomeTotal - expenseTotal;

    const chartData = [
        { name: 'Income', amount: incomeTotal, fill: '#4CAF50' },
        { name: 'Expenses', amount: expenseTotal, fill: '#F44336' }
    ];
    
    // chart data calculations
    const typeTotals = filteredTransactions.reduce((acc, transaction) => {
        const typeName = transaction.categoryId?.name || 'Uncategorized';
        acc[typeName] = (acc[typeName] || 0) + transaction.amount;
        return acc;
    }, {});

    const dynamicChartData = Object.keys(typeTotals).map(name => ({
        name: name, 
        amount: typeTotals[name],
        fill: filter === 'Income' ? '#4CAF50' : '#F44336'
    }));

    return (
        <>
            <main className="main-content-container">
                <h1>Monthly Summary</h1>
                <section className="filter-transactions">
                    <div className="filter-btns">
                        <button onClick={() => setFilter('all')}>All Transactions</button>
                        <button onClick={() => setFilter('Income')}>Income</button>
                        <button onClick={() => setFilter('Expense')}>Expenses</button>
                    </div>
                
                <h3>Total: ${total.toFixed(2)}</h3>

                <ul className="transactions-list">
                    {filteredTransactions.map(transaction => {
                        const isIncome = transaction.categoryId?.type === 'Income';

                        return (
                      <li key={transaction._id} className="transaction-card">
                        <div className="transaction-info">
                            <div className="transaction-icon">
                                {isIncome ? '💰' : '💸'}
                            </div>
                        </div>
                        <div className="transaction-details">
                            {/* description */}
                            <div className="transaction-desc">{transaction.description}</div>
                            {/* date & category */}
                            <div className="transaction-meta"> 
                                {new Date(transaction.date).toLocaleDateString()} | {''}
                                {transaction.categoryId?.name}
                            </div>
                        </div>
                        {/* amount */}
                        <div className={`transaction-amount ${isIncome} ? 'amount-income' : 'amount-expense'}`}>
                            {isIncome ? '+' : '-'}${transaction.amount.toFixed(2)}
                        </div>
                      </li> 
                    );
                })}
                </ul>
                </section>
                {/* chart section */}
                <section className="transactions-chart" style={{ width: '100%', height: '300px', marginBottom:'60px' }}>
                    <h2>{filter === 'all' ? 'Income vs Expenses' : `${filter} Breakdown`}</h2>
                    {/* Only render the chart if mounted and we have data */}
                    {containerWidth > 0 && ( 
                    <ResponsiveContainer width='100%' height='100%' minWidth={0}> 
                        <BarChart data={filter === 'all' ? chartData : dynamicChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5}}>
                            <CartesianGrid strokeDasharray='3 3' vertical={false} />
                            <XAxis dataKey='name' />
                            <YAxis tickFormatter={(value) => `$${value}`} />
                            <Tooltip 
                                formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
                                cursor={{ fill: 'transparent' }}
                            />
                            <Legend />
                            <Bar dataKey='amount' radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                    )}
                </section>
                <Link to="/">
                    <button type='button'>Return to Dashboard</button>
                </Link>
            </main>
        </>
    );
};

export default MonthlySummary;
