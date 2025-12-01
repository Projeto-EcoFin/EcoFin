# backend-flask/models/user_model.py (FINAL)

from firebase_config import db 
from datetime import datetime

# =================================================================
# BUSCA POR ID (Necessário para a rota /profile)
# =================================================================
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
        print(f"Erro ao buscar usuário por ID: {e}")
        return None

# =================================================================
# 🛑 FUNÇÃO CRÍTICA FALTANTE 🛑
# =================================================================
def get_user_by_email(email):
    """
    Busca um usuário no Firestore pelo email.
    Necessário para o login simplificado.
    """
    try:
        # Query para buscar o usuário pelo campo 'email'
        docs = db.collection('users').where('email', '==', email).limit(1).stream()
        for doc in docs:
            user_data = doc.to_dict()
            user_data['id'] = doc.id
            return user_data
        return None
    except Exception as e:
        print(f"Erro ao buscar usuário por email: {e}")
        return None


# =================================================================
# REGISTRO E SALVAMENTO (Salva a senha em texto plano)
# =================================================================
def save_user(user_id, name, email, password):
    """Salva os dados iniciais do perfil do usuário no Firestore (incluindo senha)."""
    
    member_since = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    user_data = {
        'id': user_id, 
        'name': name,
        'email': email,
        'password': password, # ⚠️ SALVO EM TEXTO PLANO
        'member_since': member_since
    }
    
    try:
        db.collection('users').document(user_id).set(user_data)
        return user_data
    except Exception as e:
        print(f"Erro ao salvar usuário no Firestore: {e}")
        return None

# =================================================================
# FUNÇÃO update_user_data (Necessária para user_service.py)
# =================================================================
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