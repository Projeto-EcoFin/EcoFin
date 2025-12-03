# backend-flask/firebase_config.py - CORRIGIDO

import firebase_admin
from firebase_admin import credentials, firestore
import os

# Nome EXATO do seu arquivo (o que está na pasta backend-flask/)
KEY_FILENAME = "serviceAccountKey.json" 

# Cria o caminho COMPLETO para o arquivo:
# Junta o diretório atual do firebase_config.py (__file__) com o nome do arquivo da chave
SERVICE_ACCOUNT_PATH = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), 
    KEY_FILENAME
)

def initialize_firebase():
    """Inicializa o SDK do Firebase Admin."""
    try:
        if not firebase_admin._apps:
            # 1. Carrega as credenciais usando o caminho COMPLETO
            cred = credentials.Certificate(SERVICE_ACCOUNT_PATH)
            
            # 2. Inicializa a aplicação Firebase
            firebase_admin.initialize_app(cred)
            print("✅ Firebase Admin SDK inicializado com sucesso.")
            
    except FileNotFoundError:
        # Se a chave não for encontrada no caminho completo:
        print(f"❌ ERRO FATAL: Arquivo de chave de serviço JSON '{KEY_FILENAME}' não encontrado em: {SERVICE_ACCOUNT_PATH}")
        print("Certifique-se de que o nome está correto e o arquivo está na pasta backend-flask.")
        exit(1)
    except Exception as e:
        print(f"❌ ERRO ao inicializar Firebase: {e}")
        exit(1)

# Inicializa e obtém uma referência ao Firestore (seu banco de dados)
initialize_firebase()
db = firestore.client()