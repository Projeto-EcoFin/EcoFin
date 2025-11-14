# backend-flask/controllers/user_controller.py

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

# Importa as funções de serviço que criamos
from services.user_service import get_user_profile, update_user_profile

user_bp = Blueprint('user', __name__, url_prefix='/api/profile')

# =================================================================
# ROTA: /api/profile (GET) - Obter perfil
# =================================================================

@user_bp.route('/', methods=['GET'])
@jwt_required()
def get_profile():
    """
    Retorna os dados do perfil do usuário logado.
    """
    # Obtém o ID do usuário (UID do Firebase) do token JWT
    user_id = get_jwt_identity() 
    
    # Chama o serviço para buscar o perfil
    user_data, status_code = get_user_profile(user_id)
    
    # Retorna a resposta (JSON)
    return jsonify(user_data), status_code


# =================================================================
# ROTA: /api/profile (PUT) - Atualizar perfil
# =================================================================

@user_bp.route('/', methods=['PUT'])
@jwt_required()
def update_profile():
    """
    Atualiza os dados do perfil do usuário logado.
    """
    # 1. Obtém o ID do usuário do token JWT
    user_id = get_jwt_identity()
    
    # 2. Obtém os dados de atualização do corpo da requisição
    update_data = request.get_json()
    
    if not update_data:
        return jsonify({"message": "Nenhum dado fornecido para atualização."}), 400

    # 3. Chama o serviço para atualizar o perfil
    updated_user_data, status_code = update_user_profile(user_id, update_data)
    
    # 4. Retorna a resposta
    return jsonify(updated_user_data), status_code