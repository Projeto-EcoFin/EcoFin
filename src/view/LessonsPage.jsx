  import React from 'react';
  import './LessonsPage.css';
  import Header from '../components/Header.jsx'; 
  import { Link } from 'react-router-dom'; 

  const lessons = [
    {
      title: 'Fundamentos do Planejamento Financeiro Pessoal',
      description: 'Aprenda a criar e manter um orçamento eficaz.',
      duration: '50min',
      progress: 100,
      status: 'Concluído',
    },
    {
      title: 'Investimentos para iniciantes',
      description: 'Conheça os conceitos básicos de investimentos.',
      duration: '45min',
      progress: 92,
      status: 'Continuar Lição',
    },
    {
      title: 'Estratégias de Economia',
      description: 'Descubra técnicas para economizar no dia a dia.',
      duration: '65min',
      progress: 45,
      status: 'Continuar Lição',
    },
    {
      title: 'Planejamento de Aposentadoria',
      description: 'Prepare-se para o futuro com um plano sólido.',
      duration: '45min',
      progress: 0,
      status: 'Iniciar Lição',
    },
    {
      title: 'Administração de Débitos',
      description: 'Aprenda a lidar com dívidas e melhorar seu crédito.',
      duration: '55min',
      progress: 0,
      locked: true,
      status: 'Iniciar Lição',
    },
    {
      title: 'Finanças para Empreendedores',
      description: 'Gerencie as finanças do seu negócio de forma eficiente.',
      duration: '60min',
      progress: 0,
      locked: true,
      status: 'Iniciar Lição',
    },
  ];

  const CardLição = ({ title, description, duration, progress, locked, status }) => {
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
          <span className="lesson-duration">{duration}</span>
          {progress < 100 ? (
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
              <span className="progress-text">{progress}% concluído</span>
            </div>
          ) : (
            <span className="progress-text">100% concluído</span>
          )}
        </div>
        <button className="lesson-button">{status}</button>
      </div>
    );
  };

  const SecaoVIP = () => {
    return (
        <div className="vip-section">
            <h2 className="vip-title">Conteúdo Exclusivo VIP</h2>
            <p>Libere todas as lições e se transforme num especialista em finanças pessoais.</p>
            <ul className="vip-features">
                <li>Acesso a todas as lições de finanças educacionais.</li>
                <li>Informações atualizadas mensalmente.</li>
                <li>Assistência imediata de especialistas em finanças</li>
            </ul>
            <Link to="/VipCheckoutPage" className="vip-button-link">
                Tornar-se VIP
            </Link>
        </div>
    );
};

const LessonsPage = () => {
    return (
      <div className="lessons-container">
        <Header />
        <h1 className="main-title">Lições de Educação Financeira</h1>
        
        <SecaoVIP />

        <div className="lessons-grid">
          {lessons.map((lesson, index) => (
            <CardLição key={index} {...lesson} />
          ))}
        </div>
      </div>
    );
};

  export default LessonsPage;