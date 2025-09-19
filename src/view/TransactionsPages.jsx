import React, { useState } from 'react';
import Header from '../components/Header';
import AddTransactionForm from '../components/AddTransactionForm';
import TransactionsList from '../components/TransactionsList';

import './TransactionsPages.css';

const TransactionsPages = () => {
  const [transactions, setTransactions] = useState([]);

  const handleAddTransaction = (newTransaction) => {
    setTransactions([...transactions, { ...newTransaction, id: transactions.length + 1 }]);
  };

  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content">
        <h1 className="page-title">Transações</h1>
        <AddTransactionForm onAddTransaction={handleAddTransaction} />
        <TransactionsList transactions={transactions} />
      </main>
    </div>
  );
};

export default TransactionsPages;