import Game from './modules/game';

const $app = document.querySelectorAll('.app');

$app.forEach((element) => {
  const game = new Game(element);
  game.init();
});
