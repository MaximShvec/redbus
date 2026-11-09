import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const W = 1200;
const H = 630;

const pizza = await sharp('public/img/hero-pizza.webp').resize({ height: 500 }).png().toBuffer();
const pm = await sharp(pizza).metadata();

const bg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <radialGradient id="g" cx="75%" cy="45%" r="70%">
      <stop offset="0" stop-color="#ff5a3c"/>
      <stop offset="0.55" stop-color="#e4202b"/>
      <stop offset="1" stop-color="#a30f1a"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <g font-family="Arial Black, Impact, Arial, sans-serif" font-weight="900">
    <text x="64" y="120" font-size="30" fill="#ffc93c" letter-spacing="4">REDBUS.LV  ·  JŪRMALA · RĪGA</text>
    <text x="60" y="300" font-size="104" fill="#fff3df" letter-spacing="-4">NEXT STOP:</text>
    <text x="66" y="430" font-size="150" fill="#14090a" opacity=".35" letter-spacing="-5">PIZZA</text>
    <text x="60" y="424" font-size="150" fill="#ffc93c" letter-spacing="-5">PIZZA</text>
    <text x="64" y="510" font-size="30" fill="#fff3df" font-weight="700">22 02 56 56  ·  open till 3 am</text>
  </g>
</svg>`;

await sharp(Buffer.from(bg))
  .composite([{ input: pizza, left: W - pm.width + 130, top: Math.round((H - pm.height) / 2) }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile('public/og.jpg');

writeFileSync('public/robots.txt', 'User-agent: *\nAllow: /\n');
console.log('og.jpg + robots.txt written');
