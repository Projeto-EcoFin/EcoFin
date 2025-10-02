import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TransactionsPages from './view/TransactionsPages';
import RegisterPage from './view/RegisterPage'; 
import LoginPage from './view/LoginPage';
import LessonsPage from './view/LessonsPage';
import VipPage from './view/VipCheckoutPage';


export default function App() {
  return (
    <Router>

      <Routes>
        <Route path="/transacoes" element={<TransactionsPages />} />
        <Route path="/cadastro" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/licoes" element={<LessonsPage />} />
        <Route path="/vip" element={<VipPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
