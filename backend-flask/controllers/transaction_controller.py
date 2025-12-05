# backend-flask/controllers/transaction_controller.py

from flask import Blueprint, jsonify, request
from services.transaction_service import (
    fetch_user_transactions, 
    create_transaction,
    update_transaction, 
    delete_transaction
)

# ⚠️ CORREÇÃO: Removido url_prefix aqui, ele será colocado no app.py para /api/transactions
# Vou manter /api/transactions como prefixo se o app.py registrar sem prefixo
transaction_bp = Blueprint('transaction', __name__) 

# Função auxiliar para garantir que o usuário está logado
def get_user_id_from_header():
    # ⚠️ Esta é a chave da autenticação SIMPLES
    return request.headers.get('X-User-ID')

# =================================================================
# LISTAR E ADICIONAR (GET / POST)
# =================================================================
@transaction_bp.route('/transactions', methods=['GET', 'POST'])
def handle_transactions():
    user_id = get_user_id_from_header()
    
    if not user_id:
        return jsonify({"message": "Acesso não autorizado. ID de usuário ausente."}), 401

    if request.method == 'GET':
        # LISTAR
        transactions, status_code = fetch_user_transactions(user_id)
        return jsonify(transactions), status_code
    
    if request.method == 'POST':
        # ADICIONAR
        data = request.get_json()
        
        # 1. Extrai os dados
        date = data.get('date')
        description = data.get('description')
        transaction_type = data.get('type') 
        value = data.get('value')
        category = data.get('category')

        # 2. Validação Básica
        if not all([date, description, transaction_type, value, category]):
            return jsonify({"message": "Dados incompletos."}), 400

        # 3. Chama o Service
        result, status_code = create_transaction(user_id, date, description, transaction_type, value, category)
        
        if status_code >= 400:
             return jsonify({"message": result}), status_code # Retorna erro do service
        
        return jsonify({"message": "Transação criada com sucesso", "transaction": result}), status_code


# =================================================================
# EDITAR E EXCLUIR (PUT / DELETE)
# =================================================================
@transaction_bp.route('/transactions/<string:transaction_id>', methods=['PUT', 'DELETE'])
def handle_single_transaction(transaction_id):
    user_id = get_user_id_from_header()
    
    if not user_id:
        return jsonify({"message": "Acesso não autorizado. ID de usuário ausente."}), 401

    if request.method == 'PUT':
        # EDITAR
        update_data = request.get_json()
        if not update_data:
            return jsonify({"message": "Nenhum dado fornecido."}), 400

        result, status_code = update_transaction(user_id, transaction_id, update_data)
        
        if status_code == 200:
            return jsonify({"message": "Atualizado com sucesso", "transaction": result}), 200
        return jsonify({"message": result}), status_code

    if request.method == 'DELETE':
        # EXCLUIR
        result, status_code = delete_transaction(user_id, transaction_id)
        return jsonify({"message": result}), status_code