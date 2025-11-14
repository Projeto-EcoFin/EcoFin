# backend-flask/models/user_model.py - Refatorado para Firebase Firestore

# Importa a instância do Firestore configurada
from firebase_config import db
import uuid
import datetime # 🚨 CORREÇÃO 1: Importar datetime

# Define a coleção (tabela) que será usada no Firestore
USERS_COLLECTION = 'users'

# =================================================================
# FUNÇÕES DE ACESSO A DADOS (CRUD)
# =================================================================

def find_user_by_email(email):
    """
    Busca um usuário no Firestore pela coleção 'users' onde o email é igual.
    Retorna o objeto do usuário (incluindo o ID do documento como 'id') ou None.
    """
    try:
        # Consulta: db.collection('users').where('email', '==', email).limit(1)
        users_ref = db.collection(USERS_COLLECTION)
        query = users_ref.where('email', '==', email).limit(1)
        result = query.get()

        if result:
            user_doc = result[0]
            user_data = user_doc.to_dict()
            user_data['id'] = user_doc.id # Adiciona o ID do documento ao dicionário
            return user_data
        
        return None
    except Exception as e:
        print(f"Erro ao buscar usuário por email no Firestore: {e}")
        return None


def save_user(user_id, name, email, password):
    """
    Cria e salva um novo usuário no Firestore.
    🚨 CORREÇÃO 2: Agora aceita o 'user_id' (UID do Firebase Auth) como primeiro argumento 
    e o utiliza como ID do documento.
    """
    try:
        new_user_data = {
            "name": name,
            "email": email,
            "password": password, # Será None, pois o Auth do Firebase armazena o hash da senha
            "membroDesde": datetime.datetime.now().strftime("%Y-%m-%d"),
            "telefone": None,
            "localizacao": None
        }
        
        # Define o documento com o ID (UID) fornecido e salva os dados
        doc_ref = db.collection(USERS_COLLECTION).document(user_id)
        doc_ref.set(new_user_data)
        
        # Retorna o objeto completo com o ID (que é o UID)
        new_user_data['id'] = user_id
        return new_user_data

    except Exception as e:
        print(f"Erro ao salvar novo usuário no Firestore: {e}")
        return None


def find_user_by_id(user_id):
    """
    Busca um usuário no Firestore pelo ID do documento (que é o UID do Firebase Auth).
    Retorna o objeto do usuário ou None.
    """
    try:
        # Documento: db.collection('users').document(user_id)
        user_doc = db.collection(USERS_COLLECTION).document(user_id).get()

        if user_doc.exists:
            user_data = user_doc.to_dict()
            user_data['id'] = user_doc.id # user_doc.id será igual ao user_id passado
            return user_data
        
        return None
    except Exception as e:
        print(f"Erro ao buscar usuário por ID no Firestore: {e}")
        return None


def update_user_data(user_id, update_data):
    """
    Encontra um usuário pelo ID e atualiza os campos fornecidos no Firestore.
    Retorna o objeto do usuário atualizado ou None se não encontrado.
    """
    try:
        # 1. Garante que campos críticos não sejam alterados no update
        update_data.pop('email', None) 
        update_data.pop('id', None)
        update_data.pop('password', None) # Protege a senha
        
        # 2. Mapeamento de nome (Frontend 'nome' para Backend/DB 'name')
        if 'nome' in update_data:
            update_data['name'] = update_data.pop('nome')
        
        # 3. Atualiza o documento no Firestore
        user_ref = db.collection(USERS_COLLECTION).document(user_id)
        user_ref.update(update_data)
        
        # 4. Busca o documento atualizado para retornar o objeto completo
        return find_user_by_id(user_id)
        
    except Exception as e:
        print(f"Erro ao atualizar usuário no Firestore: {e}")
        return None