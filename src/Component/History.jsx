import React from "react";
import Expenseitem from "./Expenseitem";

export default function History(props) {
  const { expense = [] } = props;

  return (
    <>
      <h2>Transaction History</h2>
      <div className="history">
        {expense.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '20px', 
            color: '#666',
            fontStyle: 'italic'
          }}>
            No transactions yet. Add your first transaction above!
          </div>
        ) : (
          expense.map((expense) => (
            <Expenseitem
              key={expense._id}
              expense={expense}
              deleteExpense={props.deleteExpense}
            />
          ))
        )}
      </div>
    </>
  );
}
