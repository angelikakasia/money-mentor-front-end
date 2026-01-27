import { Container, Row, Col, Stack, Form, Button, Card } from 'react-bootstrap';
import './Dashboard.css';
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
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [allTransactions, setAllTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch all data on mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?._id) {
      setLoading(false);
      return;
    }

      try {
        setLoading(true);
        
        const [transData, updatedUser] = await Promise.all([
            transactionService.index(),
            userService.index(user._id)
        ]);

        setAllTransactions(transData || []);
        if (updatedUser) setUser(updatedUser);
        
        // debugging () in each transaction
        console.log("RECENT DATA ARRIVED:", transData);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }};

        fetchDashboardData();
  }, [user?._id]);

const generateMonthOptions = () => {
    const options = [];
    const date = new Date();

    // always calculates next 12 months
    for(let i = 0; i < 12; i++) {
        const monthValue = date.toISOString().slice(0, 7);
        const monthLabel = date.toLocaleString('default', { month: 'long', year: 'numeric'});

        options.push({ value: monthValue, label: monthLabel });

        date.setMonth(date.getMonth() - 1);
    }
    return options;
};

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

    if (loading) {
  return (
    <main className='dash-content-container'>
      <p>Loading your dashboard...</p>
    </main>
  );
}
     return (
        <Container className="py-4 mt-3"> {/* py-4 adds the vertical breathing room you lost */}
            <Row className="mb-4">
                <Col>
                    <h1 className="display-6 fw-bold">Welcome, {user.username}!</h1>
                </Col>
            </Row>

            {/* monthly stats at a glance */}
            <Card className="shadow-sm border-0 mb-5">
                <Card.Body className="p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <Form.Select 
                            id='month-dropdown' 
                            className='month-dropdown w-auto' 
                            value={selectedMonth} 
                            onChange={(e) => setSelectedMonth(e.target.value)}
                        >
                            {generateMonthOptions().map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </Form.Select>
                    </div>

                <Row className='stats-grid text-center g-4'>
                    <Col xs={6} md = {3} className="stat-item">
                        <div className="label">Points</div>
                        <div className="value points">{user.points}</div>
                    </Col>
                    <Col xs={6} md={3} className='stat-item'>
                        <div className='label'>Income</div>
                        <div className='value income'>${income.toFixed(2)}</div>
                    </Col>
                    <Col xs={6} md={3} className='stat-item'>
                        <div className='label'>Expenses</div>
                        <div className='value expense'>${expenses.toFixed(2)}</div>
                    </Col>
                    <Col xs={6} md={3} className='stat-item'>
                        <div className='label'>Net Savings</div>
                        <div className={`value ${net >= 0 ? 'net-positive' : 'net-negative'}`}>${net.toFixed(2)}</div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>

        {/* recent activity */}
        <Row className='recent-activity-section justify-content-center'>
            <Col lg={8}>
                <h2 className='h4 mb-4'>Here are your recent money moves.</h2>
                <Stack gap={2} className='dashboard-transactions-list mb-4'>
                    {recentMoves.map((transaction) => {
                        const isIncomeItem = transaction.categoryId?.type === 'Income';
                        const symbol = isIncomeItem ? '+' : '-';

                        return (
                        <Link to={`/transactions/${transaction._id}`} key={transaction._id} className="transaction-link">
                            <Card className='transaction-line'key={transaction._id}>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <span>{transaction.description}:&nbsp;</span>
                                   
                                    <span className={`transaction-amount ${isIncomeItem ? 'amount-income' : 'amount-expense'}`}>
                                        {symbol}{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(transaction.amount)}
                                    </span>
                                </div>
                            </Card>
                        </Link>
                    );
                })}
                </Stack>

                <Stack direction='horizontal' gap={3} className="dash-transactions-actions justify-content-center">
                    <Link to ='/transactions'>
                        <button type='button'>All Transactions</button>
                    </Link>
                    <Link to="/transactions/new">
                        <button type="button">+ Add Transaction</button>
                    </Link>
                </Stack>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
