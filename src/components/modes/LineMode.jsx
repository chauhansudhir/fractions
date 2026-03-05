import React, { useState } from "react";
import InstructionBox from "../InstructionBox";
import "../../styles/modes.css";

const LineMode = () => {
  const [target, setTarget] = useState(0.5);
  const [pos, setPos] = useState(0.1);
  const [msg, setMsg] = useState("");

  return (
    <div className="mode-container">
      <InstructionBox
        title="Pin the Fraction"
        description={`Drag the pin to exactly ${target === 0.5 ? "1/2" : target === 0.25 ? "1/4" : "3/4"} on the line.`}
      />

      <div className="line-container">
        <div className="number-line">
          {/* Start (0) marker */}
          <div style={{ position: 'absolute', left: '0%', top: '0' }} className="line-marker">
            <div className="marker-tick" />
            <span className="marker-label">0</span>
          </div>

          {/* End (1) marker */}
          <div style={{ position: 'absolute', left: '100%', top: '0', transform: 'translateX(-100%)' }} className="line-marker">
            <div className="marker-tick" />
            <span className="marker-label">1</span>
          </div>

          {/* Middle tick marks (no labels) */}
          {Array.from({ length: 9 }).map((_, i) => (
            <div 
              key={i} 
              style={{ position: 'absolute', left: `${(i + 1) * 10}%`, top: '0', transform: 'translateX(-50%)' }} 
              className="line-marker"
            >
              <div className="marker-tick-small" />
            </div>
          ))}

          {/* Draggable pin */}
          <div
            style={{
              position: 'absolute',
              left: `${pos * 100}%`,
              fontSize: '3rem',
              top: '-55px',
              cursor: 'grab',
              transition: 'none',
              filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
              transform: 'translateX(-50%)'
            }}
            onMouseDown={(e) => {
              const lineEl = e.currentTarget.parentElement;
              const move = (m) => {
                const rect = lineEl.getBoundingClientRect();
                setPos(Math.max(0, Math.min(1, (m.clientX - rect.left) / rect.width)));
              };
              const up = () => {
                window.removeEventListener('mousemove', move);
                window.removeEventListener('mouseup', up);
              };
              window.addEventListener('mousemove', move);
              window.addEventListener('mouseup', up);
            }}
          >
            📍
          </div>
        </div>
      </div>

      <div className="button-group">
        <button
          onClick={() =>
            setMsg(Math.abs(pos - target) < 0.05 ? "🎯 Bullseye! You're a pro!" : "🤏 So close! Try again.")
          }
          className="btn-modern-primary"
        >
          Check Position
        </button>
        <button
          onClick={() => {
            setTarget([0.25, 0.5, 0.75][Math.floor(Math.random() * 3)]);
            setMsg("");
          }}
          className="btn-modern-primary"
          style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}
        >
          New Goal
        </button>
      </div>

      {msg && <div className="message-box"><p style={{ fontWeight: '800', fontSize: '1.2rem' }}>{msg}</p></div>}
    </div>
  );
};

export default LineMode;
