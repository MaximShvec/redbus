import { useEffect, useMemo, useRef, useState } from 'react';
import { useLang } from '../i18n';
import { copy } from '../i18n/copy';
import {
  PIZZAS,
  SIZES,
  defaultSize,
  minPrice,
  pizzaSizes,
  type Pizza,
  type PizzaSize,
  type PizzaTag,
} from '../data/menu';
import { useCart } from '../state/cart';
import { gsap, useGSAP, reducedMotion } from '../lib/gsap';
import { useInView, useMedia, useTween } from '../lib/hooks';
import { IconPlus, flyToCart, Words } from './ui';

type Filter = 'all' | PizzaTag;
const FILTERS: Filter[] = ['all', 'meat', 'chicken', 'sea', 'veg'];
const pad = (n: number) => String(n).padStart(2, '0');

function Badges({ pizza, compact = false }: { pizza: Pizza; compact?: boolean }) {
  const { t } = useLang();
  return (
    <span className={`badges ${compact ? 'badges--sm' : ''}`}>
      {pizza.hit && <span className="badge badge--hit">★ {t(copy.menu.hit)}</span>}
      {pizza.hot && <span className="badge badge--hot">🌶 {t(copy.menu.hot)}</span>}
      {pizza.vegan && <span className="badge badge--vegan">🌱 {t(copy.menu.vegan)}</span>}
      {!pizza.prices[20] && !pizza.prices[45] && <span className="badge">{t(copy.menu.only30)}</span>}
    </span>
  );
}

function PizzaCard({
  pizza,
  index,
  total,
  size,
  onSize,
}: {
  pizza: Pizza;
  index: number;
  total: number;
  size: PizzaSize;
  onSize: (s: PizzaSize) => void;
}) {
  const { t, money } = useLang();
  const cart = useCart();
  const btn = useRef<HTMLButtonElement>(null);
  const price = pizza.prices[size] ?? 0;
  const shown = useTween(price, 420);
  const qty = cart.qtyOf('pizza', pizza.id, size);

  // keep previous image underneath for a cross-reveal
  const [prev, setPrev] = useState<number | null>(null);
  const cur = useRef(pizza.id);
  useEffect(() => {
    if (cur.current !== pizza.id) {
      setPrev(cur.current);
      cur.current = pizza.id;
      const to = window.setTimeout(() => setPrev(null), 900);
      return () => window.clearTimeout(to);
    }
  }, [pizza.id]);

  return (
    <div className="pcard">
      <div className="pcard__frame">
        {prev !== null && <img className="pcard__img pcard__img--prev" src={`/img/pizza/${prev}.webp`} alt="" />}
        <img
          key={pizza.id}
          className="pcard__img pcard__img--cur"
          src={`/img/pizza/${pizza.id}.webp`}
          alt={`${t(pizza.name)} — ${t(pizza.ingr)}`}
          width="960"
          height="640"
          decoding="async"
        />
        <div className="pcard__top">
          <Badges pizza={pizza} />
        </div>
        <div className="pcard__no display">
          {pad(index + 1)}
          <small>/{pad(total)}</small>
        </div>
      </div>

      <div className="pcard__body">
        <h3 className="pcard__name display" key={pizza.id}>
          {t(pizza.name)}
        </h3>
        <p className="pcard__ingr">{t(pizza.ingr)}</p>

        <div className="pcard__row">
          <div className="sizes" role="radiogroup" aria-label={t(copy.menu.size)}>
            {pizzaSizes(pizza).map((s) => (
              <button
                key={s}
                role="radio"
                aria-checked={s === size}
                className={`size ${s === size ? 'is-on' : ''}`}
                onClick={() => onSize(s)}
                style={{ ['--d' as string]: `${[44, 58, 78][SIZES.indexOf(s)]}px` }}
              >
                <span className="size__disc">
                  <b>{s}</b>
                </span>
                <span className="size__note">{t(copy.menu.sizeNote[s])}</span>
              </button>
            ))}
          </div>

          <div className="pcard__buy">
            <div className="pcard__price display" aria-live="polite">
              {money(shown)}
            </div>
            <button
              ref={btn}
              className="btn btn--red"
              data-cursor="ADD"
              onClick={() => {
                cart.add({ kind: 'pizza', id: pizza.id, size });
                flyToCart(btn.current);
              }}
            >
              <IconPlus />
              {qty ? `${t(copy.menu.inOrder)} ×${qty}` : t(copy.menu.add)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Menu() {
  const { t, money, lang } = useLang();
  const root = useRef<HTMLElement>(null);
  const [headRef, headSeen] = useInView<HTMLDivElement>(0.25);
  const isMobile = useMedia('(max-width: 899px)');

  const [filter, setFilter] = useState<Filter>('all');
  const list = useMemo(() => PIZZAS.filter((p) => filter === 'all' || p.tags.includes(filter)), [filter]);
  const [activeId, setActiveId] = useState<number>(PIZZAS[0].id);
  const [sizes, setSizes] = useState<Record<number, PizzaSize>>({});

  const active = list.find((p) => p.id === activeId) ?? list[0];
  const sizeOf = (p: Pizza) => sizes[p.id] ?? defaultSize(p);
  const activeIndex = list.findIndex((p) => p.id === active.id);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.to('.menu__deco-spin', {
        rotate: 120,
        yPercent: 18,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section className="menu section" id="menu" ref={root}>
      <div className="menu__deco" aria-hidden="true">
        <div className="menu__deco-spin">
          <img src="/img/hero-pizza.webp" alt="" loading="lazy" />
        </div>
      </div>

      <div className={`menu__head ${headSeen ? 'is-in' : ''}`} ref={headRef}>
        <div>
          <p className="eyebrow fade-up">{t(copy.menu.eyebrow)}</p>
          <h2 className="menu__title display">
            <Words text={t(copy.menu.title)} />
            <sup className="menu__count fade-up" style={{ ['--d' as string]: '500ms' }}>
              {PIZZAS.length}
            </sup>
          </h2>
        </div>
        <div className="menu__aside">
          <p className="menu__sub fade-up" style={{ ['--d' as string]: '200ms' }}>
            {t(copy.menu.sub)}
          </p>
          <div className="chips fade-up" role="tablist" style={{ ['--d' as string]: '300ms' }}>
            {FILTERS.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                className={`chip ${filter === f ? 'is-on' : ''}`}
                onClick={() => {
                  setFilter(f);
                }}
              >
                {t(copy.menu.filters[f])}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="menu__body">
        {!isMobile && (
          <aside className="menu__stage">
            <PizzaCard
              pizza={active}
              index={activeIndex}
              total={list.length}
              size={sizeOf(active)}
              onSize={(s) => setSizes((m) => ({ ...m, [active.id]: s }))}
            />
          </aside>
        )}

        <ul className="menu__list" key={filter + lang}>
          {list.map((p, i) => {
            const isActive = p.id === active.id;
            return (
              <li key={p.id} className={`row-wrap ${isActive ? 'is-active' : ''}`} style={{ ['--i' as string]: i }}>
                <button
                  className={`row ${isActive ? 'is-active' : ''}`}
                  aria-pressed={isActive}
                  onPointerEnter={(e) => e.pointerType === 'mouse' && setActiveId(p.id)}
                  onFocus={() => setActiveId(p.id)}
                  onClick={() => setActiveId(p.id)}
                >
                  <span className="row__n">{pad(i + 1)}</span>
                  <span className="row__main">
                    <span className="row__name display">{t(p.name)}</span>
                    <span className="row__ingr">{t(p.ingr)}</span>
                  </span>
                  <Badges pizza={p} compact />
                  <span className="row__price">
                    <small>{t(copy.menu.from)}</small> {money(minPrice(p))}
                  </span>
                </button>
                {isMobile && isActive && (
                  <div className="row__expand">
                    <PizzaCard
                      pizza={p}
                      index={i}
                      total={list.length}
                      size={sizeOf(p)}
                      onSize={(s) => setSizes((m) => ({ ...m, [p.id]: s }))}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <p className="menu__note">{t(copy.menu.note)}</p>
    </section>
  );
}
