import { Question } from "./interfaces";
import { State } from '../state-machine/interfaces';
import StateMachine from '../state-machine/module';

class QuestionsBuilder {
  private cache: Array<Question>;

  constructor(private textLoader: any) {
    this.cache = [];
  }

  build(question: Question, state: State) {
    const id = question.id || question.text;
    if (this.cache[id] !== undefined) {
      return this.cache[id];
    }
    const builtQuestion: Question = {
      id: question.id,
      text: this.textLoader.get(question.text),
      answers: {}
    }
    for (let answer in question.answers) {
      if (!question.hide ||
          !question.hide[answer] ||
          StateMachine.evaluate(question.hide[answer], state) === false) {
            builtQuestion.answers[this.textLoader.get(answer)] = question.answers[answer];
      }
    }
    this.cache[id] = builtQuestion;
    return builtQuestion;
  }
}

export default QuestionsBuilder;
