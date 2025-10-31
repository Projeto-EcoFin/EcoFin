from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.budget_service import BudgetService
from datetime import datetime

budget_bp = Blueprint('budget_bp', __name__, url_prefix='/budgets')

@budget_bp.route('/', methods=['POST'])
@jwt_required()
def add_budget():
    user_id = get_jwt_identity() 
    data = request.get_json()

    category = data.get('category')
    limit_amount = data.get('limit_amount')
    try:
        limit_amount = float(limit_amount)
    except (TypeError, ValueError):
        return jsonify({"msg": "Limite inválido."}), 400

    if not category or limit_amount <= 0:
        return jsonify({"msg": "Dados de orçamento inválidos (categoria e limite são obrigatórios e limite deve ser positivo)."}), 400
    now = datetime.now()
    month = now.month
    year = now.year

    budget_data, error = BudgetService.create_budget(user_id, category, limit_amount, month, year)
    
    if error:
        return jsonify({"msg": error}), 409 

    return jsonify(budget_data), 201


@budget_bp.route('/', methods=['GET'])
@jwt_required()
def get_budgets():
    user_id = get_jwt_identity()
    
    now = datetime.now()
    try:
        month = int(request.args.get('month', now.month))
        year = int(request.args.get('year', now.year))
    except ValueError:
        return jsonify({"msg": "Mês ou ano inválidos."}), 400

    budgets = BudgetService.get_budgets_with_spending(user_id, month, year)
    
    return jsonify(budgets), 200


@budget_bp.route('/<int:budget_id>', methods=['PUT'])
@jwt_required()
def update_budget(budget_id):
    user_id = get_jwt_identity()
    data = request.get_json()
    
    category = data.get('category')
    limit_amount = data.get('limit_amount')

    if limit_amount:
        try:
            limit_amount = float(limit_amount)
            if limit_amount <= 0:
                return jsonify({"msg": "Limite deve ser positivo."}), 400
        except (TypeError, ValueError):
            return jsonify({"msg": "Limite inválido."}), 400


    updated_budget = BudgetService.update_budget(
        budget_id, 
        user_id, 
        category=category, 
        limit_amount=limit_amount
    )

    if not updated_budget:
        return jsonify({"msg": "Orçamento não encontrado ou não pertence ao usuário."}), 404

    return jsonify(updated_budget), 200

@budget_bp.route('/<int:budget_id>', methods=['DELETE'])
@jwt_required()
def delete_budget(budget_id):
    user_id = get_jwt_identity()
    
    success = BudgetService.delete_budget(budget_id, user_id)
    
    if not success:
        return jsonify({"msg": "Orçamento não encontrado ou não pertence ao usuário."}), 404
        
    return jsonify({"msg": "Orçamento excluído com sucesso."}), 200