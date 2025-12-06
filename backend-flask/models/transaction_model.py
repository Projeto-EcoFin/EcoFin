class Transaction:
    def __init__(self, id, description, value, category, date, type):
        self.id = id
        self.description = description
        self.value = value
        self.category = category
        self.date = date
        self.type = type  

    def to_dict(self):
        return {
            "id": self.id,
            "description": self.description,
            "value": self.value,
            "category": self.category,
            "date": self.date,
            "type": self.type
        }
