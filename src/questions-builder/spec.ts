import mockLoader from './mock';
import QuestionsBuilder from './class';

describe('Questions Builder', () => {
  //
  it('should be instanciable', () => {
    const builder = new QuestionsBuilder(mockLoader);
  });
  //
  it('should build questions', () => {
    const builder = new QuestionsBuilder(mockLoader);
    const question = builder.build({
      text: 'GAME_INTRO',
      answers: [{
        'GAME_INTRO1': 'PRINT GAME_INTRO4',
        'GAME_INTRO2': 'PRINT GAME_INTRO',
        'GAME_INTRO3': 'PRINT GAME_INTRO'
      }]
    })
    expect(question).toBeDefined();
  });
});
