"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mock_1 = require("../text-loader/mock");
var class_1 = require("../text-loader/class");
var rawQuestions = [{
        text: 'GAME_INTRO',
        answers: [{
                'GAME_INTRO1': 'PRINT GAME_INTRO4',
                'GAME_INTRO2': 'PRINT GAME_INTRO',
                'GAME_INTRO3': 'PRINT GAME_INTRO'
            }]
    }];
exports.rawQuestions = rawQuestions;
var textLoader = new class_1.default(mock_1.textData, 'EN_en');
exports.textLoader = textLoader;
