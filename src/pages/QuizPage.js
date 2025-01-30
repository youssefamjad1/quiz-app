import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchQuizData } from '../utils/api';
import QuestionCard from '../components/QuestionCard';
import ProgressBar from '../components/ProgressBar';

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

  if (!quizData || quizData.length === 0) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <ProgressBar current={currentQuestionIndex + 1} total={quizData.length} />
      <QuestionCard
        question={quizData[currentQuestionIndex]}
        onAnswerSelect={handleAnswerSelect}
      />
    </div>
  );
};

export default QuizPage;

