import { GameController } from './core/GameController.js';

window.addEventListener('DOMContentLoaded', async () => {
  const game = new GameController('game-canvas-container');
  window.game = game;
  await game.init();
});
