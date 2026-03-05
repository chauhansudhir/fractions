import React, { useState, useMemo } from "react";
import InstructionBox from "../InstructionBox";
import "../../styles/modes.css";

const VisualEquivalence = ({ numerator = 1 }) => {
  const [currentLevel, setCurrentLevel] = useState(0);

  const equivalences = useMemo(() => {
    const n = numerator;
    return [
      {
        title: "Halves to Fourths",
        left: { pieces: 2, filled: n, label: `${n}/2`, color: "#6366F1" },
        right: { pieces: 4, filled: n * 2, label: `${n * 2}/4`, color: "#6366F1" },
        message: `${n}/2 = ${n * 2}/4 ✨`,
        explanation: `We cut each piece in HALF. Now we have ${n * 2} pieces instead of ${n}, but the colored amount is the SAME! More pieces, same amount. 🍕`,
        details: `If you have ${n}/2 of a pizza and cut it in half, you get ${n * 2} pieces. But you still have the same amount of pizza to eat!`
      },
      {
        title: "Halves to Eighths",
        left: { pieces: 2, filled: n, label: `${n}/2`, color: "#10B981" },
        right: { pieces: 8, filled: n * 4, label: `${n * 4}/8`, color: "#10B981" },
        message: `${n}/2 = ${n * 4}/8 ✨`,
        explanation: `We cut each piece into 4 tiny pieces. ${n} piece becomes ${n * 4} pieces, but the colored amount stays the SAME! 🔪`,
        details: `${n}/2 of the pizza cut into tiny pieces = ${n * 4}/8 of the pizza. Same delicious pizza, just more pieces!`
      },
      {
        title: "Thirds to Sixths",
        left: { pieces: 3, filled: n, label: `${n}/3`, color: "#EF4444" },
        right: { pieces: 6, filled: n * 2, label: `${n * 2}/6`, color: "#EF4444" },
        message: `${n}/3 = ${n * 2}/6 ✨`,
        explanation: `We cut each piece in HALF. Now we have ${n * 2} pieces instead of ${n}, but the colored amount is the SAME! 🎂`,
        details: `${n}/3 of the cake cut in half = ${n * 2}/6 of the cake. Same amount of cake, just more slices!`
      },
      {
        title: `${n}/4 to ${n * 2}/8`,
        left: { pieces: 4, filled: n, label: `${n}/4`, color: "#8B5CF6" },
        right: { pieces: 8, filled: n * 2, label: `${n * 2}/8`, color: "#8B5CF6" },
        message: `${n}/4 = ${n * 2}/8 ✨`,
        explanation: `We cut each piece in HALF. Now we have ${n * 2} pieces instead of ${n}, but the colored amount is the SAME! ✂️`,
        details: `${n}/4 of an apple cut in half = ${n * 2}/8 of the apple. Same piece of apple, just cut into smaller bites!`
      },
      {
        title: `${n}/2 to ${n * 3}/6`,
        left: { pieces: 2, filled: n, label: `${n}/2`, color: "#EC4899" },
        right: { pieces: 6, filled: n * 3, label: `${n * 3}/6`, color: "#EC4899" },
        message: `${n}/2 = ${n * 3}/6 ✨`,
        explanation: `We cut each piece into 3 parts. ${n} piece becomes ${n * 3} pieces, but the colored amount stays the SAME! 🍪`,
        details: `${n}/2 of a cookie cut into thirds = ${n * 3}/6 of the cookie. Same cookie, just more crumbles!`
      },
      {
        title: `${n}/3 to ${n * 3}/9`,
        left: { pieces: 3, filled: n, label: `${n}/3`, color: "#06B6D4" },
        right: { pieces: 9, filled: n * 3, label: `${n * 3}/9`, color: "#06B6D4" },
        message: `${n}/3 = ${n * 3}/9 ✨`,
        explanation: `We cut each piece into 3 parts. ${n} piece becomes ${n * 3} pieces, but the colored amount stays the SAME! 🍰`,
        details: `${n}/3 of a donut cut into thirds = ${n * 3}/9 of the donut. Same delicious donut, just more bites!`
      },
      {
        title: `${n}/4 to ${n * 3}/12`,
        left: { pieces: 4, filled: n, label: `${n}/4`, color: "#F97316" },
        right: { pieces: 12, filled: n * 3, label: `${n * 3}/12`, color: "#F97316" },
        message: `${n}/4 = ${n * 3}/12 ✨`,
        explanation: `We cut each piece into 3 parts. ${n} piece becomes ${n * 3} pieces, but the colored amount is the SAME! 🍫`,
        details: `${n}/4 of a chocolate bar cut into thirds = ${n * 3}/12 of the chocolate bar. Same chocolate, just tinier pieces!`
      },
      {
        title: `${n}/6 to ${n * 2}/12`,
        left: { pieces: 6, filled: n, label: `${n}/6`, color: "#84CC16" },
        right: { pieces: 12, filled: n * 2, label: `${n * 2}/12`, color: "#84CC16" },
        message: `${n}/6 = ${n * 2}/12 ✨`,
        explanation: `We cut each piece in HALF. ${n} piece becomes ${n * 2} pieces, but the colored amount is the SAME! 🧀`,
        details: `${n}/6 of cheese cut in half = ${n * 2}/12 of cheese. Same taste, just tinier bites!`
      },
      {
        title: `${n}/8 to ${n * 3}/24`,
        left: { pieces: 8, filled: n, label: `${n}/8`, color: "#6366F1" },
        right: { pieces: 24, filled: n * 3, label: `${n * 3}/24`, color: "#6366F1" },
        message: `${n}/8 = ${n * 3}/24 ✨`,
        explanation: `We cut each piece into 3 parts. ${n} piece becomes ${n * 3} pieces, but the colored amount is the SAME! 🎁`,
        details: `${n}/8 of a toy cut into thirds = ${n * 3}/24 of the toy. Same toy, just more tiny pieces!`
      }
    ];
  }, [numerator]);

  const level = equivalences[currentLevel];

  const renderBoxes = (pieces, filled, color) => {
    return (
      <div className="boxes-container">
        {Array.from({ length: pieces }).map((_, i) => (
          <div
            key={i}
            className="box-segment"
            style={{
              backgroundColor: i < filled ? color : "var(--gray-200)",
              border: `2px solid ${color}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <span
              style={{
                fontSize: "1.2rem",
                fontWeight: "700",
                color: i < filled ? "white" : "rgba(156, 163, 175, 0.5)",
                textShadow: i < filled ? "0 1px 2px rgba(0,0,0,0.2)" : "none",
              }}
            >
              {i + 1}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const nextLevel = () => {
    if (currentLevel < equivalences.length - 1) {
      setCurrentLevel(currentLevel + 1);
    }
  };

  const prevLevel = () => {
    if (currentLevel > 0) {
      setCurrentLevel(currentLevel - 1);
    }
  };

  return (
    <div className="mode-container">
      <InstructionBox
        title="Visual Equivalence"
        description="Different fractions can show the SAME amount! 🤯"
      />

      <div className="equivalence-display">
        <div className="equivalence-pair">
          <div className="fraction-container">
            <div className="fraction-label">{level.left.label}</div>
            {renderBoxes(level.left.pieces, level.left.filled, level.left.color)}
          </div>

          <div className="equals-sign">
            <span>=</span>
          </div>

          <div className="fraction-container">
            <div className="fraction-label">{level.right.label}</div>
            {renderBoxes(level.right.pieces, level.right.filled, level.right.color)}
          </div>
        </div>
      </div>

      <div className="equivalence-message">
        <h2 style={{ fontSize: "2rem", color: level.left.color }}>
          {level.message}
        </h2>
        <p style={{ fontSize: "1.1rem", color: "var(--gray-500)", marginTop: "12px" }}>
          Count the <strong>colored boxes</strong>. Now count the <strong>gray boxes</strong>. The colored part is the SAME SIZE in both, even though the pieces are cut differently!
        </p>
        <p style={{ fontSize: "1.1rem", color: level.left.color, marginTop: "16px", fontWeight: "700", backgroundColor: "rgba(255,255,255,0.7)", padding: "12px", borderRadius: "8px" }}>
          💡 {level.explanation}
        </p>
        <p style={{ fontSize: "1rem", color: "var(--gray-500)", marginTop: "12px", fontStyle: "italic", backgroundColor: "var(--gray-100)", padding: "12px", borderRadius: "8px", borderLeft: `4px solid ${level.left.color}` }}>
          📖 {level.details}
        </p>
      </div>

      <div className="level-progress">
        <span style={{ fontSize: "1.1rem", fontWeight: "700" }}>
          Level {currentLevel + 1} of {equivalences.length}
        </span>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((currentLevel + 1) / equivalences.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="button-group">
        <button
          onClick={prevLevel}
          disabled={currentLevel === 0}
          className="btn-modern-primary"
          style={{ opacity: currentLevel === 0 ? 0.5 : 1 }}
        >
          ← Previous
        </button>
        <button onClick={nextLevel} disabled={currentLevel === equivalences.length - 1} className="btn-modern-primary" style={{ opacity: currentLevel === equivalences.length - 1 ? 0.5 : 1 }}>
          Next →
        </button>
      </div>

      {currentLevel === equivalences.length - 1 && (
        <div className="message-box">
          <h3 style={{ color: "#10B981", fontSize: "1.5rem" }}>
            🎉 You learned equivalence!
          </h3>
          <p>When you cut pieces smaller, you get MORE pieces, but the COLORED PART stays the SAME! That's why different fractions can mean the same amount!</p>
        </div>
      )}
    </div>
  );
};

export default VisualEquivalence;
