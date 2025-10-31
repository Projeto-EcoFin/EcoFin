from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from controllers.auth_controller import auth_bp

app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = "super-secret-key-ecofin-2024" 
app.config["CORS_HEADERS"] = "Content-Type"
CORS(app, resources={r"/*": {"origins": "*"}}) 

jwt = JWTManager(app)

app.register_blueprint(auth_bp)


@app.route('/', methods=['GET'])
def home():
    return "API EcoFin rodando! Versão: MVC-Auth-Refactored"


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=True)