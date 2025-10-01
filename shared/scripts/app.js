(function () {
  const STORAGE_KEYS = {
    USERS: 'mcgz.users.v1',
    ACTIVE_USER: 'mcgz.activeUser.v1',
    SETTINGS: 'mcgz.settings.v1'
  };

  const GAME_CATALOG = [
    { id: 'candy-crush', title: 'Candy Match Remix', path: '01-Candy-Crush-Game/index.html', icon: 'assets/icons/candy-crush.svg', tagline: 'Swap sweets and chase combos.', scoreSelector: '#score', scoreMode: 'best' },
    { id: 'archery', title: 'Arc Arrow Range', path: '02-Archery-Game/index.html', icon: 'assets/icons/archery.svg', tagline: 'Steady aim, windy lanes.' },
    { id: 'speed-typing', title: 'Rapid Type Run', path: '03-Speed-Typing-Game/index.html', icon: 'assets/icons/speed-typing.svg', tagline: 'Sprint through every keystroke.', scoreSelector: '#wpm', scoreMode: 'best' },
    { id: 'breakout', title: 'Neon Breakout Grid', path: '04-Breakout-Game/index.html', icon: 'assets/icons/breakout.svg', tagline: 'Reflect, deflect, dominate the bricks.' },
    { id: 'minesweeper', title: 'Quantum Mines', path: '05-Minesweeper-Game/index.html', icon: 'assets/icons/minesweeper.svg', tagline: 'Decode the safe zones with logic.' },
    { id: 'tower-blocks', title: 'Skyline Stackers', path: '06-Tower-Blocks/index.html', icon: 'assets/icons/tower-blocks.svg', tagline: 'Balance blocks to build the skyline.', scoreSelector: '#score', scoreMode: 'best' },
    { id: 'ping-pong', title: 'Pulse Pong Arena', path: '07-Ping-Pong-Game/index.html', icon: 'assets/icons/ping-pong.svg', tagline: 'Retro volleys with neon flair.' },
    { id: 'tetris', title: 'Tactrix Shift', path: '08-Tetris-Game/index.html', icon: 'assets/icons/tetris.svg', tagline: 'Fit falling tiles with precision.', scoreSelector: '#score span', scoreMode: 'best' },
    { id: 'tilting-maze', title: 'Gyro Maze Dash', path: '09-Tilting-Maze-Game/index.html', icon: 'assets/icons/tilting-maze.svg', tagline: 'Tilt the grid, guide the glow.' },
    { id: 'memory-cards', title: 'Synapse Flip', path: '10-Memory-Card-Game/index.html', icon: 'assets/icons/memory.svg', tagline: 'Match symbols in rapid recall.' },
    { id: 'rps', title: 'Gesture Clash', path: '11-Rock-Paper-Scissors/index.html', icon: 'assets/icons/rps.svg', tagline: 'Predict and outplay in 3 moves.' },
    { id: 'number-guess', title: 'NumLock Guess', path: '12-Type-Number-Guessing-Game/index.html', icon: 'assets/icons/number-guess.svg', tagline: 'Crack the secret digits fast.' },
    { id: 'tic-tac-toe', title: 'Triad Tactics', path: '13-Tic-Tac-Toe/index.html', icon: 'assets/icons/tic-tac-toe.svg', tagline: 'Build the winning line first.' },
    { id: 'snake', title: 'Pulse Serpent', path: '14-Snake-Game/index.html', icon: 'assets/icons/snake.svg', tagline: 'Grow the neon snake, dodge walls.', scoreSelector: '.score', scoreMode: 'best' },
    { id: 'connect-four', title: 'Connect Fusion', path: '15-Connect-Four-Game/index.html', icon: 'assets/icons/connect-four.svg', tagline: 'Stack four cores in a row.' },
    { id: 'insect-catch', title: 'Lumina Bugs', path: '16-Insect-Catch-Game/index.html', icon: 'assets/icons/insect.svg', tagline: 'Tap the critters before they vanish.', scoreSelector: '#score', scoreMode: 'best' },
    { id: 'typing-trainer', title: 'Type Surge', path: '17-Typing-Game/index.html', icon: 'assets/icons/typing-trainer.svg', tagline: 'Push your words-per-minute higher.', scoreSelector: '#score', scoreMode: 'best' },
    { id: 'hangman', title: 'Cipher Hangout', path: '18-Hangman-Game/index.html', icon: 'assets/icons/hangman.svg', tagline: 'Decode the word before the timer.' },
    { id: 'flappy', title: 'Sky Hopper', path: '19-Flappy-Bird-Game/index.html', icon: 'assets/icons/flappy.svg', tagline: 'Glide through gates with perfect rhythm.' },
    { id: 'crossy-road', title: 'Pixel Crossing', path: '20-Crossy-Road-Game/index.html', icon: 'assets/icons/crossy-road.svg', tagline: 'Leap lanes without getting clipped.' },
    { id: '2048', title: 'Fusion 2048', path: '21-2048-Game/index.html', icon: 'assets/icons/2048.svg', tagline: 'Slide tiles to reach the fusion core.', scoreSelector: '#score', scoreMode: 'best' },
    { id: 'dice-roll', title: 'Dice Pulse', path: '22-Dice-Roll-Simulator/index.html', icon: 'assets/icons/dice-roll.svg', tagline: 'Roll the digital cube and chase luck.' },
    { id: 'shape-clicker', title: 'Shape Reactor', path: '23-Shape-Clicker-Game/index.html', icon: 'assets/icons/shape-clicker.svg', tagline: 'Click the right shapes in time.' },
    { id: 'typing-zen', title: 'Typing Zen', path: '24-Typing-Game/index.html', icon: 'assets/icons/typing-zen.svg', tagline: 'Hit the prompts in a focused flow.' },
    { id: 'speak-number', title: 'Speak & Guess', path: '25-Speak-Number-Guessing-Game/index.html', icon: 'assets/icons/speak-number.svg', tagline: 'Listen, repeat, and guess right.' },
    { id: 'fruit-slicer', title: 'Fruit Vortex', path: '26-Fruit-Slicer-Game/index.html', icon: 'assets/icons/fruit-slicer.svg', tagline: 'Slice every fruit, dodge the bombs.', scoreSelector: '#scoreValue', scoreMode: 'best' },
    { id: 'quiz', title: 'Quiz Pulse', path: '27-Quiz-Game/index.html', icon: 'assets/icons/quiz.svg', tagline: 'Answer quick-fire trivia sets.' },
    { id: 'emoji-catcher', title: 'Emoji Drift', path: '28-Emoji-Catcher-Game/index.html', icon: 'assets/icons/emoji-catcher.svg', tagline: 'Catch the smiling sprites mid-air.', scoreSelector: '#score', scoreMode: 'best' },
    { id: 'whack-a-mole', title: 'Mole Voltage', path: '29-Whack-A-Mole-Game/index.html', icon: 'assets/icons/whack-a-mole.svg', tagline: 'Tap the moles before they dip.' },
    { id: 'simon-says', title: 'Pattern Echo', path: '30-Simon-Says-Game/index.html', icon: 'assets/icons/simon-says.svg', tagline: 'Echo the light pattern flawlessly.' }
  ];

  const DEFAULT_SETTINGS = {
    theme: 'dark',
    sound: true
  };

  const HOT_GAMES = [
    {
      id: 'candy-crush',
      title: 'Candy Match Remix',
      message: 'Chain cascading wins with rapid thumb swipes and timed boosters.',
      stat: 'Highest combo: 148',
      color: '#ff3d71'
    },
    {
      id: '2048',
      title: 'Fusion 2048',
      message: 'Slide the tiles into perfect power mergers before the board locks.',
      stat: 'Best tile: 4096',
      color: '#2563ff'
    },
    {
      id: 'snake',
      title: 'Pulse Serpent',
      message: 'Guide the neon snake through tight lanes without clipping the edge.',
      stat: 'Longest run: 98',
      color: '#60d669'
    },
    {
      id: 'flappy',
      title: 'Sky Hopper',
      message: 'Tap with precision to weave through energy gates at breakneck speed.',
      stat: 'Gate streak: 37',
      color: '#f6b73c'
    },
    {
      id: 'quiz',
      title: 'Quiz Pulse',
      message: 'Speed through trivia bursts and keep your multiplier alive.',
      stat: 'Win streak: 12',
      color: '#9b5cff'
    }
  ];

  const state = {
    context: 'hub',
    users: [],
    activeUser: null,
    games: GAME_CATALOG,
    toastTimer: null,
    scoreObserver: null,
    lastScoreValue: 0,
    settings: { ...DEFAULT_SETTINGS },
    spotlightIndex: 0,
    spotlightTimer: null,
    audio: {
      context: null,
      enabled: true,
      primed: false,
      initialized: false
    },
    stageScoreEl: null
  };

  const isBrowser = typeof window !== 'undefined';

  function loadSettings() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!raw) return { ...DEFAULT_SETTINGS };
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_SETTINGS, ...(parsed || {}) };
    } catch (error) {
      console.warn('[MCGZ] Failed to parse settings', error);
      return { ...DEFAULT_SETTINGS };
    }
  }

  function persistSettings() {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(state.settings));
    } catch (error) {
      console.warn('[MCGZ] Failed to persist settings', error);
    }
  }

  function applyTheme(theme) {
    const next = theme === 'light' ? 'light' : 'dark';
    state.settings.theme = next;
    if (document.body) {
      document.body.setAttribute('data-theme', next);
    }
    persistSettings();
    updateThemeToggle();
  }

  function updateThemeToggle(root = document) {
    const toggle = root.querySelector('[data-theme-toggle]');
    if (!toggle) return;
    const isLight = state.settings.theme === 'light';
    toggle.setAttribute('aria-pressed', String(isLight));
    const icon = toggle.querySelector('[aria-hidden]');
    if (icon) {
      icon.textContent = isLight ? '🌙' : '☀️';
    }
    const sr = toggle.querySelector('.mc-sr');
    if (sr) {
      sr.textContent = isLight ? 'Switch to dark mode' : 'Switch to light mode';
    }
  }

  function setupThemeToggle(root = document) {
    const toggle = root.querySelector('[data-theme-toggle]');
    if (!toggle) return;
    toggle.addEventListener('click', () => {
      const next = state.settings.theme === 'light' ? 'dark' : 'light';
      applyTheme(next);
    });
    updateThemeToggle(root);
  }

  function ensureStylesheet(href, id) {
    if (document.querySelector(`link[href="${href}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    if (id) link.id = id;
    document.head.appendChild(link);
  }

  function ensureGameStyles() {
    ensureStylesheet('../shared/styles/app.css', 'mcgz-app-style');
    ensureStylesheet('../shared/styles/game-shell.css', 'mcgz-game-shell-style');
  }

  function ensureAudioContext() {
    if (state.audio.context) return state.audio.context;
    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) {
      state.audio.enabled = false;
      return null;
    }
    try {
      state.audio.context = new AudioContextCtor();
      state.audio.primed = true;
    } catch (error) {
      console.warn('[MCGZ] Failed to create audio context', error);
      state.audio.enabled = false;
      return null;
    }
    return state.audio.context;
  }

  function playClickFx() {
    if (!state.audio.enabled) return;
    const ctx = ensureAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(360, now);
    osc.frequency.exponentialRampToValueAtTime(190, now + 0.12);
    gain.gain.setValueAtTime(0.24, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.14);
  }

  function initButtonFx() {
    if (state.audio.initialized) return;
    state.audio.initialized = true;
    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) {
      state.audio.enabled = false;
      return;
    }
    const prime = () => {
      ensureAudioContext();
    };
    document.addEventListener('pointerdown', () => {
      if (!state.audio.primed) {
        prime();
      }
    }, { once: true, capture: true });
    document.addEventListener('click', (event) => {
      if (event.target.closest('.mc-btn, .mc-gamecard, .mc-toggle, .mc-slide__cta')) {
        playClickFx();
      }
    });
  }

  function deriveGameIdFromPath() {
    const { pathname } = window.location;
    const found = state.games.find((game) => {
      const target = game.path.replace(/\.\//g, '/');
      return pathname.endsWith(target) || pathname.includes(`/${game.path}`) || pathname.includes(`/${game.id}`);
    });
    return found ? found.id : null;
  }

  function ensureGameIdentity() {
    if (!document.body.dataset.mcgzContext) {
      document.body.dataset.mcgzContext = 'game';
    }
    if (!document.body.dataset.mcgzGameId) {
      const derived = deriveGameIdFromPath();
      if (derived) {
        document.body.dataset.mcgzGameId = derived;
      }
    }
  }

  function wrapGameStage() {
    const overlay = document.querySelector('.mc-gameoverlay');
    const wrappers = Array.from(document.body.children).filter(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        !node.classList.contains('mc-topbar') &&
        node !== overlay
    );
    if (wrappers.length === 1 && wrappers[0].classList.contains('mc-game-stage')) {
      ensureStageHud(wrappers[0]);
      return wrappers[0];
    }
    const stage = document.createElement('main');
    stage.className = 'mc-game-stage';
    wrappers.forEach((node) => {
      stage.appendChild(node);
    });
    const insertBeforeNode = overlay || null;
    document.body.insertBefore(stage, insertBeforeNode);
    ensureStageHud(stage);
    return stage;
  }

  function ensureStageHud(stage) {
    if (!stage) return;
    let hud = stage.querySelector('.mc-stage-hud');
    if (!hud) {
      hud = document.createElement('div');
      hud.className = 'mc-stage-hud';
      hud.innerHTML = `
        <div class="mc-stage-hud__item" data-stage-scorecard>
          <span class="mc-stage-hud__label">Game Score</span>
          <span class="mc-stage-hud__value" data-stage-score>0</span>
        </div>`;
      stage.prepend(hud);
    }
    state.stageScoreEl = hud.querySelector('[data-stage-score]');
  }

  function updateStageScore(value) {
    if (!state.stageScoreEl) return;
    state.stageScoreEl.textContent = value;
  }

  function loadUsers() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.USERS);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.warn('[MCGZ] Failed to parse users', err);
      return [];
    }
  }

  function persistUsers() {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(state.users));
  }

  function getUserById(id) {
    return state.users.find((user) => user.id === id) || null;
  }

  function getUserByTag(tag) {
    const normalized = String(tag || '').trim().toLowerCase();
    return state.users.find((user) => user.tagLower === normalized) || null;
  }

  function uuid() {
    return 'xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  function ensureViewport() {
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      document.head.appendChild(viewport);
    }
    viewport.setAttribute('content', 'width=device-width, initial-scale=1, viewport-fit=cover');
  }

  function loadActiveUser() {
    const activeId = localStorage.getItem(STORAGE_KEYS.ACTIVE_USER);
    if (!activeId) return null;
    const user = getUserById(activeId);
    if (!user) {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_USER);
      return null;
    }
    return user;
  }

  function setActiveUser(user) {
    if (!user) {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_USER);
      state.activeUser = null;
      return;
    }
    state.activeUser = user;
    localStorage.setItem(STORAGE_KEYS.ACTIVE_USER, user.id);
  }

  function createUser({ gamerTag }) {
    const tag = String(gamerTag || '').trim();
    if (!tag) {
      throw new Error('Gaming name is required.');
    }
    if (getUserByTag(tag)) {
      throw new Error('That gaming name is already claimed.');
    }
    const now = new Date().toISOString();
    const initials = tag
      .split(/\s+/)
      .map((chunk) => chunk[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
    const user = {
      id: uuid(),
      gamerTag: tag,
      tagLower: tag.toLowerCase(),
      createdAt: now,
      updatedAt: now,
      totalPoints: 0,
      highScores: {},
      streak: 0,
      avatarHue: Math.floor(Math.random() * 360)
    };
    state.users.push(user);
    persistUsers();
    setActiveUser(user);
    return user;
  }

  function login({ gamerTag }) {
    const tag = String(gamerTag || '').trim();
    if (!tag) {
      throw new Error('Enter your gaming name to log in.');
    }
    const user = getUserByTag(tag);
    if (!user) {
      throw new Error('We could not find that gaming name yet. Try signing up.');
    }
    setActiveUser(user);
    return user;
  }

  function recordScore(gameId, value, mode = 'best') {
    if (!state.activeUser) return;
    const numericValue = Number(value) || 0;
    const user = state.activeUser;
    const previous = user.highScores[gameId]?.score || 0;
    let storedScore = previous;
    let delta = 0;

    if (mode === 'cumulative') {
      storedScore = previous + numericValue;
      delta = numericValue;
    } else {
      storedScore = Math.max(previous, numericValue);
      delta = Math.max(0, storedScore - previous);
    }

    if (!user.highScores[gameId] || storedScore !== previous) {
      user.highScores[gameId] = {
        score: storedScore,
        updatedAt: new Date().toISOString(),
        attempts: (user.highScores[gameId]?.attempts || 0) + 1
      };
      state.lastScoreValue = storedScore;
      touchUser(user, delta);
      persistUsers();
      emitLeaderboardUpdate();
      updateStageScore(storedScore);
      if (delta > 0) {
        showToast(`+${delta} pts added to your total`);
      }
    }
  }

  function addPoints(delta) {
    if (!state.activeUser) return;
    const inc = Number(delta) || 0;
    if (!inc) return;
    state.activeUser.totalPoints += inc;
    state.activeUser.updatedAt = new Date().toISOString();
    persistUsers();
    emitLeaderboardUpdate();
    showToast(`+${inc} pts earned`);
    refreshOverlay();
    updateStageScore(state.activeUser.highScores[document.body.dataset.mcgzGameId]?.score || inc);
  }

  function touchUser(user, bonus = 0) {
    user.updatedAt = new Date().toISOString();
    if (bonus) {
      user.totalPoints = Math.max(user.totalPoints, 0) + Number(bonus) || 0;
    }
  }

  function getSortedLeaderboard() {
    return [...state.users]
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .map((user, index) => ({
        rank: index + 1,
        tag: user.gamerTag,
        totalPoints: user.totalPoints,
        avatarHue: user.avatarHue,
        highScoreCount: Object.keys(user.highScores).length
      }));
  }

  function emitLeaderboardUpdate() {
    document.dispatchEvent(new CustomEvent('mcgz:leaderboard:update'));
  }

  function showToast(message) {
    let toast = document.querySelector('.mc-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'mc-toast';
      toast.innerHTML = `<span class="mc-toast__icon">🚀</span><span class="mc-toast__text"></span>`;
      document.body.appendChild(toast);
    }
    toast.querySelector('.mc-toast__text').textContent = message;
    toast.classList.add('mc-toast--show');
    clearTimeout(state.toastTimer);
    state.toastTimer = setTimeout(() => {
      toast.classList.remove('mc-toast--show');
    }, 2400);
  }

  function buildTopbar() {
    if (document.querySelector('.mc-topbar')) return;
    const bar = document.createElement('header');
    bar.className = 'mc-topbar';
    bar.innerHTML = `
      <div class="mc-topbar__inner">
        <a class="mc-logo" href="https://mobilecityphonesparadise.com/" target="_blank" rel="noopener">
          <img src="../logo.png" alt="Mobile City Game Zone logo" loading="lazy" />
          <span>Mobile City Game Zone</span>
        </a>
        <nav class="mc-nav" aria-label="Primary">
          <a href="../index.html#hot">Hot</a>
          <a href="../index.html#games">Games</a>
          <a href="../index.html#addons">Add-ons</a>
          <a href="../index.html#leaderboard">Leaderboard</a>
        </nav>
        <div class="mc-topbar__actions">
          <button class="mc-toggle" type="button" aria-pressed="false" data-theme-toggle>
            <span class="mc-sr">Switch to light mode</span>
            <span aria-hidden="true">☀️</span>
          </button>
          <a class="mc-btn mc-btn--ghost" href="../index.html">Hub</a>
          <div class="mc-userpill" role="presentation">
            <span class="mc-userpill__avatar" data-avatar></span>
            <div class="mc-userpill__meta">
              <strong data-username>Player</strong>
              <span><span data-userpoints>0</span> pts collected</span>
            </div>
          </div>
        </div>
      </div>`;
    document.body.prepend(bar);
    setupThemeToggle(bar);
    refreshTopbar();
  }

  function refreshTopbar() {
    const avatar = document.querySelector('[data-avatar]');
    const username = document.querySelector('[data-username]');
    const points = document.querySelector('[data-userpoints]');
    if (!avatar || !username || !points) return;
    if (!state.activeUser) {
      avatar.textContent = 'MC';
      avatar.style.backgroundColor = 'var(--mc-color-primary)';
      username.textContent = 'Guest Player';
      points.textContent = '0';
      return;
    }
    avatar.textContent = state.activeUser.gamerTag.slice(0, 2).toUpperCase();
    avatar.style.backgroundColor = `hsl(${state.activeUser.avatarHue} 85% 55%)`;
    username.textContent = state.activeUser.gamerTag;
    points.textContent = state.activeUser.totalPoints;
  }

  function buildGameOverlay() {
    if (document.querySelector('.mc-gameoverlay')) return;
    const overlay = document.createElement('div');
    overlay.className = 'mc-gameoverlay';
    overlay.innerHTML = `
      <div class="mc-gameoverlay__inner">
        <div class="mc-gameoverlay__top">
          <button class="mc-btn mc-btn--ghost" data-mc-back type="button">← Back to Hub</button>
          <div class="mc-gameoverlay__score">Total Score <strong data-overlay-score>0</strong></div>
        </div>
        <div class="mc-gameoverlay__bottom">
          <button class="mc-btn mc-btn--primary" data-mc-leaderboard type="button">Leaderboard</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay
      .querySelector('[data-mc-back]')
      .addEventListener('click', () => {
        window.location.href = '../index.html';
      });
    overlay
      .querySelector('[data-mc-leaderboard]')
      .addEventListener('click', () => {
        window.location.href = '../index.html#leaderboard';
      });
    refreshOverlay();
  }

  function refreshOverlay() {
    const overlayScore = document.querySelector('[data-overlay-score]');
    if (overlayScore && state.activeUser) {
      overlayScore.textContent = state.activeUser.totalPoints;
    }
  }

  function ensureUserSession({ redirectIfMissing } = {}) {
    if (state.activeUser) return state.activeUser;
    const user = loadActiveUser();
    if (user) {
      state.activeUser = user;
      return user;
    }
    if (redirectIfMissing) {
      window.location.href = '../index.html#signupAnchor';
    }
    return null;
  }

  function initScoreWatcher(config) {
    if (state.scoreObserver) {
      state.scoreObserver.disconnect();
      state.scoreObserver = null;
    }
    const { selector, mode, parse = parseFloat } = config || {};
    if (!selector) return;
    const target = document.querySelector(selector);
    if (!target) {
      console.warn('[MCGZ] Score element not found for selector:', selector);
      return;
    }
    const readScore = () => {
      const text = target.textContent || target.value || '0';
      const value = parse(text.replace(/[^0-9.\-]/g, ''));
      return Number.isFinite(value) ? value : 0;
    };
    let last = readScore();
    const observer = new MutationObserver(() => {
      const current = readScore();
      if (mode === 'incremental') {
        const delta = current - last;
        if (delta > 0) {
          addPoints(delta);
        }
      } else {
        recordScore(document.body.dataset.mcgzGameId, current, mode);
      }
      last = current;
    });
    observer.observe(target, { childList: true, characterData: true, subtree: true });
    state.scoreObserver = observer;
  }

  function initHub() {
    document.body.setAttribute('data-mcgz', '1');
    ensureViewport();
    state.users = loadUsers();
    setActiveUser(loadActiveUser());
    refreshTopbar();
    renderAuth();
    renderGameGrid();
    renderLeaderboard();
    renderSpotlight();
    setupThemeToggle(document);
    document.addEventListener('mcgz:leaderboard:update', renderLeaderboard);
  }

  function renderAuth() {
    const authWrapper = document.querySelector('[data-auth-block]');
    const form = document.querySelector('[data-auth-form]');
    const toggleBtn = document.querySelector('[data-toggle-auth]');
    if (!authWrapper || !form || !toggleBtn) return;

    let mode = 'signup';

    const gamerTagField = form.querySelector('[name="gamerName"]');

    function handleSubmit(event) {
      event.preventDefault();
      const gamerTag = gamerTagField.value;
      try {
        if (mode === 'signup') {
          createUser({ gamerTag });
          showToast('Welcome to Mobile City Game Zone!');
        } else {
          login({ gamerTag });
          showToast('Welcome back!');
        }
        gamerTagField.value = '';
        refreshTopbar();
        renderLeaderboard();
        renderGameGrid();
        renderSpotlight();
        updateAuthVisibility();
      } catch (error) {
        showToast(error.message);
      }
    }

    function updateAuthVisibility() {
      if (state.activeUser) {
        authWrapper.classList.add('mc-auth--hidden');
      } else {
        authWrapper.classList.remove('mc-auth--hidden');
      }
    }

    form.addEventListener('submit', handleSubmit);
    toggleBtn.addEventListener('click', () => {
      mode = mode === 'signup' ? 'login' : 'signup';
      form.querySelector('[data-auth-title]').textContent =
        mode === 'signup' ? 'Create your player profile' : 'Log in with your gaming name';
      form.querySelector('[data-auth-submit]').textContent = mode === 'signup' ? 'Sign Up & Play' : 'Log In & Play';
      toggleBtn.textContent =
        mode === 'signup' ? 'Already have an account? Tap here to log in.' : "Need an account? Tap here to sign up.";
    });

    updateAuthVisibility();
  }

  function renderGameGrid() {
    const grid = document.querySelector('[data-game-grid]');
    if (!grid) return;
    grid.innerHTML = '';
    state.games.forEach((game) => {
      const card = document.createElement('a');
      card.className = 'mc-gamecard';
      card.href = state.activeUser ? game.path : '#signupAnchor';
      card.dataset.gameId = game.id;
      card.innerHTML = `
        <div class="mc-gamecard__icon">
          <img src="${game.icon}" alt="${game.title} icon" loading="lazy" />
        </div>
        <strong>${game.title}</strong>
        <p class="mc-tagline">${game.tagline}</p>
        <div class="mc-gamecard__meta">
          <span>Tap to play</span>
          <span aria-hidden="true">→</span>
        </div>`;
      if (!state.activeUser) {
        card.addEventListener('click', (event) => {
          event.preventDefault();
          document.getElementById('signupAnchor')?.scrollIntoView({ behavior: 'smooth' });
          showToast('Sign up or log in to start playing.');
        });
      }
      grid.appendChild(card);
    });
    syncSpotlightLinks();
  }

  function renderSpotlight() {
    const track = document.querySelector('[data-spotlight-track]');
    if (!track) return;
    stopSpotlightLoop();
    track.innerHTML = '';
    HOT_GAMES.forEach((entry) => {
      const game = state.games.find((item) => item.id === entry.id) || entry;
      const slide = document.createElement('article');
      slide.className = 'mc-slide';
      slide.style.backgroundColor = entry.color;
      slide.innerHTML = `
        <span class="mc-slide__badge">Hot game</span>
        <h3 class="mc-slide__title">${entry.title || game.title}</h3>
        <p class="mc-slide__meta">${entry.message}</p>
        <p class="mc-slide__meta"><strong>${entry.stat}</strong></p>
        <a class="mc-slide__cta" data-slide-link="${entry.id}" href="${state.activeUser ? game.path : '#signupAnchor'}">Play now →</a>
      `;
      track.appendChild(slide);
    });
    state.spotlightIndex = 0;
    requestAnimationFrame(() => updateSpotlight(0, { instant: true }));
    setupSpotlightControls();
    syncSpotlightLinks();
    if (!window.matchMedia || !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      startSpotlightLoop();
    }
  }

  function syncSpotlightLinks() {
    const links = document.querySelectorAll('[data-slide-link]');
    if (!links.length) return;
    links.forEach((link) => {
      const game = state.games.find((item) => item.id === link.dataset.slideLink);
      if (!game) return;
      if (state.activeUser) {
        link.setAttribute('href', game.path);
        link.removeAttribute('data-locked');
      } else {
        link.setAttribute('href', '#signupAnchor');
        link.dataset.locked = '1';
      }
      if (!link.dataset.bound) {
        link.dataset.bound = '1';
        link.addEventListener('click', (event) => {
          if (!state.activeUser) {
            event.preventDefault();
            document.getElementById('signupAnchor')?.scrollIntoView({ behavior: 'smooth' });
            showToast('Sign up or log in to play the spotlight titles.');
          }
        });
      }
    });
  }

  function getSlideStep() {
    const track = document.querySelector('[data-spotlight-track]');
    if (!track || track.children.length === 0) return 0;
    const slides = Array.from(track.children);
    if (slides.length === 1) {
      return slides[0].getBoundingClientRect().width;
    }
    const first = slides[0];
    const second = slides[1];
    return second.offsetLeft - first.offsetLeft;
  }

  function updateSpotlight(index, { instant } = {}) {
    const track = document.querySelector('[data-spotlight-track]');
    if (!track) return;
    const slides = Array.from(track.children);
    if (!slides.length) return;
    const max = slides.length;
    const nextIndex = ((index % max) + max) % max;
    state.spotlightIndex = nextIndex;
    const step = getSlideStep();
    if (!step) return;
    const offset = -step * nextIndex;
    if (instant) {
      const previousTransition = track.style.transition;
      track.style.transition = 'none';
      track.style.transform = `translateX(${offset}px)`;
      requestAnimationFrame(() => {
        track.style.transition = previousTransition || '';
      });
    } else {
      track.style.transform = `translateX(${offset}px)`;
    }
  }

  function stopSpotlightLoop() {
    if (state.spotlightTimer) {
      clearInterval(state.spotlightTimer);
      state.spotlightTimer = null;
    }
  }

  function startSpotlightLoop() {
    stopSpotlightLoop();
    state.spotlightTimer = setInterval(() => {
      updateSpotlight(state.spotlightIndex + 1);
    }, 6000);
  }

  function setupSpotlightControls() {
    const prev = document.querySelector('[data-spotlight-prev]');
    const next = document.querySelector('[data-spotlight-next]');
    if (prev && !prev.dataset.bound) {
      prev.dataset.bound = '1';
      prev.addEventListener('click', () => {
        updateSpotlight(state.spotlightIndex - 1);
        if (state.spotlightTimer) startSpotlightLoop();
      });
    }
    if (next && !next.dataset.bound) {
      next.dataset.bound = '1';
      next.addEventListener('click', () => {
        updateSpotlight(state.spotlightIndex + 1);
        if (state.spotlightTimer) startSpotlightLoop();
      });
    }
    const viewport = document.querySelector('[data-spotlight]');
    if (viewport && !viewport.dataset.bound) {
      viewport.dataset.bound = '1';
      viewport.addEventListener('mouseenter', stopSpotlightLoop);
      viewport.addEventListener('mouseleave', startSpotlightLoop);
      viewport.addEventListener('focusin', stopSpotlightLoop);
      viewport.addEventListener('focusout', startSpotlightLoop);
    }
  }

  function renderLeaderboard() {
    const tableBody = document.querySelector('[data-leaderboard-body]');
    const emptyState = document.querySelector('[data-leaderboard-empty]');
    if (!tableBody || !emptyState) return;

    const leaderboard = getSortedLeaderboard();
    tableBody.innerHTML = '';
    if (!leaderboard.length) {
      emptyState.classList.remove('mc-leaderboard--hidden');
      return;
    }
    emptyState.classList.add('mc-leaderboard--hidden');

    leaderboard.forEach((user) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>#${user.rank}</td>
        <td>
          <div class="mc-userpill" style="padding: 0.35rem 0.65rem;">
            <span class="mc-userpill__avatar" style="width:32px;height:32px;font-size:0.85rem;background-color: hsl(${user.avatarHue} 85% 55%);">
              ${user.tag.slice(0, 2).toUpperCase()}
            </span>
            <div class="mc-userpill__meta">
              <strong>${user.tag}</strong>
              <span>${user.highScoreCount} high scores</span>
            </div>
          </div>
        </td>
        <td>${user.totalPoints}</td>`;
      tableBody.appendChild(row);
    });
  }

  function initGame() {
    document.body.setAttribute('data-mcgz', '1');
    ensureViewport();
    ensureGameStyles();
    ensureGameIdentity();
    state.context = 'game';
    state.users = loadUsers();
    setActiveUser(loadActiveUser());
    const config = state.games.find((game) => game.id === document.body.dataset.mcgzGameId);
    if (config) {
      if (config.scoreSelector && !document.body.dataset.mcgzScoreSelector) {
        document.body.dataset.mcgzScoreSelector = config.scoreSelector;
      }
      if (config.scoreMode && !document.body.dataset.mcgzScoreMode) {
        document.body.dataset.mcgzScoreMode = config.scoreMode;
      }
    }

    const user = ensureUserSession({ redirectIfMissing: true });
    if (!user) return;
    buildTopbar();
    buildGameOverlay();
    wrapGameStage();
    refreshTopbar();
    refreshOverlay();
    updateStageScore(0);

    const scoreSelector = document.body.dataset.mcgzScoreSelector;
    const scoreMode = document.body.dataset.mcgzScoreMode || 'best';
    if (scoreSelector) {
      initScoreWatcher({ selector: scoreSelector, mode: scoreMode });
    }
    window.GameHub = window.GameHub || {};
    Object.assign(window.GameHub, {
      addPoints,
      recordScore,
      refreshProfile: () => {
        refreshTopbar();
        refreshOverlay();
      },
      setStageScore: updateStageScore
    });
  }

  function bootstrap() {
    if (!isBrowser) return;
    state.settings = loadSettings();
    state.audio.enabled = state.settings.sound !== false;
    applyTheme(state.settings.theme);
    initButtonFx();
    state.users = loadUsers();
    setActiveUser(loadActiveUser());
    let context = document.body?.dataset?.mcgzContext;
    if (!context) {
      const pathMatch = /\/\d{2}-/.test(window.location.pathname);
      context = pathMatch ? 'game' : 'hub';
      document.body.dataset.mcgzContext = context;
      if (context === 'game') {
        const derivedId = deriveGameIdFromPath();
        if (derivedId && !document.body.dataset.mcgzGameId) {
          document.body.dataset.mcgzGameId = derivedId;
        }
      }
    }
    if (context === 'game') {
      initGame();
    } else {
      initHub();
    }
  }

  document.addEventListener('DOMContentLoaded', bootstrap);

  window.MobileCity = {
    getCatalog: () => [...state.games],
    getActiveUser: () => state.activeUser,
    addPoints,
    recordScore,
    showToast,
    setStageScore: updateStageScore
  };
})();
