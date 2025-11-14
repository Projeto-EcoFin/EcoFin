# backend-flask/models/transaction_model.py

from firebase_config import db # Importa a referência ao Firestore
from datetime import datetime

# =================================================================
# FUNÇÕES CRUD (Create, Read, Update, Delete)
# =================================================================

def get_all_transactions_by_user(user_id):
    """Lê todas as transações de um usuário específico."""
    try:
        # Busca a coleção 'transactions' onde user_id é igual ao ID fornecido
        docs = db.collection('transactions').where('user_id', '==', user_id).stream()
        
        transactions = []
        for doc in docs:
            trans_data = doc.to_dict()
            trans_data['id'] = doc.id # Adiciona o ID do documento
            transactions.append(trans_data)
            
        return transactions
    except Exception as e:
        print(f"Erro ao buscar transações: {e}")
        return []

def add_new_transaction(user_id, date, description, type, value):
    """Cria e salva uma nova transação."""
    try:
        new_transaction = {
            'user_id': user_id,
            'date': date, # Deve ser uma string 'YYYY-MM-DD'
            'description': description,
            'type': type,
            'value': value,
            'created_at': datetime.now().isoformat()
        }
        
        # O Firestore gera automaticamente o ID do documento
        ref = db.collection('transactions').add(new_transaction)
        
        # Retorna a transação completa, incluindo o ID gerado
        new_transaction['id'] = ref[1].id
        return new_transaction
        
    except Exception as e:
        print(f"Erro ao adicionar transação: {e}")
        return None

def update_transaction_data(transaction_id, update_data):
    """Atualiza campos específicos de uma transação."""
    try:
        doc_ref = db.collection('transactions').document(transaction_id)
        doc_ref.update(update_data)
        
        # Retorna o documento atualizado
        updated_doc = doc_ref.get()
        if updated_doc.exists:
            data = updated_doc.to_dict()
            data['id'] = updated_doc.id
            return data
        return None
    except Exception as e:
        print(f"Erro ao atualizar transação: {e}")
        return None

def delete_transaction_data(transaction_id):
    """Exclui uma transação pelo ID."""
    try:
        db.collection('transactions').document(transaction_id).delete()
        return True
    except Exception as e:
        print(f"Erro ao excluir transação: {e}")
        return False

def get_transaction_by_id(transaction_id):
    """Lê uma transação específica pelo ID."""
    try:
        doc = db.collection('transactions').document(transaction_id).get()
        if doc.exists:
            data = doc.to_dict()
            data['id'] = doc.id
            return data
        return None
    except Exception as e:
        print(f"Erro ao buscar transação por ID: {e}")
        return None