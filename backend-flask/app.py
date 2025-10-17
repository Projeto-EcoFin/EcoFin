from flask import Flask, jsonify, request
from flask_cors import CORS
import uuid
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity

app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = "super-secret-key-ecofin-123" 
jwt = JWTManager(app)

# CONFIGURAÇÃO DE CORS: Permite acesso tanto às rotas /api/* quanto /auth/*
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"},
                     r"/auth/*": {"origins": "http://localhost:5173"}})

users_db = [
    {
        'id': 'user-1',
        'email': 'teste@ecofin.com',
        'password': 'senha123',
        'name': 'Usuário Teste'
    },
    {
        'id': 'user-2',
        'email': 'admin@ecofin.com',
        'password': 'admin',
        'name': 'Administrador'
    }
]

transactions_db = []

@app.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email', None)
    password = data.get('password', None)

    user = next((u for u in users_db if u["email"] == email), None)

    if user and user["password"] == password:
        access_token = create_access_token(identity=user["id"])
        return jsonify(access_token=access_token, user_name=user['name'], message="Login bem-sucedido"), 200
    
    return jsonify({"message": "Email ou senha inválidos"}), 401

@app.route('/auth/register', methods=['POST'])
def register():
    data = request.get_json()

    required_fields = ['name', 'email', 'password', 'confirmPassword']
    for field in required_fields:
        if not data.get(field):
            return jsonify({"message": f"O campo '{field}' é obrigatório."}), 400

    email = data['email']
    password = data['password']
    confirm_password = data['confirmPassword']
    
    if password != confirm_password:
        return jsonify({"message": "As senhas não coincidem."}), 400

    if next((u for u in users_db if u["email"] == email), None):
        return jsonify({"message": "Este e-mail já está cadastrado."}), 409 # 409 Conflict

    new_user = {
        'id': str(uuid.uuid4()),
        'email': email,
        'password': password, 
        'name': data['name']
    }
    
    users_db.append(new_user)
    
    return jsonify({
        "message": "Conta criada com sucesso!", 
        "user_id": new_user['id']
    }), 201

@app.route('/api/transactions', methods=['GET'])
@jwt_required() 
def get_transactions():
    return jsonify(transactions_db)

@app.route('/api/transactions', methods=['POST'])
@jwt_required()
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

@app.route('/api/transactions/<string:id>', methods=['DELETE'])
@jwt_required()
def delete_transaction(id):
    global transactions_db
    
    initial_length = len(transactions_db)
    transactions_db = [t for t in transactions_db if t['id'] != id]
    
    if len(transactions_db) == initial_length:
        return jsonify({'message': f'Transação com ID {id} não encontrada.'}), 404
        
    return '', 204 

@app.route('/api/transactions/<string:id>', methods=['PUT'])
@jwt_required()
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


if __name__ == '__main__':
    app.run(debug=True, port=3000)