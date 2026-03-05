import React, { useState, useMemo } from "react";
import InstructionBox from "../InstructionBox";
import "../../styles/modes.css";

const BattleMode = ({ numerator = 1 }) => {
  const fractions = useMemo(
    () => [
      { numerator, denominator: 2, color: "#6366F1", label: `${numerator}/2` },
      { numerator, denominator: 3, color: "#10B981", label: `${numerator}/3` },
      { numerator, denominator: 4, color: "#EF4444", label: `${numerator}/4` },
      { numerator, denominator: 6, color: "#F59E0B", label: `${numerator}/6` },
      { numerator, denominator: 8, color: "#8B5CF6", label: `${numerator}/8` },
    ],
    [numerator]
  );

  const [l, setL] = useState(fractions[0]);
  const [r, setR] = useState(fractions[2]);
  const [msg, setMsg] = useState("");

  const check = (op) => {
    const lv = l.numerator / l.denominator;
    const rv = r.numerator / r.denominator;
    let ok = op === ">" ? lv > rv : op === "<" ? lv < rv : Math.abs(lv - rv) < 0.01;
    setMsg(ok ? "✨ Brilliant! You nailed it!" : "🔍 Take another look at the sizes.");
  };

  return (
    <div className="mode-container">
      <InstructionBox
        title="Fraction Battle"
        description="Compare the two blocks. Which one is larger?"
      />

      <div className="battle-arena">
        <div className="block-clay" style={{ backgroundColor: l.color, width: '140px', height: '90px', fontSize: '2rem' }}>
          {l.label}
        </div>
        <div className="vs-badge">VS</div>
        <div className="block-clay" style={{ backgroundColor: r.color, width: '140px', height: '90px', fontSize: '2rem' }}>
          {r.label}
        </div>
      </div>

      <div className="battle-buttons">
        {['>', '=', '<'].map(op => (
          <button key={op} onClick={() => check(op)} className="btn-modern-primary btn-large">
            {op}
          </button>
        ))}
      </div>

      {msg && (
        <div className="message-box">
          <h3 style={{ color: msg.includes("✨") ? '#10B981' : '#EF4444', fontSize: '1.5rem' }}>
            {msg}
          </h3>
          <button
            onClick={() => {
              setL(fractions[Math.floor(Math.random() * 5)]);
              setR(fractions[Math.floor(Math.random() * 5)]);
              setMsg("");
            }}
            className="btn-modern-primary"
          >
            Next Battle ➡️
          </button>
        </div>
      )}
    </div>
  );
};

export default BattleMode;
