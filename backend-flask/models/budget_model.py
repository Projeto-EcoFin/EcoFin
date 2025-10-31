from database import db 

class Budget(db.Model):
    __tablename__ = 'budgets'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    category = db.Column(db.String(80), nullable=False)
    limit_amount = db.Column(db.Float, nullable=False)
    
    month = db.Column(db.Integer, nullable=False) 
    year = db.Column(db.Integer, nullable=False) 

    __table_args__ = (
        db.UniqueConstraint('user_id', 'category', 'month', 'year', name='uq_user_category_month_year'),
    )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'category': self.category,
            'limit_amount': self.limit_amount,
            'month': self.month,
            'year': self.year,
        }
