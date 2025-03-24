import React from "react";
import demoImg from "../assets/images/demo.jpg";
import "./NewsModal.css";

const NewsModal = ({ show, article, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button">
          <i className="fa-solid fa-xmark" onClick={onClose}></i>
        </span>
        {article && (
          <>
            <img
              className="modal-image"
              src={article.urlToImage}
              alt={article.title}
            />
            <h2 className="modal-title">{article.title}</h2>
            <p className="modal-source">Source: {article.source.name}</p>
            <p className="modal-date">
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="modal-content-text">{article.description}</p>
            <a
              href={article.url}
              className="read-more-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read More
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default NewsModal;
