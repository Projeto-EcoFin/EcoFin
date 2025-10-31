# services/budget_service.py

from models.budget_model import Budget
from database import db
from datetime import datetime
from services.TransactionService import TransactionService 

class BudgetService:
    @staticmethod
    def create_budget(user_id, category, limit_amount, month, year):
        if Budget.query.filter_by(user_id=user_id, category=category, month=month, year=year).first():
            return None, "Orçamento já existe para esta categoria e período."
        
        new_budget = Budget(
            user_id=user_id,
            category=category,
            limit_amount=limit_amount,
            month=month,
            year=year
        )
        db.session.add(new_budget)
        db.session.commit()
        return new_budget.to_dict(), None

    @staticmethod
    def get_budgets_with_spending(user_id, month, year):
        budgets = Budget.query.filter_by(user_id=user_id, month=month, year=year).all()
        budgets_with_spending = []

        categories = [b.category for b in budgets]
        
        spending_data = TransactionService.get_total_spent_by_categories_and_user_for_period(
            user_id, categories, month, year
        )
        
        for budget in budgets:
            budget_dict = budget.to_dict()
            category = budget.category
            
            spent = spending_data.get(category, 0.00) 

            budget_dict['spent_amount'] = spent
            budget_dict['progress_percent'] = min((spent / budget.limit_amount) * 100, 100)
            budgets_with_spending.append(budget_dict)
            
        return budgets_with_spending

    @staticmethod
    def update_budget(budget_id, user_id, category=None, limit_amount=None):
        budget = Budget.query.filter_by(id=budget_id, user_id=user_id).first()
        if not budget:
            return None

        if category is not None:
            budget.category = category
        if limit_amount is not None:
            budget.limit_amount = limit_amount
            
        db.session.commit()
        return budget.to_dict()

    @staticmethod
    def delete_budget(budget_id, user_id):
        budget = Budget.query.filter_by(id=budget_id, user_id=user_id).first()
        if not budget:
            return False

        db.session.delete(budget)
        db.session.commit()
        return True