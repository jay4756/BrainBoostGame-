import React from "react";
import Quiz from "./componen/Quiz";
import AttentionTest from "./componen/AttentionTest";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <h1> BrainBoost Game</h1>
      <div className="game-sections">
        <Quiz />
        <AttentionTest />
      </div>
    </div>
  );
}
export default App;
