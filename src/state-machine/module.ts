import { State } from './interfaces';
import { InvalidInstructionFormatException, InvalidInstructionTypeException, UndefinedValueException } from '../game/exceptions';

// Instructions

const knownOperands = ['==', 'is', 'isn\'t', '!=', '>', '<', '>=', '<='];

const operands = {
  '==': (a, b) => a == b,
  'is': (a, b) => a === b,
  'isn\'t': (a, b) => a !== b,
  '!=': (a, b) => a !== b,
  '>': (a, b) => a > b,
  '<': (a, b) => a < b,
  '>=': (a, b) => a >= b,
  '<=': (a, b) => a <= b
};

function goto(params: Array<string>, state: State) {
  set(['question', params[0]], state);
}

function set(params: Array<any>, state: State) {
  if (params.length !== 2 || !params[1]) {
    throw new InvalidInstructionFormatException('Invalid parameters', params);
  }
  state[params[0]] = params[1];
}

function copy(params: Array<string>, state: State) {
  if (params.length !== 2 || !params[1]) {
    throw new InvalidInstructionFormatException('Invalid parameters', params);
  }
  set([params[1], state[params[0]]], state);
}

function roll(params: Array<string>, state: State) {
  if (params.length !== 2 || !params[0]) {
    throw new InvalidInstructionFormatException('Invalid parameters', params);
  }
  const dice = parseInt(params[1]);
  if (isNaN(dice) || dice > 1000 || dice <= 0) {
    throw new InvalidInstructionFormatException('Invalid dice type', params[0]);
  }
  const value = Math.ceil(Math.random() * dice);
  set([params[0], value], state);
}

function ifInstruction(params: Array<string>, state: State) {
  const thenPosition = params.indexOf('then');
  const elsePosition = params.indexOf('else');
  if (thenPosition === -1) {
    throw new InvalidInstructionFormatException('if expression should contain an else statement');
  } else {
    const ifExpression = params.slice(0, thenPosition);
    const result = StateMachine.evaluate(ifExpression.join(' '), state);
    if (result === true) {
      const thenExpression = (elsePosition !== -1) ? params.slice(thenPosition + 1, elsePosition) : params.slice(thenPosition + 1);
      StateMachine.process(thenExpression.join(' '), state);
    } else if (elsePosition !== -1) {
      const elseExpression = params.slice(elsePosition + 1);
      StateMachine.process(elseExpression.join(' '), state);
    }
  }
}

function calc(type: string, params: Array<string>, state: State) {
  if (params.length !== 2) {
    throw new InvalidInstructionFormatException([type, ...params].join(' '));
  }
  let a = isNaN(parseInt(params[0])) ? state[params[0]] : parseInt(params[0]);
  const b = isNaN(parseInt(params[1])) ? state[params[1]] : parseInt(params[1]);
  if (!b) {
    throw new UndefinedValueException(a ? a : b);
  } else if (!a) {
    state[params[0]] = a = 0;
  }
  switch (type) {
    case 'add':
      state[params[0]] = a + b;
      break;
    case 'sub':
      state[params[0]] = a - b;
      break;
    case 'mul':
      state[params[0]] = a * b;
      break;
  }
}

module StateMachine {
  const instructionTypes = {
    'goto': goto,
    'set': set,
    'copy': copy,
    'roll': roll,
    'if': ifInstruction,
    'add': (params, state) => calc('add', params, state),
    'sub': (params, state) => calc('sub', params, state),
    'mul': (params, state) => calc('mul', params, state)
  }

  export function handleInstruction(type: string, params: Array<string>, state: State) {
    type = type.toLowerCase();
    if (instructionTypes[type]) {
      instructionTypes[type](params, state);
    } else {
      throw new InvalidInstructionTypeException(type);
    }
  }

  export function process(instructionsString: string, state: State) {
    const instructions = instructionsString ? instructionsString.split(';') : [];
    instructions.forEach(instruction => {
      const splitInstruction = instruction.split(' ').filter(s => s.length);
      if (splitInstruction.length < 2) {
        if (instructionTypes[splitInstruction[0]]) {
          throw new InvalidInstructionFormatException('Missing parameter(s) in ' + instructionsString);
        }
        goto(splitInstruction, state);
        return state;
      }
      const type = splitInstruction.shift();
      const params = splitInstruction;
      handleInstruction(type, params, state);
    });
    return state;
  }


  export function evaluate(expressionString: string, state: State) {
    let conditionals = [];
    let expressions = [[]];
    let results = [];

    expressionString.trim().split(' ').forEach(term => {
      if (term == 'and' || term == 'or') {
        expressions.push([]);
        conditionals.push(term);
      } else {
        expressions[expressions.length - 1].push(term);
      }
    });
    expressions.forEach(expression => {
      let leftValue = null;
      let rightValue = null;
      let operand = null;

      expression.forEach(term => {
        if (knownOperands.indexOf(term) !== -1) {
          if (!leftValue) {
            throw new InvalidInstructionFormatException(expression.join(' '));
          }
          operand = term;
        } else {
          const value = state[term] ? state[term] : term;
          if (!leftValue) {
            leftValue = value;
          } else if (!rightValue) {
            rightValue = value;
          } else {
            throw new InvalidInstructionFormatException(expression.join(' '));
          }
        }
      });
      results.push(operands[operand](leftValue, rightValue));
    });
    if (conditionals.length) {
      conditionals.forEach((conditional, index) => {
        if (index + 1 > results.length) {
          throw new InvalidInstructionFormatException(expressionString);
        }
        if (conditional == 'and') {
          results.push(results[index] && results[index + 1]);
        } else if (conditional == 'or') {
          results.push(results[index] || results[index + 1]);
        }
      });
    }
    return results.pop();
  }
}

export default StateMachine;
