import { Question } from "./interfaces";
declare class QuestionsBuilder {
    private textLoader;
    private cache;
    constructor(textLoader: any);
    build(question: Question): Question;
}
export default QuestionsBuilder;
