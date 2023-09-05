import './Quizform.scss';
import Addquestion from '../Addquestion/Addquestion';
import React, { useState, useEffect } from 'react';

interface ApiResponse {
  success: boolean;
  error: string;
  quizId?: string;
}

interface CreateQuizRequest {
  name: string;
}

function Quizform() {
  const [quizName, setQuizName] = useState<string>('');
  const [responseMessage, setResponseMessage] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [quizId, setQuizId] = useState<string>('');

  useEffect(() => {
    const retrievedToken = localStorage.getItem('authToken');
    if (retrievedToken) {
      setToken(retrievedToken);
    }
  }, []);

  const handleCreateQuiz = async () => {
    try {
      const requestBody: CreateQuizRequest = { name: quizName };
      const response = await fetch('https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data: ApiResponse = await response.json();
      if (data.success) {
        setQuizId(data.quizId || ''); 
        setResponseMessage('Quiz skapat');
      } else {
        setResponseMessage(data.error);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setResponseMessage('An error occurred while creating the quiz');
    }
  };

  return (
    <div>
      <input 
        className='form-field'
        type="text"
        placeholder="Namn på quiz"
        value={quizName}
        onChange ={(e) => setQuizName(e.target.value)}
      />
      <button onClick={handleCreateQuiz}>Skapa quiz</button>
      <div className="message">
        {responseMessage}
      </div>
      {responseMessage === 'Quiz skapat' && <Addquestion quizId={quizId} token={token} quizName={quizName} />}
    </div>
  );
}

export default Quizform;


