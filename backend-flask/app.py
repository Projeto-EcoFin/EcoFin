# backend-flask/app.py (Versão Final para a Banca)

from flask import Flask, jsonify
from flask_cors import CORS 

# Importa a função initialize_firebase (necessária para o Firestore)
from firebase_config import initialize_firebase 

# Importações dos controllers (mantenha)
from controllers.auth_controller import auth_bp
from controllers.user_controller import user_bp
from controllers.transaction_controller import transaction_bp
# from controllers.budget_controller import budget_bp

app = Flask(__name__)

# =================================================================
# 🛑 CORREÇÃO CRÍTICA DO CORS 🛑
# =================================================================
# Permite explicitamente as origens que você usa no desenvolvimento.
CORS(app, resources={r"/api/*": {"origins": [
    "http://localhost:5173",  # O Front-end em desenvolvimento
    "http://127.0.0.1:5173"   # Uma alternativa comum
]}}) 
# =================================================================

# Registro dos Blueprints (Mantenha o prefixo /api)
app.register_blueprint(auth_bp) # prefixo /api/auth já está no auth_bp
app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(transaction_bp, url_prefix='/api')


# Rota de teste
@app.route('/', methods=['GET'])
def home():
    return "API EcoFin rodando! (Simples e Funcional)", 200

# Inicialização
if __name__ == '__main__':
    # Inicializa o Firebase (Se falhar, o Back-end não rodará)
    initialize_firebase()
    
    # Roda o servidor na porta 3000
    app.run(host='0.0.0.0', port=3000, debug=True)