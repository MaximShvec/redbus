import { useEffect, useState } from 'react';
import { useLang, LANGS } from '../i18n';
import { copy, PHONE_DISPLAY, PHONE_TEL } from '../i18n/copy';
import { useCart } from '../state/cart';
import { scrollToId, lockScroll, unlockScroll } from '../lib/scroll';
import { BusSvg, IconBag, IconPhone, IconClose } from './ui';

const LINKS = [
  ['story', copy.nav.story],
  ['menu', copy.nav.menu],
  ['drinks', copy.nav.drinks],
  ['delivery', copy.nav.delivery],
  ['places', copy.nav.places],
] as const;

export default function Nav() {
  const { t, lang, setLang } = useLang();
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    lockScroll();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      unlockScroll();
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    // let the overlay unlock scrolling before we move
    window.setTimeout(() => scrollToId(id), menuOpen ? 80 : 0);
  };

  return (
    <>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="nav__bar">
          <a
            href="#top"
            className="nav__logo"
            aria-label="RedBus.lv"
            onClick={(e) => {
              e.preventDefault();
              go('top');
            }}
          >
            <BusSvg className="nav__logo-bus" body="#fff3e1" ink="#14090a" glass="#e4202b" label="" />
            <span className="nav__wordmark">
              RedBus<span>.lv</span>
            </span>
          </a>

          <nav className="nav__links" aria-label="Main">
            {LINKS.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(id);
                }}
              >
                {t(label)}
              </a>
            ))}
          </nav>

          <div className="nav__right">
            <div className="lang" role="group" aria-label="Language">
              {LANGS.map((l) => (
                <button key={l} className={l === lang ? 'is-active' : ''} aria-pressed={l === lang} onClick={() => setLang(l)}>
                  {l}
                </button>
              ))}
            </div>
            <a className="nav__phone" href={`tel:${PHONE_TEL}`} data-cursor="Call">
              <IconPhone />
              <span>{PHONE_DISPLAY}</span>
            </a>
            <button id="cart-btn" className="nav__cart" onClick={() => setOpen(true)} aria-label={`${t(copy.nav.order)}: ${count}`}>
              <IconBag />
              <span className="nav__cart-label">{t(copy.nav.order)}</span>
              <span className={`nav__count ${count ? 'is-filled' : ''}`}>{count}</span>
            </button>
            <button
              className="nav__burger"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={t(menuOpen ? copy.nav.menuClose : copy.nav.menuOpen)}
            >
              {menuOpen ? <IconClose /> : <span className="nav__burger-lines" />}
            </button>
          </div>
        </div>
      </header>

      <div className={`mnav ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <nav className="mnav__links" aria-label="Mobile">
          {LINKS.map(([id, label], i) => (
            <a
              key={id}
              href={`#${id}`}
              tabIndex={menuOpen ? 0 : -1}
              style={{ transitionDelay: `${120 + i * 60}ms` }}
              onClick={(e) => {
                e.preventDefault();
                go(id);
              }}
            >
              <small>0{i + 1}</small>
              {t(label)}
            </a>
          ))}
        </nav>
        <div className="mnav__foot">
          <div className="lang lang--big" role="group" aria-label="Language">
            {LANGS.map((l) => (
              <button key={l} className={l === lang ? 'is-active' : ''} aria-pressed={l === lang} onClick={() => setLang(l)} tabIndex={menuOpen ? 0 : -1}>
                {l}
              </button>
            ))}
          </div>
          <a className="btn btn--cream" href={`tel:${PHONE_TEL}`} tabIndex={menuOpen ? 0 : -1}>
            <IconPhone /> {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </>
  );
}
