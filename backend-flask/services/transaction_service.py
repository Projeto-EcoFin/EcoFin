from models.transaction_model import (
    get_all_transactions_by_user, 
    add_new_transaction,
    update_transaction_data, 
    delete_transaction_data, 
    get_transaction_by_id
)

# --- AQUI ESTAVA O ERRO PROVÁVEL: Faltava receber 'category' ---
def create_transaction(user_id, date, description, transaction_type, value, category): 
    
    # Validação de Tipo
    if transaction_type not in ["Receita", "Despesa"]:
        return "Tipo de transação inválido. Deve ser 'Receita' ou 'Despesa'.", 400
    
    # Conversão segura de valor
    try:
        val_float = float(value)
    except ValueError:
        return "O valor deve ser numérico.", 400

    # Lógica do Sinal (Despesa vira negativo)
    if transaction_type == "Despesa" and val_float > 0:
        val_float = -abs(val_float)
    elif transaction_type == "Receita":
        val_float = abs(val_float)
    
    # Passando category para o model
    new_trans = add_new_transaction(user_id, date, description, transaction_type, val_float, category)
    
    if new_trans:
        return new_trans, 201
    return "Falha ao salvar a transação.", 500

# ... (Mantenha as outras funções: fetch_user_transactions, update_transaction, delete_transaction iguais)
def fetch_user_transactions(user_id):
    transactions = get_all_transactions_by_user(user_id)
    transactions.sort(key=lambda t: t.get('date', '1900-01-01'), reverse=True)
    return transactions, 200

def update_transaction(user_id, transaction_id, update_data):
    current_transaction = get_transaction_by_id(transaction_id)
    if not current_transaction: return "Transação não encontrada.", 404
    if current_transaction.get('user_id') != user_id: return "Acesso negado.", 403

    # Lógica de sinal na edição
    t_type = update_data.get('type', current_transaction.get('type'))
    val = update_data.get('value', current_transaction.get('value'))
    try:
        val = float(val)
        if t_type == "Despesa" and val > 0: update_data['value'] = -abs(val)
        elif t_type == "Receita" and val < 0: update_data['value'] = abs(val)
    except: pass

    updated_trans = update_transaction_data(transaction_id, update_data)
    if updated_trans: return updated_trans, 200
    return "Falha ao atualizar.", 500

def delete_transaction(user_id, transaction_id):
    current_transaction = get_transaction_by_id(transaction_id)
    if not current_transaction: return "Transação não encontrada.", 404
    if current_transaction.get('user_id') != user_id: return "Acesso negado.", 403
    if delete_transaction_data(transaction_id): return "Sucesso.", 200
    return "Falha ao excluir.", 500