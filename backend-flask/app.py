from flask import Flask, jsonify, request
from flask_cors import CORS
import uuid

app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

transactions_db = []

# =================================================================
# ENDPOINTS DA API (Rotas)
# =================================================================

# ROTA 1: GET /api/transactions (Ler todas as transações)
@app.route('/api/transactions', methods=['GET'])
def get_transactions():
    return jsonify(transactions_db)


# ROTA 2: POST /api/transactions (Criar uma nova transação)
@app.route('/api/transactions', methods=['POST'])
def add_transaction():
    new_data = request.get_json()
    
    if 'description' not in new_data or 'value' not in new_data:
        return jsonify({'message': 'Dados de transação incompletos.'}), 400

    new_transaction = {
        'id': str(uuid.uuid4()), 
        'date': new_data.get('date', 'Data não informada'), 
        'description': new_data['description'],
        'type': new_data.get('type', 'Despesa'),
        'category': new_data.get('category', 'Outros'),
        'value': new_data['value']
    }
    
    transactions_db.append(new_transaction)
    
    return jsonify(new_transaction), 201


# ROTA 3: DELETE /api/transactions/<string:id> (Excluir Transação)
@app.route('/api/transactions/<string:id>', methods=['DELETE'])
def delete_transaction(id):
    global transactions_db
    
    initial_length = len(transactions_db)
    transactions_db = [t for t in transactions_db if t['id'] != id]
    
    if len(transactions_db) == initial_length:
        return jsonify({'message': f'Transação com ID {id} não encontrada.'}), 404
        
    return '', 204 # Retorna 204 (No Content) para sucesso


# ROTA 4: PUT /api/transactions/<string:id> (Editar Transação)
@app.route('/api/transactions/<string:id>', methods=['PUT'])
def update_transaction(id):
    update_data = request.get_json()
    
    transaction_index = -1
    for i, t in enumerate(transactions_db):
        if t['id'] == id:
            transaction_index = i
            break
            
    if transaction_index == -1:
        return jsonify({'message': f'Transação com ID {id} não encontrada.'}), 404
        
    current_transaction = transactions_db[transaction_index]
    
    for key, value in update_data.items():
        if key in current_transaction and key != 'id':
            current_transaction[key] = value
            
    return jsonify(current_transaction)


# =================================================================
# INICIAR O SERVIDOR
# =================================================================

if __name__ == '__main__':
    app.run(debug=True, port=3000)