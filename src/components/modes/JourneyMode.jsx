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

const JourneyMode = () => {
  const [journey, setJourney] = useState([]);
  const [vehicle, setVehicle] = useState("🚀");
  const total = journey.reduce((s, x) => s + x.numerator / x.denominator, 0);

  const handleDrop = (e) => {
    e.preventDefault();
    const f = JSON.parse(e.dataTransfer.getData("fraction"));
    if (total + f.numerator / f.denominator <= 1.01) setJourney([...journey, { ...f, id: Math.random() }]);
  };

  return (
    <div className="mode-container">
      <InstructionBox
        title="Fraction Journey"
        description="Choose your ride and add distances to reach the finish line!"
      />

      <div className="vehicle-selector">
        {['🚗', '🚲', '🏃', '🚀', '🛸'].map(v => (
          <span
            key={v}
            onClick={() => setVehicle(v)}
            className={`vehicle-choice ${vehicle === v ? 'active' : ''}`}
          >
            {v}
          </span>
        ))}
      </div>

      <ToolboxGrid fractions={FRACTIONS} handleDragStart={handleDragStart} />

      <div className="journey-road" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
        <div className="road-markings" />
        <div className="road-finish" />
        {journey.map(s => (
          <div
            key={s.id}
            style={{
              height: '100%',
              width: `${(s.numerator / s.denominator) * 100}%`,
              backgroundColor: s.color,
              opacity: 0.7
            }}
          />
        ))}
        <div className="vehicle" style={{ left: `${Math.min(total * 100, 100)}%` }}>
          {vehicle}
        </div>
      </div>

      <div className="button-group">
        <button onClick={() => setJourney([])} className="btn-modern-danger">
          Restart Trip
        </button>
      </div>
    </div>
  );
};

export default JourneyMode;
