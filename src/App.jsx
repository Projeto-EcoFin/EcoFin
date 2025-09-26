import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TransactionsPages from './view/TransactionsPages';
import RegisterPage from './view/RegisterPage'; 
import LoginPage from './view/LoginPage';
import Dashboard from './view/Dashboard';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rota para a tela de transações */}
        <Route path="/transacoes" element={<TransactionsPages />} />

        {/* Rota para a tela de cadastro */}
        <Route path="/cadastro" element={<RegisterPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/dashboard" element={<Dashboard />} />

        {/* Redireciona a rota inicial para a tela de cadastro */}
        <Route path="*" element={<Navigate to="/cadastro" />} />
      </Routes>
    </Router>
  );
}