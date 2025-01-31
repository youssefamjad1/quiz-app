import React from 'react';
import { motion } from 'framer-motion'; // For animations
import { Button } from 'react-bootstrap'; // Using Bootstrap Button
import './QuestionCard.css'; // Custom CSS for additional styling

const QuestionCard = ({ question, onAnswerSelect }) => {
  if (!question || !Array.isArray(question.options)) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center text-white"
      >
        <h3>No question data available.</h3>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="question-card"
    >
      <h3 className="text-white mb-4 fw-bold">{question.description}</h3>
      {question.options.map((option, index) => (
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="mb-3"
        >
          <Button
            variant="outline-light"
            size="lg"
            onClick={() => onAnswerSelect(question.id, option.description)}
            className="w-100 py-3 rounded-pill shadow-sm option-button"
          >
            {option.description}
          </Button>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default QuestionCard;
