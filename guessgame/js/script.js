// =============================================
//  GRID // NUMBER PROTOCOL — script.js
//  Guess the Number game (Final Project Pt. 2)
//  Ethan Marxen 05/04/2026
// =============================================


// =============================================
//  WEB AUDIO — synthesized sounds, no files
//  All sounds generated programmatically via
//  the AudioContext API.
// =============================================

let audioCtx = null;

function getAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

// Plays a quick tone: freq (Hz), type, duration (sec), volume
function playTone(freq, type, duration, volume = 0.25, delay = 0) {
  try {
    const ctx  = getAudio();
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
    gain.gain.setValueAtTime(volume, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration + 0.05);
  } catch(e) { /* audio blocked - silent fail */ }
}

// Sound library
const SFX = {
  // Descending buzz for "too high"
  high() {
    playTone(440, 'sawtooth', 0.18, 0.2);
    playTone(320, 'sawtooth', 0.18, 0.15, 0.1);
  },
  // Ascending beep for "too low"
  low() {
    playTone(220, 'square', 0.18, 0.2);
    playTone(330, 'square', 0.18, 0.15, 0.1);
  },
  // Win: triumphant Tron-style chord sequence
  win() {
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => playTone(freq, 'sine', 0.4, 0.3, i * 0.1));
    // Underlying bass
    playTone(130, 'triangle', 0.7, 0.2, 0.1);
  },
  // Subtle click on input accept
  click() {
    playTone(880, 'square', 0.06, 0.08);
  }
};


// =============================================
//  ANIMATED TRON GRID CANVAS
// =============================================

(function initCanvas() {
  const canvas = document.getElementById('grid-canvas');
  const ctx    = canvas.getContext('2d');

  const CYAN  = '#00e5ff';
  const LINES = [];

  // Light-trail line object
  function Line() {
    this.reset = function() {
      this.horizontal = Math.random() > 0.5;
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      // Snap to grid
      const gridSize = 60;
      this.x = Math.round(this.x / gridSize) * gridSize;
      this.y = Math.round(this.y / gridSize) * gridSize;
      this.len    = 0;
      this.maxLen = 60 + Math.random() * 200;
      this.speed  = 1 + Math.random() * 3;
      this.dir    = Math.random() > 0.5 ? 1 : -1;
      this.alpha  = 0.15 + Math.random() * 0.4;
      this.dead   = false;
    };
    this.reset();
  }

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // Seed initial lines
  for (let i = 0; i < 18; i++) {
    const l = new Line();
    l.len = Math.random() * l.maxLen; // stagger initial positions
    LINES.push(l);
  }

  function drawGrid() {
    // Static background grid
    ctx.strokeStyle = 'rgba(0,229,255,0.07)';
    ctx.lineWidth   = 0.5;
    const gs = 60;
    for (let x = 0; x < canvas.width + gs; x += gs) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height + gs; y += gs) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();

    LINES.forEach(line => {
      if (line.dead) { line.reset(); return; }

      const x2 = line.horizontal ? line.x + line.dir * line.len : line.x;
      const y2 = line.horizontal ? line.y                       : line.y + line.dir * line.len;

      ctx.strokeStyle = CYAN;
      ctx.globalAlpha = line.alpha;
      ctx.lineWidth   = 1.5;
      ctx.shadowBlur  = 6;
      ctx.shadowColor = CYAN;

      ctx.beginPath();
      ctx.moveTo(line.x, line.y);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      ctx.globalAlpha = 1;
      ctx.shadowBlur  = 0;

      line.len += line.speed;
      if (line.len >= line.maxLen) line.dead = true;
    });

    requestAnimationFrame(tick);
  }

  tick();
})();


// =============================================
//  GAME STATE
// =============================================

let secretNumber  = 0;
let maxRange      = 100;
let guessCount    = 0;
let gameActive    = false;
let startTime     = null;
let scoreboard    = [];
let sessionCount  = 0;
let lastGuess     = null;
let narrowLow     = 1;
let narrowHigh    = 100;


// =============================================
//  DOM REFERENCES
// =============================================

const feedbackPanel  = document.getElementById('feedback-panel');
const feedbackIcon   = document.getElementById('feedback-icon');
const feedbackText   = document.getElementById('feedback-text');
const feedbackSub    = document.getElementById('feedback-sub');
const guessInput     = document.getElementById('guess-input');
const guessBtn       = document.getElementById('guess-btn');
const guessCounter   = document.getElementById('guess-counter');
const logEntries     = document.getElementById('log-entries');
const scoreBody      = document.getElementById('score-body');
const scoreEmptyRow  = document.getElementById('score-empty-row');
const winOverlay     = document.getElementById('win-overlay');
const winStatsLine   = document.getElementById('win-stats-line');
const winPlayAgain   = document.getElementById('win-play-again');
const rangeFill      = document.getElementById('range-fill');
const rangeIndicator = document.getElementById('range-indicator');
const rangeLow       = document.getElementById('range-low');
const rangeHigh      = document.getElementById('range-high');
const diffDisplay    = document.getElementById('diff-display');
const sessionCounter = document.getElementById('session-counter');


// =============================================
//  DIFFICULTY BUTTONS
// =============================================

document.querySelectorAll('.diff-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (!gameActive) {
      document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      maxRange = parseInt(btn.dataset.range);
      diffDisplay.textContent = btn.dataset.label;
      guessInput.max = maxRange;
      rangeLow.textContent  = '1';
      rangeHigh.textContent = maxRange;
      initGame();
    }
  });
});


// =============================================
//  INIT NEW GAME
// =============================================

function initGame() {
  secretNumber = Math.floor(Math.random() * maxRange) + 1;
  guessCount   = 0;
  gameActive   = true;
  startTime    = null;
  lastGuess    = null;
  narrowLow    = 1;
  narrowHigh   = maxRange;

  // Clear log
  logEntries.innerHTML = '';

  // Reset feedback
  feedbackPanel.className = '';
  feedbackIcon.textContent = '?';
  feedbackText.textContent = 'AWAITING INPUT';
  feedbackSub.textContent  = `ENTER A NUMBER BETWEEN 1 AND ${maxRange}`;

  // Reset guess counter display
  updateGuessCounter();

  // Reset range bar
  rangeFill.style.width = '0%';
  rangeIndicator.style.display = 'none';
  rangeLow.textContent  = '1';
  rangeHigh.textContent = maxRange;

  // Reset input
  guessInput.value   = '';
  guessInput.disabled = false;
  guessBtn.disabled   = false;

  guessInput.focus();
}


// =============================================
//  PROCESS A GUESS
// =============================================

function processGuess() {
  if (!gameActive) return;

  const raw   = guessInput.value.trim();
  const guess = parseInt(raw);

  // Validate
  if (isNaN(guess) || guess < 1 || guess > maxRange) {
    flashInput();
    feedbackSub.textContent = `PLEASE ENTER A VALID NUMBER (1 – ${maxRange})`;
    return;
  }

  // Start timer on first guess
  if (!startTime) startTime = Date.now();

  guessCount++;
  lastGuess = guess;
  updateGuessCounter();
  SFX.click();

  if (guess > secretNumber) {
    // Too high
    narrowHigh = Math.min(narrowHigh, guess - 1);
    setFeedback('high', '▲', 'TOO HIGH', `SIGNAL EXCEEDS TARGET — NARROW YOUR RANGE`);
    addLogEntry(guessCount, guess, 'HIGH', 'high');
    updateRangeBar(guess);
    SFX.high();

  } else if (guess < secretNumber) {
    // Too low
    narrowLow = Math.max(narrowLow, guess + 1);
    setFeedback('low', '▼', 'TOO LOW', `SIGNAL BELOW TARGET — NARROW YOUR RANGE`);
    addLogEntry(guessCount, guess, 'LOW', 'low');
    updateRangeBar(guess);
    SFX.low();

  } else {
    // WIN
    handleWin(guess);
  }

  guessInput.value = '';
  guessInput.focus();
}


// =============================================
//  WIN HANDLER
// =============================================

function handleWin(guess) {
  gameActive = false;

  const elapsed = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;

  setFeedback('win', '✓', 'ACCESS GRANTED', `CORRECT — TARGET WAS ${secretNumber}`);
  addLogEntry(guessCount, guess, 'CORRECT!', 'win');
  SFX.win();

  // Disable input
  guessInput.disabled = true;
  guessBtn.disabled   = true;

  // Record to scoreboard
  const rank = getRank(guessCount, maxRange);
  const entry = {
    number:    sessionCount + 1,
    guesses:   guessCount,
    time:      elapsed,
    difficulty: diffDisplay.textContent,
    rank:       rank.label,
    rankClass:  rank.cls
  };
  scoreboard.unshift(entry);
  sessionCount++;
  sessionCounter.textContent = String(sessionCount).padStart(3, '0');
  renderScoreboard();

  // Show win overlay after brief delay
  setTimeout(() => {
    winStatsLine.innerHTML = `
      NUMBER: <strong>${secretNumber}</strong>&nbsp;&nbsp;
      GUESSES: <strong>${guessCount}</strong>&nbsp;&nbsp;
      TIME: <strong>${formatTime(elapsed)}</strong>&nbsp;&nbsp;
      RANK: <strong class="${rank.cls}">${rank.label}</strong>
    `;
    winOverlay.classList.remove('hidden');
  }, 600);
}


// =============================================
//  FEEDBACK STATE SETTER
// =============================================

function setFeedback(state, icon, text, sub) {
  feedbackPanel.className = `state-${state}`;
  feedbackIcon.textContent = icon;
  feedbackText.textContent = text;
  feedbackSub.textContent  = sub;
}


// =============================================
//  RANGE BAR (narrowing tracker)
// =============================================

function updateRangeBar(guess) {
  // Show how much of the range has been eliminated
  const totalSpan   = maxRange;
  const knownLow    = narrowLow  - 1;
  const knownHigh   = maxRange - narrowHigh;
  const eliminated  = knownLow + knownHigh;
  const pct         = Math.min((eliminated / totalSpan) * 100, 98);

  rangeFill.style.width         = pct + '%';
  rangeIndicator.style.display  = 'block';
  rangeIndicator.style.left     = ((guess / maxRange) * 100) + '%';
  rangeLow.textContent          = narrowLow;
  rangeHigh.textContent         = narrowHigh;
}


// =============================================
//  GUESS LOG
// =============================================

function addLogEntry(num, value, result, cls) {
  const entry = document.createElement('div');
  entry.className = 'log-entry';
  entry.innerHTML = `
    <span class="log-num">${String(num).padStart(2,'0')}</span>
    <span class="log-val">${value}</span>
    <span class="log-res ${cls}">${result}</span>
    ${cls !== 'win' ? `<div class="log-bar ${cls}"></div>` : ''}
  `;
  logEntries.appendChild(entry);
  logEntries.scrollTop = logEntries.scrollHeight;
}

function updateGuessCounter() {
  guessCounter.innerHTML = `GUESSES: <strong>${guessCount}</strong>`;
}


// =============================================
//  SCOREBOARD RENDER
// =============================================

function renderScoreboard() {
  if (scoreboard.length === 0) {
    scoreBody.innerHTML = `
      <tr id="score-empty-row">
        <td colspan="6" id="score-empty">NO RECORDS FOUND</td>
      </tr>`;
    return;
  }

  scoreBody.innerHTML = scoreboard.map((s, i) => `
    <tr>
      <td style="color:var(--dim); font-size:9px;">${String(s.number).padStart(3,'0')}</td>
      <td style="font-family:var(--font-head); font-size:9px; color:var(--white);">
        OPERATIVE
      </td>
      <td style="font-family:var(--font-head); font-weight:700; color:var(--cyan);
                 text-shadow:var(--cyan-glow2);">${s.guesses}</td>
      <td>${formatTime(s.time)}</td>
      <td style="font-size:8px; color:var(--dim);">${s.difficulty}</td>
      <td class="${s.rankClass}">${s.rank}</td>
    </tr>
  `).join('');
}

document.getElementById('score-clear-btn').addEventListener('click', () => {
  scoreboard = [];
  renderScoreboard();
});


// =============================================
//  RANK CALCULATOR
// =============================================

function getRank(guesses, range) {
  // Theoretical minimum ≈ log2(range)
  const ideal = Math.ceil(Math.log2(range));

  if      (guesses <= ideal)         return { label: 'S', cls: 'rank-s' };
  else if (guesses <= ideal + 2)     return { label: 'A', cls: 'rank-a' };
  else if (guesses <= ideal + 5)     return { label: 'B', cls: 'rank-b' };
  else                               return { label: 'C', cls: 'rank-c' };
}


// =============================================
//  UTILITIES
// =============================================

function formatTime(s) {
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2,'0')}`;
}

function flashInput() {
  guessInput.style.color = '#ff5555';
  setTimeout(() => { guessInput.style.color = ''; }, 400);
}


// =============================================
//  EVENT LISTENERS
// =============================================

guessBtn.addEventListener('click', processGuess);

guessInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') processGuess();
});

winPlayAgain.addEventListener('click', () => {
  winOverlay.classList.add('hidden');
  initGame();
});


// =============================================
//  BOOT
// =============================================

initGame();
