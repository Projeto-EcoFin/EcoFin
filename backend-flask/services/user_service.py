# backend-flask/services/user_service.py

from models.user_model import find_user_by_id, update_user_data

# =================================================================
# LÓGICA DE NEGÓCIOS PARA PERFIL
# =================================================================

def get_user_profile(user_id):
    """
    Busca o perfil de um usuário pelo ID (UID do Firebase).
    Não precisa de validação extra, pois o user_id vem do JWT, garantindo autenticação.
    """
    user = find_user_by_id(user_id)
    
    if not user:
        return "Usuário não encontrado.", 404
        
    # Remove a senha antes de retornar os dados para o Frontend (segurança)
    user.pop('password', None)
    
    return user, 200


def update_user_profile(user_id, update_data):
    """
    Atualiza os dados do perfil do usuário.
    Garante que campos sensíveis como email e password não sejam alterados aqui.
    """
    
    # 1. Validações básicas (Regra de Negócio)
    if not update_data:
        return "Nenhum dado para atualizar fornecido.", 400
        
    # 2. Busca e Atualiza
    # O user_model.py já é responsável por sanitizar e proteger campos como 'email' e 'password'
    updated_user = update_user_data(user_id, update_data)
    
    if not updated_user:
        # Isso pode acontecer se o ID for inválido ou o Firestore falhar
        return "Falha ao atualizar o perfil. Usuário não encontrado ou erro no banco de dados.", 500

    # 3. Retorno
    # Remove a senha antes de retornar os dados para o Frontend (segurança)
    updated_user.pop('password', None)
    
    return updated_user, 200