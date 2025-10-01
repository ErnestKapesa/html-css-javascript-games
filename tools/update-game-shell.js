const fs = require('fs');
const path = require('path');

const root = process.cwd();
const gameDirPattern = /^\d{2}-/;

const dirs = fs
  .readdirSync(root)
  .filter((name) => gameDirPattern.test(name) && fs.statSync(path.join(root, name)).isDirectory());

const GAME_ID_BY_DIR = {
  '01-Candy-Crush-Game': 'candy-crush',
  '02-Archery-Game': 'archery',
  '03-Speed-Typing-Game': 'speed-typing',
  '04-Breakout-Game': 'breakout',
  '05-Minesweeper-Game': 'minesweeper',
  '06-Tower-Blocks': 'tower-blocks',
  '07-Ping-Pong-Game': 'ping-pong',
  '08-Tetris-Game': 'tetris',
  '09-Tilting-Maze-Game': 'tilting-maze',
  '10-Memory-Card-Game': 'memory-cards',
  '11-Rock-Paper-Scissors': 'rps',
  '12-Type-Number-Guessing-Game': 'number-guess',
  '13-Tic-Tac-Toe': 'tic-tac-toe',
  '14-Snake-Game': 'snake',
  '15-Connect-Four-Game': 'connect-four',
  '16-Insect-Catch-Game': 'insect-catch',
  '17-Typing-Game': 'typing-trainer',
  '18-Hangman-Game': 'hangman',
  '19-Flappy-Bird-Game': 'flappy',
  '20-Crossy-Road-Game': 'crossy-road',
  '21-2048-Game': '2048',
  '22-Dice-Roll-Simulator': 'dice-roll',
  '23-Shape-Clicker-Game': 'shape-clicker',
  '24-Typing-Game': 'typing-zen',
  '25-Speak-Number-Guessing-Game': 'speak-number',
  '26-Fruit-Slicer-Game': 'fruit-slicer',
  '27-Quiz-Game': 'quiz',
  '28-Emoji-Catcher-Game': 'emoji-catcher',
  '29-Whack-A-Mole-Game': 'whack-a-mole',
  '30-Simon-Says-Game': 'simon-says'
};

const STYLE_HREFS = [
  '../shared/styles/app.css',
  '../shared/styles/game-shell.css'
];

const SCRIPT_SRC = '../shared/scripts/app.js';

function ensureStyleLinks(html) {
  let updated = html;
  STYLE_HREFS.forEach((href) => {
    if (!updated.includes(href)) {
      const linkTag = `    <link rel="stylesheet" href="${href}" />\n`;
      const headCloseIndex = updated.indexOf('</head>');
      if (headCloseIndex !== -1) {
        updated =
          updated.slice(0, headCloseIndex) +
          linkTag +
          updated.slice(headCloseIndex);
      }
    }
  });
  return updated;
}

function ensureScript(html) {
  if (html.includes(SCRIPT_SRC)) return html;
  const scriptTag = `    <script src="${SCRIPT_SRC}" defer></script>\n`;
  const scriptRegex = /<script[^>]*src=\"(?!https?:)[^\"]+\"[^>]*><\/script>/i;
  const match = scriptRegex.exec(html);
  if (match) {
    const index = match.index;
    return html.slice(0, index) + scriptTag + html.slice(index);
  }
  const bodyCloseIndex = html.indexOf('</body>');
  if (bodyCloseIndex !== -1) {
    return html.slice(0, bodyCloseIndex) + scriptTag + html.slice(bodyCloseIndex);
  }
  return html + '\n' + scriptTag;
}

function ensureDeferOnLocalScripts(html) {
  const scriptRegex = /<script([^>]*?)src="(?!https?:|\/\/)([^"#?]+)"([^>]*)><\/script>/gi;
  return html.replace(scriptRegex, (match) => {
    if (/\bdefer\b/i.test(match) || /type="module"/i.test(match)) {
      return match;
    }
    return match.replace('<script', '<script defer');
  });
}

function ensureBodyDataset(html, gameId) {
  const bodyTagRegex = /<body([^>]*)>/i;
  return html.replace(bodyTagRegex, (full, attrs) => {
    let existing = attrs || '';
    const hasContext = /data-mcgz-context=/.test(existing);
    if (!hasContext) {
      existing = `${existing}${existing && !/\s$/.test(existing) ? ' ' : ''}data-mcgz-context="game"`;
    }
    if (/data-mcgz-game-id=/.test(existing)) {
      existing = existing.replace(/data-mcgz-game-id="[^"]*"/, `data-mcgz-game-id="${gameId}"`);
    } else {
      existing = `${existing}${existing && !/\s$/.test(existing) ? ' ' : ''}data-mcgz-game-id="${gameId}"`;
    }
    const trimmed = existing.trim();
    return trimmed.length ? `<body ${trimmed}>` : '<body>';
  });
}

function deriveGameId(dirName) {
  if (GAME_ID_BY_DIR[dirName]) return GAME_ID_BY_DIR[dirName];
  return dirName
    .replace(/^\d{2}-/, '')
    .replace(/-game$/i, '')
    .replace(/-game$/i, '')
    .replace(/-+/g, '-')
    .replace(/-+$/, '')
    .toLowerCase();
}

dirs.forEach((dir) => {
  const indexPath = path.join(root, dir, 'index.html');
  if (!fs.existsSync(indexPath)) return;
  let html = fs.readFileSync(indexPath, 'utf8');
  const gameId = deriveGameId(dir);
  html = ensureStyleLinks(html);
  html = ensureScript(html);
  html = ensureDeferOnLocalScripts(html);
  html = ensureBodyDataset(html, gameId);
  fs.writeFileSync(indexPath, html, 'utf8');
  console.log(`Updated ${indexPath}`);
});
