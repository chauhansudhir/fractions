import React, { useState, useMemo } from "react";
import InstructionBox from "../InstructionBox";
import "../../styles/modes.css";

const BakeMode = () => {
  const [amount, setAmount] = useState(0);
  const [challengeIndex, setChallengeIndex] = useState(0);

  const challenges = useMemo(() => [
    { target: 0.75, label: "3/4 cup", item: "flour", emoji: "🍪", color: "#f59e0b" },
    { target: 0.5, label: "1/2 cup", item: "sugar", emoji: "🧁", color: "#d97706" },
    { target: 1, label: "1 cup", item: "milk", emoji: "🥛", color: "#3b82f6" },
    { target: 0.25, label: "1/4 cup", item: "butter", emoji: "🧈", color: "#fbbf24" },
    { target: 0.625, label: "5/8 cup", item: "cocoa", emoji: "🍫", color: "#8b7355" },
  ], []);

  const challenge = challenges[challengeIndex];

  const add = (v) => {
    if (amount + v <= challenge.target + 0.01) setAmount(amount + v);
  };

  const nextChallenge = () => {
    setChallengeIndex((challengeIndex + 1) % challenges.length);
    setAmount(0);
  };

  // Get fraction label
  const getFractionLabel = (value) => {
    const fractions = {
      0.125: "1/8",
      0.25: "1/4",
      0.33: "1/3",
      0.375: "3/8",
      0.5: "1/2",
      0.625: "5/8",
      0.66: "2/3",
      0.75: "3/4",
      1: "1",
    };
    return fractions[value.toFixed(3)] || `${value}`;
  };

  // Determine available buttons based on target
  const getAvailableButtons = () => {
    const allMeasurements = [0.125, 0.25, 0.33, 0.375, 0.5, 0.625, 0.66, 0.75];
    
    // Include the target itself and all measurements less than target
    const buttons = allMeasurements.filter(opt => opt <= challenge.target);
    buttons.push(challenge.target); // Always include target to ensure reachability
    
    // Remove duplicates and sort
    const unique = [...new Set(buttons)].sort((a, b) => a - b);
    
    return unique.map(value => ({
      value,
      fraction: getFractionLabel(value),
      percentage: `${(value * 100).toFixed(0)}%`,
    }));
  };

  const availableButtons = getAvailableButtons();
  const isComplete = Math.abs(amount - challenge.target) < 0.01;

  return (
    <div className="mode-container">
      <InstructionBox
        title="Baker's Challenge"
        description={`The recipe needs exactly ${challenge.label} of ${challenge.item} to make ${challenge.emoji}!`}
      />

      <div className="bake-content" style={{ flexDirection: "row", alignItems: "flex-start" }}>
        <div style={{ flex: 1, maxWidth: "250px" }}>
          <p style={{ fontSize: "12px", fontWeight: "bold", marginBottom: "8px", color: challenge.color }}>By Fraction:</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {availableButtons.map((btn) => (
              <button
                key={`frac-${btn.value}`}
                onClick={() => add(btn.value)}
                className="btn-modern-primary"
                style={{ background: challenge.color, boxShadow: `0 4px 0 ${challenge.color}99` }}
              >
                {btn.fraction} Cup
              </button>
            ))}
          </div>
        </div>

        <div style={{ flex: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "32px" }}>
          <div className="bowl-modern" style={{ backgroundColor: challenge.color + "33", borderColor: challenge.color }}>
            <div className="bowl-liquid" style={{ height: `${amount * 100}%`, backgroundColor: challenge.color }} />
          </div>

          <div className="button-group" style={{ marginTop: '0px', gap: '12px' }}>
            <button onClick={() => setAmount(0)} className="btn-modern-danger">
              Empty Bowl
            </button>
            <button onClick={nextChallenge} className="btn-modern-primary">
              Next Challenge ➡️
            </button>
          </div>
        </div>

        <div style={{ flex: 1, maxWidth: "250px" }}>
          <p style={{ fontSize: "12px", fontWeight: "bold", marginBottom: "8px", color: challenge.color }}>By Percentage:</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {availableButtons.map((btn) => (
              <button
                key={`pct-${btn.value}`}
                onClick={() => add(btn.value)}
                className="btn-modern-primary"
                style={{ background: challenge.color, boxShadow: `0 4px 0 ${challenge.color}99` }}
              >
                {btn.percentage}
              </button>
            ))}
          </div>
        </div>

        {isComplete && (
          <div className="message-box">
            <h2 style={{ color: '#10B981', marginTop: '24px' }}>
              {challenge.emoji} Perfect! Time to bake! {challenge.emoji}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default BakeMode;
