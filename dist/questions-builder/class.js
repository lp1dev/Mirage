"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QuestionsBuilder = (function () {
    function QuestionsBuilder(textLoader) {
        this.textLoader = textLoader;
        this.cache = [];
    }
    QuestionsBuilder.prototype.build = function (question) {
        var id = question.id || question.text;
        if (this.cache[id] !== undefined) {
            return this.cache[id];
        }
        var builtQuestion = {
            text: this.textLoader.get(question.text),
            answers: {}
        };
        for (var key in question.answers) {
            builtQuestion.answers[this.textLoader.get(key)] = question.answers[key];
        }
        this.cache[id] = builtQuestion;
        return builtQuestion;
    };
    return QuestionsBuilder;
}());
exports.default = QuestionsBuilder;
//# sourceMappingURL=class.js.map