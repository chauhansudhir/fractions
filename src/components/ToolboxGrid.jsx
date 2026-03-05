import React from "react";
import "../styles/ToolboxGrid.css";

const ToolboxGrid = ({ fractions, handleDragStart }) => {
  return (
    <div className="toolbox-grid">
      {fractions.map((f, i) => (
        <div
          key={i}
          draggable
          onDragStart={(e) => handleDragStart(e, f)}
          className="block-clay"
          style={{ backgroundColor: f.color }}
        >
          {f.label}
        </div>
      ))}
    </div>
  );
};

export default ToolboxGrid;
