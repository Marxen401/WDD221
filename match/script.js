// =============================================
//  MARIO MEMORY GAME — script.js
// =============================================

// --- Card Data (8 pairs = 16 cards, 4x4 grid) ---
const cardImages = [
  { name: 'mario',       src: 'images/mario.png'       },
  { name: 'luigi',       src: 'images/luigi.png'       },
  { name: 'peach',       src: 'images/peach.png'       },
  { name: 'wario',       src: 'images/wario.png'       },
  { name: 'goomba',      src: 'images/goomba.png'      },
  { name: 'star',        src: 'images/star.png'        },
  { name: '1up',         src: 'images/1up.png'         },
  { name: 'coin',        src: 'images/coin.png'        },
];

// --- Game State ---
let cards         = [];
let firstCard     = null;
let secondCard    = null;
let hasFlippedCard = false;
let lockBoard     = false;
let timerStarted  = false;
let timerInterval = null;
let seconds       = 0;
let moves         = 0;
let matches       = 0;

const TOTAL_PAIRS = cardImages.length; // 8

// =============================================
//  SHUFFLE
// =============================================
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// =============================================
//  BUILD UI
// =============================================
function buildGameUI() {
  const gameDiv = document.getElementById('game');
  gameDiv.innerHTML = '';

  // --- Header ---
  const header = document.createElement('div');
  header.className = 'game-header';
  header.innerHTML = `
    <img src="images/logo.png" alt="Super Mario Bros" class="game-logo">
    <div class="game-stats">
      <div class="stat">
        <span class="stat-label">MOVES</span>
        <span class="stat-value" id="move-count">0</span>
      </div>
      <div class="stat">
        <span class="stat-label">MATCHES</span>
        <span class="stat-value" id="match-count">0/${TOTAL_PAIRS}</span>
      </div>
      <div class="stat">
        <span class="stat-label">TIME</span>
        <span class="stat-value" id="timer">0:00</span>
      </div>
    </div>
    <button id="restart-btn">↺ RESTART</button>
  `;
  gameDiv.appendChild(header);

  document.getElementById('restart-btn').addEventListener('click', restartGame);

  // --- Card Grid ---
  const grid = document.createElement('div');
  grid.className = 'grid';
  grid.id = 'grid';

  // Duplicate array for pairs then shuffle
  cards = shuffle([...cardImages, ...cardImages]);

  cards.forEach(cardData => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.name = cardData.name;
    card.innerHTML = `
      <div class="front"></div>
      <div class="back" style="background-image: url('${cardData.src}')"></div>
    `;
    card.addEventListener('click', flipCard);
    grid.appendChild(card);
  });

  gameDiv.appendChild(grid);

  // --- Reset State ---
  hasFlippedCard  = false;
  lockBoard       = false;
  timerStarted    = false;
  firstCard       = null;
  secondCard      = null;
  moves           = 0;
  matches         = 0;
  seconds         = 0;
  clearInterval(timerInterval);
  timerInterval   = null;
}

// =============================================
//  TIMER
// =============================================
function startTimer() {
  timerInterval = setInterval(() => {
    seconds++;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const timerEl = document.getElementById('timer');
    if (timerEl) {
      timerEl.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    }
  }, 1000);
}

function formatTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// =============================================
//  UPDATE STATS DISPLAY
// =============================================
function updateStats() {
  const moveEl  = document.getElementById('move-count');
  const matchEl = document.getElementById('match-count');
  if (moveEl)  moveEl.textContent  = moves;
  if (matchEl) matchEl.textContent = `${matches}/${TOTAL_PAIRS}`;
}

// =============================================
//  FLIP CARD
// =============================================
function flipCard() {
  if (lockBoard)       return;   // board locked mid-check
  if (this === firstCard) return; // same card clicked twice

  // Start timer on very first card flip
  if (!timerStarted) {
    timerStarted = true;
    startTimer();
  }

  this.classList.add('selected');

  if (!hasFlippedCard) {
    // First card of a pair
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  // Second card of a pair
  secondCard = this;
  moves++;
  updateStats();
  checkForMatch();
}

// =============================================
//  MATCH CHECK
// =============================================
function checkForMatch() {
  if (firstCard.dataset.name === secondCard.dataset.name) {
    disableMatchedCards();
  } else {
    unflipCards();
  }
}

function disableMatchedCards() {
  firstCard.classList.add('match');
  secondCard.classList.add('match');
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  matches++;
  updateStats();

  resetBoard();

  if (matches === TOTAL_PAIRS) {
    setTimeout(showWinScreen, 600);
  }
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('selected');
    secondCard.classList.remove('selected');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  hasFlippedCard = false;
  lockBoard      = false;
  firstCard      = null;
  secondCard     = null;
}

// =============================================
//  WIN SCREEN
// =============================================
function showWinScreen() {
  clearInterval(timerInterval);

  // Pick a fun rating based on moves
  let rating;
  if (moves <= TOTAL_PAIRS + 2) {
    rating = '⭐⭐⭐ PERFECT!';
  } else if (moves <= TOTAL_PAIRS * 2) {
    rating = '⭐⭐ GREAT!';
  } else {
    rating = '⭐ GOOD JOB!';
  }

  const overlay = document.createElement('div');
  overlay.id = 'win-overlay';
  overlay.innerHTML = `
    <div class="win-box">
      <img src="images/star.png" class="win-star left"  alt="">
      <img src="images/star.png" class="win-star right" alt="">
      <h2>YOU WIN!</h2>
      <p>${rating}</p>
      <p>Moves: <strong>${moves}</strong></p>
      <p>Time: <strong>${formatTime(seconds)}</strong></p>
      <button class="win-play-again" id="play-again-btn">▶ PLAY AGAIN</button>
    </div>
  `;
  document.getElementById('game').appendChild(overlay);

  document.getElementById('play-again-btn').addEventListener('click', restartGame);
}

// =============================================
//  RESTART
// =============================================
function restartGame() {
  clearInterval(timerInterval);
  buildGameUI();
}

// =============================================
//  INIT
// =============================================
buildGameUI();
