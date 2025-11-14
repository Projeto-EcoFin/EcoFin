# backend-flask/services/auth_service.py - Atualizado para Firebase Authentication

# Se você estiver usando o Admin SDK (que você configurou) para autenticar usuários,
# a função a ser usada é user_management (auth).
from firebase_admin import auth 
from firebase_admin import exceptions as firebase_exceptions
from models.user_model import save_user 

# =================================================================
# LÓGICA DE NEGÓCIOS PARA REGISTRO (SIGN UP)
# =================================================================
def register_user(name, email, password):
    """Cria um novo usuário no Firebase Authentication e salva no Firestore."""
    
    # 1. Validação de Regra de Negócio/Entrada
    if not name or not email or not password:
        return "Todos os campos são obrigatórios.", 400
    
    try:
        # 2. Cria o usuário no Firebase Authentication
        # O Firebase lida com o hashing e segurança da senha
        user = auth.create_user(
            email=email,
            password=password,
            display_name=name
        )
        
        # O ID do usuário no Firebase Auth é o UID. Usaremos ele como ID no Firestore
        user_id = user.uid

        # 3. Salva os dados adicionais do perfil (telefone, localização, etc.) no Firestore
        # NOTA: A senha NÃO é salva no Firestore, apenas no Firebase Auth
        new_user = save_user(user_id, name, email, None) # A função save_user deve ser atualizada para receber o UID como primeiro argumento

        if new_user:
            # Retorna dados do perfil, excluindo a senha
            new_user.pop('password', None)
            return new_user, 201
        
        # Se falhar ao salvar no Firestore, tentamos apagar do Auth
        auth.delete_user(user_id)
        return "Usuário criado, mas falha ao salvar dados adicionais.", 500

    except firebase_exceptions.AlreadyExistsError:
        return "Este e-mail já está em uso.", 409
    except Exception as e:
        print(f"Erro de registro do Firebase: {e}")
        return "Erro ao registrar usuário. Senha deve ter pelo menos 6 caracteres.", 400


def login_user(id_token):
    """
    Verifica o ID Token do Firebase enviado pelo Frontend após um login bem-sucedido.
    Retorna o UID do Firebase para ser usado como JWT identity no Flask.
    """
    if not id_token:
        return "Token de autenticação ausente.", 400

    try:
        # Verifica o ID Token e obtém as informações do usuário
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        
        # O Flask JWT precisa do UID para criar o token de acesso local
        return uid, 200
    
    except Exception as e:
        print(f"Erro ao verificar ID Token do Firebase: {e}")
        return "Token inválido ou expirado. Faça login novamente.", 401