import { Question } from "./interfaces";
import { State } from '../state-machine/interfaces';
declare class QuestionsBuilder {
    private textLoader;
    private cache;
    constructor(textLoader: any);
    build(question: Question, state: State): Question;
}
export default QuestionsBuilder;
