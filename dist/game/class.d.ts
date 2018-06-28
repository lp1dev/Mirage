import { GameData, SaveData } from './interfaces';
import { TextData } from '../text-loader/interfaces';
import { Question } from '../questions-builder/interfaces';
export declare class Game {
    private gameData;
    private textData;
    private locale;
    private saveData;
    private textLoader;
    private questionsBuilder;
    private state;
    constructor(gameData: GameData, textData?: TextData, locale?: string, saveData?: SaveData);
    start(): void;
    answer(answer: string): void;
    display(): Question;
    question(id: any): Question;
    readonly name: string;
    readonly questions: Question[];
    readonly lastQuestion: number;
}
