import React, { useState } from 'react';
import './AddTransactionForm.css';

const AddTransactionForm = ({ onAddTransaction }) => {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  
  // CORREÇÃO 1: O valor inicial deve ser "Despesa" (Maiúsculo) para bater com o Python
  const [type, setType] = useState('Despesa'); 
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description || !value || !category) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const newTransaction = {
      description,
      // CORREÇÃO 2: Mandamos o valor positivo (absoluto). 
      // O seu Python já tem a lógica para transformar Despesa em negativo.
      value: parseFloat(value), 
      category,
      type, // CORREÇÃO 3: Adicionamos o campo 'type' que estava faltando!
      date: new Date().toISOString().split('T')[0],
    };

    onAddTransaction(newTransaction);
    
    // Limpa os campos do formulário
    setDescription('');
    setValue('');
    setCategory('');
    setType('Despesa'); // Reseta para o padrão correto
  };

  return (
    <div className="form-container">
      <h3>Adicionar Nova Transação</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-row">
          <input 
            type="text" 
            placeholder="Descrição" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input 
            type="number" 
            placeholder="Valor" 
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
            min="0.01"
            step="0.01"
          />
        </div>
        <div className="input-row">
          {/* CORREÇÃO 4: Os values das options devem ser Maiúsculos */}
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Despesa">Despesa</option>
            <option value="Receita">Receita</option>
          </select>

          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="" disabled>Categoria</option>
            <option value="Salário">Salário</option>
            <option value="Alimentação">Alimentação</option>
            <option value="Saúde">Saúde</option>
            <option value="Lazer">Lazer</option>
            <option value="Investimento">Investimento</option>
            <option value="Moradia">Moradia</option>
            <option value="Educação">Educação</option>
            <option value="Transporte">Transporte</option>
            <option value="Outros">Outros</option>
          </select>
        </div>
        <button type="submit" className="add-button">+ Adicionar Transação</button>
      </form>
    </div>
  );
};

export default AddTransactionForm;