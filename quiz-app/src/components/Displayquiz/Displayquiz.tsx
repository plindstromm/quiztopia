import React, { useState, useEffect } from 'react';
import './Displayquiz.scss';
import { useQuizContext } from '../Quizcontext';

interface ApiQuiz {
  questions: {
    question: string;
    answer: string;
    location: {
      longitude: string;
      latitude: string;
    };
  }[];
  username: string;
  userId: string;
  quizId: string;
}

interface ApiQuizResponse {
  success: boolean;
  quizzes: ApiQuiz[];
}

function Displayquiz(){ 

  const [quizzes, setQuizzes] = useState<ApiQuiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<ApiQuiz | null>(null);
  const { setSelectedLocation, setSelectedQuizQuestions } = useQuizContext();

  useEffect(() => {
    handleGetQuiz(); 
  }, []);

  async function handleGetQuiz () { //make as a const
    const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz';

    const response = await fetch(url);
    const data: ApiQuizResponse = await response.json();
    
    if ( data.success ) {
      setQuizzes(data.quizzes);
    } else {
      console.log('Kunde inte hämta data');
    }
  }

  const handleSelectQuiz = (quiz: ApiQuiz) => {
    setSelectedQuiz(quiz);
    setSelectedLocation(quiz.questions[0].location);
    setSelectedQuizQuestions(quiz.questions.map(q => ({
      latitude: q.location.latitude,
      longitude: q.location.longitude,
      question: q.question
    })));
  };

  return (
    <div className="quiz-section">
      <div className="quiz-list-scrollable">
        {quizzes.map((quiz, index) => (
          <div key={index} onClick={() => handleSelectQuiz(quiz)}>
            {quiz.username} - {quiz.quizId}
          </div>
        ))}
      </div>

      {selectedQuiz && (
        <div className="selected-quiz">
          <h2>{selectedQuiz.username}'s Quiz</h2>
          <ul>
            {selectedQuiz.questions.map((q, index) => (
              <li key={index}>
                <strong>Question:</strong> {q.question} <br />
                <strong>Answer:</strong> {q.answer}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Displayquiz;