import StateMachine from './module';
import { InvalidInstructionFormatException } from '../game/exceptions';

describe('State Machine', () => {
  it('Should throw an exception when an invalid instruction is given', () => {
    expect(() => StateMachine.process('NOOP', {})).toThrow();
  });
  //
  it('Should allow to set the question state with GOTO', () => {
    const state = {};
    StateMachine.process('GOTO GAME_INTRO', state);
    expect(state['question']).toBe('GAME_INTRO');
  });
  //
  it('Should only take a GOTO with a parameter and throw otherwise', () => {
    expect(() => StateMachine.process('GOTO', {})).toThrow();
  });
  //
  it('Should allow to set a state variable with SET', () => {
    const state = {};
    StateMachine.process('SET LIFE 100', state);
    expect(state['LIFE']).toBe('100');
  });
  //
  it('Should only take a SET with exactly two parameter and throw otherwise', () => {
    expect(() => StateMachine.process('SET', {})).toThrow();
    expect(() => StateMachine.process('SET TEST 42 1', {})).toThrow();
  });
  //
  it('Should accept inlined multiple instructions', () => {
    const state = {};
    StateMachine.process('GOTO GAME_INTRO; SET DONE true;  SET TEST 1', state);
    expect(state['DONE']).toBeTruthy();
    expect(state['TEST']).toBe('1');
  });
  //
  it('Should allow to copy variables with the COPY instruction', () => {
    const state = {};
    StateMachine.process('SET DONE true; COPY DONE TEST', state);
    expect(state['DONE']).toBe('true');
    expect(state['TEST']).toBe('true');
  });
  //
  it('Should allow to roll a dice with the ROLL instruction', () => {
    const state = {};
    StateMachine.process('ROLL 20 LUCK', state);
    expect(state['LUCK']).toBeDefined();
    expect(state['LUCK']).toBeGreaterThan(0);
    expect(state['LUCK']).toBeLessThanOrEqual(20);
  })
  //
  it('Should handle IF ELSE statements', () => {
    const state = {};
    StateMachine.process('SET TEST 42', state);
    StateMachine.process('IF TEST IS 42 THEN GOTO CHAPTER_1', state);
    StateMachine.process('IF TEST > 50 THEN SET VAL 50 ELSE SET VAL 0', state);
    expect(state['question']).toBe('CHAPTER_1');
    expect(state['VAL']).toBe('0');
  })
  //
  it('Should handle IF ELSE statements with AND and OR conditionals', () => {
    const state = {};
    StateMachine.process('SET TEST 42', state);
    StateMachine.process('SET CHAPTER1 TRUE', state);
    StateMachine.process('IF TEST IS 42 AND CHAPTER1 == TRUE THEN GOTO CHAPTER_1', state);
    expect(state['question']).toBe('CHAPTER_1');
  });
  //
  it('Should handle IF ELSE statements with multiple AND and OR conditionals', () => {
    const state = {
      'TEST': 42,
      'GAME_INTRO': 'FALSE',
      'CHAPTER1': 'TRUE'
    };
    StateMachine.process('IF TEST IS 42 AND GAME_INTRO IS TRUE OR CHAPTER1 IS TRUE THEN GOTO PASSED', state);
    expect(state['question']).toBe('PASSED');
  });
  it('Should handle >= > < <= conditionals', () => {
    const state = {
      'TEST': 42
    };
    StateMachine.process('IF TEST > 41 THEN GOTO CHAPTER1', state);
    expect(state['question']).toBe('CHAPTER1');
    StateMachine.process('IF TEST < 43 THEN GOTO CHAPTER2', state);
    expect(state['question']).toBe('CHAPTER2');
  })
  //
  it('Should handle IF ELSE IF statements', () => {
    const state = {
      'TEST': 42,
      'GAME_INTRO': 'FALSE',
      'CHAPTER1': 'TRUE'
    };
    StateMachine.process('IF TEST IS 0 THEN SET DONE 0 ELSE IF GAME_INTRO IS FALSE THEN GOTO PASSED', state);
    expect(state['question']).toBe('PASSED');
  });
  //
  it('Should add numbers with ADD', () => {
    const state = {
      'B': 2,
      'C': 21
    };
    StateMachine.process('ADD A 42', state);
    StateMachine.process('ADD A B', state); // A = A + B   
    StateMachine.process('ADD C A', state); // C = C + A
    StateMachine.process('ADD C 5', state); // C = C + 5
    expect(state['C']).toBe(70);
  });
  //
  it('Should substract numbers with SUB', () => {
    const state = {
      'A': 42,
      'B': 2,
      'C': 21
    };
    StateMachine.process('SUB A B', state); // A = A - B
    StateMachine.process('SUB A C', state); // A = A - C
    StateMachine.process('SUB A 5', state); // A = A - 5
    expect(state['A']).toBe(14);
  });
});
