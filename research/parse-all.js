const fs = require('fs');
const strip = (t) => t.replace(/<br\s*\/?>/g, ' ').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/\s+/g, ' ').trim();

function parse(file) {
  const s = fs.readFileSync(__dirname + '/' + file, 'utf8');
  const parts = s.split('class="col-xs-12 col-sm-12 col-md-6 col-lg-4 food-item product-item cart-item"').slice(1);
  return parts.map((p) => {
    const id = +(p.match(/data-item-id="(\d+)"/) || [])[1];
    const slug = (p.match(/href="\/(?:ru|lv|en)\/[a-z]+\/([^"]+)"/) || [])[1] || null;
    const img = (p.match(/url\('([^']+)'\)/) || [])[1] || null;
    let name = strip((p.match(/<h5>([\s\S]*?)<\/h5>/) || [])[1] || '');
    const h = Math.floor(name.length / 2);
    if (name.length % 2 === 0 && name.slice(0, h).trim() === name.slice(h).trim()) name = name.slice(0, h).trim();
    const desc = strip((p.match(/ppc-content-wrap clearfix">([\s\S]*?)<div class="price-btn-block/) || [])[1] || '');
    const sizes = [...p.matchAll(/data-attribute-final-price="([\d.]+)"[^>]*><label[^>]*>(\d+)<\/label>/g)].map((m) => ({ size: +m[2], price: +m[1] }));
    const single = (p.match(/price-clean">([\d.]+)</) || [])[1];
    return { id, slug, name, desc, img, sizes, price: single ? +single : null };
  });
}
const files = {
  ru: ['pici.html', 'napitki.html'],
  lv: ['lv_pici.html', 'lv_drinks.html'],
  en: ['en_pici.html', 'en_drinks.html'],
};
const out = { pizzas: {}, drinks: {} };
for (const [lang, [pf, df]] of Object.entries(files)) {
  for (const p of parse(pf)) {
    out.pizzas[p.id] ??= { id: p.id, img: p.img, sizes: p.sizes, slug: {}, name: {}, desc: {} };
    out.pizzas[p.id].name[lang] = p.name;
    out.pizzas[p.id].desc[lang] = p.desc;
    out.pizzas[p.id].slug[lang] = p.slug;
  }
  for (const d of parse(df)) {
    out.drinks[d.id] ??= { id: d.id, img: d.img, price: d.price, name: {} };
    out.drinks[d.id].name[lang] = d.name;
  }
}
fs.writeFileSync(__dirname + '/menu-i18n.json', JSON.stringify(out, null, 2));
console.log(Object.keys(out.pizzas).length, Object.keys(out.drinks).length);
for (const p of Object.values(out.pizzas)) console.log(p.id, '|', p.name.ru, '|', p.name.lv, '|', p.name.en, '|', p.desc.en);
for (const p of Object.values(out.drinks)) console.log(p.id, '|', p.name.ru, '|', p.name.lv, '|', p.name.en);
