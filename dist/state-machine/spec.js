"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var module_1 = require("./module");
describe('State Machine', function () {
    it('Should allow to set the question state with goto', function () {
        var state = {};
        module_1.default.process('goto "GAME_INTRO"', state);
        expect(state['question']).toBe('GAME_INTRO');
    });
    it('Should allow to set the question state with goto', function () {
        var state = {};
        module_1.default.process('goto "GAME_INTRO"', state);
        expect(state['question']).toBe('GAME_INTRO');
    });
    it('Should allow to set the question state without an implicit goto', function () {
        var state = {};
        module_1.default.process('goto "GAME_INTRO"', state);
        expect(state['question']).toBe('GAME_INTRO');
    });
    it('Should only take a goto with a parameter and throw otherwise', function () {
        expect(function () { return module_1.default.process('goto', {}); }).toThrow();
    });
    it('Should allow to set a state variable with set', function () {
        var state = {};
        module_1.default.process('set life 100', state);
        module_1.default.process('set test "testString"', state);
        expect(state['life']).toBe(100);
        expect(state['test']).toBe('testString');
    });
    it('Should allow to unset a state variable with unset', function () {
        var state = {};
        module_1.default.process('set life 100', state);
        module_1.default.process('unset life', state);
        expect(state['life']).toBe(undefined);
    });
    it('Should only take a set instruction with exactly two parameter and throw otherwise', function () {
        expect(function () { return module_1.default.process('set', {}); }).toThrow();
        expect(function () { return module_1.default.process('set TEST 42 1', {}); }).toThrow();
    });
    it('Should accept multiple inlined instructions', function () {
        var state = {};
        module_1.default.process('goto "GAME_INTRO"; set DONE true; set TEST 1', state);
        expect(state['DONE']).toBeTruthy();
        expect(state['TEST']).toBe(1);
    });
    it('Should allow to copy variables with the copy instruction', function () {
        var state = {};
        module_1.default.process('set DONE true; copy DONE TEST', state);
        expect(state['DONE']).toBe('true');
        expect(state['TEST']).toBe('true');
    });
    it('Should allow to roll a dice with the roll instruction', function () {
        var state = {};
        module_1.default.process('roll LUCK 20', state);
        expect(state['LUCK']).toBeDefined();
        expect(state['LUCK']).toBeGreaterThan(0);
        expect(state['LUCK']).toBeLessThanOrEqual(20);
    });
    it('Should handle if else statements', function () {
        var state = {};
        module_1.default.process('set TEST 42', state);
        module_1.default.process('if TEST is 42 then goto CHAPTER_1', state);
        module_1.default.process('if TEST > 50 then set VAL 50 else set VAL 0', state);
        expect(state['question']).toBe('CHAPTER_1');
        expect(state['VAL']).toBe(0);
    });
    it('Should handle if else statements with and and or conditionals', function () {
        var state = {};
        module_1.default.process('set TEST 42', state);
        module_1.default.process('set CHAPTER1 true', state);
        module_1.default.process('if TEST is 42 and CHAPTER1 == true then goto CHAPTER_1', state);
        expect(state['question']).toBe('CHAPTER_1');
    });
    it('Should handle if else statements with multiple "and" and "or" conditionals', function () {
        var state = {
            'TEST': 42,
            'GAME_INTRO': 'false',
            'CHAPTER1': 'true'
        };
        module_1.default.process('if TEST is 42 and "GAME_INTRO" is true or CHAPTER1 is true then goto PASSED', state);
        expect(state['question']).toBe('PASSED');
    });
    it('Should handle >= > < <= conditionals', function () {
        var state = {
            'TEST': 42
        };
        module_1.default.process('if TEST > 41 then goto CHAPTER1', state);
        expect(state['question']).toBe('CHAPTER1');
        module_1.default.process('IF TEST < 43 then goto CHAPTER2', state);
        expect(state['question']).toBe('CHAPTER2');
    });
    it('should throw if an undefined variable is being evaluated', function () {
        var state = {};
        expect(function () { module_1.default.process('if test < 2 then goto noop else goto ok', state); }).toThrow();
    });
    it('Should parse numbers as numbers if possible', function () {
        var state = {};
        module_1.default.process('set test 05 ', state);
        module_1.default.process('add test 01', state);
        expect(state['test']).toBe(6);
    });
    it('Should handle if else if statements', function () {
        var state = {
            'TEST': 42,
            'GAME_INTRO': false,
            'CHAPTER1': true
        };
        module_1.default.process('if TEST is 0 then set DONE 0 else if GAME_INTRO is false then goto "PASSED"', state);
        expect(state['question']).toBe('PASSED');
    });
    it('Should add numbers with add', function () {
        var state = {
            'B': 2,
            'C': 21
        };
        module_1.default.process('add A 42', state);
        module_1.default.process('add A B', state);
        module_1.default.process('add C A', state);
        module_1.default.process('add C 5', state);
        expect(state['C']).toBe(70);
    });
    it('Should substract numbers with sub', function () {
        var state = {
            'A': 42,
            'B': 2,
            'C': 21
        };
        module_1.default.process('sub A B', state);
        module_1.default.process('sub A C', state);
        module_1.default.process('sub A 5', state);
        expect(state['A']).toBe(14);
    });
});
//# sourceMappingURL=spec.js.map