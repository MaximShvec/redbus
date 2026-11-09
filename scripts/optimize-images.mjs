// Raw assets (downloaded from redbus.lv) -> optimized WebP in public/img
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const raw = path.join(root, 'assets-src');
const out = path.join(root, 'public', 'img');
fs.mkdirSync(path.join(out, 'pizza'), { recursive: true });
fs.mkdirSync(path.join(out, 'drink'), { recursive: true });

const menu = JSON.parse(fs.readFileSync(path.join(root, 'research', 'menu-i18n.json'), 'utf8'));

async function area(file) {
  const m = await sharp(file).metadata();
  return m.width * m.height;
}

async function best(kind, id) {
  const files = fs
    .readdirSync(raw)
    .filter((f) => f.startsWith(`${kind}-${id}.`) || f.startsWith(`${kind}-${id}-big_.`) || f.startsWith(`${kind}-${id}-orig.`))
    .map((f) => path.join(raw, f));
  let top = null;
  let topArea = 0;
  for (const f of files) {
    const a = await area(f);
    if (a > topArea) {
      top = f;
      topArea = a;
    }
  }
  return top;
}

let total = 0;
async function write(pipeline, dest) {
  await pipeline.toFile(dest);
  const size = fs.statSync(dest).size;
  total += size;
  console.log(path.relative(root, dest).padEnd(36), (size / 1024).toFixed(0).padStart(5), 'KB');
}

for (const p of Object.values(menu.pizzas)) {
  const src = await best('pizza', p.id);
  let img = sharp(src);
  // the vegan photo has white letterbox bars -> trim them away
  if (p.id === 117) {
    const buf = await sharp(src).trim({ background: '#ffffff', threshold: 28 }).toBuffer();
    img = sharp(buf);
  }
  await write(
    img.resize({ width: 1400, withoutEnlargement: true }).webp({ quality: 82 }),
    path.join(out, 'pizza', `${p.id}.webp`),
  );
}

for (const d of Object.values(menu.drinks)) {
  const src = await best('drink', d.id);
  // flatten onto white and trim the generous white margins so the bottle fills its card
  const trimmed = await sharp(src).flatten({ background: '#ffffff' }).trim({ background: '#ffffff', threshold: 22 }).toBuffer();
  await write(
    sharp(trimmed)
      .extend({ top: 6, bottom: 6, left: 6, right: 6, background: '#ffffff' })
      .resize({ height: 720, width: 720, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 88 }),
    path.join(out, 'drink', `${d.id}.webp`),
  );
}

await write(
  sharp(path.join(raw, 'site-img_slider-pizza.png')).resize({ width: 1200 }).webp({ quality: 88, alphaQuality: 92 }),
  path.join(out, 'hero-pizza.webp'),
);
await write(
  sharp(path.join(raw, 'orig-courier.jpg')).resize({ width: 1600 }).webp({ quality: 80 }),
  path.join(out, 'courier.webp'),
);
await write(
  sharp(path.join(raw, 'orig-terrace.png')).resize({ width: 2400 }).webp({ quality: 78 }),
  path.join(out, 'terrace-night.webp'),
);
await write(
  sharp(path.join(raw, 'orig-cheese.jpg')).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }),
  path.join(out, 'cheese-strip.webp'),
);

console.log('TOTAL', (total / 1024).toFixed(0), 'KB');
