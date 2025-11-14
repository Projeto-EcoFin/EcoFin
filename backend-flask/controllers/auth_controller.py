# backend-flask/controllers/auth_controller.py

from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

from models.user_model import get_user_by_id 
from services.auth_service import register_user, login_user

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

# =================================================================
# ROTA DE REGISTRO (POST /api/auth/register)
# =================================================================
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    
    # Validação para JSON não recebido ou malformado
    if data is None:
        return jsonify({"error": "Requisição inválida: O corpo deve ser JSON."}), 400
    
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    
    response, status = register_user(name, email, password)
    
    if status == 201:
        user_id = response.get('id') 
        access_token = create_access_token(identity=user_id)
        response['access_token'] = access_token
        
    return jsonify(response), status


# =================================================================
# ROTA DE LOGIN (POST /api/auth/login)
# =================================================================
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    id_token = data.get('id_token') 
    
    uid_response, status = login_user(id_token)
    
    if status == 200:
        uid = uid_response.get('user_id')
        access_token = create_access_token(identity=uid)
        
        user_profile = get_user_by_id(uid) 
        
        return jsonify({
            'access_token': access_token, 
            'user': user_profile
        }), 200
    
    return jsonify(uid_response), status 


# =================================================================
# ROTA DE PERFIL DO USUÁRIO (GET /api/auth/profile)
# =================================================================
@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    current_user_id = get_jwt_identity()
    user_data = get_user_by_id(current_user_id)
    
    if user_data:
        return jsonify(user_data), 200
    
    return jsonify({"msg": "Usuário não encontrado"}), 404