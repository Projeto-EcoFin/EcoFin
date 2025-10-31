import uuid
import json


users_db = [
    {
        "id": str(uuid.uuid4()), 
        "name": "Teste EcoFin",
        "email": "teste@ecofin.com", 
        "password": "senha123"
    }
]


def find_user_by_email(email):
    """Retorna o usuário se o email for encontrado, senão retorna None."""
    return next((u for u in users_db if u["email"] == email), None)

def save_user(name, email, password):
    """Cria e salva um novo usuário no users_db."""
    new_user = {
        "id": str(uuid.uuid4()),
        "name": name,
        "email": email,
        "password": password # No futuro, faremos hash desta senha!
    }
    users_db.append(new_user)
    return new_user

def find_user_by_id(user_id):
    """Retorna o usuário se o ID for encontrado, senão retorna None."""
    return next((u for u in users_db if u["id"] == user_id), None)