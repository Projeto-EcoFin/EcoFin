# backend-flask/controllers/transaction_controller.py

from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.transaction_service import (
    fetch_user_transactions, 
    create_transaction,
    update_transaction, # Importado para Edição
    delete_transaction  # Importado para Exclusão
)

# Cria o Blueprint para as rotas de API
transaction_bp = Blueprint('transaction', __name__, url_prefix='/api/transactions')

# =================================================================
# 1. LISTAR TRANSAÇÕES (GET /api/transactions)
# =================================================================
@transaction_bp.route('/', methods=['GET'])
@jwt_required()
def get_transactions():
    """Endpoint Protegido: RF06 - Listar Transações."""
    user_id = get_jwt_identity()

    transactions, status_code = fetch_user_transactions(user_id)
    
    return jsonify(transactions), status_code

# =================================================================
# 2. ADICIONAR TRANSAÇÃO (POST /api/transactions)
# =================================================================
@transaction_bp.route('/', methods=['POST'])
@jwt_required()
def add_transaction():
    """Endpoint Protegido: RF03 - Adicionar Transação."""
    user_id = get_jwt_identity()
    data = request.get_json()
    
    date = data.get('date')
    description = data.get('description')
    type = data.get('type')
    value = data.get('value')

    if not all([date, description, type, value]):
        return jsonify({"message": "Dados incompletos (date, description, type, value). Sua requisição JSON está incompleta."}), 400

    result, status_code = create_transaction(user_id, date, description, type, value)

    if status_code == 201:
        return jsonify({"message": "Transação adicionada com sucesso!", "transaction": result}), status_code
    else:
        return jsonify({"message": result}), status_code

# =================================================================
# 3. EDITAR TRANSAÇÃO (PUT /api/transactions/<transaction_id>) - NOVO
# =================================================================
@transaction_bp.route('/<string:transaction_id>', methods=['PUT'])
@jwt_required()
def edit_transaction(transaction_id):
    """Endpoint Protegido: RF04 - Editar Transação."""
    user_id = get_jwt_identity()
    update_data = request.get_json()

    if not update_data:
        return jsonify({"message": "Nenhum dado fornecido para atualização."}), 400

    # O service valida a posse (user_id) e aplica a lógica de sinal de valor.
    result, status_code = update_transaction(user_id, transaction_id, update_data)

    if status_code == 200:
        return jsonify({"message": "Transação atualizada com sucesso!", "transaction": result}), status_code
    else:
        # Erro 404/403 (Não encontrado/Acesso Negado) ou 500 (Falha interna)
        return jsonify({"message": result}), status_code

# =================================================================
# 4. EXCLUIR TRANSAÇÃO (DELETE /api/transactions/<transaction_id>) - NOVO
# =================================================================
@transaction_bp.route('/<string:transaction_id>', methods=['DELETE'])
@jwt_required()
def remove_transaction(transaction_id):
    """Endpoint Protegido: RF05 - Excluir Transação."""
    user_id = get_jwt_identity()

    # O service valida a posse (user_id) antes de excluir.
    result, status_code = delete_transaction(user_id, transaction_id)

    if status_code == 200:
        # Se for sucesso, o resultado é a mensagem do service
        return jsonify({"message": result}), status_code 
    else:
        # Erro 404/403 (Não encontrado/Acesso Negado) ou 500 (Falha interna)
        return jsonify({"message": result}), status_code