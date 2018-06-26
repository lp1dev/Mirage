import { GameData, SaveData } from './interfaces'
import { InvalidQuestionIdException } from './exceptions';

export class Game {
   constructor(private gameData: GameData, private saveData?: SaveData) {
        this.gameData = gameData;
        this.saveData = this.saveData ? this.saveData :  { question: 0 };
    }

    // Methods

    start() {
        return this.question(this.saveData.question);
    }

    question(id: number) {
        if (id >= 0 && id < this.gameData.questions.length) {
            return this.gameData.questions[id];
        } else {
            throw new InvalidQuestionIdException();
        }
    }

    // Getters

    get name() {
        return this.gameData.name;
    }

    get questions() {
        console.log('Get questions ::', this.gameData)
        return this.gameData.questions;
    }

    get lastQuestion() {
        return this.saveData.question;
    }
}
