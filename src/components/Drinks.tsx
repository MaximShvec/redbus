import { useRef } from 'react';
import { useLang } from '../i18n';
import { copy } from '../i18n/copy';
import { DRINKS, type Drink } from '../data/menu';
import { useCart } from '../state/cart';
import { useInView } from '../lib/hooks';
import { IconPlus, Words, flyToCart } from './ui';

function DrinkRow({ drink, index }: { drink: Drink; index: number }) {
  const { t, money } = useLang();
  const cart = useCart();
  const btn = useRef<HTMLButtonElement>(null);
  const qty = cart.qtyOf('drink', drink.id);
  return (
    <li className="drow" style={{ ['--tone' as string]: drink.tone, ['--i' as string]: index }}>
      <span className="drow__n display">{String(index + 1).padStart(2, '0')}</span>
      <span className="drow__thumb">
        <img src={`/img/drink/${drink.id}.webp`} alt="" loading="lazy" decoding="async" />
      </span>
      <span className="drow__main">
        <span className="drow__name">{t(drink.name)}</span>
        <span className="drow__vol">{drink.vol}</span>
      </span>
      <span className="drow__price display">{money(drink.price)}</span>
      <button
        ref={btn}
        className="drow__add"
        aria-label={`${t(copy.drinks.add)}: ${t(drink.name)} ${drink.vol}`}
        data-cursor="ADD"
        onClick={() => {
          cart.add({ kind: 'drink', id: drink.id });
          flyToCart(btn.current);
        }}
      >
        {qty ? <b>{qty}</b> : <IconPlus />}
      </button>
    </li>
  );
}

export default function Drinks() {
  const { t } = useLang();
  const [headRef, seen] = useInView<HTMLDivElement>(0.2);

  return (
    <section className="drinks" id="drinks">
      <div className={`drinks__head ${seen ? 'is-in' : ''}`} ref={headRef}>
        <p className="eyebrow">{t(copy.drinks.eyebrow)}</p>
        <h2 className="drinks__title display">
          <Words text={t(copy.drinks.title)} />
        </h2>
        <p className="drinks__sub">{t(copy.drinks.sub)}</p>
      </div>
      <ul className="drinks__list">
        {DRINKS.map((d, i) => (
          <DrinkRow key={d.id} drink={d} index={i} />
        ))}
      </ul>
    </section>
  );
}
