import React, { ReactNode } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface CardProps {
  heading?: string;
  children?: ReactNode;
  width?: string;
}

const Card = ({ heading, width, children }: CardProps) => {
  return (
    <div
      className="card"
      style={{
        borderRadius: "15px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 10px 20px rgba(153, 37, 190, 0.1)",
        width: width || "auto", // Apply the dynamic width or fallback to "auto"
      }}
    >
      <div className="card-body">
        <h5 className="card-title">{heading}</h5>
        {children}
      </div>
    </div>
  );
};

export default Card;
