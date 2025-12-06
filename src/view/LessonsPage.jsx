
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import Header from '../components/Header.jsx'; 
import CardLicao from '../components/CardLicao.jsx'; 
import { mockLessonsData } from '../data/LessonsData.js'; 
import './LessonsPage.css';

const SecaoVIP = () => (
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

const LessonsPage = () => {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
                        {lessons.map(lesson => (
                            <CardLicao key={lesson.id} {...lesson} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LessonsPage;