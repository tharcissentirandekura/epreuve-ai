
import Question from "./Questions";

const Section = ({
  section,
  answers,
  onAnswer,
}: {
  section: any;
  answers: { [questionLabel: string]: string };
  onAnswer: (qLabel: string, value: string) => void;
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 border-b pb-1">
        {section.number}. {section.title}
      </h2>
      <div className="space-y-6">
        {section.parts.map((part: any, idx: number) => (
          <Question
            key={idx}
            question={part}
            answer={answers[part.label]}
            onAnswer={(value) => onAnswer(part.label, value)}
          />
        ))}
      </div>
    </div>
  );
};

export default Section;
