// src/Quiz.tsx
import React, { useState } from 'react';

// Define types for the question and answer structures
type Question = {
  questionText: string;
  options: string[];
  correctAnswer: string;
};

// Define the question array
const questions: Question[] = [
  {
    questionText: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Lisbon'],
    correctAnswer: 'Paris',
  },
  {
    questionText: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 'Mars',
  },
  {
    questionText: 'Who wrote "Hamlet"?',
    options: ['Charles Dickens', 'J.K. Rowling', 'William Shakespeare', 'Mark Twain'],
    correctAnswer: 'William Shakespeare',
  },
  {
    questionText: 'What is the largest ocean on Earth?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
    correctAnswer: 'Pacific Ocean',
  },
];

const Quiz: React.FC = () => {
  // State definitions with TypeScript types
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [score, setScore] = useState<number | null>(null);

  // Function to handle answer selection
  const handleAnswerClick = (answer: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answer,
    });
  };

  // Function to go to the next question
  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
  };

  // Function to go to the previous question
  const handlePrevQuestion = () => {
    setCurrentQuestion((prev) => prev - 1);
  };

  // Function to finish the quiz and calculate the score
  const handleFinishQuiz = () => {
    let calculatedScore = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
  };

  // Function to restart the quiz
  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setScore(null);
  };

  // Render the result if the quiz is finished
  if (score !== null) {
    return (
      <div className="quiz-result">
        <h2>Quiz Completed!</h2>
        <p>
          Your score: {score} / {questions.length}
        </p>
        <button onClick={handleRestartQuiz}>Restart Quiz</button>
      </div>
    );
  }

  // Main quiz UI
  return (
    <div className="quiz-container">
      <h2>{questions[currentQuestion].questionText}</h2>
      <ul>
        {questions[currentQuestion].options.map((option, index) => (
          <li key={index}>
            <button
              onClick={() => handleAnswerClick(option)}
              className={selectedAnswers[currentQuestion] === option ? 'selected' : ''}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
      <div className="quiz-navigation">
        <button onClick={handlePrevQuestion} disabled={currentQuestion === 0}>
          Previous
        </button>
        {currentQuestion < questions.length - 1 ? (
          <button onClick={handleNextQuestion} disabled={!selectedAnswers[currentQuestion]}>
            Next
          </button>
        ) : (
          <button onClick={handleFinishQuiz} disabled={!selectedAnswers[currentQuestion]}>
            Finish Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
