import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TransactionsPages from './view/TransactionsPages'; // Caminho corrigido

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/transacoes" element={<TransactionsPages />} />
        <Route path="*" element={<TransactionsPages />} />
      </Routes>
    </Router>
  );
}