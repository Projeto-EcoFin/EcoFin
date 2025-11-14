# backend-flask/services/user_service.py - CÓDIGO CORRIGIDO EM PYTHON

from models.user_model import get_user_by_id, update_user_data
# =================================================================
# LÓGICA DE NEGÓCIOS PARA PERFIL
# =================================================================

def get_user_profile(user_id):
    """
    Busca o perfil de um usuário pelo ID (UID do Firebase).
    """
    user = get_user_by_id(user_id)
    
    if not user:
        # Retorna uma mensagem de erro se o usuário não for encontrado
        return {"message": "Usuário não encontrado."}, 404
        
    # Remove a senha antes de retornar os dados (segurança)
    user.pop('password', None)
    
    return user, 200


def update_user_profile(user_id, update_data):
    """
    Atualiza os dados do perfil do usuário.
    """
    
    # 1. Validações básicas
    if not update_data:
        return {"message": "Nenhum dado para atualizar fornecido."}, 400
        
    # 2. Busca e Atualiza
    updated_user = update_user_data(user_id, update_data)
    
    if not updated_user:
        return {"message": "Falha ao atualizar o perfil. Usuário não encontrado."}, 500

    # 3. Retorno
    updated_user.pop('password', None)
    
    return updated_user, 200