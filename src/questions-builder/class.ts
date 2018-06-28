// import TextLoader from "../text-loader/class";
import { Question } from "./interfaces";

class QuestionsBuilder {
  private cache: Array<Question>;

  constructor(private textLoader: any) {
    this.cache = [];
  }

  build(question: Question) {
    const id = question.id || question.text;
    if (this.cache[id] !== undefined) {
      return this.cache[id];
    }
    const builtQuestion: Question = {
      text: this.textLoader.get(question.text),
      answers: {}
    }
    for (let key in question.answers) {
      builtQuestion.answers[this.textLoader.get(key)] = question.answers[key];
    }
    this.cache[id] = builtQuestion;
    return builtQuestion;
  }
}

export default QuestionsBuilder;
