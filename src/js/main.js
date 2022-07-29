'use strict';

const $start = document.querySelector('#startBtn');
const $game = document.querySelector('#game');
const $time = document.querySelector('#time');
const $score = document.querySelector('#score');
const $timeHeader = document.querySelector('.app__time');
const $scoreHeader = document.querySelector('.app__score');
const $gameTime = document.querySelector('#game-time');
let score = 0;
let isGameStarted = false;

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);
$gameTime.addEventListener('input', setGameTime);

function show($el) {
  $el.classList.remove('visually-hidden');
}

function hide($el) {
  $el.classList.add('visually-hidden');
}

function startGame() {
  score = 0;
  isGameStarted = true;
  $game.style.backgroundColor = '#ffffff';
  hide($start);
  $gameTime.setAttribute('disabled', 'true');

  const interval = setInterval(function() {
    const time = parseFloat($time.textContent);

    if (time <= 0) {
      clearInterval(interval);
      endGame();
    } else {
      $time.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);

  setGameTime();
  renderBox();
}

function setGameScore() {
  $score.textContent = score.toString();
}

function setGameTime() {
  const time = +$gameTime.value;
  $time.textContent = time.toFixed(1);
  show($timeHeader);
  hide($scoreHeader);
}

function endGame() {
  isGameStarted = false;
  show($start);
  $game.innerHTML = '';
  $game.style.backgroundColor = '#cccccc';
  hide($timeHeader);
  show($scoreHeader);
  $gameTime.removeAttribute('disabled');

  setGameScore();
}

function handleBoxClick(evt) {
  if (!isGameStarted) {
    return;
  }
  if (evt.target.dataset.box) {
    score++;
    renderBox();
  }
}

function renderBox() {
  $game.innerHTML = '';
  const box = document.createElement('div');
  const boxSize = getRandom(30, 100);
  const gameSize = $game.getBoundingClientRect();
  const maxTop = gameSize.height - boxSize;
  const maxLeft = gameSize.width - boxSize;

  box.style.height = box.style.width = boxSize + 'px';
  box.style.position = 'absolute';
  box.style.backgroundColor = `rgba(${getRandom(0, 255)}, ${getRandom(0, 255)}, ${getRandom(0, 255)})`;
  box.style.top = getRandom(0, maxTop) + 'px';
  box.style.left = getRandom(0, maxLeft) + 'px';
  box.style.cursor = 'pointer';
  box.setAttribute('data-box', 'true');

  $game.insertAdjacentElement('afterbegin', box);
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
