import StateMachine from './module';

describe('State Machine', () => {
  //
  it('Should allow to set the question state with GOTO', () => {
    const state = {};
    StateMachine.process('GOTO GAME_INTRO', state);
    expect(state['question']).toBe('GAME_INTRO');
  })
});
