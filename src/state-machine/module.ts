import { State, Instruction } from './interfaces';
import { InvalidInstructionFormatException, InvalidInstructionTypeException, UndefinedValueException } from '../game/exceptions';

// Instructions

const knownOperands = ['==', 'IS', 'IS_NOT', '!=', '>', '<', '>=', '<='];

const operands = {
  '==': (a, b) => a == b,
  'IS': (a, b) => a === b,
  'IS_NOT': (a, b) => a !== b,
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
  if (params.length !== 2 || !params[1]) {
    throw new InvalidInstructionFormatException('Invalid parameters', params);
  }
  const dice = parseInt(params[0]);
  if (isNaN(dice) || dice > 1000 || dice <= 0) {
    throw new InvalidInstructionFormatException('Invalid dice type', params[0]);
  }
  const value = Math.ceil(Math.random() * dice);
  set([params[1], value], state);
}

function evaluate(expression: string, state: State) {
  let output = null;

  let conditionals = [];
  let expressions = [];
  let results = [];
  let result = null;

  if (expression.indexOf('AND') !== -1) {
    expressions = expressions.concat(expression.split('AND'));
    conditionals.push('AND');
  }
  if (expression.indexOf('OR') !== -1) {
    expressions = expressions.concat(expression.split('OR'));
    conditionals.push('OR');
  }
  if (expressions.length === 0) {
    expressions.push(expression);
  }
  expressions.forEach(expression => {
    let leftValue = null;
    let rightValue = null;
    let operand = null;

    expression = expression.trim().split(' ');
    expression.forEach(term => {
      if (knownOperands.indexOf(term) !== -1) {
        if (!leftValue) {
          throw new InvalidInstructionFormatException(expression.join(' '));
        } else {
          operand = term;
        }
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
    })
    results.push(operands[operand](leftValue, rightValue));
  });
  if (conditionals.length) {
    conditionals.forEach((conditional, index) => {
      if (index + 1 > results.length) {
        throw new InvalidInstructionFormatException(expression);
      }
      if (conditional == 'AND') {
        results.push(results[index] && results[index + 1]);
      } else if (conditional == 'OR') {
        results.push(results[index] || results[index + 1]);
      }
    });
    return results.pop();
  } else {
    return results.shift();
  }
}

function ifInstruction(params: Array<string>, state: State) {
  const thenPosition = params.indexOf('THEN');
  const elsePosition = params.indexOf('ELSE');
  if (thenPosition === -1) {
    throw new InvalidInstructionFormatException('IF expression should contain an ELSE statement');
  } else {
    const ifExpression = params.slice(0, thenPosition);
    const result = evaluate(ifExpression.join(' '), state);
    if (result === true) {
      const thenExpression = (elsePosition !== -1) ? params.slice(thenPosition + 1, elsePosition) : params.slice(thenPosition + 1);
      StateMachine.process(thenExpression.join(' '), state);
    } else if (elsePosition !== -1) {
      const elseExpression = params.slice(elsePosition + 1);
      StateMachine.process(elseExpression.join(' '), state);
    }
  }
}

module StateMachine {
  const instructionTypes = {
    'GOTO': goto,
    'SET': set,
    'COPY': copy,
    'ROLL': roll,
    'IF': ifInstruction
  }

  export function handleInstruction(
    instruction: Instruction, state: State) {
    if (instructionTypes[instruction.type]) {
      instructionTypes[instruction.type](instruction.params, state);
    } else {
      throw new InvalidInstructionTypeException(instruction.type);
    }
  }

  export function process(instructionsString: string, state: State) {
    const instructions = instructionsString ? instructionsString.split(';') : [];
    instructions.forEach(instruction => {
      const splitInstruction = instruction.split(' ').filter(s => s.length);
      if (splitInstruction.length < 2) {
        throw new InvalidInstructionFormatException(instruction);
      }
      const type = splitInstruction.splice(0, 1)[0];
      const params = splitInstruction;
      handleInstruction({
        type: type,
        params: params
      }, state);
    });
    return state;
  }
}

export default StateMachine;
