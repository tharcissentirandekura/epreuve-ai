import { useEffect, useState } from "react";
import { data } from "./data/data";
import Question from "./components/Questions";
import GeminiChat from "./components/GeminiChat";
import type { ExamData, Answers } from "./types/exam";

const QUESTIONS_PER_PAGE = 2;

function App() {
  const [exam, setExam] = useState<ExamData | null>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    setExam(data.data);
  }, []);

  const handleAnswer = (
    sectionNumber: string,
    questionLabel: string,
    value: string
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [sectionNumber]: {
        ...prev[sectionNumber],
        [questionLabel]: value,
      },
    }));
  };

  if (!exam) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading exam...</p>
        </div>
      </div>
    );
  }

  const section = exam.questions[currentSectionIdx];
  const totalQuestions = section.parts.length;
  const totalPages = Math.ceil(totalQuestions / QUESTIONS_PER_PAGE);
  const startIdx = currentPage * QUESTIONS_PER_PAGE;
  const visibleQuestions = section.parts.slice(startIdx, startIdx + QUESTIONS_PER_PAGE);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((p) => p + 1);
    } else if (currentSectionIdx < exam.questions.length - 1) {
      setCurrentSectionIdx((s) => s + 1);
      setCurrentPage(0);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((p) => p - 1);
    } else if (currentSectionIdx > 0) {
      const prevSection = exam.questions[currentSectionIdx - 1];
      const prevPages = Math.ceil(prevSection.parts.length / QUESTIONS_PER_PAGE);
      setCurrentSectionIdx((s) => s - 1);
      setCurrentPage(prevPages - 1);
    }
  };

  const isLastPage = currentSectionIdx === exam.questions.length - 1 && currentPage === totalPages - 1;
  const progress = Math.round(
    (Object.values(answers[section.number] || {}).filter(Boolean).length / totalQuestions) * 100
  );

  const totalAnswered = Object.values(answers).reduce((total, sectionAnswers) => {
    return total + Object.values(sectionAnswers || {}).filter(Boolean).length;
  }, 0);

  const totalQuestionsCount = exam.questions.reduce((total, section) => {
    return total + section.parts.length;
  }, 0);

  const overallProgress = Math.round((totalAnswered / totalQuestionsCount) * 100);

  // Get current question for chat context
  const getCurrentQuestion = () => {
    if (visibleQuestions.length > 0) {
      return visibleQuestions[0]; // Pass the first visible question as context
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              {exam.subject}
            </h1>
            <p className="text-xl text-gray-600 font-medium">
              {exam.year} • {exam.exam_type}
            </p>
            <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span>AI-powered feedback and explanations available</span>
              </div>
              <button
                onClick={() => setIsChatOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Chat with AI Tutor
              </button>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">Overall Progress</span>
              <span className="text-sm font-bold text-blue-600">{totalAnswered}/{totalQuestionsCount} answered</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${overallProgress}%` }} 
              />
            </div>
            <div className="text-right mt-1">
              <span className="text-sm font-bold text-gray-700">{overallProgress}%</span>
            </div>
          </div>

          {/* Section Navigation */}
          <div className="flex flex-wrap gap-2 justify-center">
            {exam.questions.map((sec, idx) => (
              <button
                key={sec.number}
                onClick={() => {
                  setCurrentSectionIdx(idx);
                  setCurrentPage(0);
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  idx === currentSectionIdx
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                }`}
              >
                Section {sec.number}
              </button>
            ))}
          </div>
        </div>

        {/* Current Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Section Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">
                  Section {section.number}
                </h2>
                <p className="text-blue-100 text-lg">{section.title}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsChatOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200 font-medium"
                  title="Ask AI for help"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Need Help?
                </button>
                <div className="text-right">
                  <div className="text-sm opacity-90 mb-1">Section Progress</div>
                  <div className="text-2xl font-bold">{progress}%</div>
                </div>
              </div>
            </div>

            {/* Section Progress Bar */}
            <div className="w-full bg-blue-400/30 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${progress}%` }} 
              />
            </div>
          </div>

          {/* Questions */}
          <div className="p-8">
            <div className="space-y-8">
              {visibleQuestions.map((part: any) => (
                <Question
                  key={part.label}
                  question={part}
                  answer={answers[section.number]?.[part.label]}
                  onAnswer={(value) => handleAnswer(section.number, part.label, value)}
                  sectionNumber={section.number}
                />
              ))}
            </div>
          </div>

          {/* Navigation Footer */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <button 
                onClick={handlePrev} 
                disabled={currentPage === 0 && currentSectionIdx === 0}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md disabled:hover:bg-gray-200 disabled:hover:shadow-none"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              <div className="text-center">
                <div className="text-sm text-gray-500 mb-1">
                  Page {currentPage + 1} of {totalPages}
                </div>
                <div className="text-xs text-gray-400">
                  Section {currentSectionIdx + 1} of {exam.questions.length}
                </div>
              </div>

              {!isLastPage ? (
                <button 
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:scale-105"
                >
                  Next
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <button 
                  onClick={() => {
                    const formattedAnswers = JSON.stringify(answers, null, 2);
                    alert(`Exam completed!\n\nYour answers:\n${formattedAnswers}`);
                  }}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all duration-200 bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 hover:shadow-lg transform hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Submit Exam
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Gemini Chat Modal */}
      <GeminiChat 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        currentQuestion={getCurrentQuestion()}
        currentSection={section.number}
      />

      {/* Floating Chat Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center transform hover:scale-110 z-40"
          title="Chat with AI Tutor"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default App;