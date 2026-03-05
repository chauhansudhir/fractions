import React, { useState } from "react";
import FreePlay from "../components/modes/FreePlay";
import PizzaMode from "../components/modes/PizzaMode";
import JourneyMode from "../components/modes/JourneyMode";
import WallMode from "../components/modes/WallMode";
import BattleMode from "../components/modes/BattleMode";
import LineMode from "../components/modes/LineMode";
import MatchMode from "../components/modes/MatchMode";
import BakeMode from "../components/modes/BakeMode";
import VisualEquivalence from "../components/modes/VisualEquivalence";
import FractionComparison from "../components/modes/FractionComparison";
import FractionAddition from "../components/modes/FractionAddition";
import BackButton from "../components/BackButton";
import "../styles/PlayPage.css";

const PlayPage = ({ modeId }) => {
  const [numerator, setNumerator] = useState(1);
  const [denominator, setDenominator] = useState(2);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const modes = {
    free: { title: "🎈 Free Play Builder", component: FreePlay, usesNumerator: false },
    pizza: { title: "🍕 Pizza Party", component: PizzaMode, usesNumerator: false },
    journey: { title: "🚀 Fraction Journey", component: JourneyMode, usesNumerator: false },
    wall: { title: "🧱 The Great Wall", component: WallMode, usesNumerator: false },
    battle: { title: "⚔️ Fraction Battle", component: BattleMode, usesNumerator: true },
    line: { title: "📍 Pin the Fraction", component: LineMode, usesNumerator: false },
    match: { title: "🧩 The Match Maker", component: MatchMode, usesNumerator: true },
    bake: { title: "🥣 Baker's Challenge", component: BakeMode, usesNumerator: false },
    equivalence: { title: "🔄 Visual Equivalence", component: VisualEquivalence, usesNumerator: true },
    comparison: { title: "⚖️ Comparison Rules", component: FractionComparison, usesNumerator: true },
    addition: { title: "➕ Build a Whole", component: FractionAddition, usesNumerator: false },
  };

  const mode = modes[modeId];
  if (!mode) return <div>Mode not found</div>;

  const ModeComponent = mode.component;

  return (
    <div className="play-page">
      <BackButton />
      <div className="play-header">
        <div className="header-top">
          <h1>{mode.title}</h1>
          {mode.usesNumerator && (
            <button
              className="advanced-toggle-btn"
              onClick={() => setShowAdvanced(!showAdvanced)}
              title="Advanced: Customize the starting fraction"
            >
              ⚙️ Advanced
            </button>
          )}
        </div>
        {mode.usesNumerator && showAdvanced && (
          <div className="fraction-selector">
            <label>Start with:</label>
            <div className="fraction-input">
              <div className="fraction-picker">
                <label>Numerator:</label>
                <select value={numerator} onChange={(e) => setNumerator(Number(e.target.value))}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
              <div className="fraction-display">/</div>
              <div className="fraction-picker">
                <label>Denominator:</label>
                <select value={denominator} onChange={(e) => setDenominator(Number(e.target.value))}>
                  {[2, 3, 4, 5, 6, 8, 10, 12].map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="fraction-preview">
              {numerator}/{denominator}
            </div>
          </div>
        )}
      </div>
      <div className="play-content">
        <ModeComponent numerator={numerator} denominator={denominator} />
      </div>
    </div>
  );
};

export default PlayPage;
