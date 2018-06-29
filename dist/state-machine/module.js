"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var exceptions_1 = require("../game/exceptions");
var knownOperands = ['==', 'IS', 'IS_NOT', '!=', '>', '<', '>=', '<='];
var operands = {
    '==': function (a, b) { return a == b; },
    'IS': function (a, b) { return a === b; },
    'IS_NOT': function (a, b) { return a !== b; },
    '!=': function (a, b) { return a !== b; },
    '>': function (a, b) { return a > b; },
    '<': function (a, b) { return a < b; },
    '>=': function (a, b) { return a >= b; },
    '<=': function (a, b) { return a <= b; }
};
function goto(params, state) {
    set(['question', params[0]], state);
}
function set(params, state) {
    if (params.length !== 2 || !params[1]) {
        throw new exceptions_1.InvalidInstructionFormatException('Invalid parameters', params);
    }
    state[params[0]] = params[1];
}
function copy(params, state) {
    if (params.length !== 2 || !params[1]) {
        throw new exceptions_1.InvalidInstructionFormatException('Invalid parameters', params);
    }
    set([params[1], state[params[0]]], state);
}
function roll(params, state) {
    if (params.length !== 2 || !params[1]) {
        throw new exceptions_1.InvalidInstructionFormatException('Invalid parameters', params);
    }
    var dice = parseInt(params[0]);
    if (isNaN(dice) || dice > 1000 || dice <= 0) {
        throw new exceptions_1.InvalidInstructionFormatException('Invalid dice type', params[0]);
    }
    var value = Math.ceil(Math.random() * dice);
    set([params[1], value], state);
}
function evaluate(expressionString, state) {
    var conditionals = [];
    var expressions = [[]];
    var results = [];
    expressionString.trim().split(' ').forEach(function (term) {
        if (term == 'AND' || term == 'OR') {
            expressions.push([]);
            conditionals.push(term);
        }
        else {
            expressions[expressions.length - 1].push(term);
        }
    });
    expressions.forEach(function (expression) {
        var leftValue = null;
        var rightValue = null;
        var operand = null;
        expression.forEach(function (term) {
            if (knownOperands.indexOf(term) !== -1) {
                if (!leftValue) {
                    throw new exceptions_1.InvalidInstructionFormatException(expression.join(' '));
                }
                operand = term;
            }
            else {
                var value = state[term] ? state[term] : term;
                if (!leftValue) {
                    leftValue = value;
                }
                else if (!rightValue) {
                    rightValue = value;
                }
                else {
                    throw new exceptions_1.InvalidInstructionFormatException(expression.join(' '));
                }
            }
        });
        results.push(operands[operand](leftValue, rightValue));
    });
    if (conditionals.length) {
        conditionals.forEach(function (conditional, index) {
            if (index + 1 > results.length) {
                throw new exceptions_1.InvalidInstructionFormatException(expressionString);
            }
            if (conditional == 'AND') {
                results.push(results[index] && results[index + 1]);
            }
            else if (conditional == 'OR') {
                results.push(results[index] || results[index + 1]);
            }
        });
    }
    return results.pop();
}
function ifInstruction(params, state) {
    var thenPosition = params.indexOf('THEN');
    var elsePosition = params.indexOf('ELSE');
    if (thenPosition === -1) {
        throw new exceptions_1.InvalidInstructionFormatException('IF expression should contain an ELSE statement');
    }
    else {
        var ifExpression = params.slice(0, thenPosition);
        var result = evaluate(ifExpression.join(' '), state);
        if (result === true) {
            var thenExpression = (elsePosition !== -1) ? params.slice(thenPosition + 1, elsePosition) : params.slice(thenPosition + 1);
            StateMachine.process(thenExpression.join(' '), state);
        }
        else if (elsePosition !== -1) {
            var elseExpression = params.slice(elsePosition + 1);
            StateMachine.process(elseExpression.join(' '), state);
        }
    }
}
function calc(type, params, state) {
    if (params.length !== 2) {
        throw new exceptions_1.InvalidInstructionFormatException([type].concat(params).join(' '));
    }
    var a = isNaN(parseInt(params[0])) ? state[params[0]] : parseInt(params[0]);
    var b = isNaN(parseInt(params[1])) ? state[params[1]] : parseInt(params[1]);
    if (!b) {
        throw new exceptions_1.UndefinedValueException(a ? a : b);
    }
    else if (!a) {
        state[params[0]] = a = 0;
    }
    switch (type) {
        case 'ADD':
            state[params[0]] = a + b;
            break;
        case 'SUB':
            state[params[0]] = a - b;
            break;
        case 'MUL':
            state[params[0]] = a * b;
            break;
    }
}
var StateMachine;
(function (StateMachine) {
    var instructionTypes = {
        'GOTO': goto,
        'SET': set,
        'COPY': copy,
        'ROLL': roll,
        'IF': ifInstruction,
        'ADD': function (params, state) { return calc('ADD', params, state); },
        'SUB': function (params, state) { return calc('SUB', params, state); },
        'MUL': function (params, state) { return calc('MUL', params, state); }
    };
    function handleInstruction(instruction, state) {
        if (instructionTypes[instruction.type]) {
            instructionTypes[instruction.type](instruction.params, state);
        }
        else {
            throw new exceptions_1.InvalidInstructionTypeException(instruction.type);
        }
    }
    StateMachine.handleInstruction = handleInstruction;
    function process(instructionsString, state) {
        var instructions = instructionsString ? instructionsString.split(';') : [];
        instructions.forEach(function (instruction) {
            var splitInstruction = instruction.split(' ').filter(function (s) { return s.length; });
            if (splitInstruction.length < 2) {
                if (instructionTypes[splitInstruction[0]]) {
                    throw new exceptions_1.InvalidInstructionFormatException('Missing parameter(s) in ' + instructionsString);
                }
                goto(splitInstruction, state);
                return state;
            }
            var type = splitInstruction.splice(0, 1)[0];
            var params = splitInstruction;
            handleInstruction({
                type: type,
                params: params
            }, state);
        });
        return state;
    }
    StateMachine.process = process;
})(StateMachine || (StateMachine = {}));
exports.default = StateMachine;
//# sourceMappingURL=module.js.map