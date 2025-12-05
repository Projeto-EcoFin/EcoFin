import React from "react";
import "./LessonPreviewModal.css";

const LessonPreviewModal = ({ lesson, onClose, onStart }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2>{lesson.title}</h2>
        <p>{lesson.description}</p>
        <p><strong>Duração:</strong> {lesson.duration}</p>

        <div className="modal-actions">
          <button className="btn-close" onClick={onClose}>Voltar</button>
          <button className="btn-start" onClick={onStart}>
            {lesson.progress === 0 ? "Iniciar Lição" : "Continuar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonPreviewModal;
