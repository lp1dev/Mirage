import { GameData, SaveData } from './interfaces'
import { InvalidQuestionIdException, InvalidStateException } from './exceptions';
import TextLoader from '../text-loader/class';
import QuestionsBuilder from '../questions-builder/class';
import { TextData } from '../text-loader/interfaces';
import { State } from '../state-machine/interfaces';
import StateMachine from '../state-machine/module';

export class Game {
    private textLoader: TextLoader;
    private questionsBuilder: QuestionsBuilder;
    private state: State;

   constructor(
            private gameData: GameData,
            private textData: TextData = {},
            private locale: string = 'EN_en',
            private saveData?: SaveData) {
        this.gameData = gameData;
        this.saveData = this.saveData ? this.saveData :  { question: 0, answers: [], state: {} };
        this.state = this.saveData.state;
        this.textLoader = new TextLoader(this.textData, 'EN_en');
        this.questionsBuilder = new QuestionsBuilder(this.textLoader);
    }

    // Methods

    start() {
        this.state = StateMachine.process(this.gameData.startInstruction, this.state);
    }

    answer(answer: string) {
        const question = this.question(this.state.question);
        const instruction = question.answers[answer];
        StateMachine.process(instruction, this.state);
    }

    display() {
        if (!this.state['question']) {
            throw new InvalidStateException(JSON.stringify(this.state));
        } else {
            return this.question(this.state['question']);
        }
    }

    question(id: any) {
        if (typeof(id) == 'number') {
            if (id >= 0 && id < this.gameData.questions.length) {
                return this.questionsBuilder.build(this.gameData.questions[id]);
            } else {
                throw new InvalidQuestionIdException(id);
            }
        } else {
            const results = this.gameData.questions.filter(question => {
                return question.id == id || question.text == id;
            })
            if (!results.length) {
                throw new InvalidQuestionIdException(id);                
            } else {
                return this.questionsBuilder.build(results[0]);
            }
        }
    }

    // Getters

    get name() {
        return this.gameData.name;
    }

    get questions() {
        return this.gameData.questions;
    }

    get lastQuestion() {
        return this.saveData.question;
    }
}
