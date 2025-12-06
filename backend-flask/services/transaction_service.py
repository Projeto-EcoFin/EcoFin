
from models.transaction_model import Transaction

transactions = []
next_id = 1

def create_transaction(data):
    global next_id

    new_transaction = Transaction(
        id=next_id,
        description=data.get("description"),
        value=data.get("value"),
        category=data.get("category"),
        date=data.get("date"),
        type=data.get("type", "despesa")
    )

    transactions.append(new_transaction)
    next_id += 1

    return new_transaction.to_dict()

def get_transactions():
    return [t.to_dict() for t in transactions]

def delete_transaction(transaction_id):
    global transactions
    transactions = [t for t in transactions if t.id != transaction_id]
    return True

def update_transaction(transaction_id, updated_data):
    for t in transactions:
        if t.id == transaction_id:
            t.description = updated_data.get("description", t.description)
            t.value = updated_data.get("value", t.value)
            t.category = updated_data.get("category", t.category)
            t.date = updated_data.get("date", t.date)
            t.type = updated_data.get("type", t.type)
            return t.to_dict()
    return None
