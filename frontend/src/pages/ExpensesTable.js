import React from 'react';

function ExpensesTable({ expenses, handleDeleteExpense }) {
    console.log('ExpensesTable -->', expenses);

    return (
        <div className='expense-list'>
            {expenses?.length > 0 ? ( // Ensure expenses is not undefined
                expenses.map((expense, index) => (
                    <div key={index} className='expense-item'>
                        <button className='delete-button'
                            onClick={() => handleDeleteExpense(expense._id)}
                        >✖</button>
                        <div className='expense-description'>{expense.text}</div>
                        <div className='expense-amount'
                            style={{ color: expense.amount > 0 ? '#27ae60' : '#e74c3c' }}
                        >
                            {expense.amount}
                        </div>
                    </div>
                ))
            ) : (
                <p>No expenses found</p> // Show message when empty
            )}
        </div>
    );
}

export default ExpensesTable;
