import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import "../view/AulaPage.css";
import { mockLessonsData } from "../data/LessonsData.js";

const AulaPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const lessonId = parseInt(id, 10);
    // Verificação de existência para evitar crash, embora o Router deva proteger
    const lesson = mockLessonsData.find(l => l.id === lessonId); 

    const [progress, setProgress] = useState(lesson?.progress || 0);

    const concluirAula = () => {
        // ... (resto da função mantido)
        lesson.progress = 100;
        setProgress(100);
        alert("Aula concluída com sucesso!");

        const prox = mockLessonsData.find(l => l.id === lessonId + 1);
        if (prox && !prox.locked) {
            navigate(`/aula/${prox.id}`);
        } else {
            navigate("/licoes");
        }
    };

    const irAnterior = () => {
        const ant = mockLessonsData.find(l => l.id === lessonId - 1);
        if (ant && !ant.locked) navigate(`/aula/${ant.id}`);
    };

    if (!lesson) {
        return <p>Aula não encontrada!</p>;
    }

    // ... (restante do JSX mantido inalterado)
    return (
        <div className="aula-wrapper">
            <Header />

            <div className="aula-container">

                {/* ─ Sidebar ─ */}
                <aside className="sidebar">
                    <h3>Conteúdo do Curso</h3>
                    <ul>
                        {mockLessonsData.map(item => (
                            <li
                                key={item.id}
                                className={`sidebar-item ${
                                    item.id === lessonId ? "active" : ""
                                } ${item.locked ? "locked" : ""}`}
                                onClick={() => !item.locked && navigate(`/aula/${item.id}`)}
                            >
                                {item.title}
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* ─ Conteúdo da Aula ─ */}
                <main className="aula-content">
                    <h1>{lesson.title}</h1>

                    {lesson.video && (
                        <iframe
                            className="aula-video"
                            src={lesson.video}
                            title="Vídeo aula"
                            allowFullScreen
                        ></iframe>
                    )}

                    <p className="aula-text">{lesson.content}</p>

                    <div className="aula-actions">
                        <button onClick={irAnterior} disabled={lessonId === 1}>
                            Aula Anterior
                        </button>

                        {progress < 100 ? (
                            <button className="finish-btn" onClick={concluirAula}>
                                Marcar como concluída
                            </button>
                        ) : (
                            <button
                                className="finish-btn"
                                onClick={() => navigate("/licoes")}
                            >
                                Voltar para as Licoes
                            </button>
                        )}

                        <button
                            onClick={() => {
                                const prox = mockLessonsData.find(
                                    l => l.id === lessonId + 1 && !l.locked
                                );
                                if (prox) navigate(`/aula/${prox.id}`);
                            }}
                            disabled={!mockLessonsData.find(
                                l => l.id === lessonId + 1 && !l.locked
                            )}
                        >
                            Próxima Aula
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AulaPage;