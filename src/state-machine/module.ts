import { State, Instruction } from './interfaces';
import { InvalidInstructionFormatException, InvalidInstructionTypeException } from '../game/exceptions';

// Instructions

function goto(params: Array<string>, state: State) {
  state['question'] = params[0];
}

module StateMachine {
  const instructionTypes = {
    'GOTO': goto
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
      const splitInstruction = instruction.split(' ');
      if (splitInstruction.length !== 2) {
        throw new InvalidInstructionFormatException(instruction);
      }
      handleInstruction({ 
        type: splitInstruction[0], 
        params: splitInstruction[1].split(' ')
      }, state);
    });
    return state;
  }
}

export default StateMachine;
