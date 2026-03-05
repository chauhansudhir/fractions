import React from "react";
import "../styles/InstructionBox.css";

const InstructionBox = ({ title, description }) => {
  return (
    <div className="instruction-box">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default InstructionBox;
