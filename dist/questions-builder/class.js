"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var module_1 = require("../state-machine/module");
var QuestionsBuilder = (function () {
    function QuestionsBuilder(textLoader) {
        this.textLoader = textLoader;
        this.cache = [];
    }
    QuestionsBuilder.prototype.build = function (question, state) {
        var id = question.id || question.text;
        if (this.cache[id] !== undefined) {
            return this.cache[id];
        }
        var builtQuestion = {
            id: question.id,
            text: this.textLoader.get(question.text),
            answers: {}
        };
        if (question.expressions) {
            for (var _i = 0, _a = question.expressions; _i < _a.length; _i++) {
                var expression = _a[_i];
                module_1.default.process(expression, state);
            }
        }
        for (var answer in question.answers) {
            if (question.conditions && question.conditions[answer]) {
                if (module_1.default.evaluate(question.conditions[answer], state) === true) {
                    builtQuestion.answers[this.textLoader.get(answer)] = question.answers[answer];
                }
            }
            else {
                builtQuestion.answers[this.textLoader.get(answer)] = question.answers[answer];
            }
        }
        this.cache[id] = builtQuestion;
        return builtQuestion;
    };
    return QuestionsBuilder;
}());
exports.default = QuestionsBuilder;
//# sourceMappingURL=class.js.map