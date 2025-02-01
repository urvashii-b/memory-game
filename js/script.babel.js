let cardsArray = [
  { 'name': 'baji', 'img': 'img/baji.webp' },
  { 'name': 'chifuyu', 'img': 'img/chifuyu.webp' },
  { 'name': 'hakkai', 'img': 'img/hakkai.webp' },
  { 'name': 'kazutora', 'img': 'img/kazutora.webp' },
  { 'name': 'manjiro', 'img': 'img/manjiro.webp' },
  { 'name': 'nobutaka', 'img': 'img/nobutaka.webp' },
  { 'name': 'ryohei', 'img': 'img/ryohei.webp' },
  { 'name': 'taiju', 'img': 'img/taiju.webp' },
  { 'name': 'takemichi', 'img': 'img/takemichi.webp' },
  { 'name': 'tetta', 'img': 'img/tetta.webp' },
  { 'name': 'izana', 'img': 'img/izana.webp' },
  { 'name': 'haitani', 'img': 'img/haitani.webp' }
];

let gameGrid = cardsArray.concat(cardsArray).sort(() => 0.5 - Math.random());
let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;
let isMultiplayer = false;
let player1Score = 0;
let player2Score = 0;
let currentPlayer = 1;

const game = document.getElementById('game');
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(item => {
  const { name, img } = item;

  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  const front = document.createElement('div');
  front.classList.add('front');

  const back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${img})`;

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

const match = () => {
  const selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });

  if (isMultiplayer) {
    if (currentPlayer === 1) {
      player1Score++;
      document.getElementById('player1Score').innerText = player1Score;
    } else {
      player2Score++;
      document.getElementById('player2Score').innerText = player2Score;
    }
    currentPlayer = currentPlayer === 1 ? 2 : 1;
  }
};

const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  const selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
};

grid.addEventListener('click', event => {
  const clicked = event.target;

  if (
    clicked.nodeName === 'SECTION' ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains('selected') ||
    clicked.parentNode.classList.contains('match')
  ) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }
});

document.getElementById('multiBtn').addEventListener('click', () => {
  isMultiplayer = true;
  document.getElementById('scoreBoard').style.display = 'block';
  player1Score = 0;
  player2Score = 0;
  currentPlayer = 1;
  document.getElementById("player1").innerHTML = player1Score;
  document.getElementById("player2").innerHTML = player2Score;
});

document.getElementById('soloBtn').addEventListener('click', () => {
  isMultiplayer = false;
  document.getElementById('scoreBoard').style.display = 'none';
});