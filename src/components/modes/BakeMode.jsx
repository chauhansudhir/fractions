import React, { useState } from "react";
import InstructionBox from "../InstructionBox";
import "../../styles/modes.css";

const BakeMode = () => {
  const [amount, setAmount] = useState(0);

  const add = (v) => {
    if (amount + v <= 1.01) setAmount(amount + v);
  };

  return (
    <div className="mode-container">
      <InstructionBox
        title="Baker's Challenge"
        description="The recipe needs exactly 3/4 cup of flour to make cookies!"
      />

      <div className="bake-content">
        <div className="bowl-modern">
          <div className="bowl-liquid" style={{ height: `${amount * 100}%` }} />
        </div>

        <div className="button-group">
          <button onClick={() => add(0.25)} className="btn-modern-primary" style={{ background: '#f59e0b', boxShadow: '0 4px 0 #b45309' }}>
            Add 1/4 Cup
          </button>
          <button onClick={() => add(0.5)} className="btn-modern-primary" style={{ background: '#d97706', boxShadow: '0 4px 0 #92400e' }}>
            Add 1/2 Cup
          </button>
        </div>

        {Math.abs(amount - 0.75) < 0.01 && (
          <div className="message-box">
            <h2 style={{ color: '#10B981', marginTop: '24px' }}>🧁 Perfect! Time to bake! 🧁</h2>
          </div>
        )}

        <button onClick={() => setAmount(0)} className="btn-modern-danger">
          Empty Bowl
        </button>
      </div>
    </div>
  );
};

export default BakeMode;
