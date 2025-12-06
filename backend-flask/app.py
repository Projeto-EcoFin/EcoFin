from flask import Flask, jsonify
from flask_cors import CORS 

from firebase_config import initialize_firebase 

from controllers.auth_controller import auth_bp
from controllers.user_controller import user_bp
from controllers.transaction_controller import transaction_bp


app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": [
    "http://localhost:5173",  
    "http://127.0.0.1:5173"   
]}}) 

app.register_blueprint(auth_bp) 
app.register_blueprint(user_bp, url_prefix='/api') 
app.register_blueprint(transaction_bp, url_prefix='/api') 


@app.route('/', methods=['GET'])
def home():
    return "API EcoFin rodando! (Simples e Funcional)", 200

if __name__ == '__main__':
    initialize_firebase()
    
    app.run(host='0.0.0.0', port=3000, debug=True)