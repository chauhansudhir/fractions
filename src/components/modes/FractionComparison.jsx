import React, { useState, useMemo } from "react";
import InstructionBox from "../InstructionBox";
import "../../styles/modes.css";

const FractionComparison = ({ numerator = 1 }) => {
  const [currentRule, setCurrentRule] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const rules = useMemo(() => {
    // eslint-disable-next-line no-unused-vars
    const n = numerator;
    return [
    {
      title: "Same Denominator Rule",
      description: "When the bottom number is the SAME, compare the TOP number!",
      icon: "👇",
      examples: [
        {
          left: { num: 1, denom: 4, label: "1/4" },
          right: { num: 3, denom: 4, label: "3/4" },
          answer: "right",
          rule: "1 < 3, so 1/4 < 3/4",
          visual: "More pieces filled = BIGGER! 🍕"
        },
        {
          left: { num: 2, denom: 6, label: "2/6" },
          right: { num: 4, denom: 6, label: "4/6" },
          answer: "right",
          rule: "2 < 4, so 2/6 < 4/6",
          visual: "2 shaded pieces < 4 shaded pieces"
        },
        {
          left: { num: 5, denom: 8, label: "5/8" },
          right: { num: 3, denom: 8, label: "3/8" },
          answer: "left",
          rule: "5 > 3, so 5/8 > 3/8",
          visual: "More filled = BIGGER!"
        },
      ]
    },
    {
      title: "Same Numerator Rule",
      description: "When the top number is the SAME, compare the BOTTOM number!",
      icon: "☝️",
      examples: [
        {
          left: { num: 1, denom: 2, label: "1/2" },
          right: { num: 1, denom: 4, label: "1/4" },
          answer: "left",
          rule: "2 < 4, so 1/2 > 1/4",
          visual: "Cutting into FEWER pieces = BIGGER! 🍰"
        },
        {
          left: { num: 1, denom: 3, label: "1/3" },
          right: { num: 1, denom: 6, label: "1/6" },
          answer: "left",
          rule: "3 < 6, so 1/3 > 1/6",
          visual: "1 piece of 3 > 1 piece of 6"
        },
        {
          left: { num: 1, denom: 8, label: "1/8" },
          right: { num: 1, denom: 4, label: "1/4" },
          answer: "right",
          rule: "8 > 4, so 1/8 < 1/4",
          visual: "Smaller pieces = SMALLER amount!"
        },
      ]
    }
  ];
  }, [numerator]);

  const rule = rules[currentRule];
  const [exampleIndex, setExampleIndex] = useState(0);
  const example = rule.examples[exampleIndex];

  const renderBars = (numerator, denominator, color = "#6366F1") => {
    return (
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        {Array.from({ length: denominator }).map((_, i) => (
          <div
            key={i}
            style={{
              width: "40px",
              height: "60px",
              backgroundColor: i < numerator ? color : "#E5E7EB",
              border: `2px solid ${color}`,
              borderRadius: "6px",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    );
  };

  const handleAnswer = (side) => {
    setUserAnswer(side);
    setShowExplanation(true);
  };

  const isCorrect = userAnswer === example.answer;

  const nextExample = () => {
    if (exampleIndex < rule.examples.length - 1) {
      setExampleIndex(exampleIndex + 1);
      setUserAnswer(null);
      setShowExplanation(false);
    }
  };

  const prevExample = () => {
    if (exampleIndex > 0) {
      setExampleIndex(exampleIndex - 1);
      setUserAnswer(null);
      setShowExplanation(false);
    }
  };

  const switchRule = (newRule) => {
    setCurrentRule(newRule);
    setExampleIndex(0);
    setUserAnswer(null);
    setShowExplanation(false);
  };

  return (
    <div className="mode-container">
      <InstructionBox
        title="Comparison Rules"
        description="Learn the secret rules to compare fractions! 🔍"
      />

      {/* Rule Tabs */}
      <div className="rule-tabs">
        <button
          onClick={() => switchRule(0)}
          className={`rule-tab ${currentRule === 0 ? "active" : ""}`}
        >
          <span className="rule-icon">👇</span>
          <span>Same Denominator</span>
        </button>
        <button
          onClick={() => switchRule(1)}
          className={`rule-tab ${currentRule === 1 ? "active" : ""}`}
        >
          <span className="rule-icon">☝️</span>
          <span>Same Numerator</span>
        </button>
      </div>

      {/* Rule Explanation */}
      <div className="rule-box">
        <h2>{rule.title}</h2>
        <p style={{ fontSize: "1.1rem", fontWeight: "600", color: "#6B7280" }}>
          {rule.description}
        </p>
      </div>

      {/* Comparison Example */}
      <div className="comparison-container">
        <div className="comparison-side">
          <div className="fraction-display">{example.left.label}</div>
          {renderBars(example.left.num, example.left.denom, "#6366F1")}
        </div>

        <div className="comparison-operator">?</div>

        <div className="comparison-side">
          <div className="fraction-display">{example.right.label}</div>
          {renderBars(example.right.num, example.right.denom, "#10B981")}
        </div>
      </div>

      {/* Visual Hint */}
      <div className="hint-box">
        <p>{example.visual}</p>
      </div>

      {/* Answer Buttons */}
      {!showExplanation && (
        <div className="answer-buttons">
          <button
            onClick={() => handleAnswer("left")}
            className="btn-answer"
            style={{ borderLeft: "4px solid #6366F1" }}
          >
            <span style={{ fontSize: "1.5rem" }}>&lt;</span>
            <span>{example.left.label} is bigger</span>
          </button>

          <button
            onClick={() => handleAnswer("equal")}
            className="btn-answer"
            style={{ borderLeft: "4px solid #F59E0B" }}
          >
            <span style={{ fontSize: "1.5rem" }}>=</span>
            <span>They're equal</span>
          </button>

          <button
            onClick={() => handleAnswer("right")}
            className="btn-answer"
            style={{ borderLeft: "4px solid #10B981" }}
          >
            <span style={{ fontSize: "1.5rem" }}>&gt;</span>
            <span>{example.right.label} is bigger</span>
          </button>
        </div>
      )}

      {/* Explanation */}
      {showExplanation && (
        <div className={`explanation-box ${isCorrect ? "correct" : "incorrect"}`}>
          <h3 style={{ color: isCorrect ? "#10B981" : "#EF4444" }}>
            {isCorrect ? "✨ Correct!" : "🤔 Not quite..."}
          </h3>
          <p style={{ fontSize: "1.1rem", marginTop: "12px" }}>
            <strong>The Rule:</strong> {example.rule}
          </p>
          <p style={{ fontSize: "1rem", marginTop: "12px", color: "#6B7280" }}>
            {example.left.label}
            {example.answer === "left" ? " > " : example.answer === "right" ? " < " : " = "}
            {example.right.label}
          </p>

          <div className="button-group" style={{ marginTop: "24px" }}>
            <button
              onClick={prevExample}
              disabled={exampleIndex === 0}
              className="btn-modern-primary"
              style={{ opacity: exampleIndex === 0 ? 0.5 : 1 }}
            >
              ← Previous
            </button>
            <button
              onClick={nextExample}
              disabled={exampleIndex === rule.examples.length - 1}
              className="btn-modern-primary"
              style={{ opacity: exampleIndex === rule.examples.length - 1 ? 0.5 : 1 }}
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Progress */}
      <div className="level-progress" style={{ marginTop: "32px" }}>
        <span style={{ fontSize: "1rem", fontWeight: "700" }}>
          Example {exampleIndex + 1} of {rule.examples.length}
        </span>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((exampleIndex + 1) / rule.examples.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default FractionComparison;
