import AIFeedback from './AIFeedback';

const Question = ({
  question,
  answer,
  onAnswer,
  sectionNumber,
}: {
  question: any;
  answer: string;
  onAnswer: (value: string) => void;
  sectionNumber: string;
}) => {
  if (question.question) {
    return (
      <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
            {question.label}
          </div>
          <div className="flex-1">
            <p className="text-gray-800 font-medium text-lg leading-relaxed">
              {question.question}
            </p>
          </div>
        </div>
        
        <div className="flex gap-4 ml-12">
          <button
            className={`flex-1 px-6 py-4 rounded-xl font-semibold border-2 transition-all duration-200 transform hover:scale-105 ${
              answer === "vrai" 
                ? "bg-green-500 text-white border-green-500 shadow-lg" 
                : "bg-white text-gray-700 border-gray-200 hover:border-green-300 hover:bg-green-50 hover:shadow-md"
            }`}
            onClick={() => onAnswer("vrai")}
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Vrai
            </div>
          </button>
          <button
            className={`flex-1 px-6 py-4 rounded-xl font-semibold border-2 transition-all duration-200 transform hover:scale-105 ${
              answer === "faux" 
                ? "bg-red-500 text-white border-red-500 shadow-lg" 
                : "bg-white text-gray-700 border-gray-200 hover:border-red-300 hover:bg-red-50 hover:shadow-md"
            }`}
            onClick={() => onAnswer("faux")}
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Faux
            </div>
          </button>
        </div>

        <AIFeedback 
          sectionNumber={sectionNumber}
          questionLabel={question.label}
          userAnswer={answer}
          question={question}
        />
      </div>
    );
  }

  if (question.text && question.subparts) {
    return (
      <div className="bg-gradient-to-r from-gray-50 to-purple-50/30 rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
            {question.label}
          </div>
          <div className="flex-1">
            <p className="text-gray-800 font-medium text-lg leading-relaxed whitespace-pre-line">
              {question.text}
            </p>
          </div>
        </div>
        
        <div className="ml-12 space-y-3">
          {question.subparts.map((sub: any) => (
            <button
              key={sub.label}
              className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all duration-200 transform hover:scale-[1.02] ${
                answer === sub.label 
                  ? "bg-purple-600 text-white border-purple-600 shadow-lg" 
                  : "bg-white text-gray-700 border-gray-200 hover:border-purple-300 hover:bg-purple-50 hover:shadow-md"
              }`}
              onClick={() => onAnswer(sub.label)}
            >
              <div className="flex items-start gap-3">
                <span className={`flex-shrink-0 font-bold text-sm w-6 h-6 rounded-full flex items-center justify-center ${
                  answer === sub.label ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-700'
                }`}>
                  {sub.label}
                </span>
                <span className="flex-1 font-medium">{sub.question}</span>
                {answer === sub.label && (
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>

        <AIFeedback 
          sectionNumber={sectionNumber}
          questionLabel={question.label}
          userAnswer={answer}
          question={question}
        />
      </div>
    );
  }

  if (question.text) {
    return (
      <div className="bg-gradient-to-r from-gray-50 to-amber-50/30 rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-shrink-0 w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
            {question.label}
          </div>
          <div className="flex-1">
            <p className="text-gray-800 font-medium text-lg leading-relaxed whitespace-pre-line">
              {question.text}
            </p>
          </div>
        </div>
        
        <div className="ml-12">
          <textarea
            value={answer || ""}
            onChange={(e) => onAnswer(e.target.value)}
            rows={4}
            placeholder="Enter your answer here..."
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all duration-200 resize-none font-medium text-gray-700 placeholder-gray-400"
          />
          <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
            <span>Provide a detailed answer</span>
            <span>{answer?.length || 0} characters</span>
          </div>
        </div>

        <AIFeedback 
          sectionNumber={sectionNumber}
          questionLabel={question.label}
          userAnswer={answer}
          question={question}
        />
      </div>
    );
  }

  return null;
};

export default Question;