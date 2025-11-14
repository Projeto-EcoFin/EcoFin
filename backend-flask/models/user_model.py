# backend-flask/models/user_model.py

from firebase_config import db 
from datetime import datetime

def get_user_by_id(user_id):
    """Busca o perfil de um usuário no Firestore pelo seu UID."""
    try:
        doc = db.collection('users').document(user_id).get()
        if doc.exists:
            user_data = doc.to_dict()
            user_data['id'] = doc.id
            return user_data
        return None
    except Exception as e:
        print(f"Erro ao buscar usuário: {e}")
        return None


def save_user(user_id, name, email):
    """Salva os dados iniciais do perfil do usuário no Firestore."""
    
    member_since = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    user_data = {
        'id': user_id, 
        'name': name,
        'email': email,
        'member_since': member_since
    }
    
    try:
        db.collection('users').document(user_id).set(user_data)
        return user_data
    except Exception as e:
        print(f"Erro ao salvar usuário no Firestore: {e}")
        return None

def update_user_data(user_id, update_data):
    """Atualiza campos específicos do perfil do usuário no Firestore."""
    try:
        doc_ref = db.collection('users').document(user_id)
        doc_ref.update(update_data)
        
        updated_doc = doc_ref.get()
        if updated_doc.exists:
            data = updated_doc.to_dict()
            data['id'] = updated_doc.id
            return data
        return None
        
    except Exception as e:
        print(f"Erro ao atualizar dados do usuário no Firestore: {e}")
        return None