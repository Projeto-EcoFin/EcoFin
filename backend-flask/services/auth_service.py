from models.user_model import find_user_by_email, save_user 
from flask_jwt_extended import create_access_token
import json

def login_user(email, password):
    """
    Tenta autenticar um usuário.
    Retorna o token JWT e a mensagem de sucesso ou uma tupla (mensagem, código_erro).
    """
    user = find_user_by_email(email)

    if user and user["password"] == password:
        # Se válido, cria o token JWT
        access_token = create_access_token(identity=user["id"])
        return access_token, "Login bem-sucedido"
    
    # Se falhou, retorna o erro (Lógica de Negócios de Validação)
    return "Email ou senha inválidos", 401



def register_user(name, email, password):
    """
    Registra um novo usuário no sistema.
    Retorna o novo usuário ou uma tupla (mensagem, código_erro).
    """
    if find_user_by_email(email):
        return "Email já está em uso", 400

    new_user = save_user(name, email, password)
    
    return new_user, 201