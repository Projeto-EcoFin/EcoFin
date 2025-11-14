# backend-flask/firebase_config.py

import firebase_admin
from firebase_admin import credentials, firestore
import os


KEY_FILENAME = "ecofin-6f85d-firebase-adminsdk-fbsvc-38ee373200.json" 
SERVICE_ACCOUNT_KEY = os.path.join(os.path.dirname(__file__), KEY_FILENAME)

def initialize_firebase():
    """Inicializa o SDK do Firebase Admin."""
    try:
        if not firebase_admin._apps:
            # 1. Carrega as credenciais usando o arquivo JSON
            cred = credentials.Certificate(KEY_FILENAME) 
            
            # 2. Inicializa a aplicação Firebase
            firebase_admin.initialize_app(cred)
            print("✅ Firebase Admin SDK inicializado com sucesso.")
            
    except FileNotFoundError:
        print(f"❌ ERRO FATAL: Arquivo de chave de serviço JSON '{KEY_FILENAME}' não encontrado.")
        print("Certifique-se de que o arquivo está no diretório correto.")
        # O servidor deve falhar ou você deve interromper a execução aqui
        exit(1)
    except Exception as e:
        print(f"❌ ERRO ao inicializar Firebase: {e}")
        exit(1)

# Inicializa e obtém uma referência ao Firestore (seu banco de dados)
initialize_firebase()
db = firestore.client()