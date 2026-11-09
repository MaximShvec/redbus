# RedBus.lv — Next stop: pizza

Демо-лендинг для доставки пиццы RedBus.lv (Юрмала · Рига): hero, история, меню из 18 пицц, напитки, доставка, адреса. Только фронтенд, без бэкенда.

**Стек:** Vite · React 19 · TypeScript · GSAP (ScrollTrigger) · Lenis. Языки: RU / LV / EN.

## Запуск

```bash
npm install
npm run dev       # разработка
npm run build     # проверка типов + продакшн-сборка в dist/
npm run preview   # посмотреть сборку
```

## Структура

- `src/components` — секции страницы, курсор, прелоадер, корзина
- `src/i18n` — тексты на трёх языках
- `src/data/menu.ts` — меню (данные и цены с redbus.lv)
- `src/styles` — глобальные стили, оболочка (nav/hero), секции
- `public/img` — оптимизированные WebP
- `scripts/optimize-images.mjs` — сборка WebP из `assets-src/` (`npm run images`)
- `scripts/make-og.mjs` — превью для соцсетей (`public/og.jpg`)
- `research/` — выгрузка меню и скрипты загрузки оригиналов из CMS

`assets-src/` (сырые фото, ~57 МБ) в репозиторий не входит. Восстановить: `node research/download-originals.mjs`.

## Важно

Корзина демонстрационная: заказ не отправляется, кнопки ведут на звонок, копируют текст заказа или открывают redbus.lv. Все цены и тексты взяты с redbus.lv и требуют сверки перед боевым использованием.
