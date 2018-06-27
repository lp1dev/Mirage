import { Question } from "../questions-builder/interfaces";
import { State } from "../state-machine/interfaces";

interface GameData {
  name: string;
  theme: string;
  questions: Array<Question>;
  startInstruction: string;
}

interface SaveData {
  question: number;
  answers: Array<string>;
  state: State;
}

export { GameData, SaveData }