import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Quiz.css";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/api/quiz")
      .then(res => setQuestions(res.data));
  }, []);

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer
    });
  };

  const handleSubmit = () => {
    const payload = Object.keys(selectedAnswers).map(qId => ({
        id: qId,
        selected: selectedAnswers[qId]
    }));

    axios.post('http://localhost:8080/api/quiz/submitedAnswer', payload)
        .then(response => {
            setResult(response.data);
            setSubmitted(true);
        })
        .catch(error => console.error("Error submitting quiz", error));
};

  return (
    <div className="quiz-container">
      <h2>🎯 Quiz Game</h2>
      {questions.length === 0 ? (
        <p className="loading">Loading questions...</p>
      ) : submitted && result ? (
        <div className="results">
          <h3>✅ Quiz Results</h3>
          <div className="score-display">
            <h2>Your Score: {result.score}/{result.total}</h2>
            <p className="percentage">{Math.round((result.score / result.total) * 100)}%</p>
          </div>
          <div className="result-details">
            {result.details.map((detail, index) => (
              <div key={index} className={`result-item ${detail.isCorrect ? 'correct' : 'incorrect'}`}>
                <h4>Q{index + 1}: {detail.questionText}</h4>
                <p><strong>Your Answer:</strong> {detail.yourAnswer}</p>
                {!detail.isCorrect && (
                  <p><strong>Correct Answer:</strong> {detail.correctAnswer}</p>
                )}
                <span className={`badge ${detail.isCorrect ? 'correct' : 'incorrect'}`}>
                  {detail.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                </span>
              </div>
            ))}
          </div>
          <button className="submit-btn" onClick={() => window.location.reload()}>
            Retake Quiz
          </button>
        </div>
      ) : (
        <>
          {questions.map(q => (
            <div key={q.id} className="quiz-question">
              <h4>{q.question}</h4>
              <div className="options">
                {[
                  { label: "A", value: q.optionA },
                  { label: "B", value: q.optionB },
                  { label: "C", value: q.optionC },
                  { label: "D", value: q.optionD }
                ].map(option => (
                  <label key={option.label} className="option">
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={option.value}
                      checked={selectedAnswers[q.id] === option.value}
                      onChange={() => handleAnswerSelect(q.id, option.value)}
                    />
                    <span className="option-text">{option.label}. {option.value}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button className="submit-btn" onClick={handleSubmit}>
            Submit Quiz
          </button>
        </>
      )}
    </div>
  );
}

export default Quiz;
