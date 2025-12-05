// src/components/CardLicao.jsx (CORRIGIDO)

// ⚠️ Mude a declaração do componente para 'export default'
import React from 'react';
import { useNavigate } from 'react-router-dom'; // ⚠️ Adicionando useNavigate para o handleClick

const CardLicao = ({ id, title, description, duration, progress, locked, status }) => {
    const navigate = useNavigate();
    
    // A função 'onClick' (que estava no CardLicao anterior) foi substituída por handleClick
    const handleClick = () => {
        if (!locked) navigate(`/aula/${id}`);
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

export default CardLicao; // ⚠️ Exportação Padrão resolve o erro no CardLicao