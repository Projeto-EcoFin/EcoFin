import React, { useState, useEffect } from 'react'; 
import Header from '../components/Header';
import AddTransactionForm from '../components/AddTransactionForm';
import TransactionsList from '../components/TransactionsList';
import EditTransactionModal from '../components/EditTransactionModal'; 
import { fetchTransactions, createTransaction, deleteTransaction, updateTransaction } from '../services/TransactionService';

import './TransactionsPages.css';

const TransactionsPages = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingTransaction, setEditingTransaction] = useState(null); 

    useEffect(() => {
        const loadTransactions = async () => {
            try {
                const data = await fetchTransactions();
                // Garante que é um array antes de setar
                if (Array.isArray(data)) {
                    setTransactions(data);
                } else {
                    setTransactions([]);
                }
            } catch (err) {
                setError('Não foi possível carregar as transações. Verifique a API.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadTransactions();
    }, []); 

    const handleAddTransaction = async (newTransactionData) => {
        try {
            const createdTransaction = await createTransaction(newTransactionData);
            setTransactions((prev) => [...prev, createdTransaction]);
        } catch (err) {
            alert('Erro ao adicionar a transação. Tente novamente.');
            console.error(err);
        }
    };

    const handleDeleteTransaction = async (transactionId) => {
        if (!window.confirm('Tem certeza que deseja excluir esta transação?')) {
            return;
        }
        try {
            await deleteTransaction(transactionId);
            setTransactions(prevTransactions => 
                prevTransactions.filter(t => t.id !== transactionId)
            );
        } catch (err) {
            alert('Erro ao excluir a transação.');
            console.error(err);
        }
    };

    const handleEditStart = (transaction) => {
        setEditingTransaction(transaction); 
    };

    const handleEditSave = async (updatedData) => {
        if (!editingTransaction) return;

        try {
            const updatedTransaction = await updateTransaction(editingTransaction.id, updatedData);
            
            setTransactions(prevTransactions => 
                prevTransactions.map(t => 
                    t.id === updatedTransaction.id ? updatedTransaction : t
                )
            );

            setEditingTransaction(null); 

        } catch (err) {
            alert('Erro ao salvar a edição. Tente novamente.');
            console.error(err);
        }
    };

    const handleEditCancel = () => {
        setEditingTransaction(null);
    };

    if (loading) return <p>Carregando transações...</p>;
    if (error) return <p style={{ color: 'red' }}>Erro: {error}</p>;

    return (
        <div className="transactions-container">
            <Header />
            <main className="main-content">
                <h1 className="page-title">Transações</h1>
                
                <AddTransactionForm onAddTransaction={handleAddTransaction} /> 
                
                <TransactionsList 
                    transactions={transactions} 
                    onDelete={handleDeleteTransaction}
                    onEditStart={handleEditStart} 
                /> 
            </main>
            

            {editingTransaction && (
                <EditTransactionModal 
                    transaction={editingTransaction}
                    onSave={handleEditSave}
                    onCancel={handleEditCancel}
                />
            )}
        </div>
    );
};

export default TransactionsPages;