import React, { useState } from "react";
import InstructionBox from "../InstructionBox";
import ToolboxGrid from "../ToolboxGrid";
import "../../styles/modes.css";

const FRACTIONS = [
  { numerator: 1, denominator: 3, color: "#6366F1", label: "1/3" },
  { numerator: 2, denominator: 3, color: "#10B981", label: "2/3" },
  { numerator: 1, denominator: 4, color: "#EF4444", label: "1/4" },
  { numerator: 2, denominator: 4, color: "#F59E0B", label: "2/4" },
  { numerator: 3, denominator: 4, color: "#8B5CF6", label: "3/4" },
  { numerator: 1, denominator: 2, color: "#EC4899", label: "1/2" },
];

const handleDragStart = (e, fraction) => e.dataTransfer.setData("fraction", JSON.stringify(fraction));

const FractionAddition = () => {
  const [pieces, setPieces] = useState([]);
  const [message, setMessage] = useState("");

  const total = pieces.reduce((sum, p) => sum + p.numerator / p.denominator, 0);
  const isComplete = Math.abs(total - 1) < 0.01;
  const isOverflow = total > 1.01;

  const handleDrop = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("fraction"));
    const newTotal = total + data.numerator / data.denominator;

    if (newTotal <= 1.01) {
      setPieces([...pieces, { ...data, id: Math.random() }]);
      setMessage("");
    } else {
      setMessage("⚠️ Too much! The pizza would overflow!");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  const removePiece = (id) => {
    setPieces(pieces.filter(p => p.id !== id));
    setMessage("");
  };

  const reset = () => {
    setPieces([]);
    setMessage("");
  };

  // Calculate positions for pieces (with dotted dividers)
  let currentPosition = 0;
  const renderedPieces = pieces.map((piece, idx) => {
    const width = (piece.numerator / piece.denominator) * 100;
    const left = currentPosition;
    currentPosition += width;

    return (
      <React.Fragment key={piece.id}>
        {idx > 0 && (
          <div
            style={{
              position: "absolute",
              left: `${left}%`,
              top: 0,
              bottom: 0,
              width: "2px",
              background: "repeating-linear-gradient(90deg, #9CA3AF 0px, #9CA3AF 2px, transparent 2px, transparent 6px)",
              zIndex: 5,
            }}
          />
        )}
        <div
          onClick={() => removePiece(piece.id)}
          style={{
            position: "absolute",
            left: `${left}%`,
            top: 0,
            width: `${width}%`,
            height: "100%",
            backgroundColor: piece.color,
            opacity: 0.85,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "700",
            fontSize: "1.1rem",
            cursor: "pointer",
            transition: "opacity 0.2s ease",
            border: "2px solid rgba(255,255,255,0.5)",
            boxSizing: "border-box",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.85")}
        >
          {piece.label}
        </div>
      </React.Fragment>
    );
  });

  return (
    <div className="mode-container">
      <InstructionBox
        title="Build a Whole Pizza"
        description="Drag fraction pieces to fill the pizza! When it's complete (1 whole), the pizza is done! 🍕"
      />

      <ToolboxGrid fractions={FRACTIONS} handleDragStart={handleDragStart} />

      {/* Pizza Container */}
      <div className="pizza-builder-container">
        {/* Empty Pizza Box Guide */}
        <div className="pizza-box-guide">
          <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: "30px",
                  border: "1px dashed #D1D5DB",
                  borderRadius: "4px",
                  backgroundColor: "#F9FAFB",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  color: "#9CA3AF",
                  fontWeight: "600",
                }}
              >
                {i}/4
              </div>
            ))}
          </div>
          <p style={{ fontSize: "0.85rem", color: "#9CA3AF", textAlign: "center", margin: 0 }}>
            Visual guide: How the pizza could be divided
          </p>
        </div>

        {/* Main Pizza Box */}
        <div
          className="pizza-box-main"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          {pieces.length === 0 ? (
            <div style={{ textAlign: "center", color: "#9CA3AF" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>🍕</div>
              <p style={{ margin: 0, fontWeight: "600" }}>Drop pizza pieces here!</p>
            </div>
          ) : (
            renderedPieces
          )}

          {/* Progress Indicator */}
          <div className="pizza-progress">
            <div style={{ fontSize: "0.85rem", fontWeight: "700", color: "#6B7280" }}>
              {Math.round(total * 100)}% Complete
            </div>
            <div style={{ width: "80px", height: "6px", backgroundColor: "#E5E7EB", borderRadius: "3px", overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  backgroundColor: isComplete ? "#10B981" : isOverflow ? "#EF4444" : "#6366F1",
                  width: `${Math.min(total * 100, 100)}%`,
                  transition: "width 0.2s ease",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fraction Display */}
      <div className="fraction-sum-display">
        <div style={{ fontSize: "1.5rem", fontWeight: "900", color: "#6366F1" }}>
          {pieces.map((p, i) => (
            <React.Fragment key={p.id}>
              {i > 0 && " + "}
              <span>{p.label}</span>
            </React.Fragment>
          ))}
          {pieces.length === 0 && "0/1"}
        </div>
        <div style={{ fontSize: "1.2rem", fontWeight: "700", color: "#9CA3AF", marginTop: "8px" }}>
          = {total.toFixed(2)} / 1
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className="message-box" style={{ marginBottom: "24px" }}>
          <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: "700" }}>{message}</p>
        </div>
      )}

      {/* Success Message */}
      {isComplete && (
        <div className="message-box" style={{ background: "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)", border: "2px solid #10B981", marginBottom: "24px" }}>
          <h3 style={{ color: "#10B981", fontSize: "1.5rem", margin: "0 0 8px 0" }}>
            🎉 Perfect! You made 1 whole pizza!
          </h3>
          <p style={{ color: "#6B7280", margin: 0 }}>
            {pieces.map(p => p.label).join(" + ")} = 1 whole
          </p>
        </div>
      )}

      {/* Controls */}
      <div className="button-group">
        <button onClick={reset} className="btn-modern-danger">
          🗑️ Clear Pizza
        </button>
      </div>

      {/* Info Box */}
      <div style={{ background: "#EFF6FF", border: "2px solid #0EA5E9", borderRadius: "12px", padding: "20px", marginTop: "24px", textAlign: "center" }}>
        <p style={{ fontSize: "0.95rem", color: "#0C4A6E", fontWeight: "600", margin: 0 }}>
          💡 Tip: You can click on a piece to remove it. Try to make exactly 1 whole!
        </p>
      </div>
    </div>
  );
};

export default FractionAddition;
