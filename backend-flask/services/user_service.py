
from models.user_model import get_user_by_id, update_user_data


def get_user_profile(user_id):
    """
    Busca o perfil de um usuário pelo ID (UID do Firebase).
    """
    user = get_user_by_id(user_id)
    
    if not user:
        return {"message": "Usuário não encontrado."}, 404
        
    user.pop('password', None)
    
    return user, 200


def update_user_profile(user_id, update_data):
    """
    Atualiza os dados do perfil do usuário.
    """
    
    if not update_data:
        return {"message": "Nenhum dado para atualizar fornecido."}, 400
        
    updated_user = update_user_data(user_id, update_data)
    
    if not updated_user:
        return {"message": "Falha ao atualizar o perfil. Usuário não encontrado."}, 500

    updated_user.pop('password', None)
    
    return updated_user, 200