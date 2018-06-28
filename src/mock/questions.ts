const unparsedQuestions = [{
  id: 'GAME_INTRO',
  text: 'GAME_INTRO',
  answers: {
    'GAME_INTRO1': 'PRINT GAME_INTRO4',
    'GAME_INTRO2': 'GOTO CHAPTER1',
    'GAME_INTRO3': 'PRINT GAME_INTRO4'
  }
},{
  id: 'GAME_CHAPTER1',
  text: 'CHAPTER1',
  answers: {
    'CHAPTER1_1': 'GOTO CHAPTER1_3',
    'CHAPTER1_2': 'GOTO CHAPTER2'
  }
}];

export { unparsedQuestions };
