import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import * as userService from '../../services/userService';
// import transactionService for quick summary view of last 5 transactions/current balance
import * as transactionService from '../../services/transactionService';

const Dashboard = () => {
    const { user } = useContext(UserContext)
    const [users, setUsers] = useState([]);
    const [recentTransactions, setRecentTransactions] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await userService.index()
                setUsers(fetchedUsers)
                const transData = await transactionService.getRecent();
                setRecentTransactions(transData);
            } catch (err) {
                console.log(err)
            }
        }
        if (user) fetchUsers()
    }, [user])

    return (
        <main>
            <>
            <h1>Welcome, {user.username}</h1>
            {users.map((item) => (
                <p key={item._id}>{item.username}</p>
            ))}
            <section>
            <h2>Here are your recent money moves.</h2>
                <ul>
                    {recentTransactions.map((transaction) => (
                        <li key={transaction._id}>
                            {transaction.description}: ${transaction.amount} ({transaction.category?.name})
                        </li>
                    ))}
                </ul>
                <Link to ='/transactions'>View All Transactions</Link>
            </section>
            </>
        </main>
    );
};

export default Dashboard;
