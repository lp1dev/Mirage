import StateMachine from './module';
import { InvalidInstructionFormatException } from '../game/exceptions';

describe('State Machine', () => {
  it('Should allow to set the question state with goto', () => {
    const state = {};
    StateMachine.process('goto "GAME_INTRO"', state);
    expect(state['question']).toBe('GAME_INTRO');
  });
  //
  it('Should allow to set the question state with goto', () => {
    const state = {};
    StateMachine.process('goto "GAME_INTRO"', state);
    expect(state['question']).toBe('GAME_INTRO');
  });
  //
  it('Should allow to set the question state without an implicit goto', () => {
    const state = {};
    StateMachine.process('goto "GAME_INTRO"', state);
    expect(state['question']).toBe('GAME_INTRO');
  });
  //
  it('Should only take a goto with a parameter and throw otherwise', () => {
    expect(() => StateMachine.process('goto', {})).toThrow();
  });
  //
  it('Should allow to set a state variable with set', () => {
    const state = {};
    StateMachine.process('set life 100', state);
    StateMachine.process('set test "testString"', state);
    expect(state['life']).toBe(100);
    expect(state['test']).toBe('testString');
  });
  //
  it('Should allow to unset a state variable with unset', () => {
    const state = {};
    StateMachine.process('set life 100', state);
    StateMachine.process('unset life', state);
    expect(state['life']).toBe(undefined);
  });
  //
  it('Should only take a set instruction with exactly two parameter and throw otherwise', () => {
    expect(() => StateMachine.process('set', {})).toThrow();
    expect(() => StateMachine.process('set TEST 42 1', {})).toThrow();
  });
  //
  it('Should accept multiple inlined instructions', () => {
    const state = {};
    StateMachine.process('goto "GAME_INTRO"; set DONE true; set TEST 1', state);
    expect(state['DONE']).toBeTruthy();
    expect(state['TEST']).toBe(1);
  });
  //
  it('Should allow to copy variables with the copy instruction', () => {
    const state = {};
    StateMachine.process('set DONE true; copy DONE TEST', state);
    expect(state['DONE']).toBe('true');
    expect(state['TEST']).toBe('true');
  });
  //
  it('Should allow to roll a dice with the roll instruction', () => {
    const state = {};
    StateMachine.process('roll LUCK 20', state);
    expect(state['LUCK']).toBeDefined();
    expect(state['LUCK']).toBeGreaterThan(0);
    expect(state['LUCK']).toBeLessThanOrEqual(20);
  })
  //
  it('Should handle if else statements', () => {
    const state = {};
    StateMachine.process('set TEST 42', state);
    StateMachine.process('if TEST is 42 then goto CHAPTER_1', state);
    StateMachine.process('if TEST > 50 then set VAL 50 else set VAL 0', state);
    expect(state['question']).toBe('CHAPTER_1');
    expect(state['VAL']).toBe(0);
  })
  //
  it('Should handle if else statements with and and or conditionals', () => {
    const state = {};
    StateMachine.process('set TEST 42', state);
    StateMachine.process('set CHAPTER1 true', state);
    StateMachine.process('if TEST is 42 and CHAPTER1 == true then goto CHAPTER_1', state);
    expect(state['question']).toBe('CHAPTER_1');
  });
  //
  it('Should handle if else statements with multiple "and" and "or" conditionals', () => {
    const state = {
      'TEST': 42,
      'GAME_INTRO': 'false',
      'CHAPTER1': 'true'
    };
    StateMachine.process('if TEST is 42 and "GAME_INTRO" is true or CHAPTER1 is true then goto PASSED', state);
    expect(state['question']).toBe('PASSED');
  });
  it('Should handle >= > < <= conditionals', () => {
    const state = {
      'TEST': 42
    };
    StateMachine.process('if TEST > 41 then goto CHAPTER1', state);
    expect(state['question']).toBe('CHAPTER1');
    StateMachine.process('IF TEST < 43 then goto CHAPTER2', state);
    expect(state['question']).toBe('CHAPTER2');
  })
  it('should throw if an undefined variable is being evaluated', () => {
    const state = {};
    expect(() => { StateMachine.process('if test < 2 then goto noop else goto ok', state) }).toThrow();
  });
  //
  it('Should parse numbers as numbers if possible', () => {
    const state = {};
    StateMachine.process('set test 05 ', state);
    StateMachine.process('add test 01', state);
    expect(state['test']).toBe(6);
  });
  //
  it('Should handle if else if statements', () => {
    const state = {
      'TEST': 42,
      'GAME_INTRO': false,
      'CHAPTER1': true
    };
    StateMachine.process('if TEST is 0 then set DONE 0 else if GAME_INTRO is false then goto "PASSED"', state);
    expect(state['question']).toBe('PASSED');
  });
  //
  it('Should add numbers with add', () => {
    const state = {
      'B': 2,
      'C': 21
    };
    StateMachine.process('add A 42', state);
    StateMachine.process('add A B', state); // A = A + B   
    StateMachine.process('add C A', state); // C = C + A
    StateMachine.process('add C 5', state); // C = C + 5
    expect(state['C']).toBe(70);
  });
  //
  it('Should substract numbers with sub', () => {
    const state = {
      'A': 42,
      'B': 2,
      'C': 21
    };
    StateMachine.process('sub A B', state); // A = A - B
    StateMachine.process('sub A C', state); // A = A - C
    StateMachine.process('sub A 5', state); // A = A - 5
    expect(state['A']).toBe(14);
  });
});
