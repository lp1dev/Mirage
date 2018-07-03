import { State } from './interfaces';
declare module StateMachine {
    function handleInstruction(type: string, params: Array<string>, state: State): void;
    function process(instructionsString: string, state: State): State;
    function bind(value: any, state: any): any;
    function evaluate(expressionString: string, state: State): boolean;
}
export default StateMachine;
