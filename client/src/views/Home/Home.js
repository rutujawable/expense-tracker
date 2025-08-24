import React, { useEffect, useState } from 'react';
import './Home.css';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import TransactionCard from '../../components/TransactionCard';
import add from './plus.png';
import Header from '../../components/Header/Header';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';

function Home() {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [netIncome, setNetIncome] = useState(0);
  const [netExpense, setNetExpense] = useState(0);

  const handleLogout = () => {
    localStorage.clear();
    toast.success('Logged out successfully');
    setTimeout(() => {
      window.location.href = '/login';
    }, 2000);
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setUser(currentUser);
    } else {
      window.location.href = '/login';
    }
  }, []);

  const loadTransactions = async () => {
    if (!user?._id) return;
    toast.loading('Loading transactions...');
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/transactions?userID=${user._id}`);
      const allTransactions = response.data.data || [];
      // Ensure amount is a number for calculations
      const formattedTransactions = allTransactions.map(tx => ({
        ...tx,
        amount: Number(tx.amount) || 0
      }));
      setTransactions(formattedTransactions);
      toast.dismiss();
      toast.success('Expenses fetched successfully');
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to load transactions');
    }
  };

  useEffect(() => {
    if (user?._id) {
      loadTransactions();
    }
  }, [user]);

  // Calculate net income, expense, and balance correctly
  useEffect(() => {
    let income = 0;
    let expense = 0;
    transactions.forEach((transaction) => {
      const amt = Number(transaction.amount) || 0;
      if (transaction.type === 'credit') income += amt;
      else expense += amt;
    });
    setNetIncome(income);
    setNetExpense(expense);
  }, [transactions]);

  return (
    <div className="home-container">
      <Header user={user} onLogout={handleLogout} />

      <div className="home-content">
        <h1 className="home-greeting">
          Hello {user?.fullname || 'User'} 👋
        </h1>
        <p className="home-subtitle">
          🤝 Welcome to <span className="highlight">Expense Tracker</span> 💸🧾💰
        </p>

        <div className="net-summary">
          <div className="summary-card income">
            <span className="amount">+ ₹{netIncome.toFixed(2)}</span>
            <span className="label">Net Income</span>
          </div>
          <div className="summary-card expense">
            <span className="amount">- ₹{netExpense.toFixed(2)}</span>
            <span className="label">Net Expense</span>
          </div>
          <div className="summary-card balance">
            <span className="amount">₹{(netIncome - netExpense).toFixed(2)}</span>
            <span className="label">Net Balance</span>
          </div>
        </div>

        <div className="transactions-container">
          {transactions.length > 0 ? (
            transactions.map(({ _id, title, amount, category, type, createdAt }) => (
              <TransactionCard
                key={_id}
                _id={_id}
                title={title}
                amount={amount}
                category={category}
                type={type}
                createdAt={createdAt}
                loadTransactions={loadTransactions}
              />
            ))
          ) : (
            <p className="no-transactions">No transactions found. Start by adding one!</p>
          )}
        </div>

        <Link to="/add-transaction">
          <img alt="Add Transaction" className="add-transaction-btn" src={add} />
        </Link>
      </div>

      <Toaster />
      <Footer />
    </div>
  );
}

export default Home;
