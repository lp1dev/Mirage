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
    const question = builder.build(unparsedQuestions[0], {});
    expect(question).toBeDefined();
    expect(question.text).toBe(textData['T_GAME_INTRO']['EN_en']);
  });
  //
  it('should not build the answers in the "hide" section of the question', () => {
    const state = { 'coins': '4' };
    const unparsedQuestion = {
      id: 'TEST_QUESTION',
      text: 'T_TEST_QUESTION',
      answers: {
        'TEST_ANSWER1': 'T_TEST_ANSWER1',
        'TEST_ANSWER2': 'T_TEST_ANSWER2',
        'TEST_ANSWER3': 'T_TEST_ANSWER3',
        'TEST_ANSWER4': 'T_TEST_ANSWER4'
      },
      hide: {
        'TEST_ANSWER2': 'coins < 3',
        'TEST_ANSWER3': 'coins < 5',
        'TEST_ANSWER4': 'coins == 4'        
      }
    };
    const builder = new QuestionsBuilder(textLoader);
    const question = builder.build(unparsedQuestion, state);
    expect(question.answers['TEST_ANSWER3']).toBeUndefined();
    expect(question.answers['TEST_ANSWER2']).toBe('T_TEST_ANSWER2');
    expect(question.answers['TEST_ANSWER4']).toBeUndefined();
  })
});
