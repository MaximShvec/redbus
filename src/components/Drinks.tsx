import { useEffect, useRef } from 'react';
import { useLang } from '../i18n';
import { copy } from '../i18n/copy';
import { DRINKS, type Drink } from '../data/menu';
import { useCart } from '../state/cart';
import { gsap, ScrollTrigger, useGSAP, reducedMotion } from '../lib/gsap';
import { useInView } from '../lib/hooks';
import { IconArrow, IconPlus, Words, flyToCart } from './ui';

function DrinkCard({ drink, index }: { drink: Drink; index: number }) {
  const { t, money } = useLang();
  const cart = useCart();
  const btn = useRef<HTMLButtonElement>(null);
  const qty = cart.qtyOf('drink', drink.id);
  return (
    <article className="dcard" style={{ ['--tone' as string]: drink.tone }}>
      <header className="dcard__top">
        <span className="dcard__no display">{String(index + 1).padStart(2, '0')}</span>
        <span className="dcard__vol">{drink.vol}</span>
      </header>
      <div className="dcard__art">
        <span className="dcard__halo" />
        <img src={`/img/drink/${drink.id}.webp`} alt={t(drink.name)} loading="lazy" decoding="async" draggable={false} />
      </div>
      <h3 className="dcard__name">{t(drink.name)}</h3>
      <footer className="dcard__foot">
        <span className="dcard__price display">{money(drink.price)}</span>
        <button
          ref={btn}
          className="dcard__add"
          aria-label={`${t(copy.drinks.add)}: ${t(drink.name)} ${drink.vol}`}
          data-cursor="ADD"
          onClick={() => {
            cart.add({ kind: 'drink', id: drink.id });
            flyToCart(btn.current);
          }}
        >
          {qty ? <b>{qty}</b> : <IconPlus />}
        </button>
      </footer>
    </article>
  );
}

export default function Drinks() {
  const { t, lang } = useLang();
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [headRef, seen] = useInView<HTMLDivElement>(0.2);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add('(min-width: 900px)', () => {
        const el = track.current!;
        const distance = () => Math.max(0, el.scrollWidth - window.innerWidth);
        // horizontal travel is faster than the scroll distance so 20 cards don't take forever
        const scrollLen = () => Math.round(distance() * 0.58);
        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pin.current,
            start: 'top top',
            end: () => '+=' + scrollLen(),
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        gsap.to('.drinks__bar i', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: pin.current, start: 'top top', end: () => '+=' + scrollLen(), scrub: true },
        });
        // gentle tilt of each bottle as it moves
        gsap.utils.toArray<HTMLElement>('.dcard__art img').forEach((img) => {
          gsap.fromTo(
            img,
            { rotate: 10, y: 14 },
            {
              rotate: -10,
              y: -14,
              ease: 'none',
              scrollTrigger: {
                trigger: img,
                containerAnimation: tween,
                start: 'left 100%',
                end: 'right 0%',
                scrub: true,
              },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [lang], revertOnUpdate: true },
  );

  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => window.clearTimeout(id);
  }, [lang]);

  return (
    <section className="drinks" id="drinks" ref={root}>
      <div className="drinks__pin" ref={pin}>
        <div className="drinks__track" ref={track}>
          <div className={`drinks__intro ${seen ? 'is-in' : ''}`} ref={headRef}>
            <p className="eyebrow fade-up">{t(copy.drinks.eyebrow)}</p>
            <h2 className="drinks__title display">
              <Words text={t(copy.drinks.title)} />
            </h2>
            <p className="drinks__sub fade-up" style={{ ['--d' as string]: '250ms' }}>
              {t(copy.drinks.sub)}
            </p>
            <p className="drinks__hint fade-up" style={{ ['--d' as string]: '400ms' }}>
              {t(copy.drinks.hint)} <IconArrow />
            </p>
          </div>
          {DRINKS.map((d, i) => (
            <DrinkCard key={d.id} drink={d} index={i} />
          ))}
          <div className="drinks__tail" aria-hidden="true" />
        </div>
        <div className="drinks__bar" aria-hidden="true">
          <i />
        </div>
      </div>
    </section>
  );
}
