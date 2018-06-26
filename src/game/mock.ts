import { GameData } from "./interfaces";
import { Question } from "../questions-builder/interfaces";

const questions: Array<Question> = [{
  id: 0,
  text: 'Hey',
  answers: []
}]

const mockData: GameData = {
  name: "TestGame",
  theme: "default",
  questions: questions
};

export default mockData;