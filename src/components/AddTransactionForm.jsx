import React, { useState } from 'react';
import './AddTransactionForm.css';

const AddTransactionForm = ({ onAddTransaction }) => {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState('despesa');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description || !value || !category) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const newTransaction = {
      id: Date.now(),
      description,
      value: parseFloat(value),
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    };

    onAddTransaction(newTransaction);

    // limpar os campos
    setDescription('');
    setValue('');
    setCategory('');
    setType('despesa');
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
          />

          <input
            type="number"
            placeholder="Valor"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <div className="input-row">
          {/* Tipo */}
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="despesa">Despesa</option>
            <option value="receita">Receita</option>
          </select>

          {/* Categoria */}
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Categoria</option>
            <option value="Salário">Salário</option>
            <option value="Alimentação">Alimentação</option>
            <option value="Saúde">Saúde</option>
            <option value="Lazer">Lazer</option>
            <option value="Investimento">Investimento</option>
            <option value="Moradia">Moradia</option>
            <option value="Outros">Outros</option>
          </select>
        </div>

        <button type="submit" className="add-button">
          + Adicionar Transação
        </button>
      </form>
    </div>
  );
};

export default AddTransactionForm;
