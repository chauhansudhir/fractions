import React, { useState, useMemo } from "react";
import InstructionBox from "../InstructionBox";
import ToolboxGrid from "../ToolboxGrid";
import "../../styles/modes.css";

const MatchMode = ({ numerator = 1 }) => {
  const targetValue = 0.5;
  const fractions = useMemo(
    () => [
      { numerator, denominator: 3, color: "#10B981", label: `${numerator}/3` },
      { numerator, denominator: 4, color: "#EF4444", label: `${numerator}/4` },
      { numerator, denominator: 6, color: "#F59E0B", label: `${numerator}/6` },
      { numerator, denominator: 8, color: "#8B5CF6", label: `${numerator}/8` },
    ],
    [numerator]
  );

  const [blocks, setBlocks] = useState([]);
  const total = blocks.reduce((s, x) => s + x.numerator / x.denominator, 0);

  const handleDragStart = (e, fraction) => e.dataTransfer.setData("fraction", JSON.stringify(fraction));

  const handleDrop = (e) => {
    e.preventDefault();
    const f = JSON.parse(e.dataTransfer.getData("fraction"));
    if (total + f.numerator / f.denominator <= targetValue + 0.01)
      setBlocks([...blocks, { ...f, id: Math.random() }]);
  };

  return (
    <div className="mode-container">
      <InstructionBox
        title="The Match Maker"
        description={`Can you find different ways to make exactly 1/2?`}
      />
      <ToolboxGrid fractions={fractions} handleDragStart={handleDragStart} />

      <div className="drop-area-modern" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
        {blocks.length === 0 && <span className="drop-zone-placeholder">Target: 1/2</span>}
        {blocks.map(b => (
          <div
            key={b.id}
            className="placed-clay"
            style={{ width: `${(b.numerator / b.denominator) * 200}%`, backgroundColor: b.color }}
            onClick={() => setBlocks(blocks.filter(x => x.id !== b.id))}
          >
            {b.label}
          </div>
        ))}
      </div>

      {Math.abs(total - targetValue) < 0.01 && (
        <div className="message-box">
          <h3 style={{ color: '#10B981', fontSize: '1.5rem' }}>🎉 Amazing! You matched it!</h3>
        </div>
      )}

      <div className="button-group">
        <button onClick={() => setBlocks([])} className="btn-modern-danger">
          Reset Puzzle
        </button>
      </div>
    </div>
  );
};

export default MatchMode;
