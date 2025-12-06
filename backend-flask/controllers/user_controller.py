from flask import Blueprint, request, jsonify
from models.user_model import get_user_by_id

user_bp = Blueprint('user', __name__) 


@user_bp.route('/profile', methods=['GET'])
def get_profile():
    current_user_id = request.headers.get('X-User-ID')
    
    if not current_user_id:
        return jsonify({"msg": "Acesso não autorizado. UID ausente."}), 401
    
    try:
        user_data = get_user_by_id(current_user_id)
        
        if user_data:
            user_data.pop('password', None) 
            return jsonify(user_data), 200
        
        return jsonify({"msg": "Usuário não encontrado."}), 404
        
    except Exception as e:
        print(f"Erro ao carregar perfil: {e}")
        return jsonify({"error": "Erro interno do servidor."}), 500