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
      const selectedAnswer = selectedAnswers[question.id];
  
      // Check if correctAnswer and selectedAnswer exist
      if (!correctAnswer || !selectedAnswer) {
        console.warn(`Missing data for question ID: ${question.id}`);
        return; // Skip this question
      }
  
      // Normalize both strings for comparison
      const normalizedCorrectAnswer = correctAnswer.description.trim().toLowerCase();
      const normalizedSelectedAnswer = selectedAnswer.trim().toLowerCase();
  
      if (normalizedSelectedAnswer === normalizedCorrectAnswer) {
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
       className="btn btn-primary btn-lg rounded-pill shadow-sm px-4 py-2 fw-bold"
      >
     🔄 Try Again
</button>


    </div>
  );
};

export default ResultsPage;
