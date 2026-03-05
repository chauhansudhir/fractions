import React from "react";
import "../../styles/modes.css";

const WallMode = () => {
  const rows = [
    [{ l: "1 Whole", n: 1, d: 1, c: "#94A3B8" }],
    [{ l: "1/2", n: 1, d: 2, c: "#6366F1" }, { l: "1/2", n: 1, d: 2, c: "#6366F1" }],
    [{ l: "1/3", n: 1, d: 3, c: "#10B981" }, { l: "1/3", n: 1, d: 3, c: "#10B981" }, { l: "1/3", n: 1, d: 3, c: "#10B981" }],
    Array(4).fill({ l: "1/4", n: 1, d: 4, c: "#EF4444" }),
    Array(6).fill({ l: "1/6", n: 1, d: 6, c: "#F59E0B" }),
    Array(8).fill({ l: "1/8", n: 1, d: 8, c: "#8B5CF6" }),
  ];

  return (
    <div className="mode-container">
      <div className="instruction-box">
        <h2>The Great Wall</h2>
        <p>See how many small pieces it takes to build one giant whole block!</p>
      </div>
      <div className="wall-container">
        {rows.map((row, i) => (
          <div key={i} className="wall-row-modern">
            {row.map((b, j) => (
              <div
                key={j}
                className="wall-block-clay"
                style={{ width: `${(b.n / b.d) * 100}%`, backgroundColor: b.c }}
              >
                {b.l}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WallMode;
