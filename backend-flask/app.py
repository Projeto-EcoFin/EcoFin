from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy 
from database import db

from controllers.auth_controller import auth_bp
from controllers.budget_controller import budget_bp

app = Flask(__name__)

pp.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ecofin.db' # TEM QUE MUDAR QUANDO TIVER O BANCO
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config["JWT_SECRET_KEY"] = "super-secret-key-ecofin-2024" 
app.config["CORS_HEADERS"] = "Content-Type"
CORS(app, resources={r"/*": {"origins": "*"}}) 

jwt = JWTManager(app)

app.register_blueprint(auth_bp)
app.register_blueprint(budget_bp)


@app.route('/', methods=['GET'])
def home():
    return "API EcoFin rodando! Versão: MVC-Auth-Refactored"

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=True)