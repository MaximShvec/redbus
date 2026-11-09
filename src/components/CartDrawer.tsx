import { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n';
import { copy, PHONE_DISPLAY, PHONE_TEL } from '../i18n/copy';
import { drinkById, pizzaById } from '../data/menu';
import { linePrice, useCart, type CartLine } from '../state/cart';
import { lockScroll, scrollToId, unlockScroll } from '../lib/scroll';
import { IconArrow, IconClose, IconMinus, IconPhone, IconPlus } from './ui';

function describe(l: CartLine, t: (x: never) => string): { name: string; meta: string; img: string } {
  if (l.kind === 'pizza') {
    const p = pizzaById(l.id)!;
    return { name: t(p.name as never), meta: `${l.size} ${t(copy.menu.cm as never)}`, img: `/img/pizza/${p.id}.webp` };
  }
  const d = drinkById(l.id)!;
  return { name: t(d.name as never), meta: d.vol, img: `/img/drink/${d.id}.webp` };
}

export default function CartDrawer() {
  const { t, money } = useLang();
  const cart = useCart();
  const [copied, setCopied] = useState(false);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const tt = t as unknown as (x: never) => string;

  useEffect(() => {
    if (!cart.open) return;
    lockScroll();
    const prevFocus = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && cart.setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      unlockScroll();
      window.removeEventListener('keydown', onKey);
      prevFocus?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.open]);

  const orderText = () => {
    const rows = cart.lines.map((l) => {
      const d = describe(l, tt);
      return `• ${d.name} ${d.meta} × ${l.qty} — ${money(linePrice(l))}`;
    });
    return [t(copy.cart.header), ...rows, '', `${t(copy.cart.total)}: ${money(cart.total)}`].join('\n');
  };

  const copyOrder = async () => {
    try {
      await navigator.clipboard.writeText(orderText());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className={`cart ${cart.open ? 'is-open' : ''}`} aria-hidden={!cart.open}>
      <div className="cart__scrim" onClick={() => cart.setOpen(false)} />
      <aside className="cart__panel" role="dialog" aria-modal="true" aria-label={t(copy.cart.title)}>
        <header className="cart__head">
          <h2 className="display">
            {t(copy.cart.title)} <small>{cart.count}</small>
          </h2>
          <button ref={closeBtn} className="cart__close" onClick={() => cart.setOpen(false)} aria-label={t(copy.cart.close)} tabIndex={cart.open ? 0 : -1}>
            <IconClose />
          </button>
        </header>

        {cart.lines.length === 0 ? (
          <div className="cart__empty">
            <p>{t(copy.cart.empty)}</p>
            <button
              className="btn"
              tabIndex={cart.open ? 0 : -1}
              onClick={() => {
                cart.setOpen(false);
                window.setTimeout(() => scrollToId('menu'), 150);
              }}
            >
              {t(copy.cart.emptyCta)} <IconArrow />
            </button>
          </div>
        ) : (
          <ul className="cart__list">
            {cart.lines.map((l) => {
              const d = describe(l, tt);
              return (
                <li key={l.key} className="citem">
                  <img src={d.img} alt="" className={l.kind === 'drink' ? 'is-drink' : ''} />
                  <div className="citem__info">
                    <strong>{d.name}</strong>
                    <span>{d.meta}</span>
                    <div className="qty">
                      <button onClick={() => cart.dec(l.key)} aria-label={t(copy.cart.less)} tabIndex={cart.open ? 0 : -1}>
                        <IconMinus />
                      </button>
                      <b>{l.qty}</b>
                      <button onClick={() => cart.inc(l.key)} aria-label={t(copy.cart.more)} tabIndex={cart.open ? 0 : -1}>
                        <IconPlus />
                      </button>
                    </div>
                  </div>
                  <div className="citem__side">
                    <span className="citem__price">{money(linePrice(l))}</span>
                    <button className="citem__rm" onClick={() => cart.remove(l.key)} tabIndex={cart.open ? 0 : -1}>
                      {t(copy.cart.remove)}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {cart.lines.length > 0 && (
          <footer className="cart__foot">
            <div className="cart__total">
              <span>{t(copy.cart.total)}</span>
              <strong className="display">{money(cart.total)}</strong>
            </div>
            <p className="cart__note">{t(copy.cart.deliveryNote)}</p>
            <a className="btn btn--red" href={`tel:${PHONE_TEL}`} tabIndex={cart.open ? 0 : -1}>
              <IconPhone /> {t(copy.cart.call)} · {PHONE_DISPLAY}
            </a>
            <div className="cart__row">
              <button className="btn btn--ghost btn--sm" onClick={copyOrder} tabIndex={cart.open ? 0 : -1}>
                {copied ? t(copy.cart.copied) : t(copy.cart.copy)}
              </button>
              <a className="btn btn--ghost btn--sm" href="https://redbus.lv/ru/pici" target="_blank" rel="noopener noreferrer" tabIndex={cart.open ? 0 : -1}>
                {t(copy.cart.site)} <IconArrow />
              </a>
            </div>
          </footer>
        )}
      </aside>
    </div>
  );
}
