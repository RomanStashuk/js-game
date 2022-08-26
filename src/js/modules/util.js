function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function show(el) {
  el.classList.remove('visually-hidden');
}

function hide(el) {
  el.classList.add('visually-hidden');
}

export { getRandom, show, hide };
