// src/view/TransactionsPage.jsx

import { useState } from "react";
import AddTransactionForm from "../components/AddTransactionForm";
import TransactionsList from "../components/TransactionsList";
import Header from "../components/Header";
import "../components/TransactionsList.css";

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState([]);
    const [editingTransaction, setEditingTransaction] = useState(null);

    const handleAddTransaction = (transaction) => {
        setTransactions(prev => [...prev, transaction]);
    };

    const handleEditStart = (transaction) => {
        setEditingTransaction(transaction);
    };

    const handleEditSubmit = (updatedTransaction) => {
        setTransactions(prev =>
            prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t)
        );
        setEditingTransaction(null);
    };

    const handleCancelEdit = () => {
        setEditingTransaction(null);
    };

    const handleDeleteTransaction = (id) => {
        setTransactions(prev => prev.filter(t => t.id !== id));
    };

    return (
        <div className="container">
            <Header title="Transações" />

            <AddTransactionForm
                onAddTransaction={handleAddTransaction}
                editingTransaction={editingTransaction}
                onEditSubmit={handleEditSubmit}
                onCancelEdit={handleCancelEdit}
            />

            <TransactionsList
                transactions={transactions}
                onDelete={handleDeleteTransaction}
                onEditStart={handleEditStart}
            />
        </div>
    );
}
