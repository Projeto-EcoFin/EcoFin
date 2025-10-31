from flask import Blueprint, jsonify, request
from services.auth_service import login_user, register_user

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email', None)
    password = data.get('password', None)

    result, status_code = login_user(email, password)

    if status_code == 200:
        return jsonify(access_token=result, message="Login bem-sucedido"), status_code
    else:
        return jsonify({"message": result}), status_code

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name', None)
    email = data.get('email', None)
    password = data.get('password', None)
    
    result, status_code = register_user(name, email, password)

    if status_code == 201:
        return jsonify({"message": "Usuário registrado com sucesso"}), status_code
    else:
        return jsonify({"message": result}), status_code