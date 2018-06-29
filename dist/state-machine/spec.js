"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var module_1 = require("./module");
describe('State Machine', function () {
    it('Should allow to set the question state with GOTO', function () {
        var state = {};
        module_1.default.process('GOTO GAME_INTRO', state);
        expect(state['question']).toBe('GAME_INTRO');
    });
    it('Should allow to set the question state with GOTO', function () {
        var state = {};
        module_1.default.process('GOTO GAME_INTRO', state);
        expect(state['question']).toBe('GAME_INTRO');
    });
    it('Should allow to set the question state without an implicit GOTO', function () {
        var state = {};
        module_1.default.process('GAME_INTRO', state);
        expect(state['question']).toBe('GAME_INTRO');
    });
    it('Should only take a GOTO with a parameter and throw otherwise', function () {
        expect(function () { return module_1.default.process('GOTO', {}); }).toThrow();
    });
    it('Should allow to set a state variable with SET', function () {
        var state = {};
        module_1.default.process('SET LIFE 100', state);
        expect(state['LIFE']).toBe('100');
    });
    it('Should only take a SET with exactly two parameter and throw otherwise', function () {
        expect(function () { return module_1.default.process('SET', {}); }).toThrow();
        expect(function () { return module_1.default.process('SET TEST 42 1', {}); }).toThrow();
    });
    it('Should accept inlined multiple instructions', function () {
        var state = {};
        module_1.default.process('GOTO GAME_INTRO; SET DONE true;  SET TEST 1', state);
        expect(state['DONE']).toBeTruthy();
        expect(state['TEST']).toBe('1');
    });
    it('Should allow to copy variables with the COPY instruction', function () {
        var state = {};
        module_1.default.process('SET DONE true; COPY DONE TEST', state);
        expect(state['DONE']).toBe('true');
        expect(state['TEST']).toBe('true');
    });
    it('Should allow to roll a dice with the ROLL instruction', function () {
        var state = {};
        module_1.default.process('ROLL 20 LUCK', state);
        expect(state['LUCK']).toBeDefined();
        expect(state['LUCK']).toBeGreaterThan(0);
        expect(state['LUCK']).toBeLessThanOrEqual(20);
    });
    it('Should handle IF ELSE statements', function () {
        var state = {};
        module_1.default.process('SET TEST 42', state);
        module_1.default.process('IF TEST IS 42 THEN GOTO CHAPTER_1', state);
        module_1.default.process('IF TEST > 50 THEN SET VAL 50 ELSE SET VAL 0', state);
        expect(state['question']).toBe('CHAPTER_1');
        expect(state['VAL']).toBe('0');
    });
    it('Should handle IF ELSE statements with AND and OR conditionals', function () {
        var state = {};
        module_1.default.process('SET TEST 42', state);
        module_1.default.process('SET CHAPTER1 TRUE', state);
        module_1.default.process('IF TEST IS 42 AND CHAPTER1 == TRUE THEN GOTO CHAPTER_1', state);
        expect(state['question']).toBe('CHAPTER_1');
    });
    it('Should handle IF ELSE statements with multiple AND and OR conditionals', function () {
        var state = {
            'TEST': 42,
            'GAME_INTRO': 'FALSE',
            'CHAPTER1': 'TRUE'
        };
        module_1.default.process('IF TEST IS 42 AND GAME_INTRO IS TRUE OR CHAPTER1 IS TRUE THEN GOTO PASSED', state);
        expect(state['question']).toBe('PASSED');
    });
    it('Should handle >= > < <= conditionals', function () {
        var state = {
            'TEST': 42
        };
        module_1.default.process('IF TEST > 41 THEN GOTO CHAPTER1', state);
        expect(state['question']).toBe('CHAPTER1');
        module_1.default.process('IF TEST < 43 THEN GOTO CHAPTER2', state);
        expect(state['question']).toBe('CHAPTER2');
    });
    it('Should handle IF ELSE IF statements', function () {
        var state = {
            'TEST': 42,
            'GAME_INTRO': 'FALSE',
            'CHAPTER1': 'TRUE'
        };
        module_1.default.process('IF TEST IS 0 THEN SET DONE 0 ELSE IF GAME_INTRO IS FALSE THEN GOTO PASSED', state);
        expect(state['question']).toBe('PASSED');
    });
    it('Should add numbers with ADD', function () {
        var state = {
            'B': 2,
            'C': 21
        };
        module_1.default.process('ADD A 42', state);
        module_1.default.process('ADD A B', state);
        module_1.default.process('ADD C A', state);
        module_1.default.process('ADD C 5', state);
        expect(state['C']).toBe(70);
    });
    it('Should substract numbers with SUB', function () {
        var state = {
            'A': 42,
            'B': 2,
            'C': 21
        };
        module_1.default.process('SUB A B', state);
        module_1.default.process('SUB A C', state);
        module_1.default.process('SUB A 5', state);
        expect(state['A']).toBe(14);
    });
});
//# sourceMappingURL=spec.js.map