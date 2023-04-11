import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface CardProps {
  heading: string;
}

const Card = ({ heading }: CardProps) => {
  return (
    <div className="card shadow">
      <div className="card-body">
        <h5 className="card-title">{heading}</h5>
        <h6 className="card-subtitle mb-2 text-muted">Subtitle</h6>
        <p className="card-text">Text</p>
      </div>
    </div>
  );
};

export default Card;
