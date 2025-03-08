import React, { useState } from 'react';
import { handleError } from '../utils';

function ExpenseTrackerForm({ addExpenses }) {
    const [expenseInfo, setExpenseInfo] = useState({
        amount: '',
        text: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpenseInfo((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleExpenses = (e) => {
        e.preventDefault();
        const { amount, text } = expenseInfo;
        if (!amount || !text) {
            handleError('All fields are required');
            return;
        }
        setTimeout(() =>{
            setExpenseInfo({ amount: '', text: '' })
        },1000)
        addExpenses(expenseInfo);
        
    }

    return (
        <div className='container'>
            <h1>Expense Tracker</h1>
            <form onSubmit={handleExpenses}>
                <div>
                    <label htmlFor='text'>Expense Detail</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='text'
                        placeholder='Enter your Expense Description...'
                        value={expenseInfo.text}
                    />
                </div>
                <div>
                    <label htmlFor='amount'>Amount</label>
                    <input
                        onChange={handleChange}
                        type='number'
                        name='amount'
                        placeholder='Enter your Amount, Expense (-ve) Income (+ve)...'
                        value={expenseInfo.amount}
                    />
                </div>
                <button type='submit'>Add Expense</button>
            </form>
        </div>
    );
}

export default ExpenseTrackerForm;
