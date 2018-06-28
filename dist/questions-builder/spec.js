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
        var question = builder.build(questions_1.unparsedQuestions[0]);
        expect(question).toBeDefined();
        expect(question.text).toBe(texts_1.textData['GAME_INTRO']['EN_en']);
    });
});
//# sourceMappingURL=spec.js.map