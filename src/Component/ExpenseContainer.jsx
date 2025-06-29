import React, { useEffect, useState } from "react";
import Expenseform from './Expenseform';
import History from "./History";
import BalanceContainer from "./BalanceContainer";
import "../Index.css";

export default function ExpenseContainer() {
  const [expense, setExpense] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use local server URL instead of deployed backend
  const API_BASE_URL = "https://expense-backend-2-mzpz.onrender.com/expense";

  const fetchExpense = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setExpense(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      setError("Failed to fetch expenses. Please make sure the server is running on localhost:3000");
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (title, amount) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, amount: Number(amount) }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const newExpense = await response.json();
      setExpense(prevExpenses => [newExpense, ...prevExpenses]);
    } catch (error) {
      console.error("Error adding expense:", error);
      setError(`Failed to add expense: ${error.message}`);
    }
  };

  const deleteExpense = async (id) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      setExpense(prevExpenses => prevExpenses.filter(exp => exp._id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
      setError(`Failed to delete expense: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchExpense();
  }, []);

  if (loading) {
    return (
      <div className="expense-container">
        <h2>Expense Tracker</h2>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <div style={{ fontSize: '16px', color: '#666' }}>Loading expenses...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="expense-container">
      <h2>Expense Tracker</h2>
      {error && (
        <div style={{ 
          color: 'red', 
          backgroundColor: '#ffe6e6', 
          padding: '10px', 
          margin: '10px 0', 
          borderRadius: '5px',
          textAlign: 'center',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}
      <BalanceContainer expense={expense} />
      <History expense={expense} deleteExpense={deleteExpense} />
      <Expenseform addExpense={addExpense} />
    </div>
  );
}
