import React, { useState } from 'react';
import './Addquestion.scss';

interface QuestionResponse {
  question: string;
  answer: string;
}

interface AddQuestionProps {
  quizId: string;
  token: string;
  quizName: string;
}

function Addquestion({ quizId, token, quizName }: AddQuestionProps) {
  const [formData, setFormData] = useState<QuestionResponse>({
    question: '',
    answer: '',
  });

  const createHandleQuestion = async () => {
    const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz/question';
    const bodyObject = {
          name: quizName,
          question: formData.question,
          answer: formData.answer,
          location: {
          longitude: "24",
          latitude: "24", 
      },
      quizId  
    };

    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bodyObject),
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

  const handleInputQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((newData) =>({
      ...newData,
      question: value,
    }));
  };

  const handleInputAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((newData) =>({
      ...newData,
      answer: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="question"
        placeholder="fråga"
        value={formData.question}
        onChange={handleInputQuestion}
      />
      <input
        type="text"
        name="answer"
        placeholder="svar"
        value={formData.answer}
        onChange={handleInputAnswer}
      />
      <button type="submit">lägg till fråga</button>
    </form>
  );
}

export default Addquestion;


