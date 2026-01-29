import { Container, Row, Col, Stack, Form, Card } from 'react-bootstrap';
import './Dashboard.css';
import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import * as transactionService from "../../services/transactionService";
import * as userService from "../../services/userService";
import { generateMonthOptions } from "../../utils/dateUtils";

const Dashboard = () => {
  const navigate = useNavigate();
  // access global user data (username, points, etc)
  const { user, setUser } = useContext(UserContext);
  const currentMonth = new Date().toISOString().slice(0, 7);
  // state 
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [allTransactions, setAllTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch all data on mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      // edge case if no user
      if (!user?._id) {
      setLoading(false);
      return;
    }

      try {
        setLoading(true);
        // fetch transactions & user details simultaneously
        const [transData, updatedUser] = await Promise.all([
            transactionService.index(),
            userService.index(user._id)
        ]);

        setAllTransactions(transData || []);
        // sync context w/database
        if (updatedUser) setUser(updatedUser);
        
        // debugging () in each transaction
        console.log("RECENT DATA ARRIVED:", transData);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }};

        fetchDashboardData();
        // only re-run if user id changes
  }, [user?._id]);

// filter for selected month transactions
const monthlyData = allTransactions.filter((transactions) =>
    transactions.date.startsWith(selectedMonth),
  );
  // calculate total income for month 
  const income = monthlyData
    .filter((transactions) => transactions.categoryId?.type === "Income")
    .reduce((acc, transactions) => acc + Number(transactions.amount), 0);
  // calculate total expenses for month    
  const expenses = monthlyData
    .filter((transactions) => transactions.categoryId?.type === "Expense")
    .reduce((acc, transactions) => acc + Number(transactions.amount), 0);
  // bottom line    
  const net = income - expenses;

  // Sort by date (newest first) and grab only the first 5
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
                        <Link 
                            to={`/transactions/${transaction._id}`} 
                            key={transaction._id} 
                            className="transaction-link"
                            state={{ from: '/' }}
                            >
                            <Card className='transaction-line'key={transaction._id}>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <span>{transaction.description}:&nbsp;</span>
                                   
                                    <span className={`transaction-amount ${isIncomeItem ? 'amount-income' : 'amount-expense'}`}>
                                        {symbol}{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Math.abs(transaction.amount))}
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
                    <Link 
                        to="/transactions/new"
                        state={{ from: '/' }}
                        >
                        <button type="button">+ Add Transaction</button>
                    </Link>
                </Stack>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
