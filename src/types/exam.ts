export type ExamData = {
    subject: string;
    year: number;
    exam_type: string;
    questions: any[];
  };
  
  export type Answers = {
    [sectionNumber: string]: {
      [questionLabel: string]: string;
    };
  };
  