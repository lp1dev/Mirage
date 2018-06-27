import { unparsedQuestions } from '../mock/questions';
import { textData } from '../mock/texts';
import QuestionsBuilder from './class';
import TextLoader from '../text-loader/class';

describe('Questions Builder', () => {
  const textLoader = new TextLoader(textData, 'EN_en');
  //
  it('should be instanciable', () => {
    const builder = new QuestionsBuilder(textLoader);
  });
  //
  it('should build questions', () => {
    const builder = new QuestionsBuilder(textLoader);
    const question = builder.build(unparsedQuestions[0]);
    expect(question).toBeDefined();
    expect(question.text).toBe(textData['GAME_INTRO']['EN_en']);
  });
});
