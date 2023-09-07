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

  // Antog att anvädningområdet är för en mobil device, därav placeras location ut med Geolocation automatiskt och inte manuellt på kartan
  // tyckte även det var överflöd att se frågorna på båda kartan och nedantill
  
  const createHandleQuestion = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const coordinates = {
          longitude: position.coords.longitude.toString(),
          latitude: position.coords.latitude.toString(),
        };

        const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz/question';
        const bodyObject = {
          name: quizName,
          question: formData.question,
          answer: formData.answer,
          location: coordinates,
          quizId,
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

            setFormData({
              question: '',
              answer: '',
            });

          } else {
            console.error('Error:', data.error || data);
          }
        } catch (error) {
          console.error('Fetch error:', error);
        }
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); createHandleQuestion(); }}>
      <input
        type="text"
        name="question"
        placeholder="Question"
        value={formData.question}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="answer"
        placeholder="Answer"
        value={formData.answer}
        onChange={handleInputChange}
      />
      <button type="submit">Add Question</button>
    </form>
  );
}

export default Addquestion;


