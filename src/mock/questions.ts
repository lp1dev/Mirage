const unparsedQuestions = [{
  id: 'GAME_INTRO',
  text: 'T_GAME_INTRO',
  answers: {
    'T_GAME_INTRO1': 'GAME_INTRO2',
    'T_GAME_INTRO2': 'CHAPTER1',
    'T_GAME_INTRO3': 'GAME_INTRO2'
  }
},{
  id: 'CHAPTER1',
  text: 'T_CHAPTER1',
  answers: {
    'T_CHAPTER1_1': 'set coins 3; CHAPTER1_3',
    'T_CHAPTER1_2': 'set coins 0; CHAPTER2'
  }
},{
  id: 'GAME_INTRO2',
  text: 'T_GAME_INTRO2',
  answers: {
    'T_GAME_INTRO2_1': 'CHAPTER1',
    'T_GAME_INTRO2_2': 'GAME_INTRO'
  },
  hide: {
    'T_GAME_INTRO2_1': 'if coins < 2'
  }
}];

export { unparsedQuestions };
