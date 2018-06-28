# State Machine

## Module

Instruction types :
  - **GOTO {QUESTION_ID}** - Set the current question to QUESTION_ID
  - **SET {VARIABLE} {VALUE}** - Set VARIABLE to VALUE
  - **COPY {VARIABLE1} {VARIABLE2}** -  Set VARIABLE1 to VARIABLE2's value
  - **ROLL {DICE} {VARIABLE}** - Return a random number between 1 and DICE and put it in VARIABLE 
  - **IF {EXPRESSION} THEN {EXPRESSION} ELSE {EXPRESION}**
  - **ADD {VARIABLE} {NUMBER}** - Add NUMBER to VARIABLE
  - **SUB {VARIABLE} {NUMBER}** - Substract NUMBER from VARIABLE
  - **MUL {VARIABLE} {NUMBER}** - Multiply VARIABLE with NUMBER

```
module StateMachine {

  /*
    Process the string containing an instruction
  */
  export function process(instructionsString: string, state: State) {
  }
}
```

## Example

```
const state = {};
StateMachine.process('SET TEST TRUE');
```

## Interfaces

```
interface State {
  [any: string]: any
};

interface Instruction {
  type: string;
  params?: Array<string>;
}

```