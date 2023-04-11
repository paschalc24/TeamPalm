import React, { ReactNode } from "react";

interface Props {
  data: ReactNode;
  heading: string;
}

const Card = ({ data, heading }: Props) => {
  return (
    <div className="card">
      <h5 className="card-title">{heading}</h5>
      <p className="card-body">Example Text</p>
    </div>
  );
};

export default Card;
