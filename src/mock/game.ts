import { GameData } from "../game/interfaces";
import { unparsedQuestions } from './questions';

const mockData: GameData = {
  name: 'TestGame',
  theme: 'default',
  questions: unparsedQuestions,
  startInstruction: 'GOTO GAME_INTRO'
};

export default mockData;