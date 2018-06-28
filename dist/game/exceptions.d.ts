export declare class Exception {
    private params;
    type: string;
    constructor(...params: any[]);
    toString(): string;
}
declare class InvalidDataFormatException extends Exception {
    type: string;
}
declare class InvalidQuestionIdException extends Exception {
    type: string;
}
declare class InvalidTextIdException extends Exception {
    type: string;
}
declare class InvalidLocaleSpecifiedException extends Exception {
    type: string;
}
declare class InvalidStateException extends Exception {
    type: string;
}
declare class InvalidInstructionFormatException extends Exception {
    type: string;
}
declare class InvalidInstructionTypeException extends Exception {
    type: string;
}
declare class UndefinedValueException extends Exception {
    type: string;
}
export { InvalidDataFormatException, InvalidQuestionIdException, InvalidTextIdException, InvalidLocaleSpecifiedException, InvalidStateException, InvalidInstructionFormatException, InvalidInstructionTypeException, UndefinedValueException };
