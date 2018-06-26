import { Game } from './class';
import { InvalidDataFormatException } from './exceptions';
import gameData from './mock';

describe('Game', () => {
  //
  it('should allow us to create a new game instance w/ data', () => {
      const game = new Game(gameData);
      expect(game.name).toBe(gameData.name);
      expect(game.questions).toBe(gameData.questions);
  })
  //
  it('should start with the first question', () => {
    const game = new Game(gameData);
    expect(game.start().text).toBe(gameData.questions[0].text);
  })
  //
});
