import React, { useState, useEffect } from "react";
import "./AddTransactionForm.css";

const AddTransactionForm = ({ onAddTransaction, editingTransaction, onEditSubmit, onCancelEdit }) => {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState("despesa");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (editingTransaction) {
      setDescription(editingTransaction.description);
      setValue(Math.abs(editingTransaction.value));
      setType(editingTransaction.value < 0 ? "despesa" : "receita");
      setCategory(editingTransaction.category);
    }
  }, [editingTransaction]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description || !value || !category) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const finalValue =
      type === "despesa" ? -parseFloat(value) : parseFloat(value);

    const newTransaction = {
      id: editingTransaction ? editingTransaction.id : Date.now(),
      description,
      value: finalValue,
      category,
      type,
      date: new Date().toISOString().split("T")[0],
    };

    if (editingTransaction) {
      onEditSubmit(newTransaction);
    } else {
      onAddTransaction(newTransaction);
    }

    resetForm();
  };

  const resetForm = () => {
    setDescription("");
    setValue("");
    setCategory("");
    setType("despesa");
  };

  return (
    <div className="form-container">
      <h3>{editingTransaction ? "Editar Transação" : "Adicionar Nova Transação"}</h3>

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
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="despesa">Despesa</option>
            <option value="receita">Receita</option>
          </select>

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
          {editingTransaction ? "Salvar Alterações" : "+ Adicionar Transação"}
        </button>

        {editingTransaction && (
          <button type="button" className="cancel-button" onClick={onCancelEdit}>
            Cancelar
          </button>
        )}
      </form>
    </div>
  );
};

export default AddTransactionForm;
