import React from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";

const HomePage = () => {
  const modes = [
    { id: "free", icon: "🎈", label: "Free Play", desc: "Drag blocks to build equal rows" },
    { id: "pizza", icon: "🍕", label: "Pizza Party", desc: "Create the perfect pizza slice" },
    { id: "journey", icon: "🚀", label: "Fraction Journey", desc: "Travel to the finish line" },
    { id: "wall", icon: "🧱", label: "The Great Wall", desc: "Build with fraction blocks" },
    { id: "equivalence", icon: "🔄", label: "Visual Equivalence", desc: "Learn equal fractions" },
    { id: "comparison", icon: "⚖️", label: "Comparison Rules", desc: "Compare fractions visually" },
    { id: "addition", icon: "➕", label: "Build a Whole", desc: "Add fractions to make 1" },
    { id: "battle", icon: "⚔️", label: "Fraction Battle", desc: "Compare and conquer" },
    { id: "line", icon: "📍", label: "Pin the Fraction", desc: "Drag the pin to the target" },
    { id: "match", icon: "🧩", label: "Match Maker", desc: "Find ways to make 1/2" },
    { id: "bake", icon: "🥣", label: "Baker's Challenge", desc: "Measure the right amount" },
  ];

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1 className="hero-title">🎓 Fraction Fun!</h1>
        <p className="hero-subtitle">Learn fractions through interactive play</p>
      </div>

      <div className="modes-grid">
        {modes.map((mode) => (
          <Link key={mode.id} to={`/play/${mode.id}`} className="mode-card">
            <div className="mode-icon">{mode.icon}</div>
            <h3 className="mode-title">{mode.label}</h3>
            <p className="mode-desc">{mode.desc}</p>
            <div className="mode-cta">Play Now →</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
