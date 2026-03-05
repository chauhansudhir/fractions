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

  // Determine available buttons based on target
  const getAvailableButtons = () => {
    const buttons = [];
    if (challenge.target >= 0.25) buttons.push({ value: 0.25, label: "1/4 Cup" });
    if (challenge.target >= 0.5) buttons.push({ value: 0.5, label: "1/2 Cup" });
    if (challenge.target >= 0.75) buttons.push({ value: 0.75, label: "3/4 Cup" });
    if (challenge.target >= 1) buttons.push({ value: 1, label: "1 Cup" });
    return buttons.length > 0 ? buttons : [{ value: 0.25, label: "1/4 Cup" }];
  };

  const availableButtons = getAvailableButtons();
  const isComplete = Math.abs(amount - challenge.target) < 0.01;

  return (
    <div className="mode-container">
      <InstructionBox
        title="Baker's Challenge"
        description={`The recipe needs exactly ${challenge.label} of ${challenge.item} to make ${challenge.emoji}!`}
      />

      <div className="bake-content">
        <div className="bowl-modern" style={{ backgroundColor: challenge.color + "33", borderColor: challenge.color }}>
          <div className="bowl-liquid" style={{ height: `${amount * 100}%`, backgroundColor: challenge.color }} />
        </div>

        <div className="button-group">
          {availableButtons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => add(btn.value)}
              className="btn-modern-primary"
              style={{ background: challenge.color, boxShadow: `0 4px 0 ${challenge.color}99` }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {isComplete && (
          <div className="message-box">
            <h2 style={{ color: '#10B981', marginTop: '24px' }}>
              {challenge.emoji} Perfect! Time to bake! {challenge.emoji}
            </h2>
          </div>
        )}

        <div className="button-group" style={{ marginTop: '16px', gap: '12px' }}>
          <button onClick={() => setAmount(0)} className="btn-modern-danger">
            Empty Bowl
          </button>
          <button onClick={nextChallenge} className="btn-modern-primary">
            Next Challenge ➡️
          </button>
        </div>
      </div>
    </div>
  );
};

export default BakeMode;
