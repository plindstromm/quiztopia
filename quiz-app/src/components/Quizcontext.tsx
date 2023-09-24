import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Location {
  latitude: string;
  longitude: string;
}

interface QuestionLocation {
  answer: any;
  question: any;
  latitude: string;
  longitude: string;
}

interface QuizContextProps {
  selectedLocation: Location | null;
  setSelectedLocation: React.Dispatch<React.SetStateAction<Location | null>>;
  selectedQuizQuestions: QuestionLocation[];
  setSelectedQuizQuestions: React.Dispatch<React.SetStateAction<QuestionLocation[]>>;
}

const QuizContext = createContext<QuizContextProps | undefined>(undefined);

export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuizContext must be used within a QuizProvider");
  }
  return context;
};

export const QuizProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedQuizQuestions, setSelectedQuizQuestions] = useState<QuestionLocation[]>([]);

  return (
    <QuizContext.Provider value={{ selectedLocation, setSelectedLocation, selectedQuizQuestions, setSelectedQuizQuestions }}>
      {children}
    </QuizContext.Provider>
  );
};