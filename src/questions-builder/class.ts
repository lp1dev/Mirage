// import TextLoader from "../text-loader/class";
import { Question } from "./interfaces";

class QuestionsBuilder {
  private cache: Array<Question>;

  constructor(private textLoader: any) {
    this.cache = [];
  }

  build(question: Question) {
    if (this.cache[question.text] !== undefined) {
      return this.cache[question.text];
    }
    const builtQuestion: Question = {
      text: this.textLoader.get(question.text),
      answers: {}
    }
    for (let key in question.answers) {
      builtQuestion.answers[this.textLoader.get(key)] = question.answers[key];
    }
    this.cache[question.text] = builtQuestion;
    return builtQuestion;
  }
}

export default QuestionsBuilder;
