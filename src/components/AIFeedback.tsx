import { useState } from 'react';
import { correctAnswers, detailedExplanations } from '../data/answers';

interface AIFeedbackProps {
  sectionNumber: string;
  questionLabel: string;
  userAnswer: string;
  question: any;
}

const AIFeedback = ({ sectionNumber, questionLabel, userAnswer, question }: AIFeedbackProps) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const getCorrectAnswer = () => {
    return correctAnswers[sectionNumber as keyof typeof correctAnswers]?.[questionLabel as keyof any];
  };

  const getDetailedExplanation = () => {
    return detailedExplanations[sectionNumber as keyof typeof detailedExplanations]?.[questionLabel as keyof any];
  };

  const correctAnswerData = getCorrectAnswer();
  const detailedExplanation = getDetailedExplanation();
  const isCorrect = userAnswer && correctAnswerData && userAnswer === correctAnswerData.answer;

  if (!userAnswer) return null;

  return (
    <div className="mt-4 space-y-3">
      {/* Feedback Toggle Button */}
      <button
        onClick={() => setShowFeedback(!showFeedback)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all duration-200 font-medium"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        {showFeedback ? 'Hide AI Feedback' : 'Get AI Feedback'}
      </button>

      {/* Feedback Content */}
      {showFeedback && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
          {correctAnswerData ? (
            <div className="space-y-3">
              {/* Correctness Indicator */}
              <div className={`flex items-center gap-2 p-3 rounded-lg ${
                isCorrect 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-orange-100 text-orange-800 border border-orange-200'
              }`}>
                {isCorrect ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold">Correct! Well done!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span className="font-semibold">Not quite right. Let me help!</span>
                  </>
                )}
              </div>

              {/* Correct Answer Display */}
              {!isCorrect && (
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Correct Answer:</div>
                  <div className="font-semibold text-gray-800">
                    {correctAnswerData.answer === 'vrai' ? '✓ Vrai' : 
                     correctAnswerData.answer === 'faux' ? '✗ Faux' : 
                     correctAnswerData.answer}
                  </div>
                </div>
              )}

              {/* AI Explanation */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold text-gray-800">AI Explanation</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{correctAnswerData.explanation}</p>
              </div>
            </div>
          ) : (
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span className="font-semibold text-gray-800">AI Analysis</span>
              </div>
              <p className="text-gray-700">
                This is an open-ended question. Your answer has been recorded. 
                {detailedExplanation && (
                  <span> Click below for detailed guidance on how to approach this type of problem.</span>
                )}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Detailed Explanation for Complex Questions */}
      {detailedExplanation && (
        <>
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 transition-all duration-200 font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            {showExplanation ? 'Hide Study Guide' : 'Show Study Guide'}
          </button>

          {showExplanation && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span className="font-semibold text-gray-800">Detailed Study Guide</span>
                </div>
                
                <div className="space-y-3">
                  <p className="text-gray-700 leading-relaxed">{detailedExplanation.explanation}</p>
                  
                  {detailedExplanation.subparts && (
                    <div className="space-y-2">
                      <div className="font-medium text-gray-800">Step-by-step approach:</div>
                      {Object.entries(detailedExplanation.subparts).map(([key, value]) => (
                        <div key={key} className="bg-gray-50 p-3 rounded-lg">
                          <div className="font-medium text-sm text-gray-600 mb-1">Part {key}:</div>
                          <div className="text-gray-700">{value as string}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AIFeedback;