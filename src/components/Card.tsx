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
        <h6 className="card-subtitle mb-2 text-muted"></h6>
        <p className="card-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
          viverra nibh cras pulvinar mattis nunc sed blandit libero. Volutpat
          blandit aliquam etiam erat velit scelerisque in dictum. Pulvinar etiam
          non quam lacus suspendisse faucibus interdum. Ullamcorper a lacus
          vestibulum sed arcu non odio euismod. Sed cras ornare arcu dui vivamus
          arcu felis bibendum. Lectus magna fringilla urna porttitor rhoncus
          dolor purus non. Laoreet id donec ultrices tincidunt arcu non sodales.
          Id consectetur purus ut faucibus pulvinar elementum integer. Iaculis
          at erat pellentesque adipiscing commodo elit at imperdiet dui. Augue
          mauris augue neque gravida in fermentum. Est ante in nibh mauris
          cursus mattis molestie a. Ut lectus arcu bibendum at. Eu feugiat
          pretium nibh ipsum consequat nisl vel.
        </p>
      </div>
    </div>
  );
};

export default Card;
