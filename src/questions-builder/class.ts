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
      answers: question.answers.map(answer => {
        const key = Object.keys(answer)[0];
        const text = this.textLoader.get(key);
        const obj : any = {};
        obj[text] = obj[key];
        return obj;
      })
    }
    this.cache[question.text] = builtQuestion;
    return builtQuestion;
  }
}

export default QuestionsBuilder;
