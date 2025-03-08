import React from 'react';

function ExpenseDetails({ incomeAmt, expenseAmt }) {
    return (
        <div>
            <div className="balance">
                Your Balance is ₹ {incomeAmt - expenseAmt}
            </div>
            <div className="amount-container">
                <div>
                    Income
                    <span className="income-amount"> ₹{incomeAmt}</span>
                </div>
                <div>
                    Expense
                    <span className="expense-amount"> ₹{expenseAmt}</span>
                </div>
            </div>
        </div>
    );
}

export default ExpenseDetails;
