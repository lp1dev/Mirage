import { Game } from './game';

describe('Game', () => {
  it('should allow the creation of a new game instance', () => {
      const game = new Game('test');
      expect(game).toBeDefined();
  });
});
