# backend-flask/app.py - Reescrito do Zero com Configuração Firebase

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from firebase_config import db

# 2. Imports de TODOS os Controllers (Blueprints)
from controllers.auth_controller import auth_bp
from controllers.user_controller import user_bp 
from controllers.transaction_controller import transaction_bp 
from controllers.budget_controller import budget_bp

app = Flask(__name__)



app.config["JWT_SECRET_KEY"] = "super-secret-key-ecofin-2024" 
app.config["CORS_HEADERS"] = "Content-Type"
CORS(app, resources={r"/*": {"origins": "*"}}) 

jwt = JWTManager(app)



app.register_blueprint(auth_bp)
app.register_blueprint(user_bp) 
app.register_blueprint(transaction_bp)
app.register_blueprint(budget_bp)



@app.route('/', methods=['GET'])
def home():
    """Retorna uma mensagem de status para verificar se o servidor está ativo."""
    return "API EcoFin rodando! Versão: Firebase Integrated and Conflicts Solved", 200




if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=True)