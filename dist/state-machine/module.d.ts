import { State } from './interfaces';
declare module StateMachine {
    function handleInstruction(type: string, params: Array<string>, state: State): void;
    function process(instructionsString: string, state: State): State;
    function evaluate(expressionString: string, state: State): any;
}
export default StateMachine;
