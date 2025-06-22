const Question = ({
  question,
  answer,
  onAnswer,
}: {
  question: any;
  answer: string;
  onAnswer: (value: string) => void;
}) => {
  if (question.question) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg shadow-sm flex flex-col gap-3">
        <div className="font-medium">
          {question.label}. {question.question}
        </div>
        <div className="flex gap-4 mt-2">
          <button
            className={`px-6 py-2 rounded-lg font-semibold border ${answer === "vrai" ? "bg-green-500 text-white" : "bg-white"}`}
            onClick={() => onAnswer("vrai")}
          >
            Vrai
          </button>
          <button
            className={`px-6 py-2 rounded-lg font-semibold border ${answer === "faux" ? "bg-red-500 text-white" : "bg-white"}`}
            onClick={() => onAnswer("faux")}
          >
            Faux
          </button>
        </div>
      </div>
    );
  }

  if (question.text && question.subparts) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg shadow-sm flex flex-col gap-3">
        <div className="font-medium">
          {question.label}. {question.text}
        </div>
        <div className="flex flex-col gap-2 mt-2">
          {question.subparts.map((sub: any) => (
            <button
              key={sub.label}
              className={`text-left px-4 py-2 rounded-lg border ${answer === sub.label ? "bg-blue-600 text-white" : "bg-white"}`}
              onClick={() => onAnswer(sub.label)}
            >
              <span className="font-bold mr-2">{sub.label}.</span> {sub.question}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (question.text) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg shadow-sm flex flex-col gap-3">
        <div className="font-medium">
          {question.label}. {question.text}
        </div>
        <textarea
          value={answer || ""}
          onChange={(e) => onAnswer(e.target.value)}
          rows={3}
          className="mt-2 p-2 border border-gray-300 rounded-lg"
        />
      </div>
    );
  }

  return null;
};

export default Question;
