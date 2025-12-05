# backend-flask/models/transaction_model.py

from firebase_config import db
from datetime import datetime

# 1. Buscar todas por usuário - Mantido

def get_all_transactions_by_user(user_id):
    try:
        docs = db.collection('transactions').where('user_id', '==', user_id).stream()
        transactions = []
        for doc in docs:
            t = doc.to_dict()
            t['id'] = doc.id
            transactions.append(t)
        return transactions
    except Exception as e:
        print(f"Erro ao buscar transações: {e}")
        return []

# 2. Adicionar nova transação
def add_new_transaction(user_id, date, description, trans_type, value, category):
    try:
        new_data = {
            'user_id': user_id,
            'date': date,
            'description': description,
            'type': trans_type,
            'value': value,
            'category': category, # ⚠️ Campo 'category' adicionado
            'created_at': datetime.now().isoformat()
        }
        update_time, doc_ref = db.collection('transactions').add(new_data)
        
        new_data['id'] = doc_ref.id
        return new_data
    except Exception as e:
        print(f"Erro ao criar transação: {e}")
        return None

# 3. Buscar uma transação por ID (para validação) - Mantido
def get_transaction_by_id(transaction_id):
    try:
        doc = db.collection('transactions').document(transaction_id).get()
        if doc.exists:
            t = doc.to_dict()
            t['id'] = doc.id
            return t
        return None
    except Exception as e:
        print(f"Erro ao buscar transação por ID: {e}")
        return None

# 4. Atualizar transação - Mantido
def update_transaction_data(transaction_id, update_data):
    try:
        doc_ref = db.collection('transactions').document(transaction_id)
        doc_ref.update(update_data)
        
        updated = doc_ref.get().to_dict()
        updated['id'] = transaction_id
        return updated
    except Exception as e:
        print(f"Erro ao atualizar transação: {e}")
        return None

# 5. Deletar transação - Mantido
def delete_transaction_data(transaction_id):
    try:
        db.collection('transactions').document(transaction_id).delete()
        return True
    except Exception as e:
        print(f"Erro ao deletar transação: {e}")
        return False