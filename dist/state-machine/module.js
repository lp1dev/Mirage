"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var exceptions_1 = require("../game/exceptions");
var knownOperands = ['==', 'is', 'isn\'t', '!=', '>', '<', '>=', '<='];
var operands = {
    '==': function (a, b) { return a == b; },
    'is': function (a, b) { return a === b; },
    'isn\'t': function (a, b) { return a !== b; },
    '!=': function (a, b) { return a !== b; },
    '>': function (a, b) { return a > b; },
    '<': function (a, b) { return a < b; },
    '>=': function (a, b) { return a >= b; },
    '<=': function (a, b) { return a <= b; }
};
function goto(params, state) {
    if (!/^("|')(\w+)('|")/g.test(params[0])) {
        params[0] = "\"" + params[0] + "\"";
    }
    set(['question', params[0]], state);
}
function set(params, state) {
    if (params.length !== 2 || !params[1]) {
        throw new exceptions_1.InvalidInstructionFormatException('Invalid parameters', params);
    }
    var value = StateMachine.bind(params[1], state);
    state[params[0]] = value;
}
function copy(params, state) {
    if (params.length !== 2 || !params[1]) {
        throw new exceptions_1.InvalidInstructionFormatException('Invalid parameters', params);
    }
    set([params[1], state[params[0]]], state);
}
function roll(params, state) {
    if (params.length !== 2 || !params[0]) {
        throw new exceptions_1.InvalidInstructionFormatException('Invalid parameters', params);
    }
    var dice = parseInt(params[1]);
    if (isNaN(dice) || dice > 1000 || dice <= 0) {
        throw new exceptions_1.InvalidInstructionFormatException('Invalid dice type', params[0]);
    }
    var value = Math.ceil(Math.random() * dice);
    set([params[0], value], state);
}
function ifInstruction(params, state) {
    var thenPosition = params.indexOf('then');
    var elsePosition = params.indexOf('else');
    if (thenPosition === -1) {
        throw new exceptions_1.InvalidInstructionFormatException('if expression should contain an else statement');
    }
    else {
        var ifExpression = params.slice(0, thenPosition);
        var result = StateMachine.evaluate(ifExpression.join(' '), state);
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
    var a = isNaN(parseInt(params[0])) ? state[params[0]] || 0 : parseInt(params[0]);
    var b = isNaN(parseInt(params[1])) ? state[params[1]] || 0 : parseInt(params[1]);
    if (!b) {
        throw new exceptions_1.UndefinedValueException(a ? a : b);
    }
    else if (!a) {
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
var StateMachine;
(function (StateMachine) {
    var instructionTypes = {
        'goto': goto,
        'set': set,
        'copy': copy,
        'roll': roll,
        'if': ifInstruction,
        'add': function (params, state) { return calc('add', params, state); },
        'sub': function (params, state) { return calc('sub', params, state); },
        'mul': function (params, state) { return calc('mul', params, state); }
    };
    function handleInstruction(type, params, state) {
        type = type.toLowerCase();
        if (instructionTypes[type]) {
            instructionTypes[type](params, state);
        }
        else {
            throw new exceptions_1.InvalidInstructionTypeException(type);
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
            var type = splitInstruction.shift();
            var params = splitInstruction;
            handleInstruction(type, params, state);
        });
        return state;
    }
    StateMachine.process = process;
    function bind(value, state) {
        if (state[value] !== undefined) {
            value = state[value];
        }
        else if (/^("|')(\w+)('|")/g.test(value)) {
            value = value.replace(/("|')/g, '');
        }
        else if (['true', 'false'].indexOf(value) !== -1) {
            value = value === "false" ? false : value;
            value = value === "false" ? false : value;
        }
        else if (!isNaN(value)) {
            value = parseInt(value);
        }
        else {
            throw new exceptions_1.UndefinedValueException(value);
        }
        return value;
    }
    StateMachine.bind = bind;
    function compare(operand, leftTerm, rightTerm, state) {
        leftTerm = StateMachine.bind(leftTerm, state);
        rightTerm = StateMachine.bind(rightTerm, state);
        return operands[operand](leftTerm, rightTerm);
    }
    function evaluate(expressionString, state) {
        var conditionals = [];
        var expressions = [[]];
        var results = [];
        expressionString.trim().split(' ').forEach(function (term) {
            if (term == 'and' || term == 'or') {
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
                    if (!leftValue) {
                        leftValue = term;
                    }
                    else if (!rightValue) {
                        rightValue = term;
                    }
                    else {
                        throw new exceptions_1.InvalidInstructionFormatException(expression.join(' '));
                    }
                }
            });
            results.push(compare(operand, leftValue, rightValue, state));
        });
        if (conditionals.length) {
            conditionals.forEach(function (conditional, index) {
                if (index + 1 > results.length) {
                    throw new exceptions_1.InvalidInstructionFormatException(expressionString);
                }
                if (conditional == 'and') {
                    results.push(results[index] && results[index + 1]);
                }
                else if (conditional == 'or') {
                    results.push(results[index] || results[index + 1]);
                }
            });
        }
        return results.pop();
    }
    StateMachine.evaluate = evaluate;
})(StateMachine || (StateMachine = {}));
exports.default = StateMachine;
//# sourceMappingURL=module.js.map