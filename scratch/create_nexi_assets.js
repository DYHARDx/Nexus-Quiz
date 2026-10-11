const fs = require('fs');
const path = require('path');

const poses = ['idle', 'talk-closed', 'talk-open', 'wave', 'point-right', 'point-left', 'think', 'happy', 'oops', 'welcome'];

function getSvgForPose(pose) {
  let mouth = '<path d="M 80 120 Q 100 135 120 120" stroke="#1e293b" stroke-width="4" fill="none" stroke-linecap="round"/>';
  let eyes = `
    <circle cx="75" cy="95" r="7" fill="#1e293b"/>
    <circle cx="73" cy="93" r="2.5" fill="#ffffff"/>
    <circle cx="125" cy="95" r="7" fill="#1e293b"/>
    <circle cx="123" cy="93" r="2.5" fill="#ffffff"/>
  `;
  let arms = `
    <ellipse cx="40" cy="140" rx="14" ry="25" fill="#1e293b" transform="rotate(20 40 140)"/>
    <ellipse cx="160" cy="140" rx="14" ry="25" fill="#1e293b" transform="rotate(-20 160 140)"/>
  `;
  let extras = '';

  if (pose === 'talk-closed') {
    mouth = '<path d="M 85 120 Q 100 128 115 120" stroke="#1e293b" stroke-width="4" fill="none" stroke-linecap="round"/>';
  } else if (pose === 'talk-open') {
    mouth = '<path d="M 82 118 Q 100 142 118 118 Z" fill="#e11d48" stroke="#1e293b" stroke-width="3"/>';
  } else if (pose === 'wave') {
    arms = `
      <ellipse cx="40" cy="140" rx="14" ry="25" fill="#1e293b" transform="rotate(20 40 140)"/>
      <ellipse cx="165" cy="100" rx="14" ry="26" fill="#1e293b" transform="rotate(135 165 100)"/>
    `;
    extras = '<path d="M 175 75 Q 185 85 175 95" stroke="#6366f1" stroke-width="3" fill="none" stroke-linecap="round"/>';
  } else if (pose === 'point-right') {
    arms = `
      <ellipse cx="40" cy="140" rx="14" ry="25" fill="#1e293b" transform="rotate(20 40 140)"/>
      <path d="M 130 135 L 185 135 C 192 135 192 145 185 145 L 130 145 Z" fill="#1e293b"/>
      <polygon points="180,130 195,140 180,150" fill="#6366f1"/>
    `;
  } else if (pose === 'point-left') {
    arms = `
      <path d="M 70 135 L 15 135 C 8 135 8 145 15 145 L 70 145 Z" fill="#1e293b"/>
      <polygon points="20,130 5,140 20,150" fill="#6366f1"/>
      <ellipse cx="160" cy="140" rx="14" ry="25" fill="#1e293b" transform="rotate(-20 160 140)"/>
    `;
  } else if (pose === 'think') {
    arms = `
      <ellipse cx="45" cy="145" rx="14" ry="25" fill="#1e293b" transform="rotate(15 45 145)"/>
      <path d="M 140 150 Q 115 130 100 120" stroke="#1e293b" stroke-width="16" stroke-linecap="round"/>
    `;
    extras = `
      <circle cx="155" cy="55" r="6" fill="#8b5cf6" opacity="0.6"/>
      <circle cx="170" cy="40" r="10" fill="#8b5cf6" opacity="0.8"/>
      <text x="170" y="44" font-size="12" font-family="sans-serif" font-weight="bold" fill="#ffffff" text-anchor="middle">?</text>
    `;
  } else if (pose === 'happy') {
    eyes = `
      <path d="M 65 98 Q 75 85 85 98" stroke="#1e293b" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M 115 98 Q 125 85 135 98" stroke="#1e293b" stroke-width="4" fill="none" stroke-linecap="round"/>
    `;
    mouth = '<path d="M 80 115 Q 100 145 120 115 Z" fill="#e11d48" stroke="#1e293b" stroke-width="3"/>';
    arms = `
      <ellipse cx="35" cy="110" rx="14" ry="26" fill="#1e293b" transform="rotate(-40 35 110)"/>
      <ellipse cx="165" cy="110" rx="14" ry="26" fill="#1e293b" transform="rotate(40 165 110)"/>
    `;
    extras = `
      <path d="M 25 70 L 30 80 L 40 82 L 32 90 L 34 100 L 25 94 L 16 100 L 18 90 L 10 82 L 20 80 Z" fill="#f59e0b"/>
      <path d="M 175 70 L 180 80 L 190 82 L 182 90 L 184 100 L 175 94 L 166 100 L 168 90 L 160 82 L 170 80 Z" fill="#f59e0b"/>
    `;
  } else if (pose === 'oops') {
    mouth = '<ellipse cx="100" cy="122" rx="8" ry="10" fill="#1e293b"/>';
    arms = `
      <ellipse cx="40" cy="140" rx="14" ry="25" fill="#1e293b" transform="rotate(20 40 140)"/>
      <path d="M 140 150 Q 130 100 110 75" stroke="#1e293b" stroke-width="16" stroke-linecap="round"/>
    `;
    extras = '<path d="M 135 60 Q 145 65 140 75" fill="#38bdf8"/>';
  } else if (pose === 'welcome') {
    mouth = '<path d="M 80 115 Q 100 140 120 115 Z" fill="#e11d48" stroke="#1e293b" stroke-width="3"/>';
    arms = `
      <ellipse cx="30" cy="130" rx="14" ry="25" fill="#1e293b" transform="rotate(-30 30 130)"/>
      <ellipse cx="170" cy="130" rx="14" ry="25" fill="#1e293b" transform="rotate(30 170 130)"/>
    `;
    extras = `
      <rect x="50" y="145" width="100" height="40" rx="8" fill="#6366f1" stroke="#4f46e5" stroke-width="2"/>
      <text x="100" y="170" font-size="14" font-family="sans-serif" font-weight="bold" fill="#ffffff" text-anchor="middle">WELCOME</text>
    `;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity="0.15"/>
    </filter>
  </defs>
  <g filter="url(#shadow)">
    <!-- Ears -->
    <circle cx="50" cy="55" r="24" fill="#1e293b"/>
    <circle cx="50" cy="55" r="13" fill="#ec4899" opacity="0.4"/>
    <circle cx="150" cy="55" r="24" fill="#1e293b"/>
    <circle cx="150" cy="55" r="13" fill="#ec4899" opacity="0.4"/>

    <!-- Arms back -->
    ${arms}

    <!-- Body -->
    <ellipse cx="100" cy="145" rx="55" ry="45" fill="#1e293b"/>
    <!-- White Belly -->
    <ellipse cx="100" cy="145" rx="38" ry="32" fill="#ffffff"/>

    <!-- Head -->
    <ellipse cx="100" cy="95" rx="52" ry="44" fill="#ffffff" stroke="#1e293b" stroke-width="3"/>

    <!-- Eye Patches -->
    <ellipse cx="75" cy="93" rx="17" ry="20" fill="#1e293b" transform="rotate(-15 75 93)"/>
    <ellipse cx="125" cy="93" rx="17" ry="20" fill="#1e293b" transform="rotate(15 125 93)"/>

    <!-- Eyes -->
    ${eyes}

    <!-- Blush -->
    <circle cx="58" cy="108" r="8" fill="#fda4af" opacity="0.6"/>
    <circle cx="142" cy="108" r="8" fill="#fda4af" opacity="0.6"/>

    <!-- Nose -->
    <ellipse cx="100" cy="107" rx="7" ry="5" fill="#1e293b"/>

    <!-- Mouth -->
    ${mouth}

    <!-- Extras -->
    ${extras}
  </g>
</svg>`;
}

const outDir = path.join(__dirname, '..', 'assets', 'nexi');

poses.forEach(pose => {
  const svg = getSvgForPose(pose);
  const filePath = path.join(outDir, `${pose}.png`);
  // Save svg content into png file extension or svg files so browsers can render them as images directly
  fs.writeFileSync(filePath, svg);
});

console.log('Mascot SVG/PNG assets generated successfully in assets/nexi!');
