import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIUrl, handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import ExpensesTable from './ExpensesTable';
import ExpenseTrackerForm from './ExpenseTrackerForm';
import ExpenseDetails from './ExpenseDetails';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [expenseAmt, setExpenseAmt] = useState(0);
    const [incomeAmt, setIncomeAmt] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('loggedInUser');
        setLoggedInUser(user);
        // Fetch expenses if user is logged in
        if (user) {
            fetchExpenses();
        }
    }, []);

    useEffect(() => {
        const amounts = expenses.map((item) => Number(item.amount));

        const income = amounts
            .filter(item => item > 0)
            .reduce((acc, item) => acc + item, 0);

        const exp = amounts
            .filter(item => item < 0)
            .reduce((acc, item) => acc + item, 0) * -1;

        setIncomeAmt(income);
        setExpenseAmt(exp);
    }, [expenses]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged out');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    const fetchExpenses = async () => {
        try {
            const url = `${APIUrl}/expenses/fetch`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });

            if (response.status === 403) {
                navigate('/login');
                return;
            }

            const result = await response.json();
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }
    };

    const addExpenses = async (data) => {
        try {
            const url = `${APIUrl}/expenses/add`;
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 403) {
                navigate('/login');
                return;
            }

            const result = await response.json();
            setExpenses(result.data);
            handleSuccess(result.message);
        } catch (err) {
            handleError(err);
        }
    };

    const handleDeleteExpense = async (expenseId) => {
        try {
            const url = `${APIUrl}/expenses/delete/${expenseId}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.status === 403) {
                navigate('/login');
                return;
            }
    
            if (!response.ok) {
                const errorMessage = await response.text();
                handleError(errorMessage);
                return;
            }
    
            const result = await response.json();
            handleSuccess(result.message);
    
            setExpenses((prevExpenses) => 
                prevExpenses.filter((expense) => expense._id !== expenseId)
            );
            
        } catch (err) {
            handleError(err);
        }
    };
    
    return (
        <div className="home-container">
            {/* Full-width Navigation Bar */}
            <nav className="navbar full-width-navbar">
                <div className="navbar-content">
                    <h2 className="app-title">Personal Finance Manager</h2>
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
            </nav>

            <div className="content">
                <h1 className='user-section'>Welcome {loggedInUser}</h1>
                <ExpenseDetails incomeAmt={incomeAmt} expenseAmt={expenseAmt} />
                <ExpenseTrackerForm addExpenses={addExpenses} />
                <ExpensesTable expenses={expenses} handleDeleteExpense={handleDeleteExpense} />
            </div>
            <ToastContainer />
        </div>
    );
}

export default Home;
