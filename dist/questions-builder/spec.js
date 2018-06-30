"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var questions_1 = require("../mock/questions");
var texts_1 = require("../mock/texts");
var class_1 = require("./class");
var class_2 = require("../text-loader/class");
describe('Questions Builder', function () {
    var textLoader = new class_2.default(texts_1.textData, 'EN_en');
    it('should be instanciable', function () {
        var builder = new class_1.default(textLoader);
    });
    it('should build questions', function () {
        var builder = new class_1.default(textLoader);
        var question = builder.build(questions_1.unparsedQuestions[0], {});
        expect(question).toBeDefined();
        expect(question.text).toBe(texts_1.textData['T_GAME_INTRO']['EN_en']);
    });
    it('should not build the answers in the "hide" section of the question', function () {
        var state = { 'coins': 4 };
        var unparsedQuestion = {
            id: 'TEST_QUESTION',
            text: 'T_TEST_QUESTION',
            answers: {
                'TEST_ANSWER1': 'T_TEST_ANSWER1',
                'TEST_ANSWER2': 'T_TEST_ANSWER2',
                'TEST_ANSWER3': 'T_TEST_ANSWER3'
            },
            hide: {
                'TEST_ANSWER2': 'coins < 3',
                'TEST_ANSWER3': 'coins < 5'
            }
        };
        var builder = new class_1.default(textLoader);
        var question = builder.build(unparsedQuestion, state);
        expect(question.answers['TEST_ANSWER3']).toBeUndefined();
        expect(question.answers['TEST_ANSWER2']).toBe('T_TEST_ANSWER2');
    });
});
//# sourceMappingURL=spec.js.map