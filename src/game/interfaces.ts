import { Question } from "../questions-builder/interfaces";

interface GameData {
  name: string;
  theme: string;
  questions: Array<Question>;
}

interface SaveData {
  question: number;
}

export { GameData, SaveData }