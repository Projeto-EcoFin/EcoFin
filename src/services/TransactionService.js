const API_URL = 'http://localhost:3000/api/transactions'; 

// 1. FUNÇÃO DE LEITURA (GET): Buscar todas as transações
export const fetchTransactions = async () => {
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`Erro ao buscar transações: ${response.statusText}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Falha ao buscar transações:", error);
        return []; 
    }
};

// 2. FUNÇÃO DE CRIAÇÃO (POST): Adicionar uma nova transação
export const createTransaction = async (transactionData) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transactionData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Falha ao criar transação');
        }

        const newTransaction = await response.json();
        return newTransaction;

    } catch (error) {
        console.error("Falha ao criar transação:", error);
        throw error;
    }
};

// 3. FUNÇÃO DE EXCLUSÃO (DELETE): Excluir uma transação por ID
export const deleteTransaction = async (transactionId) => {
    try {
        const response = await fetch(`${API_URL}/${transactionId}`, {
            method: 'DELETE', 
        });

        if (response.status === 404) {
             throw new Error(`Transação com ID ${transactionId} não encontrada.`);
        }
        
        if (!response.ok) {
            throw new Error(`Erro ao excluir transação: ${response.statusText}`);
        }

        return true; 

    } catch (error) {
        console.error("Falha ao excluir transação:", error);
        throw error;
    }
};

// 4. FUNÇÃO DE ATUALIZAÇÃO (PUT): Editar uma transação
export const updateTransaction = async (transactionId, updatedData) => {
    try {
        const response = await fetch(`${API_URL}/${transactionId}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (response.status === 404) {
             throw new Error(`Transação com ID ${transactionId} não encontrada.`);
        }
        
        if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(errorBody.message || 'Falha ao atualizar transação');
        }

        const updatedTransaction = await response.json();
        return updatedTransaction; 

    } catch (error) {
        console.error("Falha ao atualizar transação:", error);
        throw error;
    }
};