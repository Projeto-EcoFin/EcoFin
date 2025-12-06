
import firebase_admin
from firebase_admin import credentials, firestore
import os

KEY_FILENAME = "serviceAccountKey.json" 

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SERVICE_ACCOUNT_PATH = os.path.join(BASE_DIR, KEY_FILENAME)

def initialize_firebase():
    """Inicializa o SDK do Firebase Admin."""
    if firebase_admin._apps:
        return

    try:
        if not os.path.exists(SERVICE_ACCOUNT_PATH):
            print("\n" + "="*50)
            print("❌ ERRO CRÍTICO: ARQUIVO NÃO ENCONTRADO")
            print(f"O Python procurou em: {SERVICE_ACCOUNT_PATH}")
            print("\nARQUIVOS QUE ESTÃO NESTA PASTA:")
            for f in os.listdir(BASE_DIR):
                print(f" - {f}")
            print("="*50 + "\n")
            raise FileNotFoundError(f"Chave não encontrada: {KEY_FILENAME}")

        cred = credentials.Certificate(SERVICE_ACCOUNT_PATH)
        firebase_admin.initialize_app(cred)
        print("✅ Firebase conectado com sucesso!")
            
    except Exception as e:
        print(f"❌ Erro no Firebase: {e}")
      

initialize_firebase()
db = firestore.client()