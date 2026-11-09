// Downloads full-size originals taken from the CMS (public /uploads/source URLs) into assets-src/<kind>-<id>-orig.<ext>
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const list = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, 'originals.json'), 'utf8'));
const menu = JSON.parse(fs.readFileSync(path.join(root, 'research', 'menu-i18n.json'), 'utf8'));
const pizzaIds = new Set(Object.values(menu.pizzas).map((p) => String(p.id)));

for (const [id, url] of Object.entries(list)) {
  const kind = pizzaIds.has(id) ? 'pizza' : 'drink';
  const ext = path.extname(url).toLowerCase().replace('.jpeg', '.jpg');
  const dest = path.join(root, 'assets-src', `${kind}-${id}-orig${ext}`);
  const res = await fetch('https://redbus.lv' + encodeURI(url));
  if (!res.ok) {
    console.log('FAIL', id, res.status, url);
    continue;
  }
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  console.log(kind, id, (fs.statSync(dest).size / 1024).toFixed(0) + ' KB');
}
