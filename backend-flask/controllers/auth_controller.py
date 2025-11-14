# backend-flask/controllers/auth_controller.py - Atualizado para Login com Token Firebase

from flask import Blueprint, jsonify, request
from services.auth_service import register_user, login_user
from flask_jwt_extended import create_access_token
from models.user_model import find_user_by_id # Necessário para buscar o perfil após login

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

# ... (Rota de Registro register_user_route permanece a mesma, mas usa a lógica atualizada) ...

@auth_bp.route('/register', methods=['POST'])
def register_user_route():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    user, status_code = register_user(name, email, password)

    if status_code == 201:
        # Se o registro for bem-sucedido, já podemos emitir o JWT para o Flask
        access_token = create_access_token(identity=user['id'])
        return jsonify(
            message="Usuário registrado e logado com sucesso!",
            access_token=access_token,
            user_id=user['id']
        ), 201
    else:
        return jsonify({"message": user}), status_code


@auth_bp.route('/login', methods=['POST'])
def login_user_route():
    """
    Endpoint de Login. Espera o 'id_token' do Firebase enviado pelo Frontend.
    """
    data = request.get_json()
    id_token = data.get('id_token') # O Frontend deve enviar o token do Firebase aqui
    
    # 1. Verifica o token e obtém o UID (ID do Firebase)
    user_uid, status_code = login_user(id_token)

    if status_code != 200:
        return jsonify({"message": user_uid}), status_code

    # 2. Se o token for válido, buscamos o perfil no Firestore pelo UID
    user_profile = find_user_by_id(user_uid) 
    
    if not user_profile:
        # Isso pode acontecer se o usuário foi criado no Auth, mas não no Firestore
        return jsonify({"message": "Perfil não encontrado no Firestore."}), 404

    # 3. Cria o JWT do Flask usando o UID como identidade
    access_token = create_access_token(identity=user_uid)
    
    # Prepara o objeto de perfil para enviar ao Frontend
    user_profile.pop('password', None)
    
    return jsonify({
        "message": "Login bem-sucedido!",
        "access_token": access_token,
        "user_id": user_uid,
        "user_profile": user_profile
    }), 200