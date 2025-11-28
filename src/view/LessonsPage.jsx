import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx'; 
import './LessonsPage.css';

const mockLessonsData = [
  {
    id: 1, // ID adicionado
    title: 'Fundamentos do Planejamento',
    description: 'Aprenda a criar e manter um orçamento eficaz.',
    duration: '50min',
    progress: 100,
    locked: false,
    status: 'Concluído',
  },
  {
    id: 2,
    title: 'Investimentos para iniciantes',
    description: 'Conheça os conceitos básicos de investimentos.',
    duration: '45min',
    progress: 92,
    locked: false,
    status: 'Continuar Lição',
  },
  {
    id: 3,
    title: 'Estratégias de Economia',
    description: 'Descubra técnicas para economizar no dia a dia.',
    duration: '65min',
    progress: 45,
    locked: false,
    status: 'Continuar Lição',
  },
  {
    id: 4,
    title: 'Planejamento de Aposentadoria',
    description: 'Prepare-se para o futuro com um plano sólido.',
    duration: '45min',
    progress: 0,
    locked: false,
    status: 'Iniciar Lição',
  },
  {
    id: 5,
    title: 'Administração de Débitos',
    description: 'Aprenda a lidar com dívidas e melhorar seu crédito.',
    duration: '55min',
    progress: 0,
    locked: true, // Lição bloqueada
    status: 'Bloqueado', // Texto alterado para fazer sentido
  },
  {
    id: 6,
    title: 'Finanças para Empreendedores',
    description: 'Gerencie as finanças do seu negócio de forma eficiente.',
    duration: '60min',
    progress: 0,
    locked: true,
    status: 'Bloqueado',
  },
];

const CardLição = ({ id, title, description, duration, progress, locked, status }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!locked) {
      navigate(`/aula/${id}`);
    }
  };

  return (
    <div className={`lesson-card ${locked ? 'locked' : ''}`}>
      <div className="card-header">
        <h3 className="lesson-title">{title}</h3>
        {locked && (
          <svg className="lock-icon" viewBox="0 0 24 24">
            <path d="M18 10h-1V7c0-2.76-2.24-5-5-5S7 4.24 7 7v3H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V12c0-1.1-.9-2-2-2zM9 7c0-1.66 1.34-3 3-3s3 1.34 3 3v3H9V7zm9 15H6V12h12v10z"></path>
          </svg>
        )}
      </div>
      
      <p className="lesson-description">{description}</p>
      
      <div className="card-info">
        <span className="lesson-duration">⏱ {duration}</span>
        
        {!locked && (
            progress < 100 ? (
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                <span className="progress-text">{progress}%</span>
            </div>
            ) : (
            <span className="progress-text complete">✅ Concluído</span>
            )
        )}
      </div>

      <button 
        className="lesson-button" 
        onClick={handleClick}
        disabled={locked} 
      >
        {status}
      </button>
    </div>
  );
};

const SecaoVIP = () => {
  return (
    <div className="vip-section">
      <h2 className="vip-title">Conteúdo Exclusivo VIP</h2>
      <p>Libere todas as lições e se transforme num especialista em finanças pessoais.</p>
      <ul className="vip-features">
        <li>Acesso a todas as lições de finanças.</li>
        <li>Informações atualizadas mensalmente.</li>
        <li>Assistência imediata de especialistas.</li>
      </ul>
      <Link to="/vip" className="vip-button-link">
        Tornar-se VIP
      </Link>
    </div>
  );
};

const LessonsPage = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simula o carregamento de dados (preparando para conectar com Flask depois)
  useEffect(() => {
    // Aqui futuramente entra o fetch('http://localhost:5000/api/licoes')
    setTimeout(() => {
      setLessons(mockLessonsData);
      setLoading(false);
    }, 500); 
  }, []);

  return (
    <div className="lessons-container">
      <Header />
      
      <div className="container"> 
        <h1 className="main-title">Trilha de Aprendizado Ecofin</h1>
        
        <SecaoVIP />

        {loading ? (
            <div className="loading-state">Carregando suas lições...</div>
        ) : (
            <div className="lessons-grid">
            {lessons.map((lesson) => (
                <CardLição key={lesson.id} {...lesson} />
            ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default LessonsPage;