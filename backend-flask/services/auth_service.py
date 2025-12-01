# backend-flask/services/auth_service.py

# Garante que as funções necessárias do modelo existam e sejam importadas
from models.user_model import save_user, get_user_by_email
from uuid import uuid4


# =================================================================
# 🛑 FUNÇÃO CRÍTICA FALTANTE: simple_login_check 🛑
# =================================================================
def simple_login_check(email, password):
    """
    Verifica as credenciais diretamente no Firestore (versão simplificada).
    Retorna o UID se as credenciais forem válidas, caso contrário, None.
    """
    user_data = get_user_by_email(email)
    
    # ⚠️ Verifica se a senha salva (em texto plano) é igual à senha fornecida
    if user_data and user_data.get('password') == password:
        # Sucesso: Retorna o ID do usuário (UID)
        return user_data.get('id')
    
    # Falha
    return None

# =================================================================
# REGISTRO SIMPLIFICADO
# =================================================================
def register_user(name, email, password):
    """
    Registra um novo usuário (salvando a senha em texto plano no Firestore).
    """
    if get_user_by_email(email):
        return {"error": "Email já cadastrado."}, 409
        
    # Gera um ID temporário
    user_id = str(uuid4())
    
    # Passamos a senha para o modelo
    user_data = save_user(user_id, name, email, password)
    
    if user_data:
        return {"message": "Usuário registrado com sucesso.", "id": user_id}, 201
    
    return {"error": "Falha ao salvar usuário no banco de dados."}, 500