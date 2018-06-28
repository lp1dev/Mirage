import { State, Instruction } from './interfaces';
declare module StateMachine {
    function handleInstruction(instruction: Instruction, state: State): void;
    function process(instructionsString: string, state: State): State;
}
export default StateMachine;
