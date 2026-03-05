import React, { useState, useEffect } from "react";
import InstructionBox from "../InstructionBox";
import ToolboxGrid from "../ToolboxGrid";
import "../../styles/modes.css";

const FRACTIONS = [
  { numerator: 1, denominator: 2, color: "#6366F1", label: "1/2" },
  { numerator: 1, denominator: 3, color: "#10B981", label: "1/3" },
  { numerator: 1, denominator: 4, color: "#EF4444", label: "1/4" },
  { numerator: 1, denominator: 6, color: "#F59E0B", label: "1/6" },
  { numerator: 1, denominator: 8, color: "#8B5CF6", label: "1/8" },
];

const VEHICLES = ['🚗', '🚲', '🏃', '🚀', '🛸'];

const handleDragStart = (e, fraction) => e.dataTransfer.setData("fraction", JSON.stringify(fraction));

// Simple Greatest Common Divisor
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

const formatFraction = (numerator, denominator) => {
  if (numerator === 0) return "0";
  if (numerator === denominator) return "1";
  const common = gcd(numerator, denominator);
  return `${numerator / common}/${denominator / common}`;
};

const getRoadDescription = (totalNumerator, totalDenominator) => {
  const value = totalNumerator / totalDenominator;
  if (value === 0) return "🏁 Ready to race! Drag a fraction to start the engine.";
  if (value < 0.2) return "🤏 A tiny step! You'll need many of these to reach the end.";
  if (value === 0.25) return "🍕 That's 1/4 (one quarter) of the way. 4 of these make a whole road!";
  if (value === 0.5) return "🌓 Halfway there! 1/2 is a big leap compared to 1/8.";
  if (value === 0.75) return "🚀 Almost there! 3/4 means you've covered 3 out of 4 parts.";
  if (value >= 1) return "🏆 You made it! One Whole journey is complete! 🎉";
  
  if (value > 0.5) return "🏎️ Zooming past the middle! You've gone more than 1/2 way.";
  return "🛣️ Rolling along! Keep adding fractions to reach the finish line.";
};

const JourneyMode = () => {
  const [roads, setRoads] = useState([]);
  const [activeRoadIndex, setActiveRoadIndex] = useState(0);

  const initializeRoads = () => {
    setRoads(VEHICLES.map((vehicle, i) => ({
      id: i,
      vehicle,
      target: 1.0,
      segments: []
    })));
  };

  useEffect(() => {
    initializeRoads();
  }, []);

  const handleDrop = (e, index) => {
    e.preventDefault();
    const f = JSON.parse(e.dataTransfer.getData("fraction"));
    const road = roads[index];
    const currentTotal = road.segments.reduce((s, x) => s + x.numerator / x.denominator, 0);
    
    if (currentTotal + f.numerator / f.denominator <= road.target + 0.01) {
      const newRoads = [...roads];
      newRoads[index] = {
        ...road,
        segments: [...road.segments, { ...f, id: Math.random() }]
      };
      setRoads(newRoads);
      setActiveRoadIndex(index);
    }
  };

  const restartAll = () => {
    setRoads(roads.map(r => ({ ...r, segments: [] })));
  };

  if (roads.length === 0) return null;

  return (
    <div className="mode-container">
      <InstructionBox
        title="Compare the Journeys!"
        description="Every road is exactly 1 whole length. Drag fractions and watch the travelers race side-by-side!"
      />

      <ToolboxGrid fractions={FRACTIONS} handleDragStart={handleDragStart} />

      <div className="rows-container" style={{ marginTop: '24px' }}>
        {roads.map((road, index) => {
          let totalNumerator = 0;
          let totalDenominator = 24; // Common denominator
          road.segments.forEach(s => {
            totalNumerator += (s.numerator * (totalDenominator / s.denominator));
          });

          const currentTotal = totalNumerator / totalDenominator;
          const isComplete = Math.abs(currentTotal - road.target) < 0.01;

          return (
            <div key={road.id} className="road-wrapper" style={{ display: 'flex', flexDirection: 'column' }}>
              <div 
                className={`journey-road ${activeRoadIndex === index ? 'active-road' : ''} ${isComplete ? 'road-complete' : ''}`}
                onDragOver={(e) => e.preventDefault()} 
                onDrop={(e) => handleDrop(e, index)}
                onClick={() => setActiveRoadIndex(index)}
                style={{ cursor: 'pointer', marginBottom: '8px' }}
              >
                {/* Reference Grid */}
                <div style={{ position: 'absolute', display: 'flex', width: '100%', height: '100%', opacity: 0.1, pointerEvents: 'none' }}>
                  {[...Array(8)].map((_, i) => (
                    <div key={i} style={{ flex: 1, borderRight: '1px solid black' }} />
                  ))}
                </div>

                {/* Road Markings */}
                <div className="road-markings" style={{ width: '100%' }} />
                
                {/* Finish Line */}
                <div className="road-finish" style={{ right: 0 }} />
                
                {/* Distance Badge */}
                {currentTotal > 0 && (
                  <div className="road-total-badge">
                    {formatFraction(totalNumerator, totalDenominator)}
                  </div>
                )}

                {/* Segments */}
                {road.segments.map(s => (
                  <div
                    key={s.id}
                    style={{
                      height: '100%',
                      width: `${(s.numerator / s.denominator) * 100}%`,
                      backgroundColor: s.color,
                      opacity: 0.8,
                      borderRight: '2px solid rgba(255,255,255,0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '0.8rem',
                      textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                    }}
                  >
                    {s.label}
                  </div>
                ))}

                {/* Vehicle */}
                <div 
                  className="vehicle" 
                  style={{ 
                    left: `${Math.min(currentTotal * 100, 100)}%`,
                    transition: 'left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    pointerEvents: 'none'
                  }}
                >
                  {road.vehicle}
                </div>
              </div>

              {/* Dynamic Educational Description */}
              <div className="road-description" style={{ borderLeftColor: road.segments.length > 0 ? road.segments[road.segments.length-1].color : 'var(--primary)' }}>
                {getRoadDescription(totalNumerator, totalDenominator)}
              </div>
            </div>
          );
        })}
      </div>

      <div className="button-group">
        <button onClick={restartAll} className="btn-modern-danger" style={{ minWidth: '200px' }}>
          Clear All Tracks 🏁
        </button>
      </div>
    </div>
  );
};

export default JourneyMode;
