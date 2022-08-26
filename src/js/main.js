import Game from './modules/game';

const appElements = document.querySelectorAll('.app');

appElements.forEach((element) => {
  const game = new Game(element);
  game.init();
});
