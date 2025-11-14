# backend-flask/services/auth_service.py

from firebase_admin import auth 
from firebase_admin import exceptions as firebase_exceptions
from models.user_model import save_user 

# =================================================================
# LÓGICA DE NEGÓCIOS PARA REGISTRO (SIGN UP)
# =================================================================
def register_user(name, email, password):
    """Cria um novo usuário no Firebase Authentication e salva no Firestore."""
    
    # 1. Validação de Regra de Negócio/Entrada (Se falhar, retorna 400 BAD REQUEST)
    if not name or not email or not password:
        return {"error": "Todos os campos são obrigatórios."}, 400
        
    if len(password) < 6:
        return {"error": "A senha deve ter pelo menos 6 caracteres."}, 400
    
    try:
        # 2. Cria o usuário no Firebase Authentication
        user = auth.create_user(
            email=email,
            password=password,
            display_name=name
        )
        user_id = user.uid

        # 3. Salva os dados adicionais do perfil
        new_user_data = save_user(user_id, name, email) 

        if new_user_data:
            return new_user_data, 201
        
        # Se falhar ao salvar no Firestore, deleta o usuário criado no Auth
        auth.delete_user(user_id)
        return {"error": "Usuário criado, mas falha ao salvar dados adicionais."}, 500

    except firebase_exceptions.AlreadyExistsError:
        return {"error": "Este e-mail já está em uso."}, 409
    except Exception as e:
        print(f"Erro de registro do Firebase: {e}")
        # Retorna 400 para erros como senha mal formatada
        return {"error": "Erro ao registrar usuário. Senha deve ter pelo menos 6 caracteres."}, 400


def login_user(id_token):
    """Verifica o ID Token do Firebase e retorna o UID."""
    if not id_token:
        return {"error": "Token de autenticação ausente."}, 400

    try:
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        return {"user_id": uid}, 200
    
    except Exception as e:
        print(f"Erro ao verificar ID Token do Firebase: {e}")
        return {"error": "Token inválido ou expirado. Faça login novamente."}, 401