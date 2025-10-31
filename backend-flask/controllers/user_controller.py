    from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.user_service import get_user_profile, update_user_profile

user_bp = Blueprint('user', __name__, url_prefix='/api/user')

@user_bp.route('/profile', methods=['GET'])
@jwt_required() 
def get_profile():
    """
    Endpoint Protegido para Visualizar o Perfil do Usuário Logado.
    Corresponde à tela ProfilePage.jsx.
    """
    user_id = get_jwt_identity()

    user_data, status_code = get_user_profile(user_id)

    if status_code == 200:
        response_data = {
            "id": user_data["id"],
            "nome": user_data["name"],
            "email": user_data["email"],
            "membroDesde": user_data["membroDesde"],
            "telefone": user_data.get("telefone", "N/A"),
            "localizacao": user_data.get("localizacao", "N/A")
        }
        return jsonify(response_data), status_code
    else:
        return jsonify({"message": user_data}), status_code


        @user_bp.route('/profile', methods=['PUT'])
@jwt_required() # Protege esta rota
def update_profile():
    """
    Endpoint Protegido para Atualizar o Perfil do Usuário.
    Recebe os dados do EditProfileModal.jsx.
    """
    # 1. Controller: Obtém a identidade e os dados
    user_id = get_jwt_identity()
    data = request.get_json()
    
    # 2. Controller: Chama o Service para processar a lógica
    result, status_code = update_user_profile(user_id, data)

    # 3. Controller: Retorna a resposta HTTP
    if status_code == 200:
        # O Service já retornou o objeto sem senha, mas remapeamos para o padrão 'nome' do Frontend
        if 'name' in result:
             result['nome'] = result.pop('name')
        
        # Garante que a resposta corresponda ao que o Frontend espera
        return jsonify(result), status_code
    else:
        return jsonify({"message": result}), status_code