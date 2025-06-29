import React from "react";
import "../Index.css";

export default function Expenseitem(props) {
  const { _id, title, amount } = props.expense;
  const type = amount > 0 ? "income" : "expense";

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(Math.abs(amount));
  };

  const handleDelete = () => {
    props.deleteExpense(_id);
  };

  return (
    <div className={`expense-item ${type}`}>
      <div className="expense-title">{title}</div>
      <div className="expense-amount">
        {amount > 0 ? '+' : '-'}{formatCurrency(amount)}
      </div>
      <div className="delete-button-overlay">
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
