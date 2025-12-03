from firebase_config import db 
from datetime import datetime

def get_all_transactions_by_user(user_id):
    try:
        docs = db.collection('transactions').where('user_id', '==', user_id).stream()
        transactions = []
        for doc in docs:
            data = doc.to_dict()
            data['id'] = doc.id
            transactions.append(data)
        return transactions
    except Exception as e:
        print(f"Erro: {e}")
        return []

# --- ATUALIZAÇÃO AQUI ---
def add_new_transaction(user_id, date, description, type, value, category):
    try:
        new_transaction = {
            'user_id': user_id,
            'date': date,
            'description': description,
            'type': type,
            'value': value,
            'category': category, # <--- Importante
            'created_at': datetime.now().isoformat()
        }
        ref = db.collection('transactions').add(new_transaction)
        new_transaction['id'] = ref[1].id
        return new_transaction
    except Exception as e:
        print(f"Erro ao adicionar: {e}")
        return None

# ... (Mantenha as outras funções update_transaction_data, etc. iguais)
def update_transaction_data(transaction_id, update_data):
    try:
        doc_ref = db.collection('transactions').document(transaction_id)
        doc_ref.update(update_data)
        updated_doc = doc_ref.get()
        if updated_doc.exists:
            data = updated_doc.to_dict()
            data['id'] = updated_doc.id
            return data
        return None
    except: return None

def delete_transaction_data(transaction_id):
    try:
        db.collection('transactions').document(transaction_id).delete()
        return True
    except: return False

def get_transaction_by_id(transaction_id):
    try:
        doc = db.collection('transactions').document(transaction_id).get()
        if doc.exists:
            data = doc.to_dict()
            data['id'] = doc.id
            return data
        return None
    except: return None