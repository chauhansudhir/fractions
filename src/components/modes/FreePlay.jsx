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

const FreePlay = () => {
  const [rows, setRows] = useState([[], [], []]);

  const handleDrop = (e, rowIndex) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("fraction"));
    const total = rows[rowIndex].reduce((s, f) => s + f.numerator / f.denominator, 0);
    if (total + (data.numerator / data.denominator) <= 1.01) {
      const nr = [...rows];
      nr[rowIndex].push({ ...data, id: Math.random() });
      setRows(nr);
    }
  };

  return (
    <div className="mode-container">
      <InstructionBox
        title="Free Play Builder"
        description="Drag the clay blocks into the rows. Can you make them all exactly the same length?"
      />
      <ToolboxGrid fractions={FRACTIONS} handleDragStart={handleDragStart} />

      <div className="rows-container">
        {rows.map((row, i) => (
          <div
            key={i}
            className="drop-area-modern"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, i)}
          >
            {row.length === 0 && (
              <span className="drop-zone-placeholder">Row {i + 1} - Drop clay here</span>
            )}
            {row.map((b, bi) => (
              <div
                key={b.id}
                onClick={() => {
                  const nr = [...rows];
                  nr[i].splice(bi, 1);
                  setRows(nr);
                }}
                className="placed-clay"
                style={{ width: `${(b.numerator / b.denominator) * 100}%`, backgroundColor: b.color }}
              >
                {b.label}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="button-group">
        <button onClick={() => setRows([[], [], []])} className="btn-modern-danger">
          🗑️ Clear Board
        </button>
      </div>
    </div>
  );
};

export default FreePlay;
