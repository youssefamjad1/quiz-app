import React from 'react';
import { useLocation } from 'react-router-dom';  // Import useLocation hook
import ResultCard from '../components/ResultCard';

const ResultsPage = () => {
  const location = useLocation();  // Access location using the hook
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

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <ResultCard score={score} totalQuestions={quizData.length} />
    </div>
  );
};

export default ResultsPage;