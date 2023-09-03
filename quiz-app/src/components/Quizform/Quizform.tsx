import './Quizform.scss';
import Addquestion from '../Addquestion/Addquestion';
import React, { useState, useEffect } from 'react';

interface ApiResponse {
  success: boolean;
  error: string;
  quizId?: string;  // Note the updated key name
}

interface CreateQuizRequest {
  name: string;
}

function Quizform() {
  const [quizName, setQuizName] = useState<string>('');
  const [responseMessage, setResponseMessage] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [quizID, setQuizID] = useState<string>('');

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
        setQuizID(data.quizId || '');  // Store the quiz ID
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
        placeholder="Create quiz"
        value={quizName}
        onChange ={(e) => setQuizName(e.target.value)}
      />
      <button onClick={handleCreateQuiz}>Skapa quiz</button>
      <div className="message">
        {responseMessage}
      </div>
      {responseMessage === 'Quiz skapat' && <Addquestion quizID={quizID} token={token} />}
    </div>
  );
}

export default Quizform;
