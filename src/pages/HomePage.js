import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap'; // Using Bootstrap Button
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { motion } from 'framer-motion'; // For animations
import './HomePage.css'; // Custom CSS for additional styling

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="d-flex align-items-center justify-content-center min-vh-100 custom-bg-gradient"
    >
      <div className="text-center p-5 bg-light bg-opacity-10 rounded shadow-lg border border-light border-opacity-25">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="display-4 text-white mb-4 fw-bold"
        >
          Welcome to the Quiz App!
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="lead text-white mb-4"
        >
          Test your knowledge and challenge yourself.
        </motion.p>
        <motion.div
          initial={{ scale: 0.3 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Button
             variant="light"
             size="lg"
             onClick={() => navigate('/quiz')}
             className="d-flex align-items-center justify-content-center px-5 py-3 rounded-pill shadow-sm text-primary fw-bold"
             aria-label="Start the Quiz"
           >

            <PlayArrowIcon className="me-2" />
            Start Quiz
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomePage;