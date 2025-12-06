import React, { useState } from 'react';
import './EditTransactionModal.css'; 

const EditTransactionModal = ({ transaction, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        description: transaction.description,
        value: Math.abs(transaction.value), 
        type: transaction.type,
        category: transaction.category,
        date: transaction.date,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const finalValue = formData.type === 'Despesa' 
            ? -Math.abs(parseFloat(formData.value)) 
            : Math.abs(parseFloat(formData.value));

        onSave({ 
            ...formData, 
            value: finalValue 
        });
    };

    const typeOptions = ['Receita', 'Despesa'];
    const categoryOptions = ['Salário', 'Moradia', 'Alimentação', 'Lazer', 'Outros'];

    return (
        <div className="modal-wrapper" onClick={onCancel}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Editar Transação</h2>
                
                <form onSubmit={handleSubmit} className="edit-form">

                    <div className="form-group">
                        <label>Descrição</label>
                        <input 
                            type="text" 
                            name="description" 
                            value={formData.description} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Valor (R$)</label>
                        <input 
                            type="number" 
                            name="value" 
                            value={formData.value} 
                            onChange={handleChange} 
                            step="0.01"
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Tipo</label>
                        <select name="type" value={formData.type} onChange={handleChange} required>
                            {typeOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Categoria</label>
                        <select name="category" value={formData.category} onChange={handleChange} required>
                            {categoryOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group full-width">
                        <label>Data</label>
                        <input 
                            type="date" 
                            name="date" 
                            value={formData.date} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="cancel-button" onClick={onCancel}>
                            Cancelar
                        </button>
                        <button type="submit" className="save-button">
                            Salvar Alterações
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTransactionModal;