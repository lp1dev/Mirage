"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var exceptions_1 = require("./exceptions");
var class_1 = require("../text-loader/class");
var class_2 = require("../questions-builder/class");
var module_1 = require("../state-machine/module");
var Game = (function () {
    function Game(gameData, textData, locale, saveData) {
        if (textData === void 0) { textData = {}; }
        if (locale === void 0) { locale = 'EN_en'; }
        this.gameData = gameData;
        this.textData = textData;
        this.locale = locale;
        this.saveData = saveData;
        this.gameData = gameData;
        this.saveData = this.saveData ? this.saveData : { question: 0, state: {} };
        this.state = this.saveData.state;
        this.textLoader = new class_1.default(this.textData, locale);
        this.questionsBuilder = new class_2.default(this.textLoader);
    }
    Game.prototype.start = function () {
        this.state = module_1.default.process(this.gameData.startInstruction, this.state);
    };
    Game.prototype.answer = function (answer) {
        var question = this.question(this.state.question);
        var instruction = question.answers[answer];
        module_1.default.process(instruction, this.state);
    };
    Game.prototype.display = function () {
        if (!this.state['question']) {
            throw new exceptions_1.InvalidStateException(JSON.stringify(this.state));
        }
        else {
            return this.question(this.state['question']);
        }
    };
    Game.prototype.question = function (id) {
        if (typeof (id) == 'number') {
            if (id >= 0 && id < this.gameData.questions.length) {
                return this.questionsBuilder.build(this.gameData.questions[id]);
            }
            else {
                throw new exceptions_1.InvalidQuestionIdException(id);
            }
        }
        else {
            var results = this.gameData.questions.filter(function (question) {
                return question.id == id || question.text == id;
            });
            if (!results.length) {
                throw new exceptions_1.InvalidQuestionIdException(id);
            }
            else {
                return this.questionsBuilder.build(results[0]);
            }
        }
    };
    Game.prototype.getSaveData = function () {
        return {
            state: this.state,
            question: this.state['question']
        };
    };
    Object.defineProperty(Game.prototype, "name", {
        get: function () {
            return this.gameData.name;
        },
        enumerable: true,
        configurable: true
    });
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=class.js.map