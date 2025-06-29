import React, { useState } from "react";
import "../Index.css";

export default function Expenseform({ addExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.trim().length < 2) {
      newErrors.title = "Title must be at least 2 characters long";
    }
    
    if (!amount) {
      newErrors.amount = "Amount is required";
    } else if (isNaN(amount) || parseFloat(amount) === 0) {
      newErrors.amount = "Please enter a valid amount";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await addExpense(title.trim(), amount);
      setTitle("");
      setAmount("");
      setErrors({});
    } catch {
      // Error handling is done in the parent component
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
    
    if (field === 'title') {
      setTitle(value);
    } else if (field === 'amount') {
      setAmount(value);
    }
  };

  return (
    <div className="expense-form">
      <h3>Add New Transaction</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className={`form-input ${errors.title ? 'error' : ''}`}
            placeholder="Enter transaction title..."
            disabled={isSubmitting}
          />
          {errors.title && <div className="error">{errors.title}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="amount" className="form-label">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => handleInputChange('amount', e.target.value)}
            className={`form-input ${errors.amount ? 'error' : ''}`}
            placeholder="Enter amount (negative for expense, positive for income)..."
            step="0.01"
            disabled={isSubmitting}
          />
          {errors.amount && <div className="error">{errors.amount}</div>}
        </div>
        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Transaction"}
        </button>
      </form>
    </div>
  );
}
