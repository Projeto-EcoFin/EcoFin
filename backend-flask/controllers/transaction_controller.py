# backend-flask/controllers/transaction_controller.py

from flask import Blueprint, jsonify, request
from services.transaction_service import (
    create_transaction,
    get_transactions,
    update_transaction,
    delete_transaction
)

transaction_bp = Blueprint("transaction_bp", __name__)

@transaction_bp.route("/api/transactions", methods=["GET"])
def list_transactions():
    return jsonify(get_transactions()), 200

@transaction_bp.route("/api/transactions", methods=["POST"])
def add_transaction():
    data = request.get_json()
    result = create_transaction(data)
    return jsonify(result), 201

@transaction_bp.route("/api/transactions/<int:transaction_id>", methods=["PUT"])
def edit_transaction(transaction_id):
    updated = update_transaction(transaction_id, request.get_json())
    if updated:
        return jsonify(updated), 200
    return jsonify({"message": "Não encontrado"}), 404

@transaction_bp.route("/api/transactions/<int:transaction_id>", methods=["DELETE"])
def remove_transaction(transaction_id):
    delete_transaction(transaction_id)
    return jsonify({"message": "Removido com sucesso!"}), 200
