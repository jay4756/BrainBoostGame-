import React, { useState } from "react";
import "./AttentionTest.css";

function AttentionTest() {
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [history, setHistory] = useState([]);

  const startTest = () => {
    setStart(Date.now());
    setIsActive(true);
    setTime(0);
  };

  const clickNow = () => {
    if (start) {
      const reactionTime = Date.now() - start;
      setTime(reactionTime);
      setIsActive(false);
      setHistory([...history, reactionTime]);
    }
  };

  const getAverageTime = () => {
    if (history.length === 0) return 0;
    return Math.round(history.reduce((a, b) => a + b) / history.length);
  };

  return (
    <div className="attention-container">
      <h2> Attention Test</h2>
      <div className="test-area">
        <div className={`status ${isActive ? 'active' : 'inactive'}`}>
          {isActive ? ' READY!' : ' Set'}
        </div>
        
        <div className="button-group">
          <button 
            className="action-btn start-btn" 
            onClick={startTest}
          >
            Start Test
          </button>
          <button 
            className="action-btn click-btn" 
            onClick={clickNow}
            disabled={!isActive}
          >
            Click Now!
          </button>
        </div>

        {time > 0 && (
          <div className="result">
            <h3>Your Reaction Time</h3>
            <p className="time-display">{time}ms</p>
          </div>
        )}

        {history.length > 0 && (
          <div className="stats">
            <h4>Statistics</h4>
            <div className="stat-item">
              <span>Average Time:</span>
              <strong>{getAverageTime()}ms</strong>
            </div>
            <div className="stat-item">
              <span>Attempts:</span>
              <strong>{history.length}</strong>
            </div>
            <div className="stat-item">
              <span>Best Time:</span>
              <strong>{Math.min(...history)}ms</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default AttentionTest;
