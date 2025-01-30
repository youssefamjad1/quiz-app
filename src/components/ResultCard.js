import React from 'react';

const ResultCard = ({ score, totalQuestions }) => {
  const percentage = (score / totalQuestions) * 100;

  // Determine message and style based on score
  const getMessage = () => {
    if (percentage === 100) return "Perfect Score! 🎉";
    if (percentage >= 80) return "Excellent! 👏";
    if (percentage >= 50) return "Good Job! 👍";
    return "Better Luck Next Time! 🤞";
  };

  const getCardStyle = () => {
    if (percentage === 100) return { backgroundColor: '#2ecc71', color: '#fff' }; // Green for perfect score
    if (percentage >= 80) return { backgroundColor: '#f39c12', color: '#fff' }; // Yellow for excellent
    if (percentage >= 50) return { backgroundColor: '#f1c40f', color: '#fff' }; // Light yellow for good job
    return { backgroundColor: '#e74c3c', color: '#fff' }; // Red for lower scores
  };

  return (
    <div style={{ padding: '20px', borderRadius: '10px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', ...getCardStyle() }}>
      <h2>Quiz Completed!</h2>
      <p style={{ fontSize: '18px' }}>
        Your Score: <strong>{score} / {totalQuestions}</strong>
      </p>
      <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{getMessage()}</p>
      {percentage === 100 && (
        <img
          src="https://via.placeholder.com/150?text=Perfect+Score+Icon" // Placeholder image for perfect score
          alt="Perfect Score"
          style={{ width: '150px', marginTop: '20px' }}
        />
      )}
      <p style={{ marginTop: '20px', fontSize: '16px' }}>
        {percentage !== 100 ? 'Try again to improve your score!' : ''}
      </p>
    </div>
  );
};

export default ResultCard;
