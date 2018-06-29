import { State } from './interfaces';
declare module StateMachine {
    function handleInstruction(type: string, params: Array<string>, state: State): void;
    function process(instructionsString: string, state: State): State;
}
export default StateMachine;
