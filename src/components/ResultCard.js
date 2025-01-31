import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './ResultCard.css';

const ResultCard = ({ score, totalQuestions }) => {
  const percentage = (score / totalQuestions) * 100;
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    const previousScores = JSON.parse(localStorage.getItem("quizScores")) || [];
    previousScores.push(score);
    localStorage.setItem("quizScores", JSON.stringify(previousScores));
    setHighScores(previousScores);
  }, [score]);

  const getBadgeIcon = () => {
    if (percentage === 100) return "🏆";
    if (percentage >= 80) return "🥇";
    if (percentage >= 50) return "🥈";
    return "🥉";
  };

  const getMessage = () => {
    if (percentage === 100) return `${getBadgeIcon()} Perfect Score! 🎉`;
    if (percentage >= 80) return `${getBadgeIcon()} Excellent! 👏`;
    if (percentage >= 50) return `${getBadgeIcon()} Good Job! 👍`;
    return `${getBadgeIcon()} Better Luck Next Time! 🤞`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="result-card"
    >
      <h2>Quiz Completed!</h2>
      <motion.div
        className="badge-icon"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {getBadgeIcon()}
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="fs-5"
      >
        Your Score: <strong>{score} / {totalQuestions}</strong>
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="fs-4 fw-bold"
      >
        {getMessage()}
      </motion.p>

      {percentage === 100 && (
        <motion.img
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5, type: 'spring', stiffness: 100 }}
          src="https://img.icons8.com/color/96/000000/confetti.png"
          alt="Perfect Score"
          className="d-block mx-auto mt-4"
          style={{ width: '150px', borderRadius: '10px' }}
        />
      )}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-4 fs-6"
      >
        {percentage !== 100 ? 'Try again to improve your score!' : ''}
      </motion.p>

      {/* Score History */}
      <div className="score-history mt-4">
        <h4>Your Score History 📊</h4>
        <ul>
          {highScores.slice(-5).map((s, index) => (
            <li key={index}>
              Attempt {index + 1}: {s} / {totalQuestions}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default ResultCard;
