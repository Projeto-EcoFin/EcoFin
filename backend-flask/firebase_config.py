# backend-flask/firebase_config.py

import firebase_admin
from firebase_admin import credentials, firestore
import os

# Nome EXATO do seu arquivo (o que está na pasta backend-flask/)
KEY_FILENAME = "serviceAccountKey.json" 

# Caminho absoluto para evitar erros de pasta
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SERVICE_ACCOUNT_PATH = os.path.join(BASE_DIR, KEY_FILENAME)

def initialize_firebase():
    """Inicializa o SDK do Firebase Admin."""
    # Evita inicializar duas vezes se o arquivo for importado em vários lugares
    if firebase_admin._apps:
        return

    try:
        # Verifica se o arquivo existe antes de tentar carregar
        if not os.path.exists(SERVICE_ACCOUNT_PATH):
            print("\n" + "="*50)
            print("❌ ERRO CRÍTICO: ARQUIVO NÃO ENCONTRADO")
            print(f"O Python procurou em: {SERVICE_ACCOUNT_PATH}")
            print("\nARQUIVOS QUE ESTÃO NESTA PASTA:")
            # Lista o que realmente está na pasta para ajudar no debug
            for f in os.listdir(BASE_DIR):
                print(f" - {f}")
            print("="*50 + "\n")
            raise FileNotFoundError(f"Chave não encontrada: {KEY_FILENAME}")

        cred = credentials.Certificate(SERVICE_ACCOUNT_PATH)
        firebase_admin.initialize_app(cred)
        print("✅ Firebase conectado com sucesso!")
            
    except Exception as e:
        print(f"❌ Erro no Firebase: {e}")
        # Não damos exit(1) aqui para você conseguir ler o erro no terminal,
        # mas a aplicação vai parar logo em seguida.

initialize_firebase()
db = firestore.client()