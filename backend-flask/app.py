from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
<<<<<<< HEAD
from controllers.auth_controller import auth_bp
from controllers.user_controller import user_bp 
from controllers.transaction_controller import transaction_bp 

app = Flask(__name__)
=======
from flask_sqlalchemy import SQLAlchemy 
from database import db

from controllers.auth_controller import auth_bp
from controllers.budget_controller import budget_bp

app = Flask(__name__)

pp.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ecofin.db' # TEM QUE MUDAR QUANDO TIVER O BANCO
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

>>>>>>> deb794489783f9ddfb370a96028c67d7d1bdca71
app.config["JWT_SECRET_KEY"] = "super-secret-key-ecofin-2024" 
app.config["CORS_HEADERS"] = "Content-Type"
CORS(app, resources={r"/*": {"origins": "*"}}) 

jwt = JWTManager(app)

app.register_blueprint(auth_bp)
<<<<<<< HEAD
app.register_blueprint(user_bp) 
app.register_blueprint(transaction_bp)


=======
app.register_blueprint(budget_bp)
>>>>>>> deb794489783f9ddfb370a96028c67d7d1bdca71


@app.route('/', methods=['GET'])
def home():
    """Retorna uma mensagem de status para verificar se o servidor está ativo."""
    return "API EcoFin rodando! Versão: MVC-Auth-Profile-Refactored", 200


with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=True)