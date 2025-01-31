import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // For animations
import './ResultCard.css'; // Custom CSS for additional styling

const ResultCard = ({ score, totalQuestions }) => {
  const percentage = (score / totalQuestions) * 100;
  const [highScores, setHighScores] = useState([]);

  // Store score history in local storage
  useEffect(() => {
    const previousScores = JSON.parse(localStorage.getItem("quizScores")) || [];
    previousScores.push(score);
    localStorage.setItem("quizScores", JSON.stringify(previousScores));

    setHighScores(previousScores);
  }, [score]);

  // Determine message and badge based on score
  const getBadgeIcon = () => {
    if (percentage === 100) return "🏆"; // Trophy for perfect
    if (percentage >= 80) return "🥇"; // Gold Medal
    if (percentage >= 50) return "🥈"; // Silver Medal
    return "🥉"; // Bronze Medal
  };

  const getMessage = () => {
    if (percentage === 100) return `${getBadgeIcon()} Perfect Score! 🎉`;
    if (percentage >= 80) return `${getBadgeIcon()} Excellent! 👏`;
    if (percentage >= 50) return `${getBadgeIcon()} Good Job! 👍`;
    return `${getBadgeIcon()} Better Luck Next Time! 🤞`;
  };

  const getCardStyle = () => {
    if (percentage === 100) return 'bg-success'; // Green for perfect score
    if (percentage >= 80) return 'bg-warning'; // Yellow for excellent
    if (percentage >= 50) return 'bg-info'; // Light blue for good job
    return 'bg-danger'; // Red for lower scores
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`result-card p-4 rounded-3 shadow-lg text-white ${getCardStyle()}`}
    >
      <h2 className="text-center mb-4">Quiz Completed!</h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center fs-5"
      >
        Your Score: <strong>{score} / {totalQuestions}</strong>
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-center fs-4 fw-bold"
      >
        {getMessage()}
      </motion.p>

      {percentage === 100 && (
        <motion.img
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5, type: 'spring', stiffness: 100 }}
          src="https://via.placeholder.com/150?text=Perfect+Score+Icon" // Placeholder image for perfect score
          alt="Perfect Score"
          className="d-block mx-auto mt-4"
          style={{ width: '150px' }}
        />
      )}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-center mt-4 fs-6"
      >
        {percentage !== 100 ? 'Try again to improve your score!' : ''}
      </motion.p>

      {/* Display previous scores */}
      <div className="score-history mt-4">
        <h4 className="text-center">Your Score History 📊</h4>
        <ul className="list-group">
          {highScores.slice(-5).map((s, index) => (
            <li key={index} className="list-group-item">
              Attempt {index + 1}: {s} / {totalQuestions}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default ResultCard;
