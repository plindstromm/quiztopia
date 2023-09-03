import React, { useState } from 'react';
import './Displayquiz.scss';

interface Quiz {
  questions: {
    question: string;
    answer: string;
    location: {
      longitude: string;
      latitude: string;
    };
  }[];
  userId: string;
  quizId: string;
}

function Displayquiz(){ 

  return (
    <div className="quiz-section">
     
    </div>
  );
  
};

export default Displayquiz;