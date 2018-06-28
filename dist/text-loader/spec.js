"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var class_1 = require("./class");
var texts_1 = require("../mock/texts");
describe('TextLoader', function () {
    it('should allow us to load text data', function () {
        var loader = new class_1.default(texts_1.textData, 'EN_en');
    });
    it('should allow us to get a specific text', function () {
        var loader = new class_1.default(texts_1.textData, 'EN_en');
        expect(loader.get('GAME_INTRO')).toBe(texts_1.textData['GAME_INTRO']['EN_en']);
    });
    it('should allow us to change the locale used', function () {
        var loader = new class_1.default(texts_1.textData, 'FR_fr');
        expect(loader.get('GAME_INTRO')).toBe(texts_1.textData['GAME_INTRO']['FR_fr']);
        loader.setLocale('EN_en');
        expect(loader.get('GAME_INTRO')).toBe(texts_1.textData['GAME_INTRO']['EN_en']);
    });
    it('should return the text id if there is no matching text', function () {
        var loader = new class_1.default(texts_1.textData, 'FR_fr');
        expect(loader.get('INVALID_ID')).toBe('INVALID_ID');
    });
});
//# sourceMappingURL=spec.js.map