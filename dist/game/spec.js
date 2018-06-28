"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var class_1 = require("./class");
var game_1 = require("../mock/game");
var texts_1 = require("../mock/texts");
describe('Game', function () {
    it('should allow us to create a new game instance w/ data', function () {
        var game = new class_1.Game(game_1.default, texts_1.textData);
        game.start();
        expect(game.name).toBe(game_1.default.name);
    });
    it('should start with the first question', function () {
        var game = new class_1.Game(game_1.default, texts_1.textData);
        game.start();
        var question = game.display();
        expect(question.text).toBe(texts_1.textData['GAME_INTRO']['EN_en']);
    });
    it('should allow to answer a question and go to the next one', function () {
        var game = new class_1.Game(game_1.default, texts_1.textData);
        game.start();
        game.answer(texts_1.textData['GAME_INTRO2']['EN_en']);
        var nextQuestion = game.display();
        expect(nextQuestion.text).toBe(texts_1.textData['CHAPTER1']['EN_en']);
    });
    it('should save the game state and use it', function () {
        var game = new class_1.Game(game_1.default, texts_1.textData);
        game.start();
        var saveData = game.getSaveData();
        game = new class_1.Game(game_1.default, texts_1.textData, 'EN_en', saveData);
        expect(game.display().text).toBe(texts_1.textData['GAME_INTRO']['EN_en']);
    });
});
//# sourceMappingURL=spec.js.map