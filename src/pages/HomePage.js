import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the Quiz App!</h1>
      <button onClick={() => navigate('/quiz')} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Start Quiz
      </button>
    </div>
  );
};

export default HomePage;