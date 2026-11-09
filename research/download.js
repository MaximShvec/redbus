const fs = require('fs');
const path = require('path');
const menu = JSON.parse(fs.readFileSync(__dirname + '/menu.json', 'utf8'));
const out = path.join(__dirname, '..', '_assets_raw');
fs.mkdirSync(out, { recursive: true });

async function get(url, file) {
  const r = await fetch(url);
  if (!r.ok) return { ok: false, status: r.status };
  const buf = Buffer.from(await r.arrayBuffer());
  fs.writeFileSync(file, buf);
  return { ok: true, size: buf.length };
}

(async () => {
  const all = [...menu.pizzas.map((p) => ['pizza', p]), ...menu.drinks.map((d) => ['drink', d])];
  for (const [kind, p] of all) {
    const base = 'https://redbus.lv' + encodeURI(p.img);
    const ext = path.extname(p.img);
    const id = p.id;
    const small = await get(base, path.join(out, `${kind}-${id}${ext}`));
    // try bigger versions
    const variants = ['big_', 'background_', 'large_', 'medium_'];
    let best = '';
    for (const v of variants) {
      const u = base.replace('thumbnail_', v);
      const res = await get(u, path.join(out, `${kind}-${id}-${v}${ext}`));
      if (res.ok) best += ` ${v}:${res.size}`;
    }
    console.log(kind, id, p.name.slice(0, 20), 'thumb:', small.size || small.status, best);
  }
  // site assets
  const assets = ['img/logo.png', 'img/slider-pizza.png', 'img/best-pizza.png', 'img/redbus.png', 'img/slider-bg.jpg', 'img/city.png', 'img/delivery/delivery-price-ru.svg'];
  for (const a of assets) {
    const res = await get('https://redbus.lv/' + a, path.join(out, 'site-' + a.replace(/\//g, '_')));
    console.log(a, res.size || res.status);
  }
  const extras = [
    '/uploads/resized/background_217_IMG_20180712_233311-20190118030236.png',
    '/uploads/resized/big_210_redbus-63-20190118024419.jpg',
    '/uploads/resized/big_215_Screenshot_20180926_163831-20190118024947.jpg',
    '/uploads/resized/background_366_imgonline-com-ua-Resize-xBbJnJzA7Mr-20190118032425.jpg',
    '/uploads/resized/background_226_Webp.net-resizeimage-20200116033625.jpg',
    '/uploads/resized/thumb_345_Frame%205.1-20190111105550.png',
    '/uploads/resized/thumb_292_drink-20200403025437.png',
    '/uploads/resized/thumb_294_car-20200403025437.png',
  ];
  for (const e of extras) {
    const res = await get('https://redbus.lv' + e, path.join(out, 'extra-' + path.basename(decodeURIComponent(e))));
    console.log(e, res.size || res.status);
  }
})();
