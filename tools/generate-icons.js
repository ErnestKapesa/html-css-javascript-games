const fs = require('fs');
const path = require('path');

const ICON_DIR = path.join(process.cwd(), 'assets/icons');
if (!fs.existsSync(ICON_DIR)) fs.mkdirSync(ICON_DIR, { recursive: true });

const ICONS = {
  'candy-crush': ({ bg }) => `
    <rect x="10" y="10" width="108" height="108" rx="28" fill="${bg}" />
    <g transform="translate(20 24)">
      <circle cx="20" cy="24" r="14" fill="#ff73a7" />
      <rect x="44" y="12" width="26" height="24" rx="12" fill="#ffd166" />
      <circle cx="84" cy="28" r="12" fill="#20d3ff" />
      <rect x="14" y="52" width="58" height="18" rx="9" fill="#a855f7" />
      <circle cx="86" cy="64" r="10" fill="#f97316" />
    </g>
  `,
  archery: ({ bg }) => `
    <rect x="10" y="10" width="108" height="108" rx="28" fill="${bg}" />
    <circle cx="64" cy="64" r="30" fill="#fde047" />
    <circle cx="64" cy="64" r="20" fill="#f97316" />
    <circle cx="64" cy="64" r="10" fill="#0ea5e9" />
    <path d="M26 42l48 22" stroke="#0f172a" stroke-width="6" stroke-linecap="round" />
    <polygon points="80,60 108,50 92,78" fill="#0f172a" />
  `,
  'speed-typing': ({ bg }) => `
    <rect x="10" y="10" width="108" height="108" rx="28" fill="${bg}" />
    <rect x="28" y="32" width="72" height="46" rx="10" fill="#1d4ed8" />
    <text x="64" y="58" text-anchor="middle" fill="#fff" font-size="20" font-weight="700" font-family="'Poppins', sans-serif">WPM</text>
    <rect x="32" y="86" width="64" height="12" rx="6" fill="#0f172a" opacity="0.55" />
    <rect x="44" y="84" width="12" height="16" rx="3" fill="#fde047" />
  `,
  breakout: ({ bg }) => `
    <rect x="10" y="10" width="108" height="108" rx="28" fill="${bg}" />
    <g transform="translate(20 20)">
      <rect x="0" y="0" width="88" height="14" rx="6" fill="#fb7185" />
      <rect x="0" y="22" width="88" height="14" rx="6" fill="#34d399" />
      <rect x="0" y="44" width="88" height="14" rx="6" fill="#60a5fa" />
      <circle cx="44" cy="72" r="10" fill="#fde047" />
      <rect x="20" y="82" width="48" height="12" rx="6" fill="#0f172a" />
    </g>
  `,
  minesweeper: ({ bg }) => `
    <rect x="10" y="10" width="108" height="108" rx="28" fill="${bg}" />
    <g transform="translate(24 24)">
      <rect x="0" y="0" width="80" height="80" rx="14" fill="#1f2937" />
      ${[0,1,2].map((r)=>[0,1,2].map((c)=>`<rect x="${8+c*24}" y="${8+r*24}" width="16" height="16" rx="4" fill="#${r===1&&c===1?'ef4444':'334155'}" />`).join('')).join('')}
      <circle cx="48" cy="48" r="6" fill="#f8fafc" />
    </g>
  `,
  'tower-blocks': ({ bg }) => `
    <rect x="10" y="10" width="108" height="108" rx="28" fill="${bg}" />
    <g transform="translate(36 28)">
      <rect x="0" y="56" width="56" height="12" rx="6" fill="#1e293b" />
      <rect x="4" y="40" width="48" height="14" rx="7" fill="#38bdf8" />
      <rect x="8" y="24" width="40" height="14" rx="7" fill="#fb7185" />
      <rect x="12" y="6" width="32" height="16" rx="8" fill="#fde047" />
    </g>
  `,
  'ping-pong': ({ bg }) => `
    <rect x="10" y="10" width="108" height="108" rx="28" fill="${bg}" />
    <circle cx="46" cy="60" r="22" fill="#f87171" />
    <rect x="41" y="46" width="8" height="30" rx="4" fill="#facc15" />
    <circle cx="82" cy="44" r="8" fill="#f5f5f5" />
    <rect x="34" y="82" width="60" height="10" rx="5" fill="#334155" />
  `,
  tetris: ({ bg }) => `
    <rect x="10" y="10" width="108" height="108" rx="28" fill="${bg}" />
    <g transform="translate(32 32)" fill="#fff">
      <rect width="20" height="20" rx="4" fill="#fb7185" />
      <rect x="24" width="20" height="20" rx="4" fill="#38bdf8" />
      <rect x="48" width="20" height="20" rx="4" fill="#facc15" />
      <rect x="24" y="24" width="20" height="20" rx="4" fill="#22c55e" />
      <rect x="48" y="24" width="20" height="20" rx="4" fill="#a855f7" />
    </g>
  `,
  'tilting-maze': ({ bg }) => `
    <rect x="10" y="10" width="108" height="108" rx="28" fill="${bg}" />
    <path d="M34 38h60M34 64h40M58 90h36" stroke="#0f172a" stroke-width="8" stroke-linecap="round" />
    <circle cx="48" cy="64" r="10" fill="#22d3ee" />
  `,
  'memory-cards': ({ bg }) => `
    <rect x="10" y="10" width="108" height="108" rx="28" fill="${bg}" />
    <rect x="34" y="32" width="48" height="64" rx="12" fill="#38bdf8" />
    <rect x="44" y="24" width="48" height="64" rx="12" fill="#f87171" opacity="0.9" />
    <text x="68" y="68" text-anchor="middle" fill="#fff" font-size="26" font-family="'Poppins', sans-serif">?</text>
  `,
  rps: ({ bg }) => `
    <rect x="10" y="10" width="108" height="108" rx="28" fill="${bg}" />
    <g transform="translate(28 28)">
      <circle cx="18" cy="18" r="14" fill="#f97316" />
      <rect x="32" y="36" width="36" height="24" rx="12" fill="#0ea5e9" />
      <path d="M12 52c10-14 20-14 30 0" stroke="#facc15" stroke-width="12" stroke-linecap="round" fill="none" />
    </g>
  `,
  'number-guess': ({ bg }) => `
    <rect x="10" y="10" width="108" height="108" rx="28" fill="${bg}" />
    <text x="64" y="54" text-anchor="middle" fill="#fff" font-size="28" font-family="'Poppins', sans-serif" font-weight="700">?</text>
    <rect x="34" y="64" width="60" height="26" rx="13" fill="#1d4ed8" />
    <text x="64" y="82" text-anchor="middle" fill="#fff" font-size="16" font-family="'Poppins', sans-serif">1234</text>
  `,
  'tic-tac-toe': ({ bg }) => `
    <rect x="10" y="10" width="108" height="108" rx="28" fill="${bg}" />
    <g stroke="#fff" stroke-width="8" stroke-linecap="round" fill="none" transform="translate(32 32)">
      <path d="M0 20h64M0 44h64M20 0v64M44 0v64" />
      <path d="M6 6l28 28" />
      <path d="M34 6l28 28" />
      <circle cx="50" cy="50" r="10" />
    </g>
  `,
  snake: ({ bg }) => `
    <rect x="10" y="10" width="108" height="108" rx="28" fill="${bg}" />
    <path d="M34 80c18-18 34-6 34-32 0-14-10-18-20-10" stroke="#22c55e" stroke-width="10" stroke-linecap="round" fill="none" />
    <circle cx="62" cy="42" r="6" fill="#22c55e" />
    <circle cx="58" cy="38" r="3" fill="#0f172a" />
  `,
  'connect-four': ({ bg }) => `
    <rect x="10" y="10" width="108" height="108" rx="28" fill="${bg}" />
    ${[0,1,2].map((row) => [0,1,2,3].map((col) => `<circle cx="${28+col*18}" cy="${32+row*20}" r="8" fill="${(row+col)%2? '#fbbf24':'#38bdf8'}" />`).join('')).join('')}
  `,
  'insect-catch': ({ bg }) => `
    <rect x="10" y="10" width="108" height="108" rx="28" fill="${bg}" />
    <path d="M36 84l32-56" stroke="#fff" stroke-width="10" stroke-linecap="round" />
    <circle cx="80" cy="40" r="12" fill="#fb7185" />
    <circle cx="72" cy="36" r="4" fill="#fff" />
  `,
  'typing-trainer': ({ bg }) => `
    <rect x="10" y="10" width="108" height="108" rx="28" fill="${bg}" />
    <rect x="26" y="34" width="76" height="42" rx="10" fill="#1d4ed8" />
    <rect x="34" y="84" width="60" height="12" rx="6" fill="#0f172a" opacity="0.7" />
    <text x="64" y="60" text-anchor="middle" fill="#fff" font-size="20" font-family="'Poppins', sans-serif">TYPE</text>
  `,
  hangman: ({ bg }) => `
    <rect x="10" y="10" width="108" height="108" rx="28" fill="${bg}" />
    <path d="M40 88h48M48 88V32h28M76 32v12" stroke="#0f172a" stroke-width="8" stroke-linecap="round" />
    <circle cx="76" cy="52" r="10" fill="#f87171" />
    <path d="M76 62v22" stroke="#f87171" stroke-width="8" stroke-linecap="round" />
  `,
  flappy: ({ bg }) => `
    <rect x="10" y="10" width="108" height="108" rx="28" fill="${bg}" />
    <path d="M40 74l0-44M88 74l0-36" stroke="#22c55e" stroke-width="12" stroke-linecap="round" />
    <path d="M58 68c18 0 30-10 30-24 0-10-8-18-20-18-18 0-30 10-30 24 0 10 8 18 20 18z" fill="#facc15" />
    <circle cx="70" cy="44" r="6" fill="#0f172a" />
  `,
  'crossy-road': ({ bg }) => `
    <rect x="10" y="10" width="108" height="108" rx="28" fill="${bg}" />
    <path d="M34 44h60" stroke="#e2e8f0" stroke-width="12" stroke-linecap="round" />
    <path d="M28 70h72" stroke="#e2e8f0" stroke-width="12" stroke-linecap="round" stroke-dasharray="16 12" />
    <rect x="50" y="78" width="28" height="16" rx="8" fill="#fb7185" />
    <circle cx="58" cy="50" r="8" fill="#38bdf8" />
  `,
  '2048': ({ bg }) => `
    <rect x="10" y="10" width="108" height="108" rx="28" fill="${bg}" />
    <g transform="translate(32 32)" font-family="'Poppins', sans-serif" font-weight="700" text-anchor="middle">
      <rect width="28" height="28" rx="8" fill="#fde68a" />
      <text x="14" y="20" fill="#0f172a">2</text>
      <rect x="32" width="28" height="28" rx="8" fill="#fcd34d" />
      <text x="46" y="20" fill="#0f172a">0</text>
      <rect y="32" width="28" height="28" rx="8" fill="#fbbf24" />
      <text x="14" y="52" fill="#0f172a">4</text>
      <rect x="32" y="32" width="28" height="28" rx="8" fill="#f97316" />
      <text x="46" y="52" fill="#0f172a">8</text>
    </g>
  `,
  'dice-roll': ({ bg }) => `
    <rect x="10" y="10" width="108" height="108" rx="28" fill="${bg}" />
    <rect x="34" y="30" width="60" height="60" rx="16" fill="#fff" />
    <circle cx="52" cy="50" r="6" fill="#0f172a" />
    <circle cx="76" cy="50" r="6" fill="#0f172a" />
    <circle cx="52" cy="70" r="6" fill="#0f172a" />
    <circle cx="76" cy="70" r="6" fill="#0f172a" />
    <circle cx="64" cy="60" r="6" fill="#0f172a" />
  `,
  'shape-clicker': ({ bg }) => `
    <rect x="10" y="10" width="108" height="108" rx="28" fill="${bg}" />
    <circle cx="46" cy="46" r="16" fill="#fb7185" />
    <rect x="66" y="34" width="20" height="24" rx="6" fill="#38bdf8" />
    <path d="M36 70h56" stroke="#fde047" stroke-width="12" stroke-linecap="round" />
  `,
  'typing-zen': ({ bg }) => `
    <rect x="10" y="10" width="108" height="108" rx="28" fill="${bg}" />
    <rect x="30" y="40" width="68" height="36" rx="14" fill="#38bdf8" opacity="0.8" />
    <rect x="32" y="46" width="62" height="18" rx="9" fill="#f8fafc" opacity="0.75" />
    <rect x="40" y="70" width="44" height="10" rx="5" fill="#0f172a" opacity="0.4" />
  `,
  'speak-number': ({ bg }) => `
    <rect x="10" y="10" width="108" height="108" rx="28" fill="${bg}" />
    <rect x="58" y="36" width="14" height="36" rx="7" fill="#22d3ee" />
    <rect x="52" y="72" width="26" height="12" rx="6" fill="#0ea5e9" />
    <path d="M44 44c-10 10-10 28 0 38" stroke="#f8fafc" stroke-width="6" stroke-linecap="round" />
    <text x="36" y="62" fill="#fde047" font-size="18" font-family="'Poppins', sans-serif" font-weight="700">123</text>
  `,
  'fruit-slicer': ({ bg }) => `
    <rect x="10" y="10" width="108" height="108" rx="28" fill="${bg}" />
    <circle cx="52" cy="56" r="20" fill="#22c55e" />
    <path d="M36 42c14 8 22 8 32 2" stroke="#f8fafc" stroke-width="4" stroke-linecap="round" />
    <polygon points="74,40 98,28 86,52" fill="#fb7185" />
    <rect x="46" y="74" width="40" height="8" rx="4" transform="rotate(-18 66 78)" fill="#fde047" />
  `,
  quiz: ({ bg }) => `
    <rect x="10" y="10" width="108" height="108" rx="28" fill="${bg}" />
    <circle cx="64" cy="56" r="28" fill="#22d3ee" />
    <text x="64" y="64" text-anchor="middle" fill="#0f172a" font-size="32" font-family="'Poppins', sans-serif" font-weight="700">?</text>
    <rect x="48" y="84" width="32" height="8" rx="4" fill="#0f172a" opacity="0.5" />
  `,
  'emoji-catcher': ({ bg }) => `
    <rect x="10" y="10" width="108" height="108" rx="28" fill="${bg}" />
    <circle cx="58" cy="56" r="26" fill="#facc15" />
    <circle cx="48" cy="48" r="4" fill="#0f172a" />
    <circle cx="68" cy="48" r="4" fill="#0f172a" />
    <path d="M48 66c6 6 14 6 20 0" stroke="#0f172a" stroke-width="6" stroke-linecap="round" />
    <path d="M80 88l14-28" stroke="#38bdf8" stroke-width="8" stroke-linecap="round" />
  `,
  'whack-a-mole': ({ bg }) => `
    <rect x="10" y="10" width="108" height="108" rx="28" fill="${bg}" />
    <ellipse cx="64" cy="80" rx="30" ry="12" fill="#0f172a" opacity="0.5" />
    <circle cx="64" cy="58" r="20" fill="#f97316" />
    <rect x="70" y="38" width="10" height="24" rx="4" fill="#facc15" transform="rotate(30 75 50)" />
    <circle cx="58" cy="54" r="4" fill="#0f172a" />
    <circle cx="74" cy="54" r="4" fill="#0f172a" />
    <path d="M58 68c6 4 12 4 18 0" stroke="#0f172a" stroke-width="4" stroke-linecap="round" />
  `,
  'simon-says': ({ bg }) => `
    <rect x="10" y="10" width="108" height="108" rx="28" fill="${bg}" />
    <circle cx="64" cy="64" r="34" fill="#0f172a" />
    <path d="M64 30a34 34 0 0 1 24 10L64 64z" fill="#22d3ee" />
    <path d="M88 40a34 34 0 0 1 0 48L64 64z" fill="#22c55e" />
    <path d="M88 88a34 34 0 0 1-48 0L64 64z" fill="#facc15" />
    <path d="M40 88a34 34 0 0 1 0-48L64 64z" fill="#fb7185" />
  `,
};

const GAME_ORDER = Object.keys(ICONS);

const COLORS = {
  'candy-crush': '#f472b6',
  archery: '#38bdf8',
  'speed-typing': '#6366f1',
  breakout: '#0ea5e9',
  minesweeper: '#94a3b8',
  'tower-blocks': '#fbbf24',
  'ping-pong': '#22d3ee',
  tetris: '#c084fc',
  'tilting-maze': '#f97316',
  'memory-cards': '#38bdf8',
  rps: '#facc15',
  'number-guess': '#2563eb',
  'tic-tac-toe': '#60a5fa',
  snake: '#22c55e',
  'connect-four': '#6366f1',
  'insect-catch': '#34d399',
  'typing-trainer': '#0ea5e9',
  hangman: '#f97316',
  flappy: '#22d3ee',
  'crossy-road': '#38bdf8',
  '2048': '#f59e0b',
  'dice-roll': '#94a3b8',
  'shape-clicker': '#a855f7',
  'typing-zen': '#0ea5e9',
  'speak-number': '#3b82f6',
  'fruit-slicer': '#f43f5e',
  quiz: '#38bdf8',
  'emoji-catcher': '#facc15',
  'whack-a-mole': '#f97316',
  'simon-says': '#0ea5e9',
};

Object.entries(ICONS).forEach(([id, renderer]) => {
  if (!renderer) return;
  const bg = COLORS[id] || '#6366f1';
  const content = renderer({ bg });
  const svg = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-labelledby="title">\n  <title>${id} icon</title>\n  <rect width="128" height="128" rx="32" fill="${bg}" />\n  ${content}\n</svg>\n`;
  fs.writeFileSync(path.join(ICON_DIR, `${id}.svg`), svg, 'utf8');
  console.log('Generated', id);
});
