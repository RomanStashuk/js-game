import { getRandom, show, hide } from './util';

export default class Game {
  constructor(element) {
    this.root = element;
    this.startBtn = this.root.querySelector('#startBtn');
    this.gameField = this.root.querySelector('#game');
    this.remainingTime = this.root.querySelector('#time');
    this.score = this.root.querySelector('#score');
    this.timeHeader = this.root.querySelector('.app__time');
    this.scoreHeader = this.root.querySelector('.app__score');
    this.timeInput = this.root.querySelector('#game-time');
    this.isStarted = false;
    this.currentScore = 0;

    this._onBoxClick = this._onBoxClick.bind(this);
    this._onStartBtnClick = this._onStartBtnClick.bind(this);
    this.setScore = this.setScore.bind(this);
    this.setTime = this.setTime.bind(this);
    this.renderBox = this.renderBox.bind(this);
    this.finish = this.finish.bind(this);
  }

  _onStartBtnClick() {
    this.currentScore = 0;
    this.isStarted = true;
    this.gameField.style.backgroundColor = '#ffffff';
    hide(this.startBtn);
    this.timeInput.setAttribute('disabled', 'true');

    const interval = setInterval(() => {
      const time = parseFloat(this.remainingTime.textContent);

      if (time <= 0) {
        clearInterval(interval);
        this.finish();
      } else {
        this.remainingTime.textContent = (time - 0.1).toFixed(1);
      }
    }, 100);

    this.setTime();
    this.renderBox();
  }

  _onBoxClick(evt) {
    if (!this.isStarted) {
      return;
    }
    if (evt.target.dataset.box) {
      this.currentScore++;
      this.renderBox();
    }
  }

  init() {
    this.startBtn.addEventListener('click', this._onStartBtnClick);
    this.gameField.addEventListener('click', this._onBoxClick);
    this.timeInput.addEventListener('input', this.setTime);
  }

  setScore() {
    this.score.textContent = this.currentScore.toString();
  }

  setTime() {
    const time = +this.timeInput.value;
    this.remainingTime.textContent = time.toFixed(1);
    show(this.timeHeader);
    hide(this.scoreHeader);
  }

  finish() {
    this.isStarted = false;
    show(this.startBtn);
    this.gameField.innerHTML = '';
    this.gameField.style.backgroundColor = '#cccccc';
    hide(this.timeHeader);
    show(this.scoreHeader);
    this.timeInput.removeAttribute('disabled');
    this.setScore();
  }

  renderBox() {
    this.gameField.innerHTML = '';
    const box = document.createElement('div');
    const boxSize = getRandom(30, 100);
    const gameSize = this.gameField.getBoundingClientRect();
    const maxTop = gameSize.height - boxSize;
    const maxLeft = gameSize.width - boxSize;

    box.style.height = box.style.width = boxSize + 'px';
    box.style.position = 'absolute';
    box.style.backgroundColor = `rgba(
      ${getRandom(1, 255)},
      ${getRandom(1, 255)},
      ${getRandom(1, 255)}
    )`;
    box.style.top = getRandom(0, maxTop) + 'px';
    box.style.left = getRandom(0, maxLeft) + 'px';
    box.style.cursor = 'pointer';
    box.setAttribute('data-box', 'true');
    this.gameField.insertAdjacentElement('afterbegin', box);
  }
}
