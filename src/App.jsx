import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TransactionsPages from './view/TransactionsPages';
import RegisterPage from './view/RegisterPage'; 
import LoginPage from './view/LoginPage';
import LessonsPage from './view/LessonsPage';
import VipPage from './view/VipCheckoutPage';
import DashboardPage from './view/DashboardPage';
import ProfilePage from './view/ProfilePage';
import BudgetPage from './view/BudgetPage';
import HomePage from './view/HomePage';
import AulaPage from "./view/AulaPage.jsx";


export default function App() {
  return (
    <Router>

      <Routes>
        <Route path="/transacoes" element={<TransactionsPages />} />
        <Route path="/cadastro" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/licoes" element={<LessonsPage />} />
        <Route path="/vip" element={<VipPage />} />
        <Route path="/dash" element={<DashboardPage />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/metas" element={<BudgetPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/aula/:id" element={<AulaPage />} />




        <Route path="*" element={<Navigate to="/login" />} />
        
      </Routes>
    </Router>
  );
}
