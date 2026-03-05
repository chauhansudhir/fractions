import React, { useState } from "react";
import InstructionBox from "../InstructionBox";
import ToolboxGrid from "../ToolboxGrid";
import "../../styles/modes.css";

const FRACTIONS = [
  { numerator: 1, denominator: 2, color: "#6366F1", label: "1/2" },
  { numerator: 1, denominator: 3, color: "#10B981", label: "1/3" },
  { numerator: 1, denominator: 4, color: "#EF4444", label: "1/4" },
  { numerator: 1, denominator: 6, color: "#F59E0B", label: "1/6" },
  { numerator: 1, denominator: 8, color: "#8B5CF6", label: "1/8" },
];

const handleDragStart = (e, fraction) => e.dataTransfer.setData("fraction", JSON.stringify(fraction));

const PizzaMode = () => {
  const [slices, setSlices] = useState([]);
  let currentAngle = -90;

  const handleDrop = (e) => {
    e.preventDefault();
    const f = JSON.parse(e.dataTransfer.getData("fraction"));
    if (slices.reduce((s, x) => s + x.numerator / x.denominator, 0) + f.numerator / f.denominator <= 1.01) {
      setSlices([...slices, { ...f, id: Math.random() }]);
    }
  };

  return (
    <div className="mode-container">
      <InstructionBox
        title="Pizza Party"
        description="Drag fraction slices onto the golden tray to build your perfect pizza!"
      />
      <ToolboxGrid fractions={FRACTIONS} handleDragStart={handleDragStart} />

      <div className="pizza-container">
        <svg width="320" height="320" viewBox="0 0 100 100" className="pizza-svg" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
          <circle cx="50" cy="50" r="48" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
          <circle cx="50" cy="50" r="42" fill="#FEF3C7" />
          {slices.map((s) => {
            const angle = (s.numerator / s.denominator) * 360;
            const x1 = 50 + 40 * Math.cos((currentAngle * Math.PI) / 180);
            const y1 = 50 + 40 * Math.sin((currentAngle * Math.PI) / 180);
            currentAngle += angle;
            const x2 = 50 + 40 * Math.cos((currentAngle * Math.PI) / 180);
            const y2 = 50 + 40 * Math.sin((currentAngle * Math.PI) / 180);
            return (
              <path
                key={s.id}
                d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${angle > 180 ? 1 : 0} 1 ${x2} ${y2} Z`}
                fill={s.color}
                stroke="white"
                strokeWidth="0.5"
                className="pizza-slice"
                onClick={() => setSlices(slices.filter(x => x.id !== s.id))}
              />
            );
          })}
        </svg>
      </div>

      <div className="button-group">
        <button onClick={() => setSlices([])} className="btn-modern-danger">
          Reset Pizza
        </button>
      </div>
    </div>
  );
};

export default PizzaMode;
