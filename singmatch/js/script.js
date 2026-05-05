// =============================================
//  SINGERVERSE — OPERATIVE MEMORY
//  script.js
// =============================================


// =============================================
//  ★  CONFIG — CHANGE THIS TO ADD MORE CARDS  ★
//
//  PAIRS_TO_PLAY controls how many random pairs
//  get pulled from CARD_POOL each game.
//
//  Min: 2   Max: CARD_POOL.length (15)
// =============================================

const PAIRS_TO_PLAY = 6; // ← CHANGE ME


// =============================================
//  CARD POOL
//
//  TO ADD AN IMAGE:
//    1. Drop the file into the /images/ folder
//    2. Set "img" to the exact filename
//    3. Done. Symbol emoji is the fallback if
//       the file is missing or still null.
//
//  TO ADD A NEW CHARACTER:
//    Copy any block below, paste it at the end
//    of the array (before the closing ]), and
//    fill in the fields.
// =============================================

const CARD_POOL = [
  {
    name:   'Star Singer',
    alias:  'Matt Marxen',
    role:   'Hero',
    color:  '#00f5ff',
    power:  'Vocal Manipulation · Precognition · Frost Manipulation ',
    img:    'IMG_4639.png'
  },
  {
    name:   'Scarlet Sentry',
    alias:  'Nishihara Norio',
    role:   'Hero',
    color:  '#e84040',
    power:  'Enhanced Senses · Martial Arts',
    img:    'IMG_6311.png'
  },
  {
    name:   'Quiverkill',
    alias:  'Archer Bowman',
    role:   'Hero',
    color:  '#ffa500',
    power:  'Master Archer · Slow Aging',
    img:    'IMG_5428.png'
  },
  {
    name:   'Morningstar',
    alias:  'Mia Maria',
    role:   'Hero',
    color:  '#ffd700',
    power:  'Angelic Powers · CEO of H.E.A.V.E.N.',
    img:    'IMG_8229.png'
  },
  {
    name:   'Scarlet Shade',
    alias:  'Riku Rodriguez',
    role:   'Anti-Hero',
    color:  '#9b30ff',
    power:  'None',
    img:    'IMG_8239.png'
  },
  {
    name:   'Invis',
    alias:  '[REDACTED]',
    role:   'Hero',
    color:  '#a0e0ff',
    power:  'Full Invisibility · Stealth Ops',
    img:    'IMG_5488.png'
  },
  {
    name:   'Ruby Fist',
    alias:  '[REDACTED]',
    role:   'Hero',
    color:  '#e8003c',
    power:  'Enhanced Strength · Combat',
    img:    'IMG_6021.png'
  },
  {
    name:   'Bronze Bacto',
    alias:  'Johnny Westwood',
    role:   'Hero',
    color:  '#3a6fff',
    power:  'Immortality',
    img:    'FDDEF857-CFA3-4288-9892-0EE30E29D083.jpg'
  },
  {
    name:   'Bartender',
    alias:  '[REDACTED]',
    role:   'Hero',
    color:  '#00ff99',
    power:  'Tactical Genius · Gadgeteer',
    img:    'IMG_5495.png'
  },
  {
    name:   'Detective Skull',
    alias:  '[REDACTED]',
    role:   'Anti-Hero',
    color:  '#cc99ff',
    power:  'Noir Detective · Queens Division',
    img:    'IMG_6559.png'
  },
  {
    name:   'Golden Gal',
    alias:  'Ms. Anderson',
    role:   'Hero',
    color:  '#ff2d78',
    power:  'Pecotech Suit',
    img:    'IMG_7538.png'
  },
  {
    name:   'Flannel Man',
    alias:  '[CLASSIFIED]',
    role:   'Anti-Hero',
    color:  '#d4a017',
    power:  'Absurdist Force',
    img:    'IMG_6549.png'
  },
  {
    name:   'Silk Sword',
    alias:  '[CLASSIFIED]',
    role:   'Hero',
    color:  '#7fffd4',
    power:  'Spider Powers, Sword of the Frozen Damned',
    img:    'IMG_9215.png'
  },
  {
    name:   'Burden',
    alias:  '[CLASSIFIED]',
    role:   'Hero',
    color:  '#ff6600',
    power:  'Energy Absorber',
    img:    'IMG_8249.png'
  },
  {
    name:   'Ringer',
    alias:  '[CLASSIFIED]',
    role:   'Hero',
    color:  '#00e5ff',
    power:  'Magic',
    img:    'IMG_6022.png'
  }
];


// =============================================
//  ROLE → badge color
// =============================================

const ROLE_COLORS = {
  'Hero':      '#00f5ff',
  'Villain':   '#ff2d78',
  'Anti-Hero': '#9b30ff'
};


// =============================================
//  GAME STATE
// =============================================

let firstCard     = null;
let secondCard    = null;
let lockBoard     = false;
let timerStarted  = false;
let timerInterval = null;
let seconds       = 0;
let moves         = 0;
let matches       = 0;
let totalPairs    = 0;


// =============================================
//  UTILITY
// =============================================

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickPairs(pool, count) {
  const clamped  = Math.min(Math.max(count, 2), pool.length);
  const selected = shuffle(pool).slice(0, clamped);
  return shuffle([...selected, ...selected]);
}

function formatTime(s) {
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, '0')}`;
}


// =============================================
//  TIMER
// =============================================

function startTimer() {
  timerInterval = setInterval(() => {
    seconds++;
    const el = document.getElementById('sv-timer');
    if (el) el.textContent = formatTime(seconds);
  }, 1000);
}


// =============================================
//  STATS
// =============================================

function updateStats() {
  const moveEl  = document.getElementById('sv-moves');
  const matchEl = document.getElementById('sv-matches');
  if (moveEl)  moveEl.textContent  = moves;
  if (matchEl) matchEl.textContent = `${matches}/${totalPairs}`;
}


// =============================================
//  BUILD CARD
//
//  If data.img is set, the <img> tag is used.
//  The onerror handler hides the broken image
//  and shows the symbol fallback automatically.
// =============================================

function buildCard(data) {
  const roleColor = ROLE_COLORS[data.role] || '#00f5ff';

  const portraitHTML = data.img
    ? `<div class="card-portrait">
         <img
           src="images/${data.img}"
           alt="${data.name}"
           onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
         >
         <div class="card-symbol-fallback" style="color:${data.color};">${data.symbol}</div>
       </div>`
    : `<div class="card-symbol" style="color:${data.color};">${data.symbol}</div>`;

  const card = document.createElement('div');
  card.className    = 'card';
  card.dataset.name = data.name;

  card.innerHTML = `
    <div class="card-face card-back">
      <div class="card-back-hex"><span>◈</span></div>
      <div class="card-back-logo">SINGERVERSE<br>OPERATIVES</div>
      <div class="card-back-sub">CLASSIFIED</div>
    </div>

    <div class="card-face card-front" style="--accent: ${data.color};">
      <span class="card-role-badge"
            style="color:${roleColor}; border-color:${roleColor}; text-shadow:0 0 6px ${roleColor};">
        ${data.role}
      </span>
      ${portraitHTML}
      <div class="card-name">${data.name}</div>
      <div class="card-alias">${data.alias}</div>
      <div class="card-power">${data.power}</div>
    </div>
  `;

  card.addEventListener('click', onCardClick);
  return card;
}


// =============================================
//  FLIP LOGIC
// =============================================

function onCardClick() {
  if (lockBoard)                          return;
  if (this === firstCard)                 return;
  if (this.classList.contains('matched')) return;

  if (!timerStarted) {
    timerStarted = true;
    startTimer();
  }

  this.classList.add('flipped');

  if (!firstCard) { firstCard = this; return; }

  secondCard = this;
  moves++;
  updateStats();
  checkMatch();
}

function checkMatch() {
  firstCard.dataset.name === secondCard.dataset.name
    ? resolveMatch()
    : resolveMiss();
}

function resolveMatch() {
  firstCard.classList.add('matched');
  secondCard.classList.add('matched');
  firstCard.removeEventListener('click', onCardClick);
  secondCard.removeEventListener('click', onCardClick);
  matches++;
  updateStats();
  resetTurn();
  if (matches === totalPairs) setTimeout(showWinScreen, 700);
}

function resolveMiss() {
  lockBoard = true;
  firstCard.classList.add('wrong');
  secondCard.classList.add('wrong');
  setTimeout(() => {
    firstCard.classList.remove('flipped', 'wrong');
    secondCard.classList.remove('flipped', 'wrong');
    resetTurn();
  }, 900);
}

function resetTurn() {
  lockBoard = false; firstCard = null; secondCard = null;
}


// =============================================
//  WIN SCREEN
// =============================================

function showWinScreen() {
  clearInterval(timerInterval);
  const perfect = totalPairs;
  let rating;
  if      (moves <= perfect + 2)          rating = '⬡ ⬡ ⬡  PERFECT';
  else if (moves <= perfect * 2)          rating = '⬡ ⬡  EXCELLENT';
  else if (moves <= perfect * 2 + 4)      rating = '⬡  OPERATIVE';
  else                                    rating = '◌  FIELD AGENT';

  const overlay = document.createElement('div');
  overlay.id = 'win-overlay';
  overlay.innerHTML = `
    <div class="win-panel">
      <div class="win-eyebrow">MISSION COMPLETE</div>
      <div class="win-title">ACCESS<br>GRANTED</div>
      <div class="win-rating">${rating}</div>
      <div class="win-stats">
        <div class="win-stat"><span class="ws-label">Moves</span><span class="ws-value">${moves}</span></div>
        <div class="win-stat"><span class="ws-label">Time</span><span class="ws-value">${formatTime(seconds)}</span></div>
        <div class="win-stat"><span class="ws-label">Pairs</span><span class="ws-value">${totalPairs}</span></div>
      </div>
      <div class="win-sub">ALL ${totalPairs} OPERATIVES IDENTIFIED</div>
      <button id="play-again-btn">[ NEW MISSION ]</button>
    </div>
  `;
  document.getElementById('game').appendChild(overlay);
  document.getElementById('play-again-btn').addEventListener('click', restartGame);
}


// =============================================
//  BUILD UI
// =============================================

function buildGameUI() {
  const gameDiv = document.getElementById('game');
  gameDiv.innerHTML = '';

  totalPairs    = Math.min(Math.max(PAIRS_TO_PLAY, 2), CARD_POOL.length);
  firstCard     = null;  secondCard  = null;
  lockBoard     = false; timerStarted = false;
  seconds       = 0;    moves        = 0;    matches = 0;
  clearInterval(timerInterval); timerInterval = null;

  const header = document.createElement('div');
  header.className = 'sv-header';
  header.innerHTML = `
    <div class="sv-title-block">
      <span class="sv-eyebrow">Singerverse Intelligence Division</span>
      <div class="sv-title">OPERATIVE<br><span>MEMORY</span></div>
    </div>
    <div class="sv-stats">
      <div class="stat-box"><span class="s-label">Moves</span><span class="s-value" id="sv-moves">0</span></div>
      <div class="stat-box"><span class="s-label">Matched</span><span class="s-value" id="sv-matches">0/${totalPairs}</span></div>
      <div class="stat-box"><span class="s-label">Time</span><span class="s-value" id="sv-timer">0:00</span></div>
    </div>
    <div style="display:flex; flex-direction:column; gap:8px; align-items:flex-end;">
      <button id="restart-btn">[ RESTART ]</button>
      <span class="pair-badge">Pool: <strong>${totalPairs}</strong> / ${CARD_POOL.length} operatives</span>
    </div>
  `;
  gameDiv.appendChild(header);
  document.getElementById('restart-btn').addEventListener('click', restartGame);

  const grid = document.createElement('div');
  grid.className = 'grid';
  pickPairs(CARD_POOL, totalPairs).forEach(data => grid.appendChild(buildCard(data)));
  gameDiv.appendChild(grid);
}

function restartGame() { clearInterval(timerInterval); buildGameUI(); }

buildGameUI();
