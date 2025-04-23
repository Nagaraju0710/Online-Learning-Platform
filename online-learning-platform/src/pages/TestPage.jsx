import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { courseTests } from '../data/courseTests'; // Import the questions from the data file
import styled from 'styled-components';



const TestPageWrapper = styled.div`
  font-family: 'Arial', sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h2`
  text-align: center;
  color: #333;
  font-size: 24px;
`;

const QuestionWrapper = styled.div`
  margin-top: 20px;
`;

const QuestionText = styled.h4`
  font-size: 18px;
  color: #555;
  margin-bottom: 10px;
`;

const OptionLabel = styled.label`
  display: block;
  margin: 10px 0;
  font-size: 16px;
  color: #444;
`;

const OptionInput = styled.input`
  margin-right: 10px;
  accent-color: #4caf50;
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin: 0 10px;
  cursor: pointer;
  font-size: 16px;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover {
    background-color: #45a049;
  }
`;

const ScoreWrapper = styled.div`
  margin-top: 30px;
  text-align: center;
`;

const ScoreHeading = styled.h3`
  font-size: 24px;
  color: #333;
`;

const SuccessMessage = styled.h4`
  font-size: 20px;
  color: #4caf50;
`;

const FailureMessage = styled.h4`
  font-size: 20px;
  color: #f44336;
`;

const TestPage = () => {
  const { courseId } = useParams(); // Get course ID from URL using useParams (for React Router v6)
  const navigate = useNavigate(); // Initialize useNavigate
  const [answers, setAnswers] = useState([]); // Answers state for all questions
  const [score, setScore] = useState(null); // Score state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question index
  const [questions, setQuestions] = useState([]); // State to hold questions for the course

  // Ensure courseId is treated as a string
  const courseIdStr = String(courseId);

  // Use effect to load questions based on courseId
  useEffect(() => {
    if (courseIdStr && courseTests[courseIdStr]) {
      setQuestions(courseTests[courseIdStr]); // Load questions from courseTests data
    } else {
      console.error('Invalid courseId:', courseIdStr);
      setQuestions([]); // Set empty questions if courseId is invalid
    }
  }, [courseIdStr]);

  // Handle changes in answer
  const handleAnswerChange = (questionIndex, option) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = option;
    setAnswers(updatedAnswers);
  };

  // Handle the submission of the test
  const handleSubmit = () => {
    let correctAnswers = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        correctAnswers++;
      }
    });

    const score = (correctAnswers / questions.length) * 100;
    setScore(score);

    // Navigate to certificate page if score is above 85
    if (score >= 80) {
      alert('Congratulations! You passed the test.');
      navigate(`/certificate/${courseIdStr}`);
    } else {
      alert('You need to retake the test.');
    }
  };

  // Handle next question
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Handle previous question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div style={{ backgroundColor: 'rgb(29, 42, 70)', minHeight: '100vh' }}>
      <TestPageWrapper >
        <Heading>Test for Course ID: {courseIdStr}</Heading>
        {questions.length > 0 ? (
          <QuestionWrapper>
            <QuestionText>{questions[currentQuestionIndex].question}</QuestionText>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <OptionLabel key={index}>
                <OptionInput
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={option}
                  checked={answers[currentQuestionIndex] === option}
                  onChange={() => handleAnswerChange(currentQuestionIndex, option)}
                />
                {option}
              </OptionLabel>
            ))}

            <ButtonWrapper>
              <Button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
                Previous
              </Button>
              <Button onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>
                Next
              </Button>
            </ButtonWrapper>
          </QuestionWrapper>
        ) : (
          <p>Loading questions...</p>
        )}

        <ButtonWrapper>
          <Button onClick={handleSubmit}>Submit</Button>
        </ButtonWrapper>

        {score !== null && (
          <ScoreWrapper>
            <ScoreHeading>Your Score: {score}%</ScoreHeading>
            {score >= 85 ? (
              <SuccessMessage>🎉 You passed! 🎉</SuccessMessage>
            ) : (
              <FailureMessage>🔁 Please retake the test.</FailureMessage>
            )}
          </ScoreWrapper>
        )}
      </TestPageWrapper>
    </div>

  );
};

export default TestPage;
