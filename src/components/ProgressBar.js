import React from 'react';
import { motion } from 'framer-motion'; // For animations
import './ProgressBar.css'; // Custom CSS for additional styling

const ProgressBar = ({ current, total }) => {
  const progress = (current / total) * 100;

  // Determine the progress bar color based on the percentage
  const getProgressColor = (progress) => {
    if (progress <= 30) return '#e74c3c'; // Red for 0-30%
    if (progress <= 60) return '#f39c12'; // Yellow for 31-60%
    return '#2ecc71'; // Green for 61-100%
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="progress-bar-container"
    >
      <div className="progress-bar-background">
        <motion.div
          className="progress-bar-fill"
          style={{
            width: `${progress}%`,
            backgroundColor: getProgressColor(progress),
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      <motion.span
        className="progress-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {Math.round(progress)}%
      </motion.span>
    </motion.div>
  );
};

export default ProgressBar;