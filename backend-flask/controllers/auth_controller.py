# backend-flask/controllers/auth_controller.py (COMPLETO E FINAL)

from flask import Blueprint, request, jsonify

from models.user_model import get_user_by_id 
from services.auth_service import register_user, simple_login_check

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

# =================================================================
# ROTA DE REGISTRO (POST /api/auth/register)
# =================================================================
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    
    if not password or len(password) < 6:
        return jsonify({"error": "A senha deve ter pelo menos 6 caracteres."}), 400

    response, status = register_user(name, email, password)
    return jsonify(response), status


# =================================================================
# ROTA DE LOGIN (POST /api/auth/login)
# =================================================================
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    user_id = simple_login_check(email, password)
    
    if user_id:
        user_profile = get_user_by_id(user_id) 
        
        return jsonify({
            'user_id': user_id, 
            'user': user_profile
        }), 200
    
    return jsonify({"error": "Email ou senha inválidos."}), 401 


# =================================================================
# 🛑 CORREÇÃO FINAL DA ROTA DE PERFIL 🛑
# =================================================================
# O Front-end usa GET. O Back-end deve aceitar GET.
@auth_bp.route('/profile', methods=['GET'])
def get_profile():
    # Pega o UID do usuário no cabeçalho 'X-User-ID' (enviado pelo AuthService.js)
    current_user_id = request.headers.get('X-User-ID')
    
    # 1. Verifica se o usuário está "logado" (possui UID)
    if not current_user_id:
        return jsonify({"msg": "Acesso não autorizado. UID ausente."}), 401
    
    try:
        # 2. Busca os dados no Firestore
        user_data = get_user_by_id(current_user_id)
        
        if user_data:
            # Garante que o Front-end consiga carregar o 'name'
            user_data.pop('password', None) # Remove a senha antes de enviar
            return jsonify(user_data), 200
        
        # 3. Caso o UID exista, mas o perfil não esteja no banco
        return jsonify({"msg": "Usuário não encontrado no banco de dados."}), 404
        
    except Exception as e:
        # 4. Erro interno: retorna JSON para evitar 'JSON parse error'
        print(f"Erro interno do servidor ao carregar perfil: {e}")
        return jsonify({"error": "Erro interno do servidor."}), 500