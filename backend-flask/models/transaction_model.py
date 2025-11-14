# backend-flask/services/transaction_service.py

from models.transaction_model import (
    get_all_transactions_by_user, 
    add_new_transaction,
    update_transaction_data, # NOVO
    delete_transaction_data, # NOVO
    get_transaction_by_id # NOVO (necessário para validação)
)

# =================================================================
# LÓGICA DE NEGÓCIOS PARA CRIAÇÃO (POST)
# =================================================================

def create_transaction(user_id, date, description, type, value):
    """Valida e registra uma nova transação."""
    
    # Validação de Tipo
    if type not in ["Receita", "Despesa"]:
        return "Tipo de transação inválido. Deve ser 'Receita' ou 'Despesa'.", 400
    
    # Regra de Negócio: Garante que despesas sejam valores negativos
    if type == "Despesa" and value > 0:
        value = -abs(value)
    
    new_trans = add_new_transaction(user_id, date, description, type, value)
    
    if new_trans:
        return new_trans, 201
    return "Falha ao salvar a transação.", 500

# =================================================================
# LÓGICA DE NEGÓCIOS PARA LEITURA (GET)
# =================================================================

def fetch_user_transactions(user_id):
    """Busca transações e aplica lógica de ordenação/filtragem."""
    transactions = get_all_transactions_by_user(user_id)
    
    # Lógica de Negócios: Ordenar por data (opcional, mas útil)
    transactions.sort(key=lambda t: t.get('date', '1900-01-01'), reverse=True)
    
    return transactions, 200

# =================================================================
# LÓGICA DE NEGÓCIOS PARA EDIÇÃO (PUT) - NOVO
# =================================================================

def update_transaction(user_id, transaction_id, update_data):
    """Valida, aplica regras de negócio e atualiza uma transação existente."""
    
    current_transaction = get_transaction_by_id(transaction_id)
    
    # Validação de Segurança: A transação existe E pertence ao usuário logado?
    if not current_transaction:
        return "Transação não encontrada.", 404
    if current_transaction.get('user_id') != user_id:
        return "Acesso negado. A transação não pertence a este usuário.", 403

    # Regra de Negócio: Se o tipo (type) ou o valor (value) forem alterados,
    # aplicamos a regra de sinal (negativo para Despesa).
    transaction_type = update_data.get('type', current_transaction.get('type'))
    value = update_data.get('value', current_transaction.get('value'))

    if transaction_type == "Despesa" and value > 0:
        update_data['value'] = -abs(value)
    elif transaction_type == "Receita" and value < 0:
        update_data['value'] = abs(value)
        
    updated_trans = update_transaction_data(transaction_id, update_data)
    
    if updated_trans:
        return updated_trans, 200
    return "Falha ao atualizar a transação.", 500

# LÓGICA DE NEGÓCIOS PARA EXCLUSÃO (DELETE) 
def delete_transaction(user_id, transaction_id):
    """Valida a posse e exclui uma transação."""
    
    current_transaction = get_transaction_by_id(transaction_id)
    
    # Validação de Segurança: A transação existe E pertence ao usuário logado?
    if not current_transaction:
        return "Transação não encontrada.", 404
    if current_transaction.get('user_id') != user_id:
        return "Acesso negado. A transação não pertence a este usuário.", 403

    if delete_transaction_data(transaction_id):
        return "Transação excluída com sucesso.", 200
    return "Falha ao excluir a transação.", 500