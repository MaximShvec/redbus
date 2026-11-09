const fs = require('fs');
for (const p of ['pici', 'napitki', 'dostavka', 'o-nas', 'nashi-adresa']) {
  let s = fs.readFileSync(__dirname + '/' + p + '.html', 'utf8');
  s = s.replace(/<(script|style)[\s\S]*?<\/\1>/g, '');
  s = s.replace(/<img[^>]*src="([^"]+)"[^>]*>/g, ' [IMG $1] ');
  s = s.replace(/<[^>]+>/g, '\n');
  s = s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"');
  s = s.replace(/\n\s*\n+/g, '\n');
  fs.writeFileSync(__dirname + '/' + p + '.txt', s);
  console.log('=====', p, s.length);
}
