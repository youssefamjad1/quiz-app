import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchQuizData } from '../utils/api';
import QuestionCard from '../components/QuestionCard';
import ProgressBar from '../components/ProgressBar';
import { motion } from 'framer-motion'; // For animations
import { Button, Container } from 'react-bootstrap'; // Using Bootstrap components
import './QuizPage.css'; // Custom CSS for additional styling

const QuizPage = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadQuizData = async () => {
      const data = await fetchQuizData();
      if (data) setQuizData(data);
    };
    loadQuizData();
  }, []);

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate('/results', { state: { selectedAnswers, quizData } });
    }
  };

  if (!quizData || quizData.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="d-flex align-items-center justify-content-center min-vh-100 custom-bg-gradient"
      >
        <div className="text-center text-white">
          <h1>Loading...</h1>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-vh-100 custom-bg-gradient d-flex flex-column"
    >
      <Container fluid className="flex-grow-1 d-flex flex-column justify-content-center py-5">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-center mb-4"
        >
          <h1 className="text-white fw-bold">Quiz Time!</h1>
          <p className="text-white lead">Test your knowledge and have fun!</p>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-light bg-opacity-10 rounded-lg shadow-lg p-4 border border-light border-opacity-25"
        >
          <ProgressBar current={currentQuestionIndex + 1} total={quizData.length} />
          <QuestionCard
            question={quizData[currentQuestionIndex]}
            onAnswerSelect={handleAnswerSelect}
          />
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-center mt-4"
        >
          <Button
            variant="light"
            size="lg"
            onClick={() => navigate('/')}
            className="rounded-pill shadow-sm text-primary fw-bold px-5 py-3"
          >
            Go Back
          </Button>
        </motion.div>
      </Container>
    </motion.div>
  );
};

export default QuizPage;