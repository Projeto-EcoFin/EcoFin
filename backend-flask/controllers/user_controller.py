# backend-flask/controllers/user_controller.py

from flask import Blueprint, request, jsonify
from models.user_model import get_user_by_id

# O prefixo definido no app.py é '/api', então esta rota será '/api/profile'
user_bp = Blueprint('user', __name__) 

# =================================================================
# ROTA DE PERFIL (GET /api/profile)
# =================================================================
@user_bp.route('/profile', methods=['GET'])
def get_profile():
    # Pega o UID do usuário no cabeçalho
    current_user_id = request.headers.get('X-User-ID')
    
    if not current_user_id:
        return jsonify({"msg": "Acesso não autorizado. UID ausente."}), 401
    
    try:
        # Busca no banco de dados
        user_data = get_user_by_id(current_user_id)
        
        if user_data:
            # Remove a senha antes de enviar para segurança
            user_data.pop('password', None) 
            return jsonify(user_data), 200
        
        return jsonify({"msg": "Usuário não encontrado."}), 404
        
    except Exception as e:
        print(f"Erro ao carregar perfil: {e}")
        return jsonify({"error": "Erro interno do servidor."}), 500