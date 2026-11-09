const fs = require('fs');
const strip = (t) => t.replace(/<br\s*\/?>/g, ' ').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

function parse(file) {
  const s = fs.readFileSync(__dirname + '/' + file, 'utf8');
  const parts = s.split('class="col-xs-12 col-sm-12 col-md-6 col-lg-4 food-item product-item cart-item"').slice(1);
  return parts.map((p) => {
    const id = (p.match(/data-item-id="(\d+)"/) || [])[1];
    const slug = (p.match(/href="\/ru\/[a-z]+\/([^"]+)"/) || [])[1] || null;
    const img = (p.match(/url\('([^']+)'\)/) || [])[1] || null;
    const name = strip((p.match(/<h5>([\s\S]*?)<\/h5>/) || [])[1] || '').replace(/(.+?)\1$/, '$1').trim();
    const desc = strip((p.match(/ppc-content-wrap clearfix"><div>([\s\S]*?)<\/div>/) || [])[1] || '');
    const sizes = [...p.matchAll(/data-attribute-final-price="([\d.]+)"[^>]*><label[^>]*>(\d+)<\/label>/g)].map((m) => ({ size: +m[2], price: +m[1] }));
    const single = (p.match(/price-clean">([\d.]+)</) || [])[1];
    return { id: +id, slug, name, desc, img, sizes, price: single ? +single : null };
  });
}
const pizzas = parse('pici.html');
const drinks = parse('napitki.html');
fs.writeFileSync(__dirname + '/menu.json', JSON.stringify({ pizzas, drinks }, null, 2));
console.log(pizzas.length, drinks.length);
console.log(JSON.stringify(pizzas.slice(0, 3), null, 1));
console.log(drinks.map((d) => d.name + ' | ' + d.img + ' | ' + d.price).join('\n'));
