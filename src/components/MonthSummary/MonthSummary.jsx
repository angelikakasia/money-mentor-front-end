import { Container, Row, Col, Card, Button, Stack } from 'react-bootstrap';
import './MonthlySummary.css';
import { useState, useEffect, useContext} from "react";
import { UserContext } from "../../contexts/UserContext";
import { getMonthlySummary } from "../../services/transactionService";
import { Link, useNavigate } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend 
} from 'recharts';

const MonthlySummary = () => {
    const { user, setUser } = useContext(UserContext);
    const [allTransactions, setAllTransactions] = useState([]);
    // filter for all, income or expense
    const [filter, setFilter] = useState('all');
    // handle data loading delay
    const [loading, setLoading] = useState(true);
    // handle html loading & the container re: the chart rendering
    const [containerWidth, setContainerWidth] = useState(0);
    const navigate = useNavigate();

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

        return () => { observer.disconnect();
        };
    }, [loading, allTransactions]);

    //if user is not logged in, handle the null state
    if (!user) return <p>Please log in to view your summary.</p>;

    // handle data loading
    if (loading) return <main><p>Loading your summary...</p></main>;

    // handle edge case of no data/transactions
    if (allTransactions.length === 0) {
    return (
      <main>
        <h1>Your Monthly Summary</h1>
        <p>No transactions found for this month yet!</p>
        <Link to="/">
            <button type='button'>Return to Dashboard</button>
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
    console.log(typeof filteredTransactions[0].amount)
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
            <Container className="month-content-container py-5">
                <Row className='mb-4'>
                    <Col>
                        <h1 className="display-5 fw-bold text-center">{user.username}'s Monthly Summary</h1>
                    </Col>
                </Row>
                
                <Card className="monthly-filter-transactions shadow-sm border-0 mb-4">
                    <Card.Body className="d-flex justify-content-between align-items-center px-4 py-4">
                        <Stack direction='horizontal' gap={3}>
                            <button type='button' className={`filter-options ${filter === 'all' ? 'active-filter' : ''}`} onClick={() => setFilter('all')}>All Transactions</button>
                            <button type='button' className={`filter-options ${filter === 'Income' ? 'active-filter' : ''}`} onClick={() => setFilter('Income')}>Income</button>
                            <button type='button' className={`filter-options ${filter === 'Expense' ? 'active-filter' : ''}`} onClick={() => setFilter('Expense')}>Expenses</button> 
                        </Stack>
                        <h3 className='month-total mb-0 fw-bold'>Net Total: ${total.toFixed(2)}</h3>
                    </Card.Body>
                </Card>

            <Row className="justify-content-center g-4">
            {/* TRANSACTION LIST COLUMN */}
                <Col lg={8} md={10}>
                    <h2 className='h4 fw-bold mb-4'>Recent Transactions</h2>
                    <Stack gap={3}>
                        {filteredTransactions.map(transaction => {
                        const isIncome = transaction.categoryId?.type === 'Income';
                
                        return (
                            <Card 
                                key={transaction._id} 
                                className="shadow-sm border-0 transaction-card clickable-card"
                                onClick={() => navigate(`/transactions/${transaction._id}`, { state: { from: '/summary' } })}
                                >
                                <Card.Body className='d-flex justify-content-between align-items-center py-3 px-4'>
                                    <div className="transaction-info d-flex align-items-center">
                                        <div className="transaction-icon fs-3 me-3">
                                            {isIncome ? '💰' : '💸'}
                                        </div>
                                    <div className="transaction-details">
                                        <div className="transaction-desc fw-bold">{transaction.description}</div>
                                        <div className="transaction-meta text-muted small"> 
                                            {new Date(transaction.date).toLocaleDateString()} | {transaction.categoryId?.name}
                                        </div>
                                        </div>
                                    </div>
                                    <div className={`fw-bold fs-5 ${isIncome ? 'amount-income' : 'amount-expense'}`}>
                                        {isIncome ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                                    </div>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </Stack>
            </Col>

            {/* CHART SECTION */}
            <Col lg={8} md={10}>
                <Card className="shadow-sm border-0">
                    <Card.Header className='bg-white fw-bold py-3'>
                        {filter === 'all' ? 'Income vs Expenses' : `${filter} Breakdown`}
                    </Card.Header>
                <Card.Body>
                    <div style={{ width: '100%', height: '350px' }}>
                        <ResponsiveContainer width='100%' height='100%'> 
                            <BarChart 
                                data={filter === 'all' ? chartData : dynamicChartData} 
                                margin={{ top: 20, right: 30, left: 20, bottom: 5}}
                            >
                                <CartesianGrid strokeDasharray='3 3' vertical={false} />
                                <XAxis dataKey='name' />
                                <YAxis tickFormatter={(value) => `$${value}`} />
                                <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']} />
                                <Legend />
                                <Bar dataKey='amount' radius={[4, 4, 0, 0]} fill="#000000" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    </Row>
        {/* BUTTONS */}
        <div className='summary-actions text-center mt-5'>
            <Link to="/">
                <button className='back-btn' type='button'>Return to Dashboard</button>
            </Link>
        </div>
        </Container>
        </>
    );
};

export default MonthlySummary;
