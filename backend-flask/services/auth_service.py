
from models.user_model import save_user, get_user_by_email
from uuid import uuid4



def simple_login_check(email, password):
    """
    Verifica as credenciais diretamente no Firestore (versão simplificada).
    Retorna o UID se as credenciais forem válidas, caso contrário, None.
    """
    user_data = get_user_by_email(email)
    
    if user_data and user_data.get('password') == password:
        return user_data.get('id')
    
    # Falha
    return None


def register_user(name, email, password):
    """
    Registra um novo usuário (salvando a senha em texto plano no Firestore).
    """
    if get_user_by_email(email):
        return {"error": "Email já cadastrado."}, 409
        
    user_id = str(uuid4())
    
    user_data = save_user(user_id, name, email, password)
    
    if user_data:
        return {"message": "Usuário registrado com sucesso.", "id": user_id}, 201
    
    return {"error": "Falha ao salvar usuário no banco de dados."}, 500