import { useEffect, useState } from "react";
import { data } from "./data/data";
import Question from "./components/Questions";
import type { ExamData, Answers } from "./types/exam";
const QUESTIONS_PER_PAGE = 2;


function App() {
  const [exam, setExam] = useState<ExamData | null>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

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

  if (!exam) return <div className="text-center p-8 bg-gray-100">Loading...</div>;

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

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h1 className="text-3xl font-bold mb-4 text-center">
        {exam.subject} - {exam.year} ({exam.exam_type})
      </h1>

      <div className="flex justify-between items-center mb-4">
        <span className="font-semibold text-blue-700">Section {section.number}: {section.title}</span>
        <div className="flex gap-2 items-center">
          <span className="text-sm text-gray-600">Progress:</span>
          <div className="w-32 bg-gray-200 rounded-full h-3">
            <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-sm text-gray-700">{progress}%</span>
        </div>
      </div>

      <div className="space-y-6">
        {visibleQuestions.map((part: any) => (
          <Question
            key={part.label}
            question={part}
            answer={answers[section.number]?.[part.label]}
            onAnswer={(value) => handleAnswer(section.number, part.label, value)}
          />
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={handlePrev} disabled={currentPage === 0 && currentSectionIdx === 0} className="btn">
          Previous
        </button>
        {!isLastPage ? (
          <button onClick={handleNext} className="btn-primary">Next</button>
        ) : (
          <button onClick={() => alert(JSON.stringify(answers, null, 2))} className="btn-success">
            Submit
          </button>
        )}
      </div>

      <p className="mt-4 text-center text-sm text-gray-500">
        Page {currentPage + 1} of {totalPages}, Section {currentSectionIdx + 1} of {exam.questions.length}
      </p>
    </div>
  );
}

export default App;
