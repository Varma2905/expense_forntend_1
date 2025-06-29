import React from 'react';
import Currentitem from './Currentitem';

function BalanceContainer(props) {
    const { expense = [] } = props;

    let income = 0;
    let expenses = 0;

    expense.forEach((item) => {
        const amount = parseFloat(item.amount) || 0;
        if (amount > 0) {
            income += amount;
        } else {
            expenses += Math.abs(amount); // Store expenses as positive for display
        }
    });

    const balance = income - expenses;

    return (
        <div className="balance-container">
            <Currentitem title="Income" amount={income} type="income" />
            <Currentitem title="Expense" amount={expenses} type="expense" />
            <Currentitem title="Balance" amount={balance} type="balance" />
        </div>
    );
}

export default BalanceContainer;
