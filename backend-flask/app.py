# backend-flask/app.py

from flask import Flask
from flask_cors import CORS 
from flask_jwt_extended import JWTManager

# Importações dos controllers
from controllers.auth_controller import auth_bp
from controllers.user_controller import user_bp
from controllers.transaction_controller import transaction_bp
# from controllers.budget_controller import budget_bp

app = Flask(__name__)

# Configurações do Flask
app.config['JWT_SECRET_KEY'] = "super-secret-key-ecofin-2024" 
app.config["JWT_TOKEN_LOCATION"] = ["headers"] 

# =================================================================
# 2. CONFIGURAR O CORS AQUI
# =================================================================
CORS(app, resources={r"/api/*": {"origins": "*"}}) # Permite acesso do Frontend

jwt = JWTManager(app)

# Registro dos Blueprints (Controladores)
app.register_blueprint(auth_bp)
app.register_blueprint(user_bp)
app.register_blueprint(transaction_bp)
# app.register_blueprint(budget_bp)


# Rota de teste
@app.route('/', methods=['GET'])
def home():
    return "API EcoFin rodando! (com CORS ativado)", 200

# Inicialização
if __name__ == '__main__':
    # Garante que o Flask rode na porta 3000
    app.run(host='0.0.0.0', port=3000, debug=True)