import React from 'react';

export default function Currentitem(props) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="currency-item">
      <div className="title">{props.title}</div>
      <div className={`amount ${props.type}`}>
        {formatCurrency(props.amount || 0)}
      </div>
    </div>
  );
}
