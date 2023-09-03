import React, { useState } from 'react';
import './Addquestion.scss';

interface QuestionResponse {
  question: string;
  answer: string;
}

interface AddQuestionProps {
  quizID: string;
  token: string;
}

function Addquestion({ quizID, token }: AddQuestionProps) {
  const [formData, setFormData] = useState<QuestionResponse>({
    question: '',
    answer: '',
  });

  const createHandleQuestion = async () => {
    const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz/question';
    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...formData, quizID }),
    };
  
    try {
      const response = await fetch(url, settings);
      const data = await response.json();
      
      if (response.ok) {
        console.log('Question added:', data);
      } else {
        console.error('Error:', data.error || data);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createHandleQuestion();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="question"
        placeholder="fråga"
        value={formData.question}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="answer"
        placeholder="svar"
        value={formData.answer}
        onChange={handleInputChange}
      />
      <button type="submit">lägg till fråga</button>
    </form>
  );
}

export default Addquestion;
