import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';  // Import useNavigate hook
import ResultCard from '../components/ResultCard';

const ResultsPage = () => {
  const location = useLocation();  // Access location using the hook
  const navigate = useNavigate();  // Use useNavigate hook to navigate
  const { selectedAnswers, quizData } = location.state || {}; // Ensure location.state is not undefined

  if (!selectedAnswers || !quizData) {
    return <div>Error: No data available</div>;
  }

  const calculateScore = () => {
    let score = 0;
    quizData.forEach((question) => {
      const correctAnswer = question.options.find((option) => option.is_correct);
      if (selectedAnswers[question.id] === correctAnswer.description) {
        score += 1;
      }
    });
    return score;
  };

  const score = calculateScore();

  // Navigate back to the quiz page (assuming the quiz page is at '/quiz')
  const handleTryAgain = () => {
    navigate('/quiz');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <ResultCard score={score} totalQuestions={quizData.length} />
      <button
        onClick={handleTryAgain}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        Try Again
      </button>
    </div>
  );
};

export default ResultsPage;
